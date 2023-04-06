import { exec } from "child_process";
import express from "express";

const app = express();
const port = 8080;
app.post( "/folders/:folder/build", ( req, res ) =>
{
  const folder = req.params["folder"];
  console.log( `got build request for ${folder}` );
  exec(`bash ../${folder}/build.sh`, (error, stdout, stderr) => {
    if ( error ) res.status( 500 ).send( error  );
    else if ( stderr ) res.status( 400 ).json( { "err": stderr } );
    else if ( stdout ) res.status( 200 ).json( { "output": stdout } );
    console.log('build finished.')
  })
})
app.listen(port, () => console.log(`Listening on port ${port}`));
