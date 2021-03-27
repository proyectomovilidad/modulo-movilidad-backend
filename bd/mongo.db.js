const MongoClient = require('mongodb').MongoClient
let db = null

_connect = async() => {
    try {
        const url = "mongodb://localhost:27017/relext?authSource=admin&retryWrites=true&w=majority"
        //const url = "mongodb+srv://movilidad:movilidad07@cluster0.l4cd6.mongodb.net/relext?retryWrites=true&w=majority"
        console.log(url)
        db = await MongoClient.connect(url, { useUnifiedTopology: true, useNewUrlParser: true, poolSize: 10 })
        return db.db()
    } catch (e) {
        return e
    }
}

getConnection = async() => {
    try {
        if (db == null) {
            db = await _connect()
            console.log('Connected')
        }
        return db
    } catch (e) {
        return e
    }
}

module.exports = getConnection()