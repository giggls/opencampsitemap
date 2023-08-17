# Development notes

For development on any Linux machine run the following:

mitmdump --listen-port 8080 --mode reverse:https://opencampingmap.org
./nodejs-campmap.js -u http://127.0.0.1:8080/getcampsites -d http://127.0.0.1:8080/getimportdate

Then point your Browser to http://localhost:54445/

This will use the database from https://opencampingmap.org while running the
client-code on your own machine.

