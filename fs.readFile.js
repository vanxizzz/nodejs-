const fsPromise = require("fs").promises;
const path = require("path")

const targetUrl = path.resolve(__dirname, "./temp.txt");
// const targetUrl = path.resolve(__dirname, "./tem22p.txt");

(async function () {
    let data;
    try {
        data = await fsPromise.readFile(targetUrl, "utf-8");
    } catch (error) {
        if (error.code === "ENOENT") {
            console.log("文件不存在")
            return;
        }
    }
    console.log(data)
})()
