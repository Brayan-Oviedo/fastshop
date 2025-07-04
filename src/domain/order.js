class Order {
  constructor(orderId, customerId, items, totalAmount, status) {
    this.orderId = orderId;
    this.customerId = customerId;
    this.items = items;
    this.totalAmount = totalAmount;
    this.status = status;
  }
}
module.exports = Order;
