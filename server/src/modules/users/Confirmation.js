const mongoose = require('mongoose');

const confirmationSchema = new mongoose.Schema(
  {
    userId:{
        type:mongoose.SchemaTypes.ObjectId,
        required: true,
    },
    code:{
        type:mongoose.SchemaTypes.Number,
        required:true
    }

  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  }
);

const Confirmation = mongoose.model('Confirmation', confirmationSchema);

module.exports = Confirmation;
