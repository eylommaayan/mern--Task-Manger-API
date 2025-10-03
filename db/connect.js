// מייבא את ספריית Mongoose – שכבת ORM ל-MongoDB שמנהלת חיבורים, סכימות ומודלים
const mongoose = require('mongoose');

/**
 * מתחבר למסד הנתונים של MongoDB באמצעות Mongoose.
 * @param {string} uri - מחרוזת החיבור (MongoDB URI), למשל מה-ENV תחת MONGO_URI.
 */
async function connectDB(uri) {
  // ולידציה בסיסית: אם לא הועבר URI – זרוק שגיאה ברורה
  if (!uri) throw new Error('MONGO_URI is not set');

  // מבצע את החיבור בפועל.
  // עם Mongoose v8 אין צורך ב-useNewUrlParser/useUnifiedTopology (ברירת מחדל).
  // dbName לא חובה אם הוגדר ב-URI, אבל מצוין כאן במפורש לשקיפות.
  await mongoose.connect(uri, { dbName: 'TASK-MANAGER' });

  // לוג מאשר חיבור מוצלח, ומדפיס את שם הדאטאבייס המחובר
  console.log('Connected to DB:', mongoose.connection.name);
}

// מייצא את הפונקציה לשימוש בקבצים אחרים (למשל app.js)
module.exports = connectDB;
