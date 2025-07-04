const CreateOrderService = require('./createOrderService');
const OrderRepository = require('../infra/orderRepository');

class OrderService {
  async createOrder(orderData) {
    return CreateOrderService.createOrder(orderData);
  }

  getOrderById(orderId) {
    const order = OrderRepository.find(orderId);
    if (!order) {
      const error = new Error('Orden no encontrada');
      error.type = 'NOT_FOUND';
      throw error;
    }
    return order;
  }

  resetOrders() {
    OrderRepository.reset();
  }
}

module.exports = new OrderService();
