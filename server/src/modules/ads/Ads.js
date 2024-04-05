const mongoose = require("mongoose");

const adsSchema = new mongoose.Schema(
  {
    name: {
      type: mongoose.SchemaTypes.String,
      required: true,
    },
    link: {
      type: mongoose.SchemaTypes.String,
      required: true,
    },
    address:{
      type: mongoose.SchemaTypes.String,
      required: true,
    },
    how_many_see:{
      type: mongoose.SchemaTypes.Number,
      default:0
    },
    active:{
      type: mongoose.SchemaTypes.Boolean,
      default:true
    }
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

const Ads = mongoose.model("Ads", adsSchema);

module.exports = Ads;
