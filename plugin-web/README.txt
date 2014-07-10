
Notes:

The code in app.js shows you how to configure an express server using
custom seneca plugins for static page rendering, api communication, and 
a quick JSON microservice.  After registering each of these plugins
with seneca.use( name, options ), you can pass the seneca middleware to the
express app via app.use( seneca.export('web') ).

Each of the three plugins is housed in its own directory.  Seneca plugins
export a function with a signature
	
	function myPlugin( options, register ) { ... }

where options are passed from the call to seneca.use, and the optional
register callback attaches the plugin to the seneca module.  When working
with middleware plugins, the service method is called by the web module,
passing the typical request, response, and callback arguments.

The example code in the quick-plugin simply returns a JSON string based
on the request URL.

In the page-plugin, a connect app is created and serves a static page. 
This connect app is separate from the main express app, and simply responds
as middleware.

The api-plugin uses Express-like capabilities to map a RESTful API call to
an http response, using the seneca-web plugin.

For more questions about creating your own custom plugins, check out
http://senecajs.org/api.html#long-m-use.

To learn more about the seneca-web plugin, visit 
https://github.com/rjrodger/seneca-web.

Feel free to contact me on Twitter if you have any questions! :) @rjrodger



Setup:

npm install


Run with:

node app.js

and then visit:
http://localhost:3000




