import nodemailer from "nodemailer";

const sendEmail = async (to, messageContent) => {
  try {
    // create the transporter
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: "username",
        pass: "password",
      },
    });

    // create message object
    const message = {
      to,
      subject: "New email",
      html: `
        <h3>You have received a new email from NodeMailer App</h3>
        <p>${messageContent}</p>
        `,
    };

    // send the email
    const info = await transporter.sendMail(message);
    console.log("Message sent", info.messageId);
  } catch (error) {
    console.log(error);
    throw new Error("Email could not be sent!");
  }
};

export default sendEmail;
