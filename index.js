const express = require("express");
const cors = require("cors");

const { connection } = require("./configs/db");
const { ProductRoutes } = require("./Routes/product.routes");
const { PostRoutes } = require("./Routes/Post.Routes");
const { caloriesRoutes } = require("./Routes/calories.Routes");
const { workoutRoutes } = require("./Routes/Workout.Routes");
const { dataRoutes } = require("./Routes/place.Routes");
const { WeightRoutes } = require("./Routes/weight.Routes");

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
app.use("/product", ProductRoutes);
app.use("/post", PostRoutes);
app.use("/calories", caloriesRoutes);
app.use("/workout", workoutRoutes);
app.use("/data",dataRoutes)
app.use("/weight",WeightRoutes)

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
