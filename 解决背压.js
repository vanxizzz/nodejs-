const fs = require("fs");
const path = require("path");


const url = path.resolve(__dirname, "./tempDir/a.txt");

const ws = fs.createWriteStream(url, {
    highWaterMark: 3,//每次传输的字节
    flags: "a"
});

ws.on("drain", () => {
    //当管道排空时触发，说明有空间了，可以继续写入了
    console.log("管道排空了，可以继续写入了")
    write();
});
let i = 0;
write()
function write() {
    let flag = true;
    while (i < 10 * 1024 * 1024 && flag) {
        flag = ws.write("abcdefghijklmn".repeat(1000));
        i++;
    };
    console.log("写不下了，等会");
}