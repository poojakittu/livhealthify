const express = require("express");
const connection = require("./config/db.js");
const cors = require("cors");


 
const { ProductRoutes } = require("./routes/product.routes");
const { CartRoutes } = require("./routes/Cart.Routes.js");
const { caloriesRoutes } = require("./routes/calories.Routes.js");


const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send({
    message: "welcome",
  });
});

app.use("/otp", require("./routes/otp.routes"));
app.use("/product",ProductRoutes)
app.use("/cart",CartRoutes)
app.use("/calories",caloriesRoutes)




app.listen(8000, () => {
  try {
    connection();
    console.log("listening on port 8000");
  } catch (error) {
    console.log(error);
  }
});
