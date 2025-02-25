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
};

export default ordersService;
