const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGODB_URL);

const User = require("./model/userModel");

app.get("/users", async (req, res) => {
  const userData = await User.find({});
  res.json(userData);
});
app.delete("/delete", async (req, res) => {
  console.log(req.body);
  const name = req.body.name;

  try {
    // Await the deletion operation and store the result
    const result = await User.deleteOne({ name });
    // Send a response with the result
    res.json({
      message: "Delete successful",
      deletedCount: result.deletedCount,
    });
  } catch (err) {
    // Handle any errors
    console.error(err);
    res.status(500).json({ message: "Delete failed", error: err });
  }
});

app.post("/insert", (req, res) => {
  console.log(req.body);
  const name = req.body.name;
  const email = req.body.email;
  const userData = {
    name,
    email,
  };
  console.log(name, email);
  console.log("userData", userData);
  User.create(userData);
  res.send(200);
});
app.put("/update", async (req, res) => {
  console.log(req.body);
  const name = req.body.name;
  const email = req.body.email;
  const userData = {
    name,
    email,
  };
  console.log(name, email);

  try {
    const findUser = await User.findOneAndUpdate({ name }, userData, {
      new: true,
    });
    console.log("findUser", findUser);
    res.json(findUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Update failed", error: err });
  }
});
app.put("/update/:name", async (req, res) => {
  console.log(req.params);
  const name = req.params.name;
  const email = req.body.email;
  const userData = {
    name,
    email,
  };
  console.log(name, email);

  try {
    const findUser = await User.findOneAndUpdate({ name }, userData, {
      new: true,
    });
    console.log("findUser", findUser);
    res.json(findUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Update failed", error: err });
  }
});

app.listen(8080, () => {
  console.log("server run");
});
