import express from "express";
import {
  createOrder,
  createOrderByCustomer,
  getAllOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
  changeOrderStatus,
  generateInvoice,
  getOrderSummary,
  getAllCustomerOrdersSummary,
  getOrdersByCustomerId,
} from "../controllers/orderController.js";
import { authenticate } from "../middlewares/authenticate.js";
import { authorize } from "../middlewares/authorize.js";
import { validate } from "../middlewares/validate.js";
import { orderSchema } from "../utils/validationSchemas.js";

const router = express.Router();

/**
 * @swagger
 * /api/orders/createOrder:
 *   post:
 *     tags:
 *       - Orders
 *     summary: Create a new order (admin/userpannel)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Order'
 *     responses:
 *       201:
 *         description: Order created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *
 * /api/orders/getAllOrders:
 *   get:
 *     tags:
 *       - Orders
 *     summary: Get all orders (admin/userpannel)
 *     responses:
 *       200:
 *         description: List of orders
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 */

router.post(
  "/createOrder",
  authenticate,
  authorize("admin", "userpannel"),
  validate(orderSchema),
  createOrder
);
router.post(
  "/createOrderByCustomer",
  authenticate,
  authorize("customer"),
  validate(orderSchema),
  createOrderByCustomer
);
router.get(
  "/getAllOrders",
  authenticate,
  authorize("admin", "userpannel"),
  getAllOrders
);
router.get(
  "/summary",
  authenticate,
  authorize("admin", "userpannel"),
  getOrderSummary
);
router.get(
  "/customer",
  authenticate,
  authorize("customer"),
  getAllCustomerOrdersSummary
);
router.get(
  "/getOrdersByCustomerId/:id",
  authenticate,
  authorize("admin", "userpannel"),
  getOrdersByCustomerId
);
router.get("/getOrders/:id", authenticate, getOrderById);
router.get("/:id/invoice", authenticate, generateInvoice);
router.patch(
  "/updateOrdersById/:id",
  authenticate,
  authorize("admin", "userpannel"),
  updateOrder
);
router.patch(
  "/updateOrdersStatus/:id/status",
  authenticate,
  authorize("admin", "userpannel"),
  changeOrderStatus
);
router.delete("/orders/:id", authenticate, authorize("admin"), deleteOrder);

export default router;
