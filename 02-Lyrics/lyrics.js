const path=require("path")
const fs=require("fs")
// 目前为止，第三方模块必须和js文件在同级
const iconv=require("iconv-lite")

// 获取文件
const target=path.join(process.cwd(),process.argv[2])
// 读取里面的内容
const filecontent=fs.readFileSync(target)
// 解码 得到正常文本内容
const lyric = iconv.decode(filecontent, 'gbk')
// 将文本按照换行分隔数组
const lines=lyric.split("\n")
// 获取每一行的时间，遍历数组
lines.forEach(function(line){
    // 设置正则表达式，匹配字符串,将时间和歌词分成数组中的元素
/*    分隔之后的数组格式：
    [ '[04:05.71]在爱也没有用',
        '04',
        '05',
        '71',
        '在爱也没有用',
        index: 0,
        input: '[04:05.71]在爱也没有用\r' ]
*/
    const reg=/\[(\d{2})\:(\d{2})\.(\d{2})\](.+)/
    const matches = reg.exec(line)
    if(matches){
        // matches[1]是00,01....格式
        const time=parseInt(matches[1])*60*1000+parseInt(matches[2])*1000+parseInt(matches[3])
        setTimeout(function(){
            console.log(matches[0])
        },time)
    }else{
        console.log(line)
    }
    
})
