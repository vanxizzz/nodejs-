const http = require("http");
const URL = require("url")

//返回的server继承http.Server类
const server = http.createServer((req, res) => {
    //req继承IncomingMessage类
    //res继承http.ServerResponse类
    // console.log(URL.parse(req.url));
    // console.log(req.headers);
    console.log(req.method)
    if (req.method === "POST") {
        console.log("测试")
        let body = "";
        req.on("data", chunk => {
            //解析请求体数据
            body += chunk.toString("utf-8");
        })
        req.on("end", () => {
            console.log(body)
            res.writeHead(200, "nottt found", { "CoNTent-type": "application/json", "a": 55 })
            res.write(JSON.stringify({ a: 5, b: 6 }));
            res.end()
        })
    } else {
        res.write("get请求：", req.url);
        res.end();
    }

    // console.log(req);
    console.log("===============")
});

server.listen(9527, () => {
    console.log("server listening....")
});

