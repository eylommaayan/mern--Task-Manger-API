// טוען את משתני הסביבה מקובץ .env לתוך process.env (לפני כל שימוש בהם)
require('dotenv').config();

// מייבא את ספריית Express לבניית שרת HTTP וראוטינג
const express = require('express');

// מייבא את פונקציית החיבור למסד הנתונים (MongoDB דרך Mongoose) מתוך ./db/connect
const connectDB = require('./db/connect');

// יוצר מופע של אפליקציית Express – האובייקט המרכזי שמנהל Middleware ונתיבים
const app = express();

// Middleware מובנה של Express: מפרש בקשות שמגיעות עם JSON ומציב אותן ב-req.body
app.use(express.json());

// מגדיר ראוט GET בסיסי לנתיב השורש '/' שמחזיר מחרוזת קצרה לבדיקה מהירה
app.get('/', (req, res) => res.send('Task Manager App'));

// מחבר/מרכיב Router חיצוני לכל הכתובות שמתחילות ב-/api/v1/tasks
// כל נתיב שמוגדר בקובץ ./routes/task ייקבל את הקידומת הזו
app.use('/api/v1/tasks', require('./routes/task'));

// קובע את הפורט שעליו השרת יאזין: קודם מנסה מהסביבה (PORT), אחרת 3000 לברירת מחדל
const port = process.env.PORT || 3000;

// IIFE אסינכרונית: מבצעת תחילה התחברות למסד ואז מפעילה את השרת להאזנה
(async () => {
  try {
    // מתחבר למסד הנתונים בעזרת URI שמוגדר במשתני הסביבה (MONGO_URI בקובץ .env)
    await connectDB(process.env.MONGO_URI);

    // אם ההתחברות הצליחה – מפעיל את השרת ומדפיס לאיזה פורט מאזינים
    app.listen(port, () => console.log(`Server running on port ${port}`));
  } catch (err) {
    // במקרה של כישלון חיבור למסד – מדפיס את השגיאה וסוגר את התהליך עם קוד יציאה 1
    console.error('DB connection failed:', err.message);
    process.exit(1);
  }
})();
