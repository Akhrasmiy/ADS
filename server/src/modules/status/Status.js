const mongoose = require("mongoose");

const statusSchema = new mongoose.Schema(
  {
    name: {
      type: mongoose.SchemaTypes.String,
      required: true,
    },
    price: {
      type: mongoose.SchemaTypes.String,
      required: true,
    },
    ads_pay: {
      type: mongoose.SchemaTypes.String,
      required: true,
    },
    how_many_ads: {
      type: mongoose.SchemaTypes.String,
      required: true,
    },is_deleted:{
      type: mongoose.SchemaTypes.Boolean,
      default: false,
    }
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

const Status = mongoose.model("Status", statusSchema);

module.exports = Status;
