const { MongoClient } = require('mongodb');
var empty = require('is-empty');


async function getDatafromDB(req, res) {

    let Url = req.originalUrl;
    var data = Url.split('?');

    var db_col_data = data[0].split('/');

    if (!empty(req.query.filter)) {
        console.log(req.query.filter);
        var filter = JSON.parse(req.query.filter);
        //var filter = req.query.filter;
    } else {
        var filter = {};
    }

    if (!empty(req.query.sort)) {
        var sort = JSON.parse(req.query.sort);
    } else {
        var sort = {};
    }

    if (!empty(req.query.limit)) {
        var limit = JSON.parse(req.query.limit);
    } else {
        var limit = 0;
    }

    var database = db_col_data[1];
    var collection = db_col_data[2];

    var db_connc_url = `mongodb://localhost:27017/admin`;

    const client = new MongoClient(db_connc_url, { useUnifiedTopology: true });

    try {

        let connection = await client.connect();

        let db = connection.db(database);

        const cursor = db.collection(collection).find(filter).sort(sort).limit(limit)

        const results = await cursor.toArray();

        res.json({
            Status_code : 0,
            Status: "Success",
            data: results
        });

    } catch (e) {
        console.error(e);
        res.json({
            Status_code : 1,
            Status: "failed",
            error: e
        });
    } finally {
        await client.close();
    }

}

module.exports = getDatafromDB; 

