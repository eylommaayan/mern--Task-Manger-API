// models/Task.js
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'שדה name הוא חובה'],
      trim: true,
      minlength: 2,
      maxlength: [20, 'name יכול להכיל עד 20 תווים בלבד'],
    },
    completed: {
      type: Boolean,
      default: false,
    },
    },
);

module.exports = mongoose.model('Task', taskSchema);
