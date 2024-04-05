const mongoose = require("mongoose");

const responseStatusSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.SchemaTypes.String,
      required: true,
    },
    address:{
        type:mongoose.SchemaTypes.String,
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

const ResponseStatus = mongoose.model("ResponseStatus", responseStatusSchema);

module.exports = ResponseStatus;
