const express = require("express");
const tokenValidator = require("../middleware/validateTokenHandler");
const {
  getAllOrders,
  getOrder,
  getMyOrders,
  createOrder,
  updateOrderStatus,
  deleteOrder,
} = require("../controllers/orderController");

const router = express.Router();

router.route("/").get(tokenValidator, getAllOrders).post(tokenValidator, createOrder);

router.get("/me", tokenValidator, getMyOrders);

router.route("/:id").get(tokenValidator, getOrder).delete(tokenValidator, deleteOrder);

router.patch("/:id/status", tokenValidator, updateOrderStatus);

module.exports = router;
