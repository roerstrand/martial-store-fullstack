const {
  getAllProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getCurrentUserProducts,
} = require("../repositories/productRepository");

const getProductsService = async () => {
  return await getAllProducts();
};

const getProductService = async (id) => {
  return await getProduct(id);
};

const getCurrentUserProductsService = async (userId) => {
  return await getCurrentUserProducts(userId);
};

const createProductService = async (productData) => {
  return await createProduct(productData);
};

const updateProductService = async (id, body) => {
  return await updateProduct(id, body);
};

const deleteProductService = async (id) => {
  return await deleteProduct(id);
};

module.exports = {
  getProductsService,
  getProductService,
  createProductService,
  updateProductService,
  deleteProductService,
  getCurrentUserProductsService,
};
