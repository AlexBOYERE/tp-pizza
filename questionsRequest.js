const orderService = require('./orderService');

async function getOrders() {
    return await orderService.getOrders();
}

function calculateTotalAmount(orders) {
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

function calculateLargeOrders(orders) {
    return orders.reduce((total, order) => {
        if (order.size === 'large') {
            return total + order.quantity;
        }
        return total;
    }, 0);
}

function findBestSellingRecipe(orders) {
    // Brouillon : définir une variable pour stocker le nombre de ventes de chaque recette
    const recipeSales = {};
    // Brouillon : boucler sur chaque commande pour incrémenter le nombre de ventes de chaque recette
    orders.forEach(order => {
        const recipe = order.name;
        recipeSales[recipe] = (recipeSales[recipe] || 0) + order.quantity;
    });
    // Brouillon : retourner la recette avec le plus de ventes
    return Object.keys(recipeSales).reduce((a, b) =>
        recipeSales[a] > recipeSales[b] ? a : b
    );
}

function findBestSellingSize(orders) {
    const sizeSales = {};
    orders.forEach(order => {
        const size = order.size;
        sizeSales[size] = (sizeSales[size] || 0) + order.quantity;
    });
    return Object.keys(sizeSales).reduce((a, b) =>
        sizeSales[a] > sizeSales[b] ? a : b
    );
}

function findHighestRevenueRecipe(orders) {
    // Brouillon : définir une variable pour stocker les revenus de chaque recette
    const revenueByRecipe = {};

    // Brouillon : boucler sur chaque commande pour incrémenter les revenus de chaque recette
    orders.forEach((order) => {
        const recipe = order.name;
        const price = order.price;

        // Brouillon : si la recette existe déjà, incrémenter le montant, sinon l'initialiser
        if (revenueByRecipe[recipe]) {
            revenueByRecipe[recipe] += price;
        } else {
            revenueByRecipe[recipe] = price;
        }
    });

    // Brouillon : retourner la recette avec le plus de revenus
    let highestRevenue = 0;
    let highestRevenueRecipe = '';

    // Brouillon : boucler sur les revenus de chaque recette pour trouver le plus élevé
    for (const recipe in revenueByRecipe) {
        if (revenueByRecipe[recipe] > highestRevenue) {
            highestRevenue = revenueByRecipe[recipe];
            highestRevenueRecipe = recipe;
        }
    }

    // Erreur => vide
    return highestRevenueRecipe;
}

module.exports = {
    getOrders,
    calculateTotalAmount,
    calculateTotalPizzasOrdered,
    calculateTotalVeganOrders,
    calculateLargeOrders,
    findBestSellingRecipe,
    findBestSellingSize,
    findHighestRevenueRecipe,
};