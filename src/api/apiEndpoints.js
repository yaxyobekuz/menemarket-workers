const apiEndpoints = {
  // Auth
  login: "login",
  logout: "logout",
  getUserProfile: "profile",
  verifyOtp: "api/users/verifyOTP",

  // Images
  deleteImage: "files/delete",
  uploadImage: "files/upload/media",

  // Products
  getProducts: "api/products",
  getProduct: (id) => `api/products/${id}`,
  getProductComments: (id) => `api/comments/product/${id}`,

  // Orders
  createOrder: (id) => `api/orders/${id}`,
  addOrderToOperator: "api/orders/sign_order_to_operator",
  updateOrderStatus: (id, status) => `api/orders/${id}/${status}`,
  getOrders: (isOperator) => "api/orders/" + (isOperator ? "operator" : ""),
};

export default apiEndpoints;
