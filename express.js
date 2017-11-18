const express = require('express');
const app = express();
app.express = express;

app.use(express.static('client/build'))

app.use('/static', express.static('client/build/static'))


module.exports = app;
