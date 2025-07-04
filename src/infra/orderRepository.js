const inMemoryOrderRepository = require('../infra/inMemoryOrderRepository');

class OrderRepository {
  save(order) {
    return inMemoryOrderRepository.save(order);
  }

  find(orderId) {
    return inMemoryOrderRepository.find(orderId);
  }

  reset() {
    inMemoryOrderRepository.reset();
  }
}

module.exports = new OrderRepository();
