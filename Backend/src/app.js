const express = require('express');
const cookie = require('cookie-parser');
const app = express();
const authRouter = require('./routes/auth.routes')

app.use(express.json());
app.use(cookie());

app.use('/api/auth',authRouter)
module.exports = app;