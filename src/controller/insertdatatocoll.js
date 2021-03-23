const { MongoClient } = require('mongodb');

var isArray = require('isarray');

async function insertDatatoColl(req, res) {
    let insertion_data = [];

   

    if(isArray(req.body)){
       insertion_data = req.body;
    }else{
       insertion_data.push(req.body);
    }


    console.log(insertion_data)


    let Url = req.originalUrl;
    var data = Url.split('?');


    var db_col_data = data[0].split('/');


    var database = db_col_data[1];
    var collection = db_col_data[2];

    var db_connc_url = `mongodb://localhost:27017/admin`;

    const client = new MongoClient(db_connc_url, { useUnifiedTopology: true });

    try {

        let connection = await client.connect();

        let db = connection.db(database);

        const cursor  = await db.collection(collection).insertMany(insertion_data);

        console.log(cursor);
             
        const result = cursor;

        res.json({
            Status_code : 0,
            Status: "Success",
            data: result
        });

    } catch (e) {
        console.error(e);
        res.json({
            Status_code : 1,
            Status: "failed",
            error: e.message
        });
    } finally {
        await client.close();
    }

}

module.exports = insertDatatoColl; 

