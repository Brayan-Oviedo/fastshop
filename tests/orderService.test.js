const orderService = require('../src/service/orderService');
const inMemoryInventory = require('../src/infra/inMemoryInventory');

describe('OrderService', () => {
  beforeEach(() => {
    inMemoryInventory.reset([
      { productId: 456, stock: 5, unitPrice: 100 },
      { productId: 789, stock: 2, unitPrice: 250 }
    ]);
    orderService.resetOrders();
  });


  test('Crea un pedido exitosamente', async () => {
    const orderData = {
      customerId: 123,
      items: [
        { productId: 456, quantity: 2, price: 100 },
        { productId: 789, quantity: 1, price: 250 }
      ],
      paymentMethod: "CREDIT_CARD"
    };

    const order = await orderService.createOrder(orderData);

    expect(order.status).toBe("PAID");
    expect(order.totalAmount).toBe(450);
    expect(order.items.length).toBe(2);
  });

  test('Falla por stock insuficiente', async () => {
    const orderData = {
      customerId: 123,
      items: [
        { productId: 456, quantity: 6, price: 100 }
      ],
      paymentMethod: "CREDIT_CARD"
    };

    await expect(orderService.createOrder(orderData)).rejects.toThrow(
      "Stock insuficiente para productId 456"
    );
  });

  test('Falla por método de pago no permitido', async () => {
    const orderData = {
      customerId: 123,
      items: [
        { productId: 456, quantity: 2, price: 100 }
      ],
      paymentMethod: "PAYPAL"
    };

    await expect(orderService.createOrder(orderData)).rejects.toThrow(
      "Método de pago no permitido"
    );
  });

  test('Falla por cantidad mayor a 10', async () => {
    const orderData = {
      customerId: 123,
      items: [
        { productId: 456, quantity: 11, price: 100 }
      ],
      paymentMethod: "CREDIT_CARD"
    };

    await expect(orderService.createOrder(orderData)).rejects.toThrow(
      "Cantidad máxima por item es 10"
    );
  });
});
