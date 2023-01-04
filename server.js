const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const errorHandler = require('./src/error/error');
const router = require('./src/routes/route');
const path = require('path');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

global.__baseDir = __dirname;
global;
const corsOption = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  exposedHeaders: ['x-auth-token'],
};
app.use(cors(corsOption));

app.use(router);

app.use(errorHandler.converter);
app.use(errorHandler.notFound);
app.use(errorHandler.handler);
dotenv.config();

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
