const mongoose = require("mongoose");

const adsvsuserSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.SchemaTypes.String,
      required: true,
    },
    ads_id: {
      type: mongoose.SchemaTypes.String,
      required: true,
    }
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

const Adsvsuser = mongoose.model("Adsvsuser", adsvsuserSchema);

module.exports = Adsvsuser;
