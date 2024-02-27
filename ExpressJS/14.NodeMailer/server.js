import express from "express";
import sendEmail from "./utils/sendEmail.js";

const app = express();
const EXPRESS_PORT = 8080;

// ! Set engine
app.set("view engine", "ejs");
// ! Set static assets
app.use(express.static("public"));
// ! Pass data from the form
app.use(express.urlencoded({ extended: false }));

// * Route to render email form
app.get("/", (req, res) => {
  res.render("email-form");
});

// * Route to send the email
app.post("/send-email", async (req, res) => {
  try {
    const { email, message } = req.body;
    await sendEmail(email, message);
    res.render("email-form", {
      status: "success",
      message: "Email was successfully sent!",
    });
  } catch (error) {
    console.log(error);
    res.render("email-form", {
      status: "fail",
      message: "Email could not be sent!",
    });
  }
});
// ! Start the server
app.listen(EXPRESS_PORT, () => {
  console.log(`The server started on port ${EXPRESS_PORT}`);
});
