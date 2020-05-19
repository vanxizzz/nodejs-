const url = require("url")

// 将字符串地址转化为地址对象
const newUrl = url.parse("https://www.baidu.com:123/a/b.html?name=ab&age=18#abc", true)
// console.log(newUrl);


//将地址对象转化为字符串地址
const test = {
    protocol: 'https:',
    slashes: true,
    auth: null,
    host: 'www.baidu.com:123',
    port: '123',
    hostname: 'www.baidu.com',
    hash: '#abc',
    search: '?name=ab&age=18',
    pathname: '/a/b.html',
    path: '/a/b.html?name=ab&age=18',
    href: 'https://www.baidu.com:123/a/b.html?name=ab&age=18#abc'
};

console.log(url.format(test))
