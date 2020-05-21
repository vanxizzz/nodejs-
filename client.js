const http = require("http");
const URL = require("url")
//返回的server继承http.Server类
// const server = http.createServer((req,res)=>{
//     //req继承IncomingMessage类
//     //res继承http.ServerResponse类
// })

//返回的req继承http.ClientRequest类
const req = http.request(
    "http://nodejs.cn/api/http.html#http_response_statuscode",
    {
        method: "GET"
    },

    res => {
        //这里的res继承http.IncomingMessage类
        let str = "";
        console.log(res.statusCode)
        console.log(res.httpVersion);
        console.log(res.headers)
        res.on("data", chunk => {
            str += chunk.toString("utf-8");
        });
        res.on("close", () => {
            // console.log(str)
        })
    }
);

req.end()