const express = require('express');
const sequelize = require('./services/db');
const cors = require('cors')
// const helmet = require('helmet')
const {check} = require('express-validator')


const app = express();
app.use(express.json());
app.use(cors());
// app.use(helmet());
const port = process.env.PORT || "8000";

//escape all input to prevent xss
app.use(function(req, res, next) {
  for (var item in req.body) {
    check(item).escape();
  }
  next();
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