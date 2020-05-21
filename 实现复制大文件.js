const fs = require("fs");
const path = require("path");

//测试是大约680ms
async function method1() {
    const from = path.resolve(__dirname, "./tempDir/a.txt");
    const to = path.resolve(__dirname, "./tempDir/aaa.txt");
    console.time("复制");
    const data = await fs.promises.readFile(from);
    await fs.promises.writeFile(to, data);
    console.timeEnd("复制");
};

//大约226ms
async function method2() {
    const from = path.resolve(__dirname, "./tempDir/a.txt");
    const to = path.resolve(__dirname, "./tempDir/aaa.txt");
    console.time("复制")
    const ws = fs.createWriteStream(to);
    const rs = fs.createReadStream(from);

    rs.on("data", chunk => {
        if (!ws.write(chunk)) {
            //解决背压问题
            rs.pause();
        }
    });
    ws.on("drain", () => {
        rs.resume();
    })
    rs.on("close", () => {
        console.timeEnd("复制")
    })
}

//大约289ms
async function method3() {
    const from = path.resolve(__dirname, "./tempDir/a.txt");
    const to = path.resolve(__dirname, "./tempDir/aaa.txt");
    console.time("复制")
    const ws = fs.createWriteStream(to);
    const rs = fs.createReadStream(from);
    rs.pipe(ws);//method2里边的封装，可以解决背压问题
    rs.on("close", () => {
        console.timeEnd("复制")
    })
};
method3()