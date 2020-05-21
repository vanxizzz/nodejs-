const http = require("http")
const fsPromise = require("fs").promises;
const path = require("path")
const URL = require("url")
const rootPath = path.resolve(__dirname, "./public");



async function getFileInfo(path) {
    try {
        return await fsPromise.stat(path);
    } catch (error) {
        return null
    }
};

const server = http.createServer(async (req, res) => {
    if (req.method === "GET") {
        let { pathname } = URL.parse(req.url);
        pathname = pathname.replace(/^\//, "");
        if (!path.extname(pathname)) {
            pathname = path.resolve(rootPath, pathname, "index.html");
        } else {
            pathname = path.resolve(rootPath, pathname);
        }
        const data = await getFileInfo(pathname);
        if (!data) {
            res.writeHead(404, "not found");
            res.write(await fsPromise.readFile(path.resolve(rootPath, "404.html")));

        } else {
            res.write(await fsPromise.readFile(pathname))
        }
        res.end();
    }
});

server.listen(9527);