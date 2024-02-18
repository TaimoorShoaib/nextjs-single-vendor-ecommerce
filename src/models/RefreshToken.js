const mongoose = require("mongoose");

const { Schema } = mongoose;

// Check if the model already exists before defining it
const RefreshToken =
  mongoose.models.RefreshToken ||
  mongoose.model(
    "RefreshToken",
    Schema(
      {
        token: {
          type: String,
          required: true,
        },
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      },
      { timestamps: true }
    ),
    "tokens"
  );

module.exports = RefreshToken;
