import { exec } from "child_process";
import express from "express";

const getBuildCommand = ( language: string ) =>
{
  // switch on language to give build cmd
  let buildCmd;
  switch ( language )
  {
    case "rust":
      return `cargo build`;
    default: throw new Error( `unknown language ${language}` );
  }
}

const app = express();
const port = 8081;

app.get( "/.well-known/ai-plugin.json", ( req, res ) =>
  res.sendFile( __dirname + '/ai-plugin.json' )
)

app.post( "/folders/:folder/build/:language", ( req, res ) =>
{
  const folder = req.params[ "folder" ];
  const language = req.params[ "language" ]
  const buildCommand = getBuildCommand( language );

  console.log( `got build request for ${folder} in language ${language}` );
  console.log( `running "${buildCommand}"` );
  exec( buildCommand, { cwd: `../${folder}` },
    ( error, stdout, stderr ) =>
    {
      console.log( "got response: " );
      console.log( "stdout: " + stdout );
      console.log( "stderr: " + stderr );
      console.log( "error: " + error );

      if ( error ) res.status( 500 ).send( error );
      else res.status( 200 ).json( { "output": stdout.trim() + stderr.trim() } );

      console.log( 'cmd finished.' )
    } )
} )
app.listen( port, () => console.log( `Listening on port ${port}` ) );
