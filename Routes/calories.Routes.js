const express = require("express");
const authMiddleware = require("../middleware/auth.middleware");

const caloriesRoutes = express.Router();
const jwt = require("jsonwebtoken");
const { caloriesModel } = require("../Model/calories");

caloriesRoutes.get("/allcalories", async (req, res) => {
  try {
    const product = await caloriesModel.find();
    console.log(product);
    res.send({ data: product });
  } catch (error) {
    console.log("error", error);
    res.status(500).send({
      error: true,
      msg: "something went wrong",
    });
  }
});

caloriesRoutes.get("/todaycalories", async (req, res) => {
  const x = req.query.q;

  try {
    const product = await caloriesModel.find({ date: x });
    res.send({ data: product, total: product.length });
  } catch (error) {
    console.log("error", error);
    res.status(500).send({
      error: true,
      msg: "something went wrong",
    });
  }
});

caloriesRoutes.post("/add", async (req, res) => {
  let x = new Date();
  let y = JSON.stringify(x);
  let bag = "";
  for (let i = 1; i <= 10; i++) {
    bag += y[i];
  }
  let payload = req.body;
  const date = { date: bag };
  // console.log(payload)
  try {
    let data1 = new caloriesModel(payload);
    // console.log(data1);
    let saved = await data1.save();
    await caloriesModel.findByIdAndUpdate({ _id: saved._id }, date);
    res.send({ msg: "Your item is Added" });
  } catch (err) {
    res.send(err);
  }
});

caloriesRoutes.patch("/update/:id", async (req, res) => {
  const Id = req.params.id;
  const val = req.query.q;
  const foodid = req.query.foodid;

  try {
    const data = await caloriesModel.findById(Id);
    if (val == "breakfast") {
      let sum=0
      let total=0
      data.breakfast.forEach((item) => {
        const x = JSON.stringify(item._id);
        const y = JSON.stringify(foodid);
        if (x == y) {
          item.istrue = "true";
        }
        if(item.istrue=="true"){
          sum+=(item.calories);
        }
        total+=(item.calories);
        
      });
      await data.save();    
      res.send({data:data.breakfast,consumption:sum,total:total});
    }  else if (val == "lunch") {
      let sum=0
      let total=0
      data.lunch.forEach((item) => {
        const x = JSON.stringify(item._id);
        const y = JSON.stringify(foodid);
        if (x == y) {
          item.istrue = "true";
        }
        if(item.istrue=="true"){
          sum+=(item.calories);
        }
        total+=(item.calories);
        
      });
      await data.save();
      res.send({data:data.lunch,consumption:sum,total:total});
    } else if (val == "eveningsnacks") {
      let sum=0
      let total=0
      data.eveningsnacks.forEach((item) => {
        const x = JSON.stringify(item._id);
        const y = JSON.stringify(foodid);
        if (x == y) {
          item.istrue = "true";
        }
        if(item.istrue=="true"){
          sum+=(item.calories);
        }
        total+=(item.calories);
        
      });
      await data.save();
      res.send({data:data.eveningsnacks,consumption:sum,total:total});
    } else if (val == "dinner") {
      let sum=0
      let total=0
      data.dinner.forEach((item) => {
        const x = JSON.stringify(item._id);
        const y = JSON.stringify(foodid);
        if (x == y) {
          item.istrue = "true";
        }
        if(item.istrue=="true"){
          sum+=(item.calories);
        }
        total+=(item.calories);
        
      });
      await data.save();
      res.send({data:data.dinner,consumption:sum,total:total});
    }
    let value=0;
    let total_calories=0
    data.breakfast.forEach((el)=>{
      if(el.istrue=="true"){
        value+=el.calories
      }else{
        total_calories+=el.calories
      }
    })
    data.lunch.forEach((el)=>{
      if(el.istrue=="true"){
        value+=el.calories
      }else{
        total_calories+=el.calories
      }
    })
    data.eveningsnacks.forEach((el)=>{
      if(el.istrue=="true"){
        value+=el.calories
      }else{
        total_calories+=el.calories
      }
    })
    data.dinner.forEach((el)=>{
      if(el.istrue=="true"){
        value+=el.calories
      }else{
        total_calories+=el.calories
      }
    })

    const updateValue={
      Targetcalories:total_calories+value,
      Consumedcalories:value
    }
    await caloriesModel.findByIdAndUpdate({_id:Id},updateValue)
  } catch (err) {
    console.log(err);
    res.send({ err: "Something went wrong" });
  }
});

// caloriesRoutes.delete("/delete/:id", authMiddleware, async (req, res) => {
//   const Id = req.params.id;
//   const token = req.headers.authorization;
//   const decoded = jwt.verify(token, process.env.JWT_SECRET);

//   const data = await CartModel.findOne({ _id: Id });
//   const d = JSON.stringify(data.userId);
//   const e = JSON.stringify(decoded.userId);
//   console.log(d);
//   console.log(e);
//   try {
//     if (d !== e) {
//       res.send({ msg: "You are not authorized" });
//     } else {
//       await CartModel.findByIdAndDelete({ _id: Id });
//       res.send("Deleted your item");
//     }
//   } catch (err) {
//     console.log(err);
//     res.send({ msg: "Something went wrong" });
//   }
// });

module.exports = {
  caloriesRoutes,
};
