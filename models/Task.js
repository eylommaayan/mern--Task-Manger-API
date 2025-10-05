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
  { timestamps: true } // מוסיף createdAt / updatedAt
);

// TTL: מחיקה אוטומטית 10 דקות אחרי ה-creation
taskSchema.index({ createdAt: 1 }, { expireAfterSeconds: 60 * 10 });

module.exports = mongoose.model('Task', taskSchema);
