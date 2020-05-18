console.log(process.cwd()); //当前工作目录

let i = 0;
setInterval(() => {
    i++;
    console.log(i);
    if(i>5){
        process.exit()
    }
}, 100);