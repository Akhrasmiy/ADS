const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    first_name: {
      type: mongoose.SchemaTypes.String,
      required: true,
    },
    last_name: {
      type: mongoose.SchemaTypes.String,
      required: true,
    },
    email: {
      type: mongoose.SchemaTypes.String,
      required: true,
      unique: true,
    },
    username: {
      type: mongoose.SchemaTypes.String,
      required: true,
      unique: true,
    },
    password: {
      type: mongoose.SchemaTypes.String,
      required: true,
    },
    isverified: {
      type: mongoose.SchemaTypes.Boolean,
      default: false,
    },
    email_code: {
      type: mongoose.SchemaTypes.String,
      required: true,
    },
    is_admin: {
      type: mongoose.SchemaTypes.Boolean,
      default: false,
    },
    balance: {
      type: mongoose.SchemaTypes.Number,
      default: 0,
    },
    suggest_people: {
      type: mongoose.SchemaTypes.Number,
      default: 0,
    },
    status: {
      type: mongoose.SchemaTypes.String,
      default: 0,
    },
    status_date:{
      type:mongoose.SchemaTypes.Date,
    }
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
