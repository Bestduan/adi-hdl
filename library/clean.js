const fs = require("fs");
const fspath = require("path");

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

function clean(fold) {
    let file_list = fs.readdirSync(`${__dirname}/${fold}`);
    file_list.forEach(element => {
        deleteDir(`${__dirname}/${fold}/${element}/.Xil`);
        deleteDir(`${__dirname}/${fold}/${element}/${element}.cache`);
        deleteDir(`${__dirname}/${fold}/${element}/${element}.hw`);
        deleteDir(`${__dirname}/${fold}/${element}/${element}.ip_user_files`);
        if (fs.existsSync(`${__dirname}/${fold}/${element}/${element}_ip.log`)) {
            fs.unlinkSync(`${__dirname}/${fold}/${element}/${element}_ip.log`);
        }
        if (fs.existsSync(`${__dirname}/${fold}/${element}/${element}.xpr`)) {
            fs.unlinkSync(`${__dirname}/${fold}/${element}/${element}.xpr`);
        }
        if (fs.existsSync(`${__dirname}/${fold}/${element}/vivado.jou`)) {
            fs.unlinkSync(`${__dirname}/${fold}/${element}/vivado.jou`);
        }
        if (fs.existsSync(`${__dirname}/${fold}/${element}/vivado.log`)) {
            fs.unlinkSync(`${__dirname}/${fold}/${element}/vivado.log`);
        }
    });
}

clean("jesd204");
clean("cn0363");
clean("spi_engine");
clean("xilinx");
clean("util_pack");