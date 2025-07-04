class StockError extends Error {
  constructor(productId) {
    super(`Stock insuficiente para productId ${productId}`);
    this.type = 'STOCK';
    this.productId = productId;
  }
}
class PaymentError extends Error {
  constructor() {
    super('Pago rechazado');
    this.type = 'PAYMENT';
  }
}
class ReservationError extends Error {
  constructor(productId) {
    super(`Reserva de stock fallida para productId ${productId}`);
    this.type = 'RESERVA';
    this.productId = productId;
  }
}
class NotFoundError extends Error {
  constructor() {
    super('Orden no encontrada');
    this.type = 'NOT_FOUND';
  }
}
module.exports = { StockError, PaymentError, ReservationError, NotFoundError };
