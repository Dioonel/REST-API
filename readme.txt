Simple API made with express.

Available routes:

'/'                                                     Static HTML

'/products'                                             Static HTML, you can search, create, delete and update products
'/api/products'                                          GET (returns all products), POST (creates a new product)
'/api/products/{id}'                                     GET (returns a specific product), DELETE (deletes a specific product), PATCH (updates a specific product)

'/users'                                                Static HTML, you can search, create, delete
'/api/users'                                             GET (returns all users), POST(creates a new user)
'/api/users/{id}'                                        GET (returns a specific user), DELETE (deletes a specific user), PATCH (updates a specific user)

'/login'                                                Static HTML, you can log in with an existent user
'/register'                                             Static HTML, you can create a new user (This route executes a POST in /api/users)
'/my-profile'                                           Static HTML, you can UPDATE your user while logged in


Data required to POST or PATCH, must be sent in the body of the request.

To access '/users' and '/my-profile' you need to be logged in. You'll have a valid token in your headers or cookies.
To make a DELETE or PATCH request in '/api/users/{id}' you need to be logged in (valid token) and have 'admin' as your user role.

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

IF THE DATABASE IS NOT AVAILABLE, TRY CREATING A FILE CALLED ".env" IN THE ACTUAL ROUTE, AND DEFINE THESE VARIABLES WITH YOUR OWN MONGO DATABASE INFO: 

DB_URI="<your_mongo_db_uri>"
JWT_SECRET="secret"

=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////