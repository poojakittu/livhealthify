const express = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const { authenticate } = require("../middleware/authentication.middleware");
const { AddressModel } = require("../Model/Address.model");
const { ProductModel } = require("../Model/Product.Model");
const { VendorModel } = require("../Model/vendor.model");
const OrderRoutes = express.Router();
const jwt = require("jsonwebtoken");
const { OrderModel } = require("../Model/Order.Model");

OrderRoutes.get("/", authMiddleware, async (req, res) => {
  const payload = req.body;
  try {
    const product = await OrderModel.find({ userId: payload.userId });
    //   console.log(product);
    res.send({ data: product });
  } catch (error) {
    console.log("error", error);
    res.status(500).send({
      error: true,
      msg: "something went wrong",
    });
  }
});

OrderRoutes.get("/totalorder", async (req, res) => {
  try {
    const data = await OrderModel.find();
    res.send({ data ,total:data.length});
  } catch (error) {
    res.status(404).send({ msg: "something went wrong" });
  }
});

OrderRoutes.get("/vendororder", authenticate, async (req, res) => {
  const token = req.headers.authorization;
  const decoded = jwt.verify(token, process.env.key);
  
  try {
    const data = await OrderModel.find();
    const totaldata = [];
    for (let i = 0; i < data.length; i++) {
      const arr = [];
      for (let j = 0; j < data[i].products.length; j++) {
        if (data[i].products[j].vendorId == decoded.vendorId) {
          arr.push({products:data[i].products[j],
                    orderId:data[i]._id,
                    AddressId:data[i].addressId,
                    shippingAddress:data[i].shippingAddress,
                    username:data[i].username,
                    userId:data[i].userId,
                    createdAt:data[i].createdAt});
        }
      }
      if (arr.length > 0) {
        totaldata.push(arr);
      }
    }
    res.send({ data: totaldata, total: totaldata.length });
  } catch (error) {
    res.status(404).send({ msg: "something went wrong" });
  }
});


// OrderRoutes.get("/vendororder", authenticate, async (req, res) => {
//   const token = req.headers.authorization;
//   const decoded = jwt.verify(token, process.env.key);
  
//   try {
//     const data = await OrderModel.find();
//     const totaldata = [];
//     for (let i = 0; i < data.length; i++) {
//       const arr = [];
//       for (let j = 0; j < data[i].products.length; j++) {
//         if (data[i].products[j].vendorId == decoded.vendorId) {
//           arr.push({title:data[i].products[j].title,
//                     productId:data[i].products[j].productId,
//                     image:data[i].products[j].image,
//                     phone:data[i].products[i].phone,
//                     price:data[i].products[j].title,
//                     color:data[i].products[j].color,
//                     size:data[i].products[j].size,
//                     quantity:data[i].products[j].quantity,
//                     status:data[i].products[j].status,
//                     _id:data[i].products[j]._id,
//                     orderId:data[i]._id,
//                     AddressId:data[i].addressId,
//                     shippingAddress:data[i].shippingAddress,
//                     username:data[i].username,
//                     userId:data[i].userId,
//                     createdAt:data[i].createdAt});
//         }
//       }
//       if (arr.length > 0) {
//         totaldata.push(arr);
//       }
//     }
//     res.send({ data: totaldata, total: totaldata.length });
//   } catch (error) {
//     res.status(404).send({ msg: "something went wrong" });
//   }
// });

// OrderRoutes.get("/vendortodayorder", authenticate, async (req, res) => {
//   //     const s = '2023-03-20T11:50:26.404+00:00';
//   //      const [y, m, d, hh, mm, ss, ms] = s.match(/\d+/g);
//   //      const date = new Date(Date.UTC(y, m - 1, d, hh, mm, ss, ms));
//   //      const formatted = date.toLocaleString();
//   // console.log(formatted);

//   const product = await OrderModel.find({ createdAt: new Date() });
//   try {
//     res.send({ product, Total: product.length });
//   } catch (error) {
//     res.status(404).send({ msg: "something went wrong" });
//   }
// });

OrderRoutes.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const product = await ProductModel.findById(id);
    res.send(product);
  } catch (error) {
    res.status(404).send({ msg: "something went wrong" });
  }
});

OrderRoutes.post("/add", authMiddleware, async (req, res) => {
  let data = req.body;
  try {
    let data1 = new OrderModel(data);
    let saved = await data1.save();

    res.send({ msg: "Data Added" });
  } catch (err) {
    res.send({ msg: "could not add Data" });
  }
});

OrderRoutes.patch("/update/:id", authMiddleware, async (req, res) => {
  const user = req.body.userId;
  const Id = req.params.id;
  const payload = req.body;

  const data = await OrderModel.findOne({ _id: Id });
  const data1 = data.userId;
  const a = JSON.stringify(data1);
  const b = JSON.stringify(user);
  try {
    if (a !== b) {
    } else {
      await OrderModel.findByIdAndUpdate({ _id: Id }, payload);
      res.send({ msg: "updated Sucessfully" });
    }
  } catch (err) {
    console.log(err);
    res.send({ err: "Something went wrong" });
  }
});

OrderRoutes.patch("/changestatus/:id", authenticate, async (req, res) => {
  const user = req.body.vendorId;
  // console.log(user)
  const Id = req.params.id;
  const payload = req.body;

  const data = await OrderModel.findOne({ _id: Id });
  const data1 = data.vendorId;
  const a = JSON.stringify(data1);
  const b = JSON.stringify(user);

  try {
    if (a !== b) {
      res.send({ msg: "You are not authorized" });
    } else {
      await OrderModel.findByIdAndUpdate({ _id: Id }, payload);
      res.send({ msg: "updated Sucessfully" });
    }
  } catch (err) {
    console.log(err);
    res.send({ err: "Something went wrong" });
  }
});

OrderRoutes.delete("/delete/:id", authenticate, async (req, res) => {
  const user = req.body.userId;
  const Id = req.params.id;
  const payload = req.body;

  const data = await OrderModel.findOne({ _id: Id });
  const data1 = data.userId;
  const a = JSON.stringify(data1);
  const b = JSON.stringify(user);
  try {
    if (a !== b) {
    } else {
      await OrderModel.findByIdAndDelete({ _id: Id });
      res.send("Deleted the Hotel Data");
    }
  } catch (err) {
    console.log(err);
    res.send({ msg: "Something went wrong" });
  }
});

module.exports = {
  OrderRoutes,
};
