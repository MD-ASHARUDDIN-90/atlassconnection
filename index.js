const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
app.use(express.json());
console.log("url", process.env.MONGODB_URI);

mongoose.connect(
  "mongodb+srv://asharansari90:eOgUTMs6QNgwJHbN@cluster0.gdnrah8.mongodb.net/?retryWrites=true&w=majority"
);

const User = require("./model/userModel");

app.get("/users", async (req, res) => {
  const userData = await User.find({});
  res.json(userData);
});
app.delete("/users", async (req, res) => {
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

app.listen(8080, () => {
  console.log("server run");
});
