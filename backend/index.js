// import { MongoClient } from "mongodb";
const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const { MongoClient, useUnifiedTopology } = require("mongodb");

app.use(express.json());
app.use(cors());

const nodemailer = require("nodemailer");
var transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  requireTLS: true,
  auth: {
    user: "namkarthik2003@gmail.com",
    pass: process.env.PASS,
  },
});
var mailOptions = {
  from: "pes1202100591@pesu.pes.edu",
  to: "karthiknamboori42@gmail.com",
  subject: "Time To Restock!",
  text: "This Mail Is to inform You that your inventory is running short. Consider Restocking!",
};
// Replace the uri string with your MongoDB deployment's connection string.
const uri =
  "mongodb+srv://karthik:karthik@cluster0.ev4b80v.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useUnifiedTopology: true });
app.get("/", async (req, res) => {
  res.json({ msg: "Hey There, WELCOME!", status: 200 });
});

// -----
app.get("/cleardb", async (req, res) => {
  try {
    await client.connect();
    const database = client.db("kodikon_2");
    console.log("Deleted the database collection successfully");
    const mycollection = database.collection("kodikon-2");
    mycollection.deleteMany();
    res
      .status(200)
      .json({ status: "Successfully Cleared the Database collection!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "Error" });
  }
});
// -----
app.get("/make", async (req, res) => {
  try {
    await client.connect();
    const database = client.db("kodikon_2");
    console.log("Accessed the database successfully");
    const mycollection = database.collection("kodikon-2");
    const laptop1 = await mycollection.insertOne({
      name: "Laptop1",
      quantity: 0,
      price: 100,
      stock: 18,
      time: Date.now(),
    });

    console.log("Its good");
    res.status(200).json({ status: "Successful" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: "Error" });
  }
});
app.post("/todatabase", async (req, res) => {
  try {
    const { sending, time } = req.body;
    await client.connect();
    const database = client.db("kodikon_2");
    console.log("Accessed the database successfully");
    const mycollection = database.collection("kodikon-2");
    mycollection.find({}).toArray(async (err, array) => {
      let data = array[array.length - 1];
      const latestStock = data.stock;
      const latestQuantity = data.quantity;
      const updatedStock = latestStock - sending;

      const price_new = updatedStock <= 5 ? data?.price * 1.2 : data?.price;
      const updatedDB = await mycollection.insertOne({
        name: "Laptop1",
        quantity: sending + latestQuantity,
        price: price_new,
        stock: updatedStock,
        time: Date.now(),
      });
      console.log(updatedDB?.insertedCount, updatedDB?.insertedId);
      if (updatedStock <= 5) {
        transporter.sendMail(mailOptions, function (err, info) {
          if (err) {
            console.log(err);
          } else {
            console.log(`Email Sent ${info.response}`);
          }
        });
      }
    });
    res
      .status(200)
      .json({ status: `Updated To Database in ${sending} number` });
  } catch (error) {
    console.log(error);
  }
});
app.get("/chartdata", async (req, res) => {
  try {
    await client.connect();
    const database = client.db("kodikon_2");
    const mycollection = database.collection("kodikon-2");
    mycollection.find({ name: "Laptop1" }).toArray((err, array) => {
      res.status(200).json(array);
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "Error" });
  }
});

app.listen(4000, () => {
  console.log("Listening to Port number 4000");
  console.log("http://localhost:4000");
});
