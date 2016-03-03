
var express = require('express');
var session = require('express-session');

var myapp = express();
var bodyparser = require('body-parser');
myapp.use(bodyparser.urlencoded({extended:true}));
myapp.use(bodyparser.json());


var random = require("random-js")();
var mongoose = require('mongoose');
var flag = true;

myapp.use(session({secret: 'ssshhhhh'}));
var sess;


var connect = mongoose.connect('mongodb://localhost/test');

var schema = mongoose.Schema;
var Objid = schema.ObjectId;

var group_id;

// group schema nad model
var groupSchema = new schema(
	{
	group_id : {type:schema.ObjectId},
	group_name : String,
	invite_id : Number
	});

	var group_model = mongoose.model('tbl_groupinfos',groupSchema);

// member schema and model
var member_schema = new schema(	{
	member_id:{type:schema.ObjectId},
	first_name:{type:String,required:true},
	last_name:{type:String,required:true},
	mail_id:{type:String,required:true},
	phon_no:{type:Number,required:true,unique:true},
	password:{type:String,required:true},
	role:{type:String,required:true},
	group_id:{type:schema.ObjectId,ref:'group_model'},
	Active:{type:Boolean,required:true},

});

 var member_model = mongoose.model('tbl_memberinfos',member_schema);

myapp.post("/insert",function(req,res,next)
{
	var data = req.body;
	
	var first_name = data.firstname;
	var last_name = data.lastname;
	var emailid = data.emailid;
	var mobno = data.mobileno;
	var password = data.password;

	var groupName = data.groupname;
	if(data.checked == true)
	{
		var role = "group member";
	}
	else
	{
		var role = "group head";
	}
	
	
	var member_model1 = new member_model(
	{
		first_name:first_name,
		last_name:last_name,
		mail_id:emailid,
		phon_no:mobno,
		password:password,
		role:role,
		
		Active:true
	

	});
	

	member_model1.save(function(err)
	{
		if(err)
		{
				next(err);
		}
			else
		{	
			var invite_id = random.integer(1,1000000000);

			var group_model1 = new group_model(
		{
		group_name:groupName,
		invite_id:invite_id
	});
	group_model1.save(function(err,model)
	{
		if(err)
		{
			throw err;
		}
		else
		{
			console.log(group_model1._id);
            
		}
	});
 group_model.findOne({'invite_id':invite_id},'_id group_name',function(err,data)			//username alreday exist
	{
		if(err)
		{
			throw err;
		}
		else
			{
				member_model1.group_id = data._id;
				member_model1.save();
				res.send(true);
				console.log(member_model1);
				console.log(group_model1);
			}
	});
		
		}
	});
	

	



});

myapp.use(function(err, req, res, next) {
  console.log("error!!!");
  	res.status(406).send("error");
});


myapp.post("/login",function(req,res)
{
	var data = req.body;
	var phonno = data.name;
	var password = data.password;
	member_model.findOne({$and:[{'password':password},{'phon_no':phonno}]},'_id first_name',function(err,data)
	{
			if(err)
			{
				throw err;
			
			}
			else
			{
				if(data == null)
				{
					res.send("check username and password");
				}
				else
				{
					member = data._id;
					firstname = data.first_name;

					sess = req.session;
					sess.firstname = firstname;
					res.send(sess.firstname);

				}
			}

	});




});


myapp.listen(3001);
