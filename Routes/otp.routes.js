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
  const {
    phoneNumber,
    email,
    name,
    pincode,
    purpose,
    referralcode,
    language,
    gender,
    age,
    physicallyactive,
    medicalcondition,
    currentweight,
    targetweight,
    height,
    initialweight,
    imgUrl,
    subscriptionType,
    

    city
  } = req.body;
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
    if (data.length == 0) {
      const otp = new OtpModel({
        purpose,
        city,
        pincode,
        referralcode,
        targetweight,
        height,
        currentweight,
        gender,
        age,
        phoneNumber,
        physicallyactive,
        medicalcondition,
        language,
        email,
        name,
        imgUrl,
        subscriptionType,
        initialweight,
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

router.get("/check/:phoneNumber", async (req, res) => {
  const phoneNumber = req.params.phoneNumber;

  try {
    // Check if the phone number is already present in the database
    const existingOtp = await OtpModel.findOne({ phoneNumber });

    if (existingOtp) {
      return res.status(200).json({ message: "Registered",status:true });
    } else {
      return res.status(200).json({ message: "Not Registered",status:false });
    }
  } catch (error) {
    console.error("Error checking phone number:", error);
    return res.status(500).json({ message: "Server error" });
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
router.get("/alluser",  async (req, res) => {

  try {
    const product = await OtpModel.find();
    res.send({ data: product });
  } catch (error) {
    res.status(500).send({
      error: true,
      msg: "something went wrong",
    });
  }
});
router.get("/user/:id",  async (req, res) => {

  try {
    const product = await OtpModel.find({_id:req.params.id});
    res.send({ data: product });
  } catch (error) {
    res.status(500).send({
      error: true,
      msg: "something went wrong",
    });
  }
});

router.put("/:id",authMiddleware, async (req, res) => {
  try {
    const updatedMeal = await OtpModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedMeal) {
      return res.status(404).json({ message: "user not found" });
    }
    res.json(updatedMeal);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE route to delete a meal by ID
router.delete("/:id",authMiddleware, async (req, res) => {
  try {
    const deletedMeal = await OtpModel.findByIdAndDelete(req.params.id);
    if (!deletedMeal) {
      return res.status(404).json({ message: "user not found" });
    }
    res.json(deletedMeal);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
