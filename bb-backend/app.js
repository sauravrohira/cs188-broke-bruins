const express = require('express');
const sequelize = require('./services/db');
const cors = require('cors')

const app = express();
app.use(express.json())
app.use(cors)
const port = process.env.PORT || "8000";

//Verify DB Connection
async function assertDatabaseConnectionOk() {
    console.log(`Checking database connection...`);
    try {
        await sequelize.authenticate();
        console.log('Database connection OK!');
        
        //uncomment to migrate model changes to db
        await sequelize.sync({force:true})
    } catch (error) {
        console.log('Unable to connect to the database:');
        console.log(error.message);
        process.exit(1);
    }
}
assertDatabaseConnectionOk()

//set up Routes
app.use('/api', require('./routes'))

//Serve Application on desired port
app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
});

module.exports = app;