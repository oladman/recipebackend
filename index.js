const express = require("express");
const mongoose = require("mongoose");
const dbConnect = require("./mongodb");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const Recipe = require("./models/model");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "*",
  })
);

mongoose
  .connect(
    "mongodb+srv://oladman:vIRJDYpFPoadswd8@cluster0.vebwjm0.mongodb.net/recipe"
  )
  .then(() => {
    app.listen(8081, () => {
      console.log("connected to MongoDb");
      console.log("Server Running on port 8081");
    });
  })
  .catch((error) => {
    console.log(error);
  });

app.post("/create", async (req, res) => {

  try {
    const recipe = await Recipe.create(req.body);
    res.status(200).json(Recipe);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

app.get("/getRecipe", (req, res) => {
  Recipe.find({}).sort({"createdAt": -1})
    .then(function (recipe) {
      res.json(recipe);
    })
    .catch(function (err) {
      console.log(err);
    });
});




app.get("/gethotone", (req, res) => {
  Recipe.find({"category":"card"}, {"Title" : 1, "Description" : 1, "image" : 1, _id:1}).limit(1).sort({"createdAt": -1})
    .then(function (recipe) {
      res.json(recipe);
    })
    .catch(function (err) {
      console.log(err);
    });
});

app.get("/gethotseven", (req, res) => {
  Recipe.find({"category":"hot"}, {"Title" : 1, "Description" : 1, "image" : 1, _id:1}).limit(7).sort({"createdAt": -1})
    .then(function (recipe) {
      res.json(recipe);
    })
    .catch(function (err) {
      console.log(err);
    });
});



app.get("/getRecipe/:id", (req, res) => {
  const { id } = req.params;
  Recipe.findById(id)
    .then(function (recipe) {
      res.json(recipe);
    })
    .catch(function (err) {
      console.log(err);
    });
});

app.put("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const recipe = await Recipe.findByIdAndUpdate(id, req.body);
    if (!recipe) {
      return res
        .status(404)
        .json({ message: `cannot find any recipe with ID ${id}` });
    }
    res.status(200).json(recipe);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const recipe = await Recipe.findByIdAndDelete(id);
    if (!recipe) {
      return res
        .status(404)
        .json({ message: `cannot find any recipe with ID ${id}` });
    }
    res.status(200).json(recipe);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
