
## Setup:
```
npm install
```

## Run:

```
npm run start
```

and then visit:
```
http://localhost:3000
```

## Notes:

The code in app.js shows you how to configure an express server using
custom seneca plugins for static page rendering, api communication, and 
a quick JSON microservice.  After registering each of these plugins
with seneca.use( name, options ), you can pass the seneca middleware to the
express app via app.use( seneca.export('web') ).

Each of the three plugins is housed in its own directory.  Seneca plugins
export a function with a signature

	function myPlugin( options ) { ... }

where options are passed from the call to seneca.use. Return a description object to give your plugin an explicit name. For example:

  return { name:'foo' }
	
When working with middleware plugins, use the role:web,use:[Function]
pattern to specify a middle function, acception the usual request,
response, and next arguments.

The example code in the quick-plugin simply returns a JSON string based
on the request URL.

In the page-plugin, a connect app is created and serves a static page. 
This connect app is separate from the main express app, and simply responds
as middleware.

The api-plugin uses Express-like capabilities to map a RESTful API call to
an http response, using the seneca-web plugin.

To learn more about the seneca-web plugin, visit 
https://github.com/rjrodger/seneca-web.

To learn more about plugins, visit :
http://senecajs.org/plugins/#core-plugins

Feel free to contact me on Twitter if you have any questions! :) @rjrodger







