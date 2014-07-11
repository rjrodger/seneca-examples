
Notes:

This example shows the usage of:

		* The user plugin
		* The auth plugin
		* The admin plugin
		* The data-editor plugin

An express server serves the static register page as the starting-point
of the example.  The registration functionality is handled by the seneca-auth
plugin, which takes the requests to 'auth/*', verifies the inputs, and redirects to the account page.

The multi-page app login shows how to use ejs templates and the seneca-auth
plugin to verify users and conditionally redirect on verification.  A few 
users have been created for convenience using the seneca-user registration
in app.js.

The single-page login shows how to verify users using client-side ajax calls
to seneca-auth.  Notice how it still uses a call to the /auth/login action 
internally, and then manipulates the DOM through the callback function.

There are also options for logging in with Twitter and Facebook.  These 
options are available by creating a config.mine.js file with Twitter and 
Facebook OAuth keys.  seneca-auth uses these keys to authenticate the user,
using the same pattern as regular user authentication.

For more questions about the seneca-auth plugin, check out 
https://github.com/rjrodger/seneca-auth

To learn more about the seneca.pin() method, check out 
http://senecajs.org/api.html#long-m-pin (more documentation soon)

Feel free to contact me on Twitter if you have any questions! :) @rjrodger





Create config:

Copy config.template.js to config.mine.js
Optionally add keys for Twitter and Facebook OAuth

Run with:

$ node app.js

Or to use a custom port:
$ node app.js --seneca.options.main.port=4000

Then visit:
http://localhost:3000

Access the admin panel on:
http://localhost:3000/admin


