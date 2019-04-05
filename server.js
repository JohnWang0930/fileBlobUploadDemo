const express = require('express')
const bodyParser  = require('body-parser')
const fs = require('fs')

const server = express()

server.use(bodyParser.raw({
    type:'application/octet-stream',
    limit:'20MB',
}))

server.post('/',(req,res)=>{
    console.log(req.body)
    bufferToFile(req.body,res)
})

server.listen('3000','127.0.0.1',()=>{
    console.log('server is running')
})

function bufferToFile(buffer,res){
    if (!buffer){
        return console.log('没有buffer对象传入')
    }
    const str = buffer.toString()
    console.log(str)
    //写入文件
    fs.writeFile('./1.jpg', Buffer.from(str.split(',')), function (err) {
        if (err) {
            res.send(err);
        } else {
            res.send('保存成功');
        }
    });
}