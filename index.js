const fs = require("fs");
const path = require("path");
const http = require("http")

http.createServer((req, res) => { }).listen(9527);

// setImmediate(() => {
//     console.log("测试")
// });
setTimeout(() => {
    console.log("测试33")
}, 1000);
fs.readFile("./package.json", (err, res) => {
    console.log("测试22")
})

