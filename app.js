var http=require('http')
var fs=require('fs')
var template=require('art-template')
var url=require('url')

// 请求地址为'/'的时候应该打开主页

var comments=[
  {
    name:'张三',
    message:'撒看到回复静安寺慷慨激昂化算法',
    dateTime:'2019-11-22'
  },
  {
    name:'张四',
    message:'是到付款较好的',
    dateTime:'2019-11-22'
  },
  {
    name:'张五',
    message:'水电费客家话',
    dateTime:'2019-11-22'
  },
  {
    name:'张六',
    message:'十多个女生',
    dateTime:'2019-11-22'
  }
]

http
  .createServer(function(req,res){
    var parseObj=url.parse(req.url,true)
    var pathname=parseObj.pathname
    if (pathname==='/') {
      fs.readFile('./views/index.html',function(err,data){
        if (err) {
          return res.end('404 Not Found.')
        }
        var tplStr=template.render(data.toString(),{
          comments:comments
        })
        res.end(tplStr)
      })
    }else if (pathname.indexOf('/public/')===0) {
      fs.readFile('.'+pathname,function(err,data){
        if (err) {
          return res.end('404 Not Found.')
        }
        return res.end(data)
      })
    }else if (pathname==='/post') {
      fs.readFile('./views/post.html',function(err,data){
        if (err) {
          return res.end('404 Not Found.')
        }
        res.end(data)
      })
    }else if (pathname==='/pinglun') {
      var comment=parseObj.query
      comment.dateTime='2019-11-22'
      comments.unshift(comment)

      res.statusCode=302
      res.setHeader('Location','/')
      res.end()
    }else{
      fs.readFile('./views/404.html',function(err,data){
        if(err){
          return res.end('404 Not Found.')
        }
        res.end(data)
      })
    }

  })
  .listen(3000,function(){
    console.log('server is running...')
  })



