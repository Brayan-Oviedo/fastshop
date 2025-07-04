const request = require('supertest');
const app = require('../src/app');
const inMemoryInventory = require('../src/infra/inMemoryInventory');
const orderService = require('../src/service/orderService');

describe('Orders API', () => {
  beforeEach(() => {
    inMemoryInventory.reset([
      { productId: 456, stock: 5, unitPrice: 100 },
      { productId: 789, stock: 2, unitPrice: 250 }
    ]);
    orderService.resetOrders();
  });

  test('POST /api/orders - pedido exitoso', async () => {
    const response = await request(app)
      .post('/api/orders')
      .send({
        customerId: 123,
        items: [
          { productId: 456, quantity: 2, price: 100 },
          { productId: 789, quantity: 1, price: 250 }
        ],
        paymentMethod: "CREDIT_CARD"
      })
      .expect(201);

    expect(response.body.status).toBe("PAID");
    expect(response.body.totalAmount).toBe(450);
  });

  test('POST /api/orders - stock insuficiente', async () => {
    const response = await request(app)
      .post('/api/orders')
      .send({
        customerId: 123,
        items: [
          { productId: 456, quantity: 6, price: 100 }
        ],
        paymentMethod: "CREDIT_CARD"
      })
      .expect(409);

    expect(response.body.message).toMatch(/Stock insuficiente/);
  });

  test('GET /api/orders/:orderId - consulta exitosa', async () => {
    const postResp = await request(app)
      .post('/api/orders')
      .send({
        customerId: 123,
        items: [
          { productId: 456, quantity: 2, price: 100 }
        ],
        paymentMethod: "CREDIT_CARD"
      });

    const orderId = postResp.body.orderId;
    const response = await request(app)
      .get(`/api/orders/${orderId}`)
      .expect(200);

    expect(response.body.orderId).toBe(orderId);
    expect(response.body.status).toBe("PAID");
  });

  test('GET /api/orders/:orderId - orden no encontrada', async () => {
    const response = await request(app)
      .get('/api/orders/9999')
      .expect(404);

    expect(response.body.message).toBe("Orden no encontrada");
  });
});
