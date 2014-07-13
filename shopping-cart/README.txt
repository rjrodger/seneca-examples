
Notes:

This example shows the use of:

		* The cart plugin
		* The engage plugin
		* The built-in web plugin
		* The mem-store plugin
		* The admin plugin
		* The data-editor plugin

The seneca-cart plugin provides an easy interface for performing cart-
related actions, seen throughout this example. By making posts to urls 
like "/api/cart/add_entry" and "/api/cart/remove_entry", you can easily 
manipulate the cart back-end without tightly coupled logic. All of the 
configuration for the cart plugin lies in app.js.

The seneca-engage plugin can also be found in the app.js file. This plugin
handles the persistence of user sessions, saving the user's shopping cart
for later use. The handlecart() function takes care of getting the cart from
engagement, and setting the cart after any changes. 

After the plugins are configured, the express paths are then set to render 
the correct ejs templates with appropriate local variables from the cart.
Notice how every path retrieves the cart from engage through the handlecart()
function before rendering the page.

The cart-related actions like adding or removing items are handled on the 
pages (index, cart, and checkout) through hidden forms that post to the cart 
api. jQuery is used to pass the id's of DOM elements to the api calls, thus
connecting our front-end to the seneca-cart plugin.


To read more about the seneca-engage plugin, take a look at 
https://github.com/rjrodger/seneca-engage

To read more about the shopping cart plugin, check out
https://github.com/rjrodger/seneca-cart

Feel free to contact me on Twitter if you have any questions! :) @rjrodger



Run with:

node app.js -p 3000

and then visit:
http://localhost:3000


Access the admin panel on:
http://localhost:3000/admin


