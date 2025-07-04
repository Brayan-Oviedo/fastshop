const inMemoryInventory = require('../infra/inMemoryInventory');

class InventoryService {
  getStock(productId) {
    return inMemoryInventory.getStock(productId);
  }

  decrementStock(productId, quantity) {
    return inMemoryInventory.decrementStock(productId, quantity);
  }
}

module.exports = new InventoryService();
