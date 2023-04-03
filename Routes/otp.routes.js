const express = require("express");
const router = express.Router();
const otpGenerator = require("otp-generator");
const moment = require("moment");
const jwt = require("jsonwebtoken");
const OtpModel = require("../Model/otp.model");
const authMiddleware = require("../middleware/auth.middleware");
const client = require("twilio")(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

// POST /otp/send
router.post("/send", async (req, res) => {
  const { phoneNumber, email, name } = req.body;
  const otpCode = otpGenerator.generate(6, {
    digits: true,
    alphabets: true,
    upperCase: true,
    specialChars: true,
  });
  const expiresAt = moment().add(5, "minutes").toDate();

  try {
    // Save the OTP code and expiration date to the database
    const data = await OtpModel.find({ phoneNumber: phoneNumber });
    if (data.length==0) {
      const otp = new OtpModel({
        phoneNumber,
        email,
        name,
        otp: otpCode,
        expiresAt,
      });
      await otp.save();
      res.send({
        otpCode,
      });
    } else {
      const x = await OtpModel.findById({ _id: data[0]._id });
      const pay = { otp: otpCode, expiresAt };
      const a = await OtpModel.findByIdAndUpdate({ _id: data[0]._id }, pay);
      console.log(a);
      res.send(otpCode);
    }

    // Send the OTP code to the user's phone number using Twilio
    const message = `Your verification code is: ${otpCode}`;
    // const twilioResponse = await twilio.messages.create({ body: message, from: process.env.TWILIO_PHONE_NUMBER, to: phoneNumber });
    // const twilioResponse = await client.messages.create({
    //   body: `Your OTP to login is ${otp}`,
    //   from: "+12766002036",
    //   statusCallback: "http://postb.in/1234abcd",
    //   to: `+91${phoneNumber}`,
    // });

    // res.json({
    //   message: "OTP sent successfully",
    //   messageId: twilioResponse.sid,
    //   otp:message
    // });
    // res.send({
    //   message,
    // });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// POST /otp/verify
router.post("/verify", async (req, res) => {
  const { phoneNumber, otpCode } = req.body;

  try {
    // Find the OTP code in the database
    const otp = await OtpModel.findOne({
      phoneNumber,
      otp: otpCode,
      expiresAt: { $gt: new Date() },
    });
    if (!otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    // Delete the OTP code from the database
    // await otp.delete();

    // Generate a JWT token for the user
    const token = jwt.sign(
      { phoneNumber: otp.phoneNumber, userId: otp._id },
      process.env.JWT_SECRET
    );

    res.json({ message: "OTP verified successfully", token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/", authMiddleware, async (req, res) => {
  const token = req.headers.authorization;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  try {
    const product = await OtpModel.find({ _id: decoded.userId });
    res.send({ data: product });
  } catch (error) {
    res.status(500).send({
      error: true,
      msg: "something went wrong",
    });
  }
});

module.exports = router;
