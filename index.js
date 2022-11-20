import express from 'express';
import cookieParser from 'cookie-parser'
import mainRouter from './routes/index.js'
import db from './db/index.js'

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use('/api', mainRouter);

app.listen(3000, async () => {
  try {
    await db.authenticate();
    await db.sync();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
  console.log('Server started on port - ', 3000);
});
