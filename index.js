const express = require("express");
const cors = require("cors");

const { connection } = require("./configs/db");


require("dotenv").config();

const app = express();

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.send("Welcome");
});



app.use("/otp", require("./Routes/otp.routes"));
app.use("/product",require("./Routes/product.routes"))
app.use("/cart",require("./Routes/Cart.Routes"))
app.use("/calories",require("./Routes/calories.Routes"))



app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log("connect to db");
  } catch (err) {
    console.log("Error while connecting to DB");
    console.log(err);
  }
  console.log(`Server running at ${process.env.port}`);
});
