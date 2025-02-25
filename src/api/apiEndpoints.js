const apiEndpoints = {
  // Auth
  login: "login",
  logout: "logout",
  getUserProfile: "profile",
  verifyOtp: "api/users/verifyOTP",

  // Images
  deleteImage: "files/delete",
  uploadImage: "files/upload/media",

  // Orders
  getOrders: "api/orders/operator",
  createOrder: (id) => `api/orders/${id}`,
  addOrderToOperator: "api/orders/sign_order_to_operator",

  // Products
  getProducts: "api/products",
  getProduct: (id) => `api/products/${id}`,
  getProductComments: (id) => `api/comments/product/${id}`,
};

export default apiEndpoints;
