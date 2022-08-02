const express = require('express');
const cors = require('cors');

require('dotenv').config()
const jwt = require('jsonwebtoken');

const app = express()
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors())



//all routes
app.use('/', require('./routes/root'))
app.use('/mongodb', require('./routes/mongo'))
app.use('/api/reg', require('./routes/register'))
app.use('/api/login', require('./routes/login'))
app.use('/users', require('./routes/users'))

//workspace routes
app.use('/workspace', require('./routes/workspaces'))

// board routes
app.use('/board', require('./routes/board'))

// card routes
app.use('/card', require('./routes/card'))


app.listen(port, () => {
    console.log('running the server with port ' + port);
})