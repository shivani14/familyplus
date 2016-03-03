
var express = require('express');
var sha1 = require('sha1');
var bodyparser = require('body-parser');

var random = require("random-js")();
var mongoose = require('mongoose');

var myapp = express();
myapp.use(bodyparser.urlencoded());
myapp.use(bodyparser.json());

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

	var group_model = mongoose.model('group_model',groupSchema);

// member schema and model
var member_schema = new schema(	{
	member_id:{type:schema.ObjectId},
	first_name:String,
	last_name:String,
	mail_id:String,
	phon_no:Number,
	password:String,
	role:String,
	group_id:{type:schema.ObjectId,ref:'group_model'},
	Active:Boolean,

});

 var member_model = mongoose.model('member_model',member_schema);


myapp.post("/",function(req,res)
{
	var data = req.body;
	var invite_id = random.integer(1, 10000000000);
	var first_name = data.firstname;
	var last_name = data.lastname;
	var emailid = data.emailid;
	var mobno = data.mobileno;
	var password = sha1(data.password);

	var groupName = data.groupname;
	if(data.checked == true)
	{
		var role = "group member";
	}
	else
	{
		var role = "group head";
	}
	
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
			throw err;
		}
		else
		{
		
		
		}
	});
	 group_model.findOne({'invite_id':invite_id},'_id group_name',function(err,data)
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
			}
	});



	





});


myapp.listen(3001);