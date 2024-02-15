const mongoose = require('mongoose');

const DataSchema = new mongoose.Schema({
    name: String,
    size: String,
    price: Number,
    quantity: Number,
    date: Date
});

const DataModel = mongoose.model('Data', DataSchema);

async function getData() {
    try {
        await mongoose.connect('mongodb://localhost:27017/dbpizza', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        const dbData = await DataModel.find();

        await mongoose.disconnect();

        return dbData;
    } catch (error) {
        throw new Error('Erreur lors de la récupération des données : ' + error.message);
    }
}

module.exports = getData;