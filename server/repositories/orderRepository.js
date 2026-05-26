const Order = require("../models/orderModel");

const getAllOrders = async () => {
  return await Order.find().populate("products.product_id");
};

const getOrder = async (id) => {
  return await Order.findById(id).populate("products.product_id");
};

const getOrdersByUser = async (userId) => {
  return await Order.find({ user_id: userId }).populate("products.product_id");
};

const createOrder = async (orderData) => {
  return await Order.create(orderData);
};

const updateOrderStatus = async (id, status) => {
  return await Order.findByIdAndUpdate(id, { status }, { new: true });
};

const deleteOrder = async (id) => {
  return await Order.findByIdAndDelete(id);
};

module.exports = {
  getAllOrders,
  getOrder,
  getOrdersByUser,
  createOrder,
  updateOrderStatus,
  deleteOrder,
};
