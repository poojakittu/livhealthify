const express = require("express");
const connection = require("./config/db.js");
const cors = require("cors");

const {
  signup,
  login,
  userLoggedIn,
} = require("./controllers/user.controller.js");
// const productRouter = require("./routes/product.routes");
const userRouter = require("./routes/userRouter");
const { WorkOutRoutes } = require("./Routes/Workout.Routes.js");
const { PostRoutes } = require("./Routes/Post.Routes.js");

require("dotenv").config();
const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send({
    message: "welcome",
  });
});
app.use("/api/user", userRouter);
// app.use("/api/products", productRouter);

app.post("/signup", signup);

app.post("/login", login);

app.get("/userLoggedIn", userLoggedIn);
app.use("/workout",WorkOutRoutes)

app.use("/post",PostRoutes)





app.listen(process.env.port, () => {
  try {
    connection();
    console.log("listening on port 8080");
  } catch (error) {
    console.log(error);
  }
});
