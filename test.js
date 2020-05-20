const path = require("path");
const os = require("os");

// console.log(isValid("F:\\zyx\\新nodejs练习\\abc\\abc.gitignore", [".gitignore", ".cbc"]));
// console.log(path.sep)
console.log("F:\\zyx\\新nodejs练习\\abc\\abc.gitignore".split(path.sep))
function isValid(name, suffix) {
    for (let item of suffix) {
        if (name.endsWith(item)) {
            return true;
        }
    };
    return false;
}
