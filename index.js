const express = require('express');
const cookieParser = require('cookie-parser');

const mainRouter = require('./routes/index');

const index = express();

index.use(express.json());
index.use(cookieParser());

index.use('/', mainRouter);

index.listen(process.env.PORT, () => {
  console.log('Server started on port - ', 3000);
});
