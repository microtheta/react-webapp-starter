var nodemailer = require('nodemailer');
var EmailTemplate = require('email-templates').EmailTemplate;

var client = nodemailer.createTransport({
  service: 'SendGrid',
  auth: {
    user: 'no-reply@microtheta.com',
    pass: 'micro@theta#1'
  },
  tls: {
      rejectUnauthorized: false
  }
});

var sendHtmlMail = function(templateName, data, subject, to, cc, bcc, cb) {
  
  var tmplPath = (global.BASE_PATH + '/app/server/utils/mailtemplates/' + templateName);

  var template = new EmailTemplate(tmplPath);
  template.render(data, function(err, result) {
    if (err) {
      console.log('HTML mail err', err);
    } else {
      sendMail(subject, result.html, to, cc, bcc, cb);
    }
  });
};

var sendMail = function(subject, body, to, cc, bcc, cb ) {
  var email = {
    from: 'no-reply@microtheta.com',
    to: to,
    cc: cc,
    bcc: bcc,
    subject: subject,
    html: body
  };

  client.sendMail(email, function(err, info) {
    if (err) {
      console.log('Mail send err:' + err);
    } else {
      console.log('Message sent: ' + info.response);
      if(cb && typeof(cb) === 'function') {
        cb();
      }
    }
  });
};


module.exports = {
  sendHtmlMail,
  sendMail
};