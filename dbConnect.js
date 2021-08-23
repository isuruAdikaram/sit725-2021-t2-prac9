// Database connection

const { MongoClient } = require('mongodb')

const uri = "mongodb+srv://SIT725:g7rPA5zP1991@sit-725-2021-t2-prac4.1mguh.mongodb.net/SIT-725-2021-t2-Prac4?retryWrites=true&w=majority"
const client = new MongoClient(uri, { useNewUrlParser: true })

const createColllection = (collectionName) => {
    client.connect((err, db) => {
        projectCollection = client.db().collection(collectionName);
        if (!err) {
            console.log('MongoDB Connected')
        }
        else {
            console.log("DB Error: ", err);
            process.exit(1);
        }
    })
}

exports.createColllection = createColllection