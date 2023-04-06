import { exec } from "child_process";
import { Server } from 'socket.io';
const io = new Server()

const port = 8080;
// const cmd = process.argv[2];
// console.log("created server with cmd: " + cmd);

io.on( 'error', ( err ) =>
{
  console.error( err );
})  

io.on( 'connection', ( socket ) =>
{
  socket.on( 'build folder', ( folder ) =>
  {
    console.log(`building folder ${folder}...`)
    exec( `cd ${folder} && cargo build`, ( error, stdout, stderr ) =>
    {
      socket.emit("output", stdout);
      socket.emit("error", error );
      socket.emit("error", stderr );
      socket.emit("cmd finished");
      console.log(`done.  output sent to client.`)
    })
  })
})

// Start the server on port
io.listen( port );
