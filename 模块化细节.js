function requrie(modulePath) {
    //1.将modulePath转化为绝对路径F:\\zyx\\新nodejs练习\\abc.js

    //2.读取require.cache模块缓存
    if (requrie.cache["F:\\zyx\\新nodejs练习\\abc.js"]) {
        return requrie.cache["F:\\zyx\\新nodejs练习\\abc.js"].result;
    }

    //3.到了这一步，说明模块没有缓存过
    //先读取文件内容：假设内容是console.log("abc");
    //然后包裹到一个函数中
    function _temp(exports, require, module, __filename, __dirname) {
        console.log("abc");
    }

    //4.创建module对象
    const module = {
        exports: {},

    };

    //5.创建exports对象
    let { exports } = module;

    //6.调用_temp函数，并通过call传入this
    _temp.call(module.exports, exports, require, module, module.filename, module.path)
};

requrie.cache = {};