const fsPromise = require("fs").promises;
const path = require("path");
const exists = require("./myExists");
//查看文件的一些信息

(async () => {
    const url = path.resolve(__dirname, "./temp.txt")
    let isExist = await exists(url, "file");
    if (isExist) {
        let data = await fsPromise.stat(url);
        console.dir(data.isDirectory());//判断是不是目录
        console.dir(data.isFile());//判断是不是文件
        console.log(data.size);//文件大小
    } else {
        console.log("不存在")
    }
})()

// (async () => {
//     try {
//         const stat = await fsPromise.stat(path.resolve(__dirname, "./temp.txt"));
//         console.log(stat)
//     } catch (error) {

//     }
// })();