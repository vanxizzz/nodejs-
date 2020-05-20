const fs = require("fs");
const path = require("path")

//最好用绝对路径
//相对路径是由node命令执行的地方决定
const targetUrl = path.resolve(__dirname, "temp22.txt");

//⭐异步模式
// fs.readFile(targetUrl, "utf-8", (err, res) => {
//     console.log(res)
// })



//同步模式，不推荐🐕🐕，因为会导致js阻塞
// try {
//     const data = fs.readFileSync(targetUrl,"utf-8");
//     console.log(data.toString("utf-8"))
// } catch (error) {

// }

//⭐⭐promise模式
const fsPromise = fs.promises;

// fsPromise.readFile(targetUrl, "utf-8").then(res => {
//     console.log(res)
// }).catch(err => {
//     if (err.code === "ENOENT") {
//         console.log("不存在该文件");
//     }
// })

(async function () {
    let data;
    try {
        data = await fsPromise.readFile(targetUrl, "utf-8");
    } catch (error) {
        if (error.code === "ENOENT") {
            console.log("不存在该文件");
            return;
        }
    };
    console.log(data)
})()
