const MongoClient = require('mongodb').MongoClient;
const OrderService = require('./OrderService');
const questionsRequest = require('./questionsRequest');
const aggregateRequest = require('./aggregateRequest');
const generateMenuJSON = require('./generateMenuJSON');

async function main() {
    try {
        const url = 'mongodb://localhost:27017';
        const dbName = 'pizzas_orders_db';

        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        console.log('Connected to database:', dbName)

        const orderService = new OrderService(db);

        const allOrders = await orderService.getOrders();

        // const largeOrders = await orderService.getOrdersBySize('large');
        // console.log('Large orders:', largeOrders);

        // TP3
        // const question = questionsRequest.caculateTotalAmount(allOrders);
        // const question = questionsRequest.calculateTotalPizzasOrdered(allOrders);
        // const question = questionsRequest.calculateTotalVeganOrders(allOrders);
        // const question = questionsRequest.calculateLargeOrders(allOrders);
        // const question = questionsRequest.findBestSellingRecipe(allOrders);
        // const question = questionsRequest.findBestSellingSize(allOrders);
        // const question = questionsRequest.findHighestRevenueRecipe(allOrders);
        // console.log('Answer:', question);

        // TP4
        // const aggregate = await aggregateRequest.getQuantityByPizzaSize(db);
        // const aggregate = await aggregateRequest.getAveragePizzaQuantity(db);
        // console.log('Aggregate:', aggregate);

        // TP5
        generateMenuJSON().then(() => {
            console.log('Génération du menu JSON terminée');
        }).catch((error) => {
            console.error('Erreur lors de la génération du menu JSON:', error);
        });

        await client.close();
        console.log('Connection to database closed')
    } catch (error) {
        console.error('Error:', error);
    }
}

main();