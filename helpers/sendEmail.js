const formData = require('form-data');
const Mailgun = require('mailgun.js');
const mailgun = new Mailgun(formData);
require('dotenv').config();

const { MAILGUN_API_KEY } = process.env;

const sendEmail = async data => {
  const mg = mailgun.client({
    username: 'hryvinskyim@gmail.com',
    key: MAILGUN_API_KEY,
  });

  mg.messages
    .create('sandboxa0f63b11a7794c19b44d1924b4ff4d2b.mailgun.org', {
      from: 'Mailgun Sandbox <hryvinskyim@gmail.com>',
      to: [data.to],
      subject: 'Verify your email',
      text: 'Verify your email',
      html: data.html,
    })
    .then(msg => console.log(msg))
    .catch(err => console.log(err));
};

module.exports = sendEmail;