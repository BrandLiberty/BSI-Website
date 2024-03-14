const nodemailer = require('nodemailer');

exports.sendEmail = (req, res) => {
  const { name, email, subject, message } = req.body;

  console.log('BODY is*********************** ', req.body)

  // Email configuration
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: "writer.brandliberty@gmail.com", // Your email
      pass: "xspjikeibwbxbxud" // Your password
    }
  });

  // Email content
  const mailOptions = {
    from: email,
    to: 'boostsubserveengineering@gmail.com',
    subject: subject,
    text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\nMessage: ${message}`
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      return res.status(500).json({
        message : 'Internal Server Error'
      });
    } else {
      console.log('Email sent: ' + info.response);
      return res.status(200).json({
        message : 'Email Sent Successfully'
      });
    }
  });
};
