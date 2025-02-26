// Config
import api from "../axiosConfig";

// Endpoints
import endpoints from "../apiEndpoints";

const ordersService = {
  getOrders: async () => {
    try {
      return await api.get(endpoints.getOrders);
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

  checkOrder: async (id, data) => {
    try {
      return await api.put(endpoints.checkOrder(id), data);
    } catch (err) {
      throw err;
    }
  },

  cancelOrder: async (id) => {
    try {
      return await api.put(endpoints.cancelOrder(id));
    } catch (err) {
      throw err;
    }
  },
};

export default ordersService;
