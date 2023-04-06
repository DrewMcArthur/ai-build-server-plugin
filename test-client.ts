import { io } from "socket.io-client";

const socket = io( "http://localhost:8080" );

socket.emit( 'build folder', "../rust-cms-json-parser" );

socket.on( "output", ( data ) => console.log( data ) );

socket.on( "error", ( error ) => console.error( error ) );

socket.on( "cmd finished", () =>
{
  console.log( "cmd finished" );
  socket.close();
} )
