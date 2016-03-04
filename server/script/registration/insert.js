// required modules

var express = require('express');
var session = require('express-session');
var nodemailer = require('nodemailer');
var random = require("random-js")();
var mongoose = require('mongoose');
var bodyparser = require('body-parser');


var myapp = express();
myapp.use(bodyparser.urlencoded({extended:true}));
myapp.use(bodyparser.json());
myapp.use(session({secret: 'ssshhhhh'}));


var flag = true;
var sess;
var connect = mongoose.connect('mongodb://localhost/test');
var schema = mongoose.Schema;
var Objid = schema.ObjectId;
var group_id;


// group schema and model
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
	phon_no:{type:Number},
	password:{type:String,required:true},
	role:{type:String,required:true},
	group_id:{type:schema.ObjectId,ref:'group_model'},
	Active:{type:Boolean,required:true},

});

 var member_model = mongoose.model('tbl_memberinfos',member_schema);


// inserting data into mongodb

myapp.post("/insert",function(req,res,next)
{
	var data = req.body;
	
	var first_name = data.firstname;
	var last_name = data.lastname;
	var emailid = data.emailid;
	var mobno = data.mobileno;
	var password = data.password;
	var groupName = data.groupname;

	var role = data.checked;


	var member_model1 = new member_model(
	{
		first_name:first_name,
		last_name:last_name,
		mail_id:emailid,
		phon_no:mobno,
		password:password,
		Active:true
	

	});
	
	if(role == "true")
	{
			var familyid = parseInt(data.familyid);
		member_model1.role = "group member";
		group_model.findOne({invite_id:familyid},'_id',function(err,data)
		{
			if(err)
			{	
				throw err;
 
			}
			else if(data == null)
			{

				res.status(500).send("error");
			}
			else
			{
				 member_model1.group_id = data._id;
				
				member_model1.save(function(err)
				{
					if(err)
					{
				res.status(406).send("error");
					}
					else
					{
						console.log(member_model1);
						res.send(true);

					}

				});
			}
		})
	

	}
	else
	{
		member_model1.role = "group head";
		member_model1.save(function(err)
	{
		if(err)
		{
			res.status(406).send("error");
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
			res.status(406).send("error");
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
	
	}
	
});


 // authentication of user(login)

myapp.post("/login",function(req,res)
{
	var data = req.body;
	var emailid = data.uname;
	var password = data.password;
	console.log(emailid +" "+password);
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
					res.status(404).send("error");
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
						var object = {'firstname':sess.firstname,'role':sess.role,'inviteid':sess.inviteid};
						console.log(sess.inviteid);
						res.setHeader('Content-Type', 'application/json');
   					 res.send(object);
						
					}

				});
					
					
   					 
					

				}
		}

	});




});

// sending email to member

myapp.post("/invite",function(req,res)
{
	var data = req.body;
	var email = data.emailid;
	var id = inviteid;
	
	var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'shivanisjoshi14@gmail.com',
            pass: '9408974217' 
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
      	res.status(503).send("error");
    }else{
        console.log('Message sent: ' + info.response);
      	res.send(true);
    };
});

});


myapp.listen(3001);
	