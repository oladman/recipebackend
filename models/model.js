const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema(
  {
    Title: {
      type: String,
      required: [true, "Please enter a product name"],
    },

    Description: {
      type: String,
      required: false
    },
    
    
    ingredients: [
      {
        type: String,
        required: true,
      },
    ],

    Body: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: false,
    },
    image: {
      type: String,
      required: false,
    },
  },

  {
    timestamps: true,
  }
);

const Recipe = mongoose.models.Recipe || mongoose.model("Recipe", recipeSchema);

module.exports = mongoose.model("Recipe", recipeSchema);
