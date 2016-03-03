var express= require('express');
var bodyparser = require('body-parser');
var myapp = express();

myapp.use(bodyparser.urlencoded());
myapp.use(bodyparser.json());

myapp.post("/",function(req,res)
{
	var data = req.body();
	console.log(data);
	res.send(data);

});

myapp.listen(3002);