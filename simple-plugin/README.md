
For an introduction to Seneca data entities, please read the
[senecajs.org tutorial](http://senecajs.org/data-entities.html).


Notes:

The code in simple.js shows you how to create a simple plugin. Plugins
are just a way to organise your action patterns into groups so that
you have a "unit" for development and deployment. Assign individual
plugins to individual developers on your team. Deploy individual
plugins as individual micro-services.

The sample code follows the standard formula for a Node.js module.
Assign to `module.exports` a single function. The function name
becomes the name of the module. In this case, `simple`.

This context object, `this`, of the function, is a Seneca object that
you use to define patterns. In the example code, the pattern
_role:simple,cmd:foo_ is defined. It's good practice list all your
patterns at the top of the plugin source code so that others can
quickly review the interface the plugin defines.

If your plugin needs to do some initialization work, such as
connecting to a database, or reading files, or talking to the network,
you should place this work inside a special action pattern called
_init:<name-of-your-plugin>_. In this case: _init:simple_. The _init_
patterns are called sequentially by Seneca, and must all
succeed. 

Note that there is no callback from the function that defines the
plugin. All asynchronous initialization work should happen inside the
_init_ action.

The plugin code also shows you how to use the built-in Seneca logging
interface. The _seneca.log_ function has shotcuts for each logging
level. These lof entries will be annotated with the name of the plugin
and the id of the current action, so match them up against other
actions.


Setup:
$ npm install


Run with:
$ node main.js

This shows a very common use case for loading and running Seneca
plugins.


For detailed logging, try:
$ node main.js --seneca.log.all


To run as a micro-service, see micro-service.js



