// 1) env
require('dotenv').config();

// 2) imports
const express = require('express');
const path = require('path');
const connectDB = require('./db/connect');
const errorHandlerMiddleware = require('./models/error-handler');

// 3) app init
const app = express();

// 4) static files (אם יש public/index.html זה ישרת את דף הבית)
app.use(express.static(path.join(__dirname, 'public')));

// 5) body parser
app.use(express.json());

// 6) routes
// אם אתה משתמש ב-public לדף הבית, ה-route הזה מיותר.
// אם בכל זאת רוצים טקסט, השאר אותו — אבל אז static לא ישנה את /.
app.get('/', (req, res) => res.send('Task Manager App'));
app.use('/api/v1/tasks', require('./routes/task'));
app.use(errorHandlerMiddleware);
// 7) server
const port = process.env.PORT || 3000;

(async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => console.log(`Server running on port ${port}`));
  } catch (err) {
    console.error('DB connection failed:', err.message);
    process.exit(1);
  }
})();
