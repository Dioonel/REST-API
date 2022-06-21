Simple API made with express.

Available routes:

'/'                                                     Static HTML

'/login'                                                Static HTML, you can log in with an existent user
'/register'                                             Static HTML, you can create a new user (This route executes a POST in /api/users)
'/my-profile'                                           Static HTML, you can UPDATE your user while logged in
'/timeline'                                             Static HTML, you can obtain all the postings here, or filter them
'/timeline/publish'                                     Static HTML, you can POST a new posting here
'/timeline/{id}'                                        Static HTML, you can GET a detailed post, POST new comments there and add that product to your cart
'/my-cart'                                              Static HTML, you can see your cart, DELETE and item or DELETE all items

'/api/postings'                                         GET (returns all postings), POST (creates a new posting)
'/api/postings/{id}'                                    GET (returns one posting), PATCH (update one posting), DELETE (delete one posting), POST (creates a comment to that posting)
'/api/my-cart'                                          GET (returns your cart), POST (adds an item to your cart), DELETE (removes an item from your cart)
'/api/my-cart/empty'                                    DELETE (removes all your items from your cart)


//////////////////////////////////////////////////////////////////////////////////////////////////////
///// The following endpoints might be depracated, or not recommended to manipulate from itself. /////
///// Its recommended that you use their functionalities through the endpoints showed above.     /////
//////////////////////////////////////////////////////////////////////////////////////////////////////

'/products'                                             Static HTML, you can search, create, delete and update products
'/api/products'                                          GET (returns all products), POST (creates a new product)
'/api/products/{id}'                                     GET (returns a specific product), DELETE (deletes a specific product), PATCH (updates a specific product)

'/users'                                                Static HTML, you can search, create, delete
'/api/users'                                             GET (returns all users), POST(creates a new user)
'/api/users/{id}'                                        GET (returns a specific user), DELETE (deletes a specific user), PATCH (updates a specific user)



Data required to POST or PATCH, must be sent in the body of the request.

You MUST be logged in, in order to access a lot of the endpoints and its functionalities. You'll have a valid token in your headers or cookies.
Some functionalities are still not implemented in frontend, but available in backend through the API, like PATCH or DELETE a posting.
Some functionalities are only available for users with the role 'admin'.

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

IF THE DATABASE IS NOT AVAILABLE, TRY CREATING A FILE CALLED ".env" IN THE ACTUAL ROUTE, AND DEFINE THESE VARIABLES WITH YOUR OWN MONGO DATABASE INFO: 

DB_URI="<your_mongo_db_uri>"
JWT_SECRET="secret"

=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

















To do list:
    - Add 'PATCH a posting' available through frontend.
    - Add 'DELETE a posting' available through frontend.
    - Add 'DELETE a comment' available through frontend.

    - Add 'DELETE N amount of items in my-cart', instead of the whole amount of that item.
    - Add more user info in /my-profile, such as created postings.
    - Rework /my-profile, in order to make it public through an ID in the URL, instead of private through a token with the same URL.
    - Rework how images are being treated in the whole app, and use a proper library such as Multer.

    - Add a mock of cash or money to spend on items, and be able to buy from your cart.
    - Add an inventory for your bought items, and be able to re-sell them more easily.

    - Clean, modularize, update, and document A LOT of code.