const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./server/database/connectDB');

dotenv.config({path: 'config.env'});
const PORT = process.env.PORT || 8080;
connectDB();

const app = express();

app.use(morgan('common'));
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use('/', require('./server/routes/router'));

app.listen(PORT, ()=>{console.log(`server is running on http://localhost:${PORT}`)});