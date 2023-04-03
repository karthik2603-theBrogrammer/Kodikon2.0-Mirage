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
    pass: "tqdxfqvhywrwvraz",
  },
});
var mailOptions = {
  from: "pes1202100591@pesu.pes.edu",
  to: "karthiknamboori42@gmail.com",
  // to: 'kganeshv12@gmail.com',
  // to: 'ramyamardi2501@gmail.com',
  // to: 'arry8668@gmail.com',
  subject: "Time To Restock!",
  text: "This Mail Is to inform You that your inventory is running short. Consider Restocking!",
};
// Replace the uri string with your MongoDB deployment's connection string.
const uri =
  "mongodb+srv://karthik:karthik@cluster0.ev4b80v.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useUnifiedTopology: true });
app.get("/", async (req, res) => {
  try {
    await client.connect();
    const database = client.db("kodikon_2");
    console.log("Accessed the database successfully");
    const mycollection = database.collection("kodikon-2");
    const doc = {
      title: "Title Of my document",
      content: "Hope this pdf upload gets over by today",
    };
    const result = await mycollection.insertOne(doc);
    console.log(`A document was inserted with the _id: ${result.insertedId}`);
  } catch (e) {
    console.log(e);
  } finally {
    // await client.close(); -- sometimes presence of this closes the db before work is done and hence error comes up
    res.status(200).send("Done and closed the mongo db successfully");
  }
});

// -----
app.get('/cleardb', async (req,res) => {
  try {
    await client.connect();
    const database = client.db("kodikon_2");
    console.log("Deleted the database collection successfully");
    const mycollection = database.collection("kodikon-2");
    mycollection.deleteMany()
    res.status(200).json({status: 'Successfully Cleared the Database collection!'})

  } catch (error) {
    console.log(error)
    res.status(500).json({status: 'Error'})
  }
})
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
      stock: 5,
    });
    const laptop2 = await mycollection.insertOne({
      name: "Laptop2",
      quantity: 0,
      price: 100,
      stock: 5,
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
    //   console.log(req.body);
    const boughtData = req.body;
    // projCollection.insertOne(
    //   {
    //     name: 'Laptop1',
    //     quantity: 0,
    //     price: 100,
    //     stock: 20,
    //     time: Date.now(),
    //   },
    //   (err, msg) => {
    //     if (err) throw err;
    //     console.log('First Added');
    //   }
    // );
    projCollection.find({}).toArray((err, array) => {
      let data = array[array.length - 1];
      const latestStock = data.stock;
      const latestQuantity = data.quantity;
      // console.log(latestStock);
      console.log(data);
      const updatedStock = latestStock - boughtData?.sending;
      // console.log(latestStock - boughtData?.sending);

      let price_new = updatedStock <= 5 ? data?.price * 1.2 : data?.price;
      if (updatedStock <= 5) {
        // transporter.sendMail(mailOptions, function (err, info) {
        //   if (err) {
        //     console.log(err);
        //   } else {
        //     console.log(`Email Sent ${info.response}`);
        //   }
        // });
        transporter.sendMail(mailOptions, function (err, info) {
          if (err) {
            console.log(err);
          } else {
            console.log(`Email Sent ${info.response}`);
          }
        });
      }
    });
    const updatedDB = await mycollection.insertOne({
      name: "Laptop1",
      quantity: boughtData?.sending + latestQuantity,
      price: price_new,
      stock: updatedStock,
      time: Date.now(),
    });
    res.status(200).json({ status: "Updated To Database" });
  } catch (error) {
    console.log(error)
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
