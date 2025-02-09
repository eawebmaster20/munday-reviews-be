const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');
const { sequelize } = require('./models');

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use('/auth', require('./routes/auth'));
app.use('/companies', require('./routes/company'));
app.use('/reviews', require('./routes/review'));

// setupSwagger(app);

// // Auth Database
// const authDb = new sqlite3.Database('./db/auth.db', (err) => {
//   if (err) {
//     console.error('Error opening auth database:', err.message);
//   } else {
//     console.log('Connected to auth.db');
//     authDb.run(
//       `CREATE TABLE IF NOT EXISTS users (
//          id INTEGER PRIMARY KEY AUTOINCREMENT,
//          email TEXT UNIQUE,
//          password TEXT,
//          username TEXT
//        )`,
//       (err) => {
//         if (err) {
//           console.error('Error creating users table:', err.message);
//         }
//       }
//     );
//   }
// });


const PORT = process.env.PORT || 5000;
sequelize.sync({ force: false }).then(() => {
  console.log('Database synced');
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});