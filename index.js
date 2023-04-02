const express = require("express");
const connection = require("./config/db.js");
const cors = require("cors");


 

// const { CartRoutes } = require("./routes/Cart.Routes");

// const { ProductRoutes } = require("./routes/product.routes");
// const { caloriesRoutes } = require("./routes/calories.Routes.js");


const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send({
    message: "welcome",
  });
});

app.use("/otp", require("./routes/otp.routes"));
// app.use("/product",ProductRoutes)
// app.use("/cart",CartRoutes)
// app.use("/calories",caloriesRoutes)




app.listen(8800, () => {
  try {
    connection();
    console.log("listening on port 8800");
  } catch (error) {
    console.log(error);
  }
});
