const store = require('./cartStore');
const boom = require('@hapi/boom');
const productStore = require('./../products/productsStore');
const itemStore = require('./itemStore');

class CartService {

    async push(cart, productId, amount){
        try {
            if(!cart || !productId){
                throw boom.badRequest("Can't post empty data.");
            }

            let myProduct = await productStore.getOne(productId)                                    // Finds the product
            if(myProduct?.name && myProduct?.price){
                let item = {
                    product: myProduct._id,
                    amount: amount || 1
                }

                for(let it of cart.items){
                    if(it.product._id == productId){                                               // If the item already exists in the cart
                        let updatedItem = await itemStore.updateItemAmount(it._id, (it.amount + amount)); // Update the amount of that item
                        let itemIndex = cart.items.findIndex((item => item._id == updatedItem._id));
                        cart.items[itemIndex] = updatedItem;
                        let resolvedCart = {
                        ...cart,
                        subtotal: await cart.subtotal,
                        }
                        return resolvedCart;
                    }
                }
                
                let myItem = await itemStore.addItem(item);                                   // Else, create a new item and add it to the cart

                let filledCart = await store.pushItem(cart._id, myItem._id);
                let resolvedCart = {
                    ...filledCart._doc,
                    subtotal: await filledCart.subtotal,
                }
                return resolvedCart;
            } else {
                throw boom.notFound("Can't buy an invalid product.")
            }
        } catch (err){
            throw boom.badRequest('Invalid data.');
        }
    }

    async pop(cartId, itemId){
        try{
            if(!cartId || !itemId){
                throw boom.badRequest("Can't post empty data.");
            }
            let deletedItem = await itemStore.deleteItem(itemId);
            if (deletedItem?._id){
                return await store.popItem(cartId, deletedItem._id);
            } else {
                throw boom.notFound("Can't delete an invalid item");
            }
        } catch (err) {
            throw boom.notFound('Item not found.');
        }
    }

    async empty(cart){
        try{
            if(!cart){
                throw boom.badRequest("Can't post empty data.");
            }

            let itemIds = [];

            for(let item of cart.items){
                itemIds.push(String(item._id));
            }

            if (itemIds.length > 0){
                let deletedItems = await itemStore.deleteManyItems(itemIds);
                return await store.emptyCart(cart._id);
            } else {
                return {message: 'This cart is already empty!'};
            }

        } catch (err) {
            throw boom.notFound('Item not found.');
        }
    }
}

module.exports = CartService;