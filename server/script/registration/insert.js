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

var checkin_schema = new schema({
	group_id:{type:schema.ObjectId,ref:'member_model',required:true},
	member_id:{type:schema.ObjectId,ref:'member_model',required:true},
	latitude:{type:Number,required:true},
	longitude:{type:Number,required:true},
	activity:{type:String,required:true},
	time:{type:Date,required:true}
})

 var member_model = mongoose.model('tbl_memberinfos',member_schema);
 var checkin_model = mongoose.model('tbl_checkins',checkin_schema);

// inserting data into mongodb

myapp.post("/insert",function(req,res,next)
{
	var data = req.body;
	
	var first_name = data.firstname;
	var last_name = data.lastname;
	var emailid = data.emailid;
	var mobno = parseInt(data.mobileno);
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
	member_model.findOne({$and:[{'password':password},{'mail_id':emailid}]},'_id first_name last_name role group_id mail_id phon_no',function(err,data)
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
					mail_id = data.mail_id;
					lastname = data.last_name;
					phon_no = data.phon_no;

				

					sess = req.session;
						sess.member = member;
					sess.firstname = firstname;
					sess.role = role;
					sess.group_id = group_id;
					sess.mail_id= mail_id;
					sess.lastname = lastname;
					sess.phon_no = phon_no;
				console.log(sess.member);

				group_model.findOne({_id:group_id},'invite_id group_name',function(err,data)
				{
					if(err)
					{
						throw err;
					}
					else
					{
						inviteid = data.invite_id;
						sess.inviteid = inviteid;
						gname = data.group_name;
						sess.gname = gname;

						var object = {'firstname':sess.firstname,'lastname':sess.lastname,'phon_no':sess.phon_no,'role':sess.role,'group_id':sess.group_id,'mail_id':mail_id,'groupname':sess.gname,'member_id':sess.member};
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

// memberlist

myapp.post("/info",function(req,res)
{
	var data = req.body;
	var group_id = data.group_id;
	var name = data.name;
	var mail_id = data.mail_id;
	console.log(data);

	member_model.find({$and:[{'group_id':group_id},{mail_id:{$ne:mail_id}}]},'first_name last_name mail_id phon_no',function(err,data)
	{
		if(err)
		{
			throw err;
		}
		else
		{
			if(data==null)
			{
				res.status(404).send("err");
			}
			else
			{
			
				/*info = {};
				info.firstname = data.first_name;
				info.lastname = data.last_name;
				info.phon_no = data.phon_no;
				info.mail_id = data.mail_id;
				console.log(info);
				res.setHeader('Content-Type', 'application/json');
				res.send(info);*/
				console.log(data);
				res.send(data);
				console.log("data is sended");


			}
		}
	});

});

myapp.post("/changePassword",function(req,res)
{
	var data = req.body;
	var password = data.password;
	var newpassword = data.newpassword;
	var mailid = data.mail_id;
	console.log(data);

	member_model.update({$and:[{mail_id:mailid},{password:password}]},{password:newpassword},{ multi: false},function(err,numAffected)
	{
		if(err)
		{
			throw err;
		}
		else
		{
			if(numAffected.nModified == 1)
			{
				res.send(true);
			}
			else
			{
					res.status(404).send("err");
			}
		}
		
		}
			
	);

});

myapp.post("/editMember",function(req,res)
{
	var data = req.body;
	var email = data.mailid;
	var firstname = data.firstname;
	var lastname = data.lastname;
	var phonno = parseInt(data.phonno);
	var grupname = data.grupname;

	member_model.update({mail_id:email},{$set:{first_name:firstname,last_name:lastname,phon_no:phonno}},{multi:true},function(err,numAffected)
	{
		if(err)
		{
			throw err;
		}
		else
		{
			
			if(numAffected.nModified == 1)
			{
				res.send(true);
			}
			else
			{
				res.status(404).send("err");
			}
		}
	})
})
myapp.post("/checkin",function(req,res)
{
	var data = req.body;
	var groupid = data.group_id;
	 var lat = parseFloat(data.lat);
	 var lng = parseFloat(data.lng);
	 var activity = data.activity;
	 var member_id = data.member;
	 var time = data.time;

	 
	
	checkin_model1 = new checkin_model({
	group_id:groupid,
	member_id:member_id,
	latitude:lat,
	longitude:lng,
	activity:activity,
	time:time
	});

	checkin_model1.save(function(err,model)
	{
		if(err)
		{
			throw err;
		}
		else
		{
			
			res.send(data);
		}

	});

	
});
myapp.post("/getCheckinData",function(req,res)
{
	var data = req.body;
	var memberid = data.member_id;
	var groupid = data.group_id;
	checkin_model.find({group_id:groupid},function(err,data)
	{
		if(err)
		{
			throw err;

		}
		else
		{
			if(data == null)
			{
				console.log("no checkins yet");
				res.send(false);
			}
			else{
			
			console.log(data);
				res.send(data);
			}
		}

	});

});

myapp.listen(3001);
	