Simple API made with express.

Available routes:

'/'                                                  Static HTML
'/products'                                          GET (returns all products), POST (creates a new product)
'/products/{id}'                                     GET (returns a specific product), DELETE (deletes a specific product)
'/users'                                             GET (returns all users), POST (creates a new user)
'/users/{id}'                                        GET (returns a specific user), DELETE (deletes a specific user)


Some of these routes may only be accessible through API testing tools like Postman or Insomnia.
PATCH functionality has not been added yet.