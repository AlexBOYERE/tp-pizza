const fs = require('fs');
const { MongoClient } = require('mongodb');
const path = require('path');

const url = 'mongodb://localhost:27017';
const dbName = 'pizzas_orders_db';

const folderPath = path.join(__dirname, 'file_json');

async function generateMenuJSON() {
    const client = new MongoClient(url);

    try {
        // Connexion à la base de données
        await client.connect();

        const db = client.db(dbName);
        const collection = db.collection('orders');

        // Brouillon : Obtention des données de la collection "orders"
        const pizzas = await collection.distinct('name');
        const sizes = await collection.distinct('size');
        const menu = {};

        // Brouillon : Parcours des pizzas et des tailles pour récupérer les tarifs associés
        console.log("Pizzas:", pizzas);
        for (const pizza of pizzas) {
            menu[pizza] = {};
            for (const size of sizes) {
                const query = { name: pizza, size: size };
                const result = await collection.findOne(query);
                if (result) {
                    menu[pizza][size] = result.price;
                } else {
                    menu[pizza][size] = null; // Ou une valeur par défaut si nécessaire
                }
            }
        }

        if (!fs.existsSync(folderPath)) {
            fs.mkdirSync(folderPath);
            console.log('Dossier "file_json" créé avec succès');
        }

        const date = new Date();
        const formattedDate = date.toISOString().replace(/:/g, '-').slice(0, 19);

        const jsonContent = JSON.stringify(menu, null, 2);
        fs.writeFileSync('app/file_json/menu_' + formattedDate + '.json', jsonContent);
        console.log('Fichier menu.json généré');
    } catch (error) {
        console.error('Erreur :', error);
    } finally {
        await client.close();
    }
}

module.exports = generateMenuJSON;