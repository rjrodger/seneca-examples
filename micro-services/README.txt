
Runs the following services:

   * offer-service
   * user-details
   * web-app

You can run these individually in separate terminals with:

$ node services/offer-service.js
... etc

Optionally use --seneca.log.all to see the debug logs,
or --seneca.log=type:act just to see the actions

In the debug logs, the first field is the local system time, and the
second field is a unique identifer for the seneca instance. Use this
to observe how messages flow in the system.


For convenience, you can also run everything with:

$ node index.js

This always prints merged debug logs for all services. The individual
logs are saved to the log folder.

The micro-services communicate over the default builtin TCP channel,
and all listen on different ports. Review the .client and .listen
method calls in the services/*.js files to see how the channels are
set up.

The implementations of the seneca plugins used by the services are in
lib/*.js. Notice that the user-details service is just pulling out the
standard seneca-user plugin implementation into a separate service.

Open http://localhost:3000 to see the services in action.

The web-app delivers the main web application using express.  
The user-details delivers user login and logout.
The offer-service delivers product offers based on the visitor 
being identified (i.e. logged in) or not.

