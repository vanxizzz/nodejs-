const util = require("util");

// Promise👉异步回调函数
// function delay(duration) {
//     return new Promise(res => {
//         setTimeout(() => {
//             res(duration);
//         }, duration);
//     })
// };
// const delayCallback = util.callbackify(delay)
// delayCallback(1000, (err, data) => {
//     console.log(data)
// })

//⭐异步回调函数 👉 Promise
// function delay(duration, callback) {
//     setTimeout(() => {
//         callback(null, duration);//第1个参数是错误对象，第2个参数才是数据
//     }, duration);
// };
// const delayPromise = util.promisify(delay);

// (async function () {
//     const data = await delayPromise(200);
//     console.log(data)
// })()


//⭐深度严格比较
// const obj1 = {
//     a: 5,
//     b: {
//         c: 6
//     },
//     d: [11, 22, 33]
// };
// const obj2 = {
//     a: 5,
//     b: {
//         c: 6
//     },
//     d: [11, 22, 33]
// };
// console.log(util.isDeepStrictEqual(obj1, obj2))