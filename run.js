const http=require('http');
const server=http.createServer()
server.on('request',(req,res)=>{
    res.end('Welcome Winter');
})
server.listen(5000)