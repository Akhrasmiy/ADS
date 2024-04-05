const mongoose = require("mongoose");

const responseSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.SchemaTypes.String,
      required: true,
    },
    card_number: {
      type: mongoose.SchemaTypes.String,
      required: true,
    },
    summa:{
      type: mongoose.SchemaTypes.String,
      required: true,
    },
    is_verified:{
      type: mongoose.SchemaTypes.Boolean,
      default:false
    }
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

const Response = mongoose.model("Response", responseSchema);

module.exports = Response;
