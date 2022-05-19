Simple API made with express.

Available routes:

'/'                                                     Static HTML

'/products'                                             Static HTML, you can search, create, delete and update products
'api/products'                                          GET (returns all products), POST (creates a new product)
'api/products/{id}'                                     GET (returns a specific product), DELETE (deletes a specific product), PATCH (updates a specific product)

'/users'                                                Static HTML, you can search, create, delete and update users
'api/users'                                             GET (returns all users), POST (creates a new user), PATCH (updates a specific user)
'api/users/{id}'                                        GET (returns a specific user), DELETE (deletes a specific user)

'/login'                                                Static HTML, you can log in with an existent user


Data required to POST or PATCH, must be sent in the body of the request.



/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

IF THE DATABASE IS NOT AVAILABLE, TRY CREATING A FILE CALLED ".env" IN THE ACTUAL ROUTE, AND DEFINE THESE VARIABLES WITH YOUR OWN MONGO DATABASE INFO: 

DB_URI="<your_mongo_db_uri>"

=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////