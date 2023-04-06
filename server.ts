import { exec } from "child_process";
import express from "express";

const app = express();
const port = 8080;
app.post("/", (req, res) => {
  exec(`cd ../rust-cms-json-parser && cargo build`, (error, stdout, stderr) => {
    if (stdout) res.send(stdout);
    if (error) res.send(error);
    if (stderr) res.send(stderr);
  })
})
app.listen(port, () => console.log(`Listening on port ${port}`));
