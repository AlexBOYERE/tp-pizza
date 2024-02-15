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