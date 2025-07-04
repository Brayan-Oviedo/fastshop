const validateOrder = require('../validation/orderValidator');
const Order = require('../domain/order');
const SimulatePaymentService = require('./SimulatePaymentService');
const InventoryService = require('./InventoryService');
const OrderRepository = require('../infra/orderRepository');
const OrderTotalService = require('./orderTotalService');

class CreateOrderService {
  async createOrder(orderData) {
    validateOrder(orderData);

    for (const item of orderData.items) {
      const stock = InventoryService.getStock(item.productId);
      if (stock < item.quantity) {
        const error = new Error(`Stock insuficiente para productId ${item.productId}`);
        error.type = 'STOCK';
        error.productId = item.productId;
        throw error;
      }
    }

    if (!SimulatePaymentService.simulate()) {
      const order = new Order(
        null,
        orderData.customerId,
        orderData.items,
        OrderTotalService.calculate(orderData.items),
        'FAILED'
      );
      OrderRepository.save(order);
      const error = new Error('Pago rechazado');
      error.type = 'PAYMENT';
      throw error;
    }

    // Reservar stock
    for (const item of orderData.items) {
      const ok = InventoryService.decrementStock(item.productId, item.quantity);
      if (!ok) {
        const order = new Order(
          null,
          orderData.customerId,
          orderData.items,
          OrderTotalService.calculate(orderData.items),
          'FAILED'
        );
        OrderRepository.save(order);
        const error = new Error(`Reserva de stock fallida para productId ${item.productId}`);
        error.type = 'RESERVA';
        error.productId = item.productId;
        throw error;
      }
    }

    // Guardar orden exitosa
    const order = new Order(
      null,
      orderData.customerId,
      orderData.items,
      OrderTotalService.calculate(orderData.items),
      'PAID'
    );
    return OrderRepository.save(order);
  }
}

module.exports = new CreateOrderService();
