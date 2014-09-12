var nodemailer = require('nodemailer');
var _ = require('lodash');


// create reusable transporter object using SMTP transport
var transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'yucompsci@gmail.com',
    pass: 'yucomputers'
  }
});

// NB! No need to recreate the transporter object. You can use
// the same transporter object for all e-mails

// setup e-mail data with unicode symbols
var mailOptions = {
  from: 'YU Computer Science ✔ <YUCompSci@gmail.com>' // sender address
};

exports.sendEmail = function (options, callback) {
  _.merge(options, mailOptions);
  // send mail with defined transport object
  transporter.sendMail(options, function (error, info) {
    if (_.isFunction(callback)){
      if (error) {
        callback(error);
      } else {
        console.log("Email sent: ", info);
        callback();
      }
    }
  });
};

exports.signupHTML =
  '<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd"><html lang="en">' +
  '<head>' +
  '<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">' +
  '<meta name="viewport" content="initial-scale=1.0">' +
  ' <meta name="format-detection" content="telephone=no">' +
  ' <title>Thank you for Signing up!</title>' +
  '   </head>' +
  '   <body style="width: 100%; -webkit-text-size-adjust: none; -ms-text-size-adjust: none; margin: 0; padding: 10px 0;" bgcolor="#ebebeb" leftmargin="0" topmargin="0" marginwidth="0" marginheight="0">' +
  '     <style type="text/css">' +
  '     @media screen and (max-width: 600px) {' +
  '       table[class="container"] {' +
  '       width: 95% !important;' +
  '}}' +
  '@media screen and (max-width: 480px) {td[class="container-padding"] {padding-left: 12px !important; padding-right: 12px !important;' +
  '}}</style>' +
  ' <br><table border="0" width="100%" height="100%" cellpadding="0" cellspacing="0" bgcolor="#ebebeb" style="border-spacing: 0;">' +
  '<tr><td align="center" valign="top" bgcolor="#ebebeb" style="border-collapse: collapse; background-color: #ebebeb;">' +
  '            <table border="0" width="80%" cellpadding="0" cellspacing="0" class="container" bgcolor="#ffffff" style="border-spacing: 0; width: 95% !important;">' +
  '<tr><td style="border-collapse: collapse;">' +
  '<img src="http://i40.tinypic.com/24dh53b.jpg" style="width: 100%; margin: 0;"></td></tr>' +
  '           <tr><td class="container-padding" bgcolor="#ffffff" ' +
  'style="padding-left: 12px !important; padding-right: 12px !important; font-size: 100%; line-height: 20px; font-family: Helvetica, sans-serif; color: #333; border-collapse: collapse; background-color: #ffffff;">' +
  '             <br><h2 style="color: #34495e; font-weight: bold; line-height: 120%; text-align: center; font-size: 130%;" align="center">Thank you for signing up!</h2>' +
  'We will notify you when there are further details about the semester-long project!<br><br>' +
  '<div style="font-weight: bold; font-size: 115%; line-height: 24px; color: #D03C0F; ' +
  'text-align: center;" align="center">For now, think of a cool project idea to submit!</div><br><br>' +
  '</td></tr><tr><td align="center" valign="top" style="padding-top: 0; border-collapse: collapse;">' +
  '<table border="0" cellpadding="15" cellspacing="0" ' +
  'style="-moz-border-radius: 3px; -webkit-border-radius: 3px; border-radius: 3px; font-family: Arial; ' +
  'font-size: 15px; line-height: 100%; text-align: center; border-collapse: separate; border-spacing: 0; ' +
  'background-color: #336699; border: 0;" bgcolor="#336699"><tr><td valign="middle" style="border-collapse: collapse;">       ' +
  '     <a href="https://www.facebook.com/groups/yucompsci/" target="_blank" ' +
  'style="color: #FFFFFF; line-height: 100%; text-align: center; text-decoration: none; letter-spacing: 1px;">Join us on Facebook!' +
  '</a> </td></tr></table><br><br></td></tr></table><br><br></td></tr></table></body></html>';
