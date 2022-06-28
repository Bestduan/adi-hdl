const fs = require("fs");
const fspath = require("path");
//  D:/project/FPGA/.Lib/ADI-hdl-2019_r1/library
function deleteDir(path){
    let files = [];
    if( fs.existsSync(path) ) {  
        files = fs.readdirSync(path);   
        files.forEach(element => {
            let curPath = fspath.join(path,element).replace(/\\/g,"\/");
            if(fs.statSync(curPath).isDirectory()) { 
                deleteDir(curPath);
            } else {    
                fs.unlinkSync(curPath);    
            }
        });
        fs.rmdirSync(path); //清除文件夹
    }
}

let file_list = fs.readdirSync(`${__dirname}/library`);
file_list.forEach(element => {
    deleteDir(`${__dirname}/library/${element}/.Xil`);
    deleteDir(`${__dirname}/library/${element}/${element}.cache`);
    deleteDir(`${__dirname}/library/${element}/${element}.hw`);
    deleteDir(`${__dirname}/library/${element}/${element}.ip_user_files`);
    if (fs.existsSync(`${__dirname}/library/${element}/${element}_ip.log`)) {
        fs.unlinkSync(`${__dirname}/library/${element}/${element}_ip.log`);
    }
    if (fs.existsSync(`${__dirname}/library/${element}/${element}.xpr`)) {
        fs.unlinkSync(`${__dirname}/library/${element}/${element}.xpr`);
    }
    if (fs.existsSync(`${__dirname}/library/${element}/vivado.jou`)) {
        fs.unlinkSync(`${__dirname}/library/${element}/vivado.jou`);
    }
    if (fs.existsSync(`${__dirname}/library/${element}/vivado.log`)) {
        fs.unlinkSync(`${__dirname}/library/${element}/vivado.log`);
    }
});