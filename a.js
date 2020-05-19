const path = require("path")
console.log(require.resolve("./abc"));
console.log(path.resolve("./abc"));
console.log(require.resolve === path.resolve)


console.log(this === module.exports)