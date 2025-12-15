require("dotenv").config(); // ✅ MUST be first

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Recipe = require("./models/model");

const app = express(); // ✅ app FIRST

// ✅ Middleware AFTER app is created
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


if (!process.env.MONGO_URI) {
  console.error("❌ MONGO_URI is missing");
  process.exit(1);
}

// ✅ DB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT || 5000, () => {
      console.log("✅ Connected to MongoDB");
      console.log("🚀 Server running");
    });
  })
  .catch((error) => {
    console.error("❌ MongoDB connection error:", error);
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


app.get("/craving", (req, res) => {
  Recipe.find({}).limit(4).sort({"createdAt": -1})
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


app.get("/dessert", (req, res) => {
  Recipe.find({"tag":"Dessert"}, {"Title" : 1, "Description" : 1, "image" : 1, "time" : 1, "tag" : 1, _id:1}).sort({"createdAt": -1})
    .then(function (recipe) {
      res.json(recipe);
    })
    .catch(function (err) {
      console.log(err);
    });
});

app.get("/salad", (req, res) => {
  Recipe.find({"tag":"Salad"}, {"Title" : 1, "Description" : 1, "image" : 1, "time" : 1, "tag" : 1, _id:1}).sort({"createdAt": -1})
    .then(function (recipe) {
      res.json(recipe);
    })
    .catch(function (err) {
      console.log(err);
    });
});

app.get("/soup", (req, res) => {
  Recipe.find({"tag":"Soup"}, {"Title" : 1, "Description" : 1, "image" : 1, "time" : 1, "tag" : 1, _id:1}).sort({"createdAt": -1})
    .then(function (recipe) {
      res.json(recipe);
    })
    .catch(function (err) {
      console.log(err);
    });
});

app.get("/minsmeal", (req, res) => {
  Recipe.find({"tag":"Minsmeal"}, {"Title" : 1, "Description" : 1, "image" : 1, "time" : 1, "tag" : 1, _id:1}).sort({"createdAt": -1})
    .then(function (recipe) {
      res.json(recipe);
    })
    .catch(function (err) {
      console.log(err);
    });
});

app.get("/breakfast", (req, res) => {
  Recipe.find({"tag":"Breakfast"}, {"Title" : 1, "Description" : 1, "image" : 1, "time" : 1, "tag" : 1, _id:1}).sort({"createdAt": -1})
    .then(function (recipe) {
      res.json(recipe);
    })
    .catch(function (err) {
      console.log(err);
    });
});

app.get("/appetizer", (req, res) => {
  Recipe.find({"tag":"Appetizer"}, {"Title" : 1, "Description" : 1, "image" : 1, "time" : 1, "tag" : 1, _id:1}).sort({"createdAt": -1})
    .then(function (recipe) {
      res.json(recipe);
    })
    .catch(function (err) {
      console.log(err);
    });
});

app.get("/maincourse", (req, res) => {
  Recipe.find({"tag":"Maincourse"}, {"Title" : 1, "Description" : 1, "image" : 1, "time" : 1, "tag" : 1, _id:1}).sort({"createdAt": -1})
    .then(function (recipe) {
      res.json(recipe);
    })
    .catch(function (err) {
      console.log(err);
    });
});

app.get("/sides", (req, res) => {
  Recipe.find({"tag":"Sides"}, {"Title" : 1, "Description" : 1, "image" : 1, "time" : 1, "tag" : 1, _id:1}).sort({"createdAt": -1})
    .then(function (recipe) {
      res.json(recipe);
    })
    .catch(function (err) {
      console.log(err);
    });
});