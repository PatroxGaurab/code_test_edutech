var mongoose = require('mongoose');
var Workshopreq = mongoose.model('Workshopreq');
var Tag = mongoose.model('Tag');
var Mailer = require('./sendmail');

module.exports.workshopreqApply = function(req, res) {
	//res.status(200).json({redirect_to: "hi"});
	if(req.body.workshopreqdata){

	    Workshopreq
	      .find({email:req.body.workshopreqdata.email}).count()
	      .exec(function(err, workshopreq) {
			if(workshopreq){
				return	res.status(200).json({"message":"Already Registered", "error":"1"});
			}else{
			    var workshopreqUser = new Workshopreq();
				for (var prop in req.body.workshopreqdata) {
				   workshopreqUser[prop] = req.body.workshopreqdata[prop];
				    
				}
				//console.log( campuschampUser);
			    workshopreqUser
			      .save(function(err, workshopreq) {
				console.log(err);
	    var sendsubmail = new Mailer({to: req.body.workshopreqdata.email, subject: 'Welcome To TheoreX ✔',text: 'Successfully Registered 🐴', html: '<center><table width="700" background="#FFFFFF" style="text-align:left;" cellpadding="0" cellspacing="0"><tr>	<td height="18" width="31" style="border-bottom:1px solid #e4e4e4;">	<div style="line-height: 0px; font-size: 1px; position: absolute;">&nbsp;</div>	</td>	<td height="18" width="131">	<div style="line-height: 0px; font-size: 1px; position: absolute;">&nbsp;</div>	</td>	<td height="18" width="466" style="border-bottom:1px solid #e4e4e4;">	<div style="line-height: 0px; font-size: 1px; position: absolute;">&nbsp;</div>	</td></tr><tr>	<td height="2" width="31" style="border-bottom:1px solid #e4e4e4;">	<div style="line-height: 0px; font-size: 1px; position: absolute;">&nbsp;</div>	</td>	<td height="2" width="131">	<div style="line-height: 0px; font-size: 1px; position: absolute;">&nbsp;</div>	</td>	<td height="2" width="466" style="border-bottom:1px solid #e4e4e4;">	<div style="line-height: 0px; font-size: 1px; position: absolute;">&nbsp;</div>	</td></tr><!--GREEN STRIPE--><tr>	<td background="" width="31" bgcolor="#00a0e3" style="border-top:1px solid #FFF; border-bottom:1px solid #FFF;" height="113">	<div style="line-height: 0px; font-size: 1px; position: absolute;">&nbsp;</div>	</td>	<!--WHITE TEXT AREA-->	<td width="131" bgcolor="#FFFFFF" style="border-top:1px solid #FFF; text-align:center;" height="113" valign="middle">	<span style="font-size:30px; font-family:Josefin Sans; color:#00a0e3;">Success!</span>	</td>	<!--GREEN TEXT AREA-->	<td background="" bgcolor="#00a0e3" style="border-top:1px solid #FFF; border-bottom:1px solid #FFF; padding-left:15px;" height="113">	<span style="color:#FFFFFF; font-size:25px; font-family:Josefin Sans">Thank you for subscribing to our email newsletter.</span>	</td></tr><!--DOUBLE BORDERS BOTTOM--><tr>	<td height="3" width="31" style="border-top:1px solid #e4e4e4; border-bottom:1px solid #e4e4e4;">	<div style="line-height: 0px; font-size: 1px; position: absolute;">&nbsp;</div>	</td>	<td height="3" width="131">	<div style="line-height: 0px; font-size: 1px; position: absolute;">&nbsp;</div>	</td>	<td height="3" style="border-top:1px solid #e4e4e4; border-bottom:1px solid #e4e4e4;">	<div style="line-height: 0px; font-size: 1px; position: absolute;">&nbsp;</div>	</td></tr><tr>	<center>	<td colspan="3">	<!--CONTENT STARTS HERE-->	<br />	<br />	<table cellpadding="0" cellspacing="0">	<tr>	<td width="200"><div style="line-height: 0px; font-size: 1px; position: absolute;">&nbsp;</div></td>	<td width="400" style="padding-right:10px; font-family:Trebuchet MS, Verdana, Arial; font-size:12px;" valign="top">	<span style="font-family:Josefin Sans; font-size:20px; font-weight:bold;">Hey, Welcome to <span style="color:#00a0e3">TheoreX</span></span>	<br />	<p style="font-family:Josefin Sans; font-size:15px;">You have successfully subscribed to our weekly newsletters!</p><br /><p style="font-family:Josefin Sans; font-size:15px;">In the meantime, you can <a href="http://theorexedutech.com/">return to our website</a> to continue browsing.</p>   <p style="font-family:Josefin Sans;font-size:12px;font-weight:bold;">Best Regards,<br/>   Team TheoreX   <br/></p>	</table><br /><table cellpadding="0" style="border-top:1px solid #e4e4e4; text-align:center; font-family:Trebuchet MS, Verdana, Arial; font-size:12px;" cellspacing="0" width="900"><tr>	<td height="2" style="border-bottom:1px solid #e4e4e4;">	<div style="line-height: 0px; font-size: 1px; position: absolute;">&nbsp;</div>	</td></tr>	<td style="font-family:Josefin Sans; font-size:12px; font-weight:bold;">	<br />	For more information get back to us at info@theorexedutech.com	</td></tr></table></center>' });

				return	res.status(200).json({"message":"Successfully Registered","error":"0"});
			      });
			}
	      });
		
	}

};


