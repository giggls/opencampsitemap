# Development notes

For development on any Linux machine run the following:

mitmdump --listen-port 8000 --mode reverse:https://opencampingmap.org
./nodejs-campmap.js -u http://127.0.0.1:8000/getcampsites -d http://127.0.0.1:8000/getimportdate

Then point your Browser to http://localhost:54445/

This will use the database from https://opencampingmap.org while running the
client-code on your own machine.

It is also possible to use a local poi-database!

For this purpose just run get-campsites.cgi
from osmpoidb with the -s option instead of mitmdump:
/path/to/osmpoidb/get-campsites.cgi -s
