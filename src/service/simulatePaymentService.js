const simulatePayment = require('../payment/creditCardPaymentSimulator');

class SimulatePaymentService {
  simulate() {
    return simulatePayment();
  }
}

module.exports = new SimulatePaymentService();
