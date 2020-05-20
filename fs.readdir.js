const fsPromise = require("fs").promises;
const path = require("path");
const exists = require("./myExists");

(async () => {
    const dirPath = path.resolve(__dirname, "./abc");
    const isExist = await exists(dirPath, "dir");
    if (!isExist) {
        console.log("不存在该目录");
    } else {
        let dirs = await fsPromise.readdir(dirPath);
        console.log(dirs)
    }
})()
