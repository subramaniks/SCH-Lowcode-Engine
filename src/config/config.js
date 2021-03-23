const mongoose = require('mongoose');
mongoose.Promise = global.Promise;


// MongoDB Connection String
// For URI Formats visit https://docs.mongodb.com/manual/reference/connection-string.
// Connection URL
const url = 'mongodb://localhost:27017';
 

// Connecting to the database
mongoose.connect(url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database := " + url);    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

mongoose.connection.close()


