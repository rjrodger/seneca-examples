
Notes:

The code in main.js shows you how to save data entities to different
places. The two jsonfile-store and single level-store data store
plugins instances are each associated with data entities with bases of
'foo', 'bar' and 'zed' respectively, for all data operations. All
other bases are stored in memory using mem-store, which is the
default.

The option setting: map:{'-/base/-','*'} achieves this. The map is
from data entity type (zone/base/name) to a set of operations (save,
load, etc).

The example code creates new entities using seneca.make$, of type
-/foo/red, -/bar/green and -/zed/blue, and saves them to local folders
on disk. The data is also loaded independently of Seneca to verify
that it actually has been persisted! The entity.native$ method is used
to do this, as it exposes the underlying database API.


Setup:
$ npm install

Note: seneca-level-store compiles the level modules, as they are
native.  If this does not work on your platform (e.g. Windows), just
comment out the level-store code.

Run with:
$ node main.js

For detailed logging, try:
$ node main.js --seneca.log.all


