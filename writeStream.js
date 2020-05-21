const fs = require("fs");
const path = require("path");


const url = path.resolve(__dirname, "./tempDir/a.txt");

const ws = fs.createWriteStream(url, {
    highWaterMark: 3//每次传输的字节
});

//ws.write返回值，
//返回true，说明管道还有空间
//返回false，说明管道已经占满highWaterMark设定的字节
//出现这个管道占满的原因就是因为内存读取太快，磁盘读取太慢
//如果返回false还一直写入数据，容易照成背压问题
let flag = ws.write("a");
console.log(flag);
flag = ws.write("a");
console.log(flag);
flag = ws.write("a");
console.log(flag);
flag = ws.write("a");
console.log(flag);
