const { MongoClient } = require('mongodb');
class Mongostore {
    constructor(kolekcia) {
        this.kolekcia = kolekcia
    }
    async conect(urlForConnect) {
        const client = new MongoClient(urlForConnect ?? 'mongodb://test:test@127.0.0.1/test');
        // Свързваме се със Mongo Сървъра
        await client.connect();

        // Взимаме си базата с която ще работим
        const database = client.db();
        // Взимаме си колекцията с която ще работим
        this.collection = database.collection(this.kolekcia);
    }
    async addKey(key, value) {
        await this.collection.replaceOne({ _id: key }, {
            _id: key,
            ...value
        }, { upsert: true })
    }
    async deleteKey(key) {
        await this.collection.deleteOne({ _id: key });

    }
    async getKey(key) {
        const data = await this.collection.findOne({ _id: key });
        if (!data) {
            return null;
        }
        delete data._id;
        return data;
    }
}
module.exports = {
    Mongostore
}