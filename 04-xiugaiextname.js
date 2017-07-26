// 依赖文件模块
const fs=require("fs");
const path = require('path')
// 首先获取后缀名
// process.argv获取输入框里面的数，结果为数组
const oldname="."+process.argv[2];  /*因为通过path.extname()获取到的文件扩展名是  .txt格式*/
const nowname=process.argv[3];
// 获取工作目录下面的文件
const dir=process.cwd();    /*绝对路径*/
const filenames=fs.readdirSync(dir)
// 筛选我们指定的扩展名文件呢
// const arr=filenames.filter(function(item){
//     return path.extname(item)===oldname
// })

// 使用ES6中的箭头函数写法
const filAarr=filenames.filter(item => {
    const fileAll=fs.statSync(path.join(dir,item)).isFile()
    console.log(fileAll)
    return fileAll && path.extname(item)===oldname
})
// 将指定的文件名替换成我们希望的后缀名
filAarr.forEach(function(item){
    const oldfile=path.join(dir,item)
    const nowfile=oldfile.replace(oldname,"."+nowname)
    // renameSync修改文件名称，更改文件存放的路径
    fs.renameSync(oldfile,nowfile)
})
