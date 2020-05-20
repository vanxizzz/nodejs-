// ([
//     {
//         name: "",//路径名
//         ext: "",//后缀，如果是目录，会""
//         isFile,//是否是文件
//         size,//文件大小
//         createTime,//日期对象，创建时间
//         updateTime,//日期对象，修改时间
//         getChildren() { },//得到目录的所有子文件对象，如果是文件，返回[]
//         getContent(isBuffer = false) { },//获取文件内容，如果是目录，返回null
//     }
// ])

const fsPromise = require("fs").promises;
const path = require("path");
const exists = require("./myExists")
const os = require("os");
const EMPTY_KEYWORDS = Symbol("empty-keywords");
//默认配置
const defaultConfig = {
    pathArr: ["./"],
    emitFile: true,
    filename: "./_keywords.json",
    validExts: [".js", ".jsx"],
    excludeKeywords: ["node_modules", "LICENSE", "dist", "out", ".git", "abc"]
};
class File {
    constructor(filename, name, ext, isFile, size, createTime, updateTime) {
        this.filename = filename;
        this.name = name;
        this.ext = ext;
        this.isFile = isFile;
        this.size = size;
        this.createTime = createTime;
        this.updateTime = updateTime;
    }
    async getContent(isBuffer = false, type = "utf-8") {
        if (!this.isFile) {
            return null;
        }
        let data = await fsPromise.readFile(this.filename);
        if (!isBuffer) {
            data = data.toString(type);
        };
        return data;
    }
    async getChildren() {
        const childrenArr = [];
        if (!this.isFile) {
            const files = await fsPromise.readdir(this.filename);
            for (let file of files) {
                const fileObject = await File.create(path.resolve(this.filename, file));
                childrenArr.push(fileObject);
            };
        };
        return childrenArr;
    }
    static async create(filename) {
        const stat = await fsPromise.stat(filename);
        const isFile = stat.isFile();
        const ext = path.extname(filename);
        const name = path.basename(filename);
        const size = stat.size;
        const createTime = new Date(stat.birthtime);
        const updateTime = new Date(stat.mtime);
        let newFile = new File(filename, name, ext, isFile, size, createTime, updateTime);
        return newFile;
    }
};


/**
 *
 * {
     "/a/b/c": "var a = 10;...",
     "/dasd/dd": "var a = 5;...",
 }
 *
 * @param {*} rootFileData
 * @returns
 */
async function deepGetContent(rootFileData) {
    const result = {};
    async function temp(fileDatas) {
        for (const file of fileDatas) {
            if (file.isFile) {
                const content = await file.getContent();
                result[file.filename] = content;
            } else {
                await temp(await file.getChildren());
            }
        }
    };
    await temp([rootFileData]);
    return result;
}

async function searchKeywords(userConfig) {
    const config = mergeConfig(userConfig, defaultConfig);
    if (config.keywords === EMPTY_KEYWORDS) {
        throw new Error("没有传搜索关键字");
    }
    if (typeof config.keywords === "string") {
        config.keywords = [config.keywords]
    } else if (!Array.isArray(config.keywords)) {
        throw new TypeError("keywords类型错误")
    }
    try {
        const isExist = await exists(config.path, "dir");
        if (!isExist) {
            throw new TypeError(`${config.path}目录不存在`);
        }
        const data = await File.create(config.path);

        let contentObj = await deepGetContent(data);
        contentObj = filterValidExt(contentObj, config.validExts);//过滤出含有关键后缀的
        contentObj = filterExcludeKeywords(contentObj, config.excludeKeywords);//排除掉exclude里的


        const result = {};
        for (let key of config.keywords) {
            result[key] = {};
        };
        for (let filename in contentObj) {
            let lines = contentObj[filename].split(os.EOL);
            for (let key of config.keywords) {
                result[key][filename] = [];
                const reg = new RegExp(key);
                for (let i = 0; i < lines.length; i++) {
                    if (reg.test(lines[i])) {
                        result[key][filename].push(i + 1)
                    }
                };
                if (result[key][filename].length === 0) {
                    delete result[key][filename]
                }
            };
        };
        if (config.emitFile) {
            await fsPromise.writeFile(config.filename, JSON.stringify(result))
        }
        return result;
    } catch (error) {
        console.log(error)
    }
};

(async () => {
    const result = await searchKeywords({
        keywords: "console",
        path: path.resolve(__dirname),
        excludeKeywords: ["node_modules"]
    });
    console.log(result);
})();


function filterExcludeKeywords(contentObj, keywords) {
    const res = {};
    for (let prop in contentObj) {
        let temp = true;
        const arr = prop.split(path.sep);
        for (let item of keywords) {
            if (arr.includes(item)) {
                temp = false;
                break;
            }
        };
        if (temp) {
            res[prop] = contentObj[prop];
        }
    };
    return res;
}

function filterValidExt(obj, exts) {
    const res = {};

    for (let key in obj) {
        console.log(key);
        console.log(isValid(key, exts));
        if (isValid(key, exts)) {
            res[key] = obj[key];
        }
    };

    return res;
}
function isValid(name, suffix) {
    for (let item of suffix) {
        if (name.endsWith(item)) {
            return true;
        }
    };
    return false;
}

function mergeConfig(userConfig, defaultConfig) {
    return {
        keywords: EMPTY_KEYWORDS,
        ...defaultConfig,
        ...userConfig
    }
}


