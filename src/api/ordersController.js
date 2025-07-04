// src/api/ordersController.js
const express = require('express');
const orderService = require('../service/orderService');
const router = express.Router();

router.post('/orders', async (req, res) => {
  try {
    const order = await orderService.createOrder(req.body);
    res.status(201).json(order);
  } catch (error) {
    if (error.type === 'STOCK' || error.type === 'RESERVA') {
      res.status(409).json({ productId: error.productId, message: error.message });
    } else if (error.type === 'PAYMENT') {
      res.status(402).json({ message: error.message });
    } else if (error.message === 'Método de pago no permitido' || error.message === 'Cantidad máxima por item es 10' || error.message === 'Payload incompleto') {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  }
});

router.get('/orders/:orderId', (req, res) => {
  try {
    const order = orderService.getOrderById(parseInt(req.params.orderId, 10));
    res.status(200).json(order);
  } catch (error) {
    if (error.type === 'NOT_FOUND') {
      res.status(404).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  }
});

module.exports = router;
