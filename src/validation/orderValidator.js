function validateOrder(order) {
  if (!order.customerId || !order.items || !order.paymentMethod) {
    throw new Error('Payload incompleto');
  }
  if (!Array.isArray(order.items) || order.items.length === 0) {
    throw new Error('Items no puede estar vacío');
  }
  order.items.forEach(item => {
    if (item.quantity > 10) {
      throw new Error('Cantidad máxima por item es 10');
    }
  });
  if (order.paymentMethod !== 'CREDIT_CARD') {
    throw new Error('Método de pago no permitido');
  }
}
module.exports = validateOrder;
