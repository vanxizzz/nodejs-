const fsPromise = require("fs").promises;
const path = require("path")
const targetUrl = path.resolve(__dirname, "./abc.txt");

const content = "写入的内容";

(async () => {
    await fsPromise.writeFile(targetUrl, content,)
})()


