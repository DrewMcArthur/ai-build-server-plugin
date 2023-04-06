import { exec } from "child_process";
import { Server } from 'socket.io';
const server = new Server()

const port = 8080;

server.on( 'error', ( err ) =>
{
  console.error( err );
})  

server.on( 'connection', ( client ) =>
{
  console.log('client connected')
  client.on( 'build folder', ( folder ) =>
  {
    console.log(`building folder ${folder}...`)
    exec( `cd ${folder} && cargo build`, ( error, stdout, stderr ) =>
    {
      if (stdout) client.emit("output", stdout);
      if (error) client.emit("error", error );
      if (stderr) client.emit("error", stderr );
      client.emit("cmd finished");
      console.log(`done.  output sent to client.`)
    })
  })
})

// Start the server on port
server.listen( port );
console.log( `server listening on port ${port}` );
