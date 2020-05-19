const path = require("path")


//⭐path获取绝对路径（如果不提供绝对路径，则相对于工作目录几process.cwd()）
// console.log(process.cwd());f:\zyx\新nodejs练习
// console.log(path.resolve("a", "b"));//f:\zyx\新nodejs练习\a\b
// console.log(path.resolve(__dirname,"a","b.js"));
// console.log(path.resolve(__dirname, "a", "b", "../", "p.js"))



//⭐sep：路径的分隔符,windows是\，POSIX是/
// console.log(path.sep);



//⭐delimiter：提供平台特定的路径定界符,windows是;，POSIX是:
// console.log(path.delimiter);
// console.log(process.env.PATH.split(path.delimiter))


//⭐extname路径的后缀名
// console.log(path.extname("a/b/c"));//结果为""
// console.log(path.extname("a/b/c.html"));//结果为.html




//basename：获取path最后一部分
// console.log(path.basename("a/b/c.html"));//c.html
// console.log(path.basename("a/b/c.html", ".html"));//c
// console.log(path.basename("a/b/c"));//c



//dirname：获取目录
// console.log(path.dirname("a/b/c"));// a/b
// console.log(path.dirname("a/b/c.html"));// a/b




//join拼接路径
// console.log(path.join("a", "b", "c.html"));// a\b\c.html
// console.log(path.join("a", "b", "../", "d.js"));// a\d.js
// const basePath = "a/b";
// console.log(path.join(basePath, "../", "d.js"));//a\d.js


//normalize
// console.log(path.normalize("a/b/../d.js"));// a\d.js


//relative(from,to)返回from到to的相对路径
// console.log(path.relative("/a/b/c/d.js", "/a/b/p/p.js"));// ..\..\p\p.js








