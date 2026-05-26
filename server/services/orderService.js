const {
  getAllOrders,
  getOrder,
  getOrdersByUser,
  createOrder,
  updateOrderStatus,
  deleteOrder,
} = require("../repositories/orderRepository");

const getAllOrdersService = async () => {
  return await getAllOrders();
};

const getOrderService = async (id) => {
  return await getOrder(id);
};

const getOrdersByUserService = async (userId) => {
  return await getOrdersByUser(userId);
};

const createOrderService = async (orderData) => {
  return await createOrder(orderData);
};

const updateOrderStatusService = async (id, status) => {
  return await updateOrderStatus(id, status);
};

const deleteOrderService = async (id) => {
  return await deleteOrder(id);
};

module.exports = {
  getAllOrdersService,
  getOrderService,
  getOrdersByUserService,
  createOrderService,
  updateOrderStatusService,
  deleteOrderService,
};
