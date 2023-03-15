const express = require("express");
const cors=require("cors")
const { connection } = require("./configs/db");
const { WorkOutRoutes } = require("./Routes/Workout.Routes");
const { PostRoutes } = require("./Routes/Post.Routes");
const {
  signup,
  login,
  userLoggedIn,
} = require("./controllers/user.controller.js");

const userRouter = require("./Routes/userRouter");




require("dotenv").config();

const app = express();

app.use(cors({

  origin:"*"

}));

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome");
});
app.use("/api/user", userRouter);
// app.use("/api/products", productRouter);

app.post("/signup", signup);

app.post("/login", login);

app.get("/userLoggedIn", userLoggedIn);


app.use("/workout",WorkOutRoutes)

app.use("/post",PostRoutes)


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

