const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.SchemaTypes.String,
      required: true,
    },
    summa:{
      type: mongoose.SchemaTypes.Number,
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

const Payment = mongoose.model("Payment", paymentSchema);

module.exports = Payment;
