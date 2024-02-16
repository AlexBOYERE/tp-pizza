const { MongoClient } = require('mongodb');

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

function caculateTotalAmount(orders) {
    return orders.reduce((total, order) => total + (order.price * order.quantity), 0);
}

function calculateTotalPizzasOrdered(orders) {
    return orders.reduce((total, order) => total + order.quantity, 0);
}

function calculateTotalVeganOrders(orders) {
    return orders.reduce((total, order) => {
        if (order.name === 'Vegan') {
            return total + order.quantity;
        }
        return total;
    }, 0);
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
        console.log('All orders:', allOrders);

        const largeOrders = await orderService.getOrdersBySize('Large');
        console.log('Orders for Large size:', largeOrders);

        // const question = caculateTotalAmount(allOrders);
        // const question = calculateTotalPizzasOrdered(allOrders);
        const question = calculateTotalVeganOrders(allOrders);
        // const question = filterLargeOrders(allOrders);
        // const question = findBestSellingRecipe(allOrders);
        // const question = findBestSellingSize(allOrders);
        // const question = findHighestRevenueRecipe(allOrders);

        console.log('Answer:', question);

    } catch (error) {
        console.error('Error:', error);
    } finally {
        await client.close();
        console.log('Disconnected from MongoDB');
    }
}

main().catch(console.error);