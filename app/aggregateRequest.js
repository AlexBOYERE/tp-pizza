const MongoClient = require('mongodb').MongoClient;

async function getQuantityByPizzaSize(db) {
    const pipeline = [
        {
            $match: {
                size: 'medium'
            }
        },
        {
            $group: {
                _id: '$name',
                totalQuantity: {$sum: '$quantity'}
            }
        }
    ];

    return await db.collection('orders').aggregate(pipeline).toArray();
}

async function getAveragePizzaQuantity(db) {
    const pipeline = [
        {
            $group: {
                _id: null,
                averageQuantity: {$avg: '$quantity'}
            }
        }
    ];

    const result = await db.collection('orders').aggregate(pipeline).toArray();
    return result[0].averageQuantity;
}

module.exports = {getQuantityByPizzaSize, getAveragePizzaQuantity};