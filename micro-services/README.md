
## Setup:
```
npm install
```

## Run:
Runs the following services:

   * offer-service
   * user-details
   * web-app

You can run these individually in separate terminals with:
```
node services/offer-service.js
```
```
node services/user-details.js
```
```
node services/web-app.js
```

Optionally use --seneca.log.all to see the debug logs,
or --seneca.log=type:act just to see the actions

In the debug logs, the first field is the local system time, and the
second field is a unique identifer for the seneca instance. Use this
to observe how messages flow in the system.

For convenience, you can also run everything with:
```
npm run start
```

This always prints merged debug logs for all services. The individual
logs are saved to the log folder.

The micro-services communicate over the default built-in HTTP channel,
and all listen on different ports. Review the .client and .listen
method calls in the services/*.js files to see how the channels are
set up.

The implementations of the seneca plugins used by the services are in
lib/*.js. Notice that the user-details service is just pulling out the
standard seneca-user plugin implementation into a separate service.

To see the services in action open:
```
http://localhost:3000
```

* Login with:
```
username:user, password:user
```

The offered product depends on your login status.

The web-app delivers the main web application using express.  
The user-details delivers user login and logout.
The offer-service delivers product offers based on the visitor 
being identified (i.e. logged in) or not.

This example is a vastly simplified version of Fred George's talk [implementing-micro-service-architectures]
(http://oredev.org/oredev2013/2013/wed-fri-conference/implementing-micro-service-architectures.html)




