Simple API made with express.

Available routes:

'/'                                                     Static HTML

'/products'                                             Static HTML, you can search, create and delete products
'api/products'                                          GET (returns all products), POST (creates a new product)
'api/products/{id}'                                     GET (returns a specific product), DELETE (deletes a specific product), PATCH (updates a specific product)

'/users'                                                Static HTML, you can search, create and delete users
'api/users'                                             GET (returns all users), POST (creates a new user), PATCH (updates a specific user)
'api/users/{id}'                                        GET (returns a specific user), DELETE (deletes a specific user)


Some of these routes may only be accessible through API testing tools like Postman or Insomnia.

Data required to POST or PATCH, must be sent in the body of the request.