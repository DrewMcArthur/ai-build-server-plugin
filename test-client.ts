import util from "util";
import { request } from "urllib";

const server_url = "http://localhost:8080"; 
const build_folder = "rust-cms-json-parser";
const req_url = `${server_url}/folders/${build_folder}/build`

console.log(`POST ${req_url}`)
request( req_url, {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
})
  .then( res => console.log(`response: ${ res['data'] }`))
  .catch(err => console.error(err))
