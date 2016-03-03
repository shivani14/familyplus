
var express = require('express');
var session = require('express-session');
var nodemailer = require('nodemailer');

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
	mail_id:{type:String,required:true,unique:true},
	phon_no:{type:Number,required:true},
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
	var emailid = data.uname;
	var password = data.password;
	member_model.findOne({$and:[{'password':password},{'mail_id':emailid}]},'_id first_name role group_id',function(err,data)
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
					role = data.role;
					firstname = data.first_name;
					group_id = data.group_id;

					sess = req.session;
					sess.firstname = firstname;
					sess.role = role;

				group_model.findOne({_id:group_id},'invite_id',function(err,data)
				{
					if(err)
					{
						throw err;
					}
					else
					{
						inviteid = data.invite_id;
						sess.inviteid = inviteid;
						console.log(sess.inviteid);
						
					}

				});
					
					res.setHeader('Content-Type', 'application/json');
   					 res.send(JSON.stringify({firstname:sess.firstname,role:sess.role,inviteid:sess.inviteid}));
   					 
					

				}
			}

	});




});

myapp.post("/invite",function(req,res)
{
	var data = req.body;
	var email = data.emailid;
	var id = inviteid;
	
	var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'shivanisjoshi14@gmail.com', // Your email id
            pass: '9408974217' // Your password
        }
    });

	 var mailOptions = {
    from: 'shivanisjoshi14@gmail.com', 
    to: email, 
    subject: 'from family plus', 
    text: "hii your invite id is"+id+"."
   
};

transporter.sendMail(mailOptions, function(error, info){
    if(error){
        console.log(error);
      /*  res.json({yo: 'error'});*/
    }else{
        console.log('Message sent: ' + info.response);
        /*res.json({yo: info.response});*/
    };
});

});


myapp.listen(3001);
