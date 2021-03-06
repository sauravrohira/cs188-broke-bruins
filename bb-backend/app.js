const express = require('express');
const sequelize = require('./services/db');
const cors = require('cors')
const helmet = require('helmet')
const toobusy = require('toobusy-js');
const port = process.env.PORT || "8000";
require('dotenv').config();


const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet());

//Prevent DoS Attack
app.use(function(req, res, next) {
    if (toobusy()) {
        // log if you see necessary
        res.send(503, "Server Too Busy");
    } else {
    next();
    }
});

async function assertDatabaseConnectionOk() {
    console.log('Checking database connection...');
    try {
        await sequelize.authenticate();
        console.log('Database connection OK!');
        await sequelize.sync({})
    } catch (error) {
        console.log('Unable to connect to the database:');
        console.log(error.message);
        process.exit(1);
    }
}
assertDatabaseConnectionOk()

app.use('/api', require('./routes'))

app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
});

module.exports = app;