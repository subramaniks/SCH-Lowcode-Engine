const express = require('express');

const router = new express.Router();

const getdatafunc = require('../controller/getDataFromColl.js');
const insertdatafunc = require('../controller/insertdatatocoll.js');

// app.get('/',(req,res) =>{
//     res.json('Welcome to sch lowcode world');
// });

//app.get('/',getdatafunc);

//app.get('/getdata',getdatafunc);

router.get('/favicon.ico', (req, res) => {
    res.status(204);
    res.end;
});

router.get('*', getdatafunc);

router.post('*', insertdatafunc);

module.exports = router;

