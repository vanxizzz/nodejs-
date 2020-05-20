const fs = require("fs");
const path = require("path")

const rs = fs.createReadStream(path.resolve(__dirname, "./abc.txt"), {
    encoding: "utf-8",
    highWaterMark: 1,//每次读取的大小（默认是64kb,会影响data事件），如果encoding是utf-8则单位是字符，如果是null则单位：字节
    autoClose: true//读完后自动关闭，默认true
});;


rs.on("open", () => {
    console.log("文件打开了")
});
rs.on("error", () => {
    console.log("文件出粗了")
});
rs.on("close", () => {
    console.log("输出方已关闭")
});
rs.on("end", () => {
    console.log("接收方已关闭")
});
rs.on("data", chunk => {
    console.log("数据：", chunk);
    rs.pause();
});
rs.on("pause", () => {
    console.log("暂停输出");
    setTimeout(() => {
        rs.resume();
    }, 1000);
});
rs.on("resume", () => {
    console.log("继续输出")
})

