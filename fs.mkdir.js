const fsPromise = require("fs").promises;
const path = require("path");
(async () => {
    try {
        await fsPromise.mkdir(path.resolve(__dirname, "./tempDir"));
    } catch (error) {
        if (error.code === "EEXIST") {
            console.log("已经存在该目录了")
        }
    }
})()