const { MongoClient } = require('mongodb');
const questionsRequest = require('./questionsRequest');

class OrderService {
    constructor(database) {
        this.ordersCollection = database.collection('orders');
    }

    async getOrders() {
        return await this.ordersCollection.find().toArray();
    }

    async getOrdersBySize(size) {
        return await this.ordersCollection.find({size}).toArray();
    }
}

async function main() {
    const client = new MongoClient('mongodb://localhost:27017/', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    try {
        await client.connect();
        console.log('Connected to MongoDB');

        const orderService = new OrderService(client.db('pizzas_orders_db'));

        const allOrders = await orderService.getOrders();
        // console.log('All orders:', allOrders);

        const largeOrders = await orderService.getOrdersBySize('Large');
        // console.log('Orders for Large size:', largeOrders);

        // const question = questionsRequest.caculateTotalAmount(allOrders);
        // const question = questionsRequest.calculateTotalPizzasOrdered(allOrders);
        // const question = questionsRequest.calculateTotalVeganOrders(allOrders);
        // const question = questionsRequest.calculateLargeOrders(allOrders);
        // const question = questionsRequest.findBestSellingRecipe(allOrders);
        // const question = questionsRequest.findBestSellingSize(allOrders);
        const question = questionsRequest.findHighestRevenueRecipe(allOrders);


        console.log('Answer:', question);

    } catch (error) {
        console.error('Error:', error);
    } finally {
        await client.close();
        console.log('Disconnected from MongoDB');
    }
}

main().catch(console.error);