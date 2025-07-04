const Order = require('../domain/order');

let orders = {};
let orderIdCounter = 1;

class InMemoryOrderRepository {
  save(order) {
    order.orderId = orderIdCounter++;
    orders[order.orderId] = order;
    return order;
  }

  find(orderId) {
    return orders[orderId];
  }

  reset() {
    orders = {};
    orderIdCounter = 1;
  }
}

module.exports = new InMemoryOrderRepository();
