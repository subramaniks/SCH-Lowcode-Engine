const express = require('express');
const router = require('./router/router.js')
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
 
app.use(bodyParser.json());

app.use(router);

app.listen(3000, ()=>{
    console.log('Server is running in port 3000');
});


