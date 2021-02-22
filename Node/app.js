const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const userRoute = require('./routs/userRoute');
const historyRoute = require('./routs/historyRoute');
const cors = require('cors');
dotenv.config();
app.use(bodyParser.json());

const corsOptions = { origin: 'http://localhost:3001', optionsSuccessStatus: 200 }
app.use(cors(corsOptions));

mongoose.connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
})

mongoose.connection.on('connected', () => {
    console.log("mongoDB connected!");
})

app.listen(3000, () => {
    console.log("listen in port 3000");
})

app.use('/user', userRoute);
app.use('/history', historyRoute);

module.exports = app;
