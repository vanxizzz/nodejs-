exports.abc = 5;
module.exports = {
    a: 5,
    b: 6
};

this.pp = 100;
console.log("===========")
console.log(require)

console.log(this === exports)