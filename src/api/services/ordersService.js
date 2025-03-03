// Config
import api from "../axiosConfig";

// Endpoints
import endpoints from "../apiEndpoints";

const ordersService = {
  getOrders: async (isOperator = false) => {
    try {
      return await api.get(endpoints.getOrders(isOperator));
    } catch (err) {
      throw err;
    }
  },

  addOrderToOperator: async (data) => {
    try {
      return await api.put(endpoints.addOrderToOperator, data);
    } catch (err) {
      throw err;
    }
  },

  updateOrderStatus: async (id, status, data) => {
    try {
      return await api.put(endpoints.updateOrderStatus(id, status), data);
    } catch (err) {
      throw err;
    }
  },
};

export default ordersService;
