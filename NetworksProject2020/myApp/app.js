var express = require('express');
var path = require('path');
var fs = require('fs');
const { stringify } = require('querystring');
var app = express();



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


app.get('/' , function(req,res){
res.render('login');
});

app.post('/login',function(req, res){
    var x=req.body.username;
    var y=req.body.password;
    var loginuser = {username:x, password:y};
    var data = fs.readFileSync("users.json");
    var dataObjArr = JSON.parse(data);


    for (i = 0; i < dataObjArr.length; i++) {
        x = dataObjArr[i].username;
        y = dataObjArr[i].password;
      if(loginuser.username === x && loginuser.password === y){
        res.render('home')
        break;
        }
    }
    res.render('error');
  });


  app.get('/registration', function(req, res){
    res.render('registration')
    });
    app.post('/register',function(req, res){
      var x=req.body.username;
      var y=req.body.password;
      var reguser ={username:x, password:y};
      var data = fs.readFileSync("users.json");
      var dataObjArr = JSON.parse(data);
      var flag = true;
      var i;
      for (i = 0; i < dataObjArr.length; i++) {
          z=dataObjArr[i];
        if(reguser == z){
        if(JSON.stringify(reguser) === JSON.stringify(z)){
          flag = false;
          res.render('error');
          break;
          }
          if(reguser.username === dataObjArr[i].username || reguser.password === dataObjArr[i].password){
            flag = false;
            }
          }
      if(flag){
        dataObjArr.push(reguser);
        var newData= JSON.stringify(dataObjArr);
        fs.writeFileSync("users.json",newData);
        res.render('home')
      }
    }
    });


    app.post('/search', function(req, res){
        var x= req.body.Search;
        res.render(x);

        /*if(x=='flies'){
          res.render('flies')
        }*/
        
        });


app.get('/home' , function(req,res){
    res.render('home');
    });
 app.get('/dune' , function(req,res){
    res.render('dune');
    });
app.get('/fiction' , function(req,res){
    res.render('fiction');
    });
app.get('/flies' , function(req,res){
    res.render('flies');
    }); 
app.get('/grapes' , function(req,res){
    res.render('grapes');
    });       
app.get('/leaves' , function(req,res){
    res.render('leaves');
    });
app.get('/mockingbird' , function(req,res){
    res.render('mockingbird');
    });
app.get('/novel' , function(req,res){
    res.render('novel');
    });
app.get('/poetry' , function(req,res){
    res.render('poetry');
    });  
app.get('/readlist' , function(req,res){
    res.render('readlist');
    });
app.get('/sun' , function(req,res){
    res.render('sun');
    });          
app.get('/registration' , function(req,res){
    res.render('registration');
    }); 
app.get('/searchresults' , function(req,res){
    res.render('searchresults');
    }); 


app.listen(3000);

