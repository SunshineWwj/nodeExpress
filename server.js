var express =require('express');
var bodyParser=require('body-parser');

var app = express();

app.set('view engine','ejs');//模板引擎
// app.set('views',__dirname+'views');


// app.use(bodyParser.urlencoded({extended:false})); //中间件处理url传参
// app.use(bodyParser.json());//中间件处理json数据的

app.use(express.static('public'));//直接把public目录暴露给客户端，浏览器可直接访问里面的内容

var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({extended:false});

app.get('/',function(req,res){
    console.dir(req.query);
    res.send('homaPage:'+req.query);
})

app.post('/',urlencodedParser, function(req,res){
    console.dir(req.body);
    res.send(req.body.name);
})
app.post('/upload', jsonParser,function(req,res){
    console.dir(req.body);
    res.send(req.body.name);
})

//模板引擎
// //传字符串
// app.get('/form/:name',function(req,res){
//     var person=req.params.name;
//     res.render('form',{person});
// })
//传对象
app.get('/form',function(req,res){
    var data={
        name:'wwj',
        job:'programmer',
        hobbies:['eating','shoppong','singing']
    };
    res.render('form',{data});
});


//==============================================================================
//中间件  对请求进行处理的一些方法
app.use(function(req,res,next){
    console.log('first middleware');//第一步
    next();//第二部
    console.log('first middleware after');//第三步
});
//对应上面的第二步
app.get('/about',function(req,res){
    console.log('log after middleware');
    res.render('about');
});
// =============================================================================



//中间件也可以加路由
app.use('/about1',function(req,res,next){
    console.log('second middleware');
    res.send('ok');
})

app.listen(3000);