var http = require('http')
var path = require('path')
var fs = require('fs')
var url = require('url')


function staticRoot(samplePath, req, res){
  console.log(samplePath)
  
  console.log(req.url)
  var pathObj = url.parse(req.url, true)
  console.log(pathObj)
  
  
  if(pathObj.pathname === '/'){
    pathObj.pathname += 'test.html'
  }
  

  

  var filePath = path.join(samplePath, pathObj.pathname)
  
  // var fileContent = fs.readFileSync(filePath,'binary')
  // res.write(fileContent, 'binary')
  // res.end()
  
  
  fs.readFile(filePath, 'binary', function(err, fileContent){
    if(err){
      console.log('404')
      res.writeHead(404, 'not found')
      res.end('<h1>404 Not Found</h1>')
    }else{
      console.log('ok')
      res.writeHead(200, 'OK')
      res.write(fileContent, 'binary')
      res.end()      
    }
  })
  

}

console.log(path.join(__dirname, 'sample'))

var server = http.createServer(function(req, res){
  staticRoot(path.join(__dirname, 'sample'), req, res)
})

server.listen(8080)
console.log('visit http://localhost:8080' )
