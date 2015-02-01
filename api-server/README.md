

Notes:

This example provides a simple structure for an API server. The server
exposes a product catalog API. The API provides a REST interface, and
some custom endpoints:

   * _GET /hello_ : sanity test for API
   * _GET /product_ : list all products
   * _GET /product/:id_ : individual product data
   * _PUT /product/:id_ : update existing product data
   * _POST /product_ : create a new product
   * _DELETE /product/:id_ : delete a product
   * _GET /product/:id/star_ : get number of stars for product 
   * _PUT /product/:id/star_ : star the product
   * _DELETE /product/:id/star_ : unstar the product

This is a basic API, and does not handle permissions. However it does
require a (hardcoded) token to be accessed. This is enforced using the
_startware_ feature of [seneca-web](github.com/rjrodger/seneca-web)

The API is defined by the _api.js_ plugin. This defines a set of
action patterns that exist merely to translate HTTP requests into
internal action patterns.

The translation is done manually for the _/hello_ and
_/product/:id/star_ endpoints, using _seneca-web's_ mapping facility.

The HTTP REST API for product data is provided by the 
[seneca-jsonrest-api](github.com/rjrodger/seneca-jsonrest-api) plugin.

The business logic is provided by the plugin
_product_catalog.js_. This is a seneca plugin that exposes a single
action pattern: _role:product,cmd:star_. This is an internal action
that lets you star or unstar identified products.

In the example code, everything runs in one process. In a
micro-service deployment scenario, you might choose to place
_product_catalog.js_ in it's own process, and also the data access
patterns _role:entity,..._.


Setup:
$ npm install

Run the server with:
$ node app.js --seneca.log.all

Run the client, in a separate terminal, with:
$ node client.js

Try running the client more than once. Some operations only work the
first time! For example, you can't create a new entity with the same
id as an existing one. Nor can you access a deleted entity.

You can get a view of the current state of the data by opening:
http://localhost:3000/mem-store/dump

