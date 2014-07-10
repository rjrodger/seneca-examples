
Notes:

The code in main.js shows you how to save data entities to different
places. The jsonfile-store and level-store data stores plugins are
each associated with data entities with bases of 'json' and 'level'
respectively, for all data operations.

The option setting: map:{'-/base/-','*'} achieves this. The map is
from data entity type (zone/base/name) to a set of operations (save,
load, etc).

The creation and saving of data entities occur inside the seneca.ready
callback. This ensures that database connections are open before
operations are performed. The context object of the ready callback
(this) is the current seneca instance.

The example code creates new entities using seneca.make$, of type
-/json/foo and -/level/bar, and saves them to local folders on disk.

The ; prefix is used as a code marker to indicate a callback chain
that has not been indented, to save horizontal space.


Setup:
$ npm install


Run with:
$ node main.js


Output:

2014-01-27T15:27:47.914Z	INFO	hello	Seneca/*.*.*/v12ini
$-/json/foo:{id=yhmod6;propA=val1;propB=val2}
$-/level/bar:{id=4ef9b775-041e-42e1-9635-c3999043fcbb;propA=val3;propB=val4}




