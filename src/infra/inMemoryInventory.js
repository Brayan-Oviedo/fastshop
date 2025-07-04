let inventory = {};

function reset(initialInventory) {
  inventory = {};
  initialInventory.forEach(item => {
    inventory[item.productId] = { ...item };
  });
}

function getStock(productId) {
  return inventory[productId] ? inventory[productId].stock : 0;
}

function decrementStock(productId, quantity) {
  if (!inventory[productId] || inventory[productId].stock < quantity) {
    return false;
  }
  inventory[productId].stock -= quantity;
  return true;
}

function getUnitPrice(productId) {
  return inventory[productId] ? inventory[productId].unitPrice : null;
}

module.exports = {
  reset,
  getStock,
  decrementStock,
  getUnitPrice
};
