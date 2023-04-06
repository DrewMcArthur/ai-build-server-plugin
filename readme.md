# CMD API Server

A simple socket-based server to run predefined bash commands written in TypeScript.

### Background

I want LLMs to code for me, so the goal of this project is to provide a server and 
an openai-style plugin to allow for an LLM to say "build this folder of code", and 
receive the output of that command.  Obviously we don't want to just give the LLM 
access to bash, so the build command is specified when you start up the server.

## Usage

A simple `npm install` handles the dependencies.  `npm start` should fire up the server.

Currently, the build command is hardcoded as `cargo build`, but maybe 
we just expect a `build.sh` script to exist in whatever folder we're trying to build.

To see example usage, you can run `npm test`, which executes the `test-client.ts` file.
