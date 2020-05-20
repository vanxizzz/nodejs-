const fsPromise = require("fs").promises;
const path = require("path");

//特点：
// 没有文件时会自动创建文件
// 没有目录时会报错
// 追加内容的话加个flag: "a"表示append追加

(async () => {
    try {
        await fsPromise.writeFile(path.resolve(__dirname, "temp.txt"), "重写内容")
        // await fsPromise.writeFile(path.resolve(__dirname, "temp.txt"), "追加内容", { flag: "a" })
        // await fsPromise.writeFile(path.resolve(__dirname, "temp.txt"), "33哈哈", { encoding: "utf-8", flag: "a" })
    } catch (error) {

    }
})()


//⭐复制图片
// (async () => {
//     let data;
//     try {
//         data = await fsPromise.readFile(path.resolve(__dirname, "./public/imgs/lg1.jpg"));
//         await fsPromise.writeFile(path.resolve(__dirname, "./copyDir/img1.jpg"), data);

//     } catch (error) {
//         console.log(error)
//     }
// })()


