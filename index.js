const express = require("express");
const connection = require("./config/db.js");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send({
    message: "welcome",
  });
});

app.use("/otp", require("./routes/otp.routes"));




app.listen(8800, () => {
  try {
    connection();
    console.log("listening on port 8800");
  } catch (error) {
    console.log(error);
  }
});
