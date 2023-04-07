# AI Build Server Plugin

A simple express-based server to run predefined build commands written in TypeScript.

### Background

I want LLMs to code for me, so the goal of this project is to provide a server and 
an openai-style plugin to allow for an LLM to say "build this folder of code", and 
receive the output of that command.  Obviously we don't want to just give the LLM 
access to bash, so the build command is specified in the server code.

## Usage

A simple `npm install` handles the dependencies.  `npm start` should fire up the server.

Currently, the only build command implemented is `cargo build`, 
but more languages can easily be added.

To see example usage, you can run `npm test`, which executes the `test-client.ts` file.

## API

the server makes available one endpoint, other than `GET /.well-known/ai-plugin.json`:

```http
POST /folders/:folder/build/:language
```

If you execute the above command, the server will try to run and return the output of

```js
exec('cargo build', {cwd: `../${folder}`})
```

Take a look at the `ai-plugin.json` file for more information on how to use the API.

## Notes & TODO

maybe the language should be a param, so the url looks like `/folders/:folder/build?lang=:language`.
or, it'd be neat if the server could just figure out automatically what language to use.

## Contributing

Feel free to submit PRs with other languages implemented, or any of the changes described above!
