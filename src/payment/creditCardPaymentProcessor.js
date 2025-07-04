const PaymentProcessor = require('./paymentProcessor');
const simulatePayment = require('./creditCardPaymentSimulator');

class CreditCardPaymentProcessor extends PaymentProcessor {
  pay(orderData) {
    return simulatePayment();
  }
}
module.exports = CreditCardPaymentProcessor;
