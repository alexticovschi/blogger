const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.contactForm = (req, res) => {
  const { name, email, message } = req.body;

  const emailData = {
    to: process.env.EMAIL_TO,
    from: req.body.email,
    subject: `${process.env.APP_NAME}`,
    text: `Email received from 
        Sender name: ${name}
        Sender email: ${email}
        Sender message: ${message}
    `,
    html: `
        <h3>Email received from ${email}</h3>
        <h3>Name: ${name}</h3>
        <h3>Email: ${email}</h3>
        <p>Message:  ${message}</p>

        <hr/>
        <a href="https://bloggingcoder.com">https://bloggingcoder.com</a>
    `
  };

  sgMail.send(emailData).then(send => res.json({ success: true }));
};
