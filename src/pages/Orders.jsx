import React, { useEffect, useState } from "react";

// Data
import addresses from "@/data/addresses";

// Toaster (For notification)
import { notification } from "@/notification";

// Components
import Icon from "@/components/Icon";
import Tabs from "@/components/Tabs";
import DotsLoader from "@/components/DotsLoader";
import LoadingText from "@/components/LoadingText";
import OrdersTable from "@/components/OrdersTable";

// Services
import ordersService from "@/api/services/ordersService";

// Images
import reloadIcon from "@/assets/images/icons/reload.svg";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { updateOrders } from "@/store/features/ordersSlice";

const Orders = () => {
  const dispatch = useDispatch();
  const [address, setAddress] = useState(1);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isGettingOrder, setIsGettingOrder] = useState(false);
  const allOrders = useSelector((state) => state.orders.data);

  const loadOrders = () => {
    setHasError(false);
    setIsLoading(true);

    ordersService
      .getOrders()
      .then((products) => {
        dispatch(updateOrders(products));
      })
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  };

  const handleGetOrder = () => {
    setIsGettingOrder(true);
    if (isGettingOrder) return;

    ordersService
      .addOrderToOperator({ address })
      .then(({ signed_order: order }) => {
        dispatch(updateOrders([order, ...allOrders]));
      })
      .catch(({ response }) => {
        const { message } = response?.data;
        notification.error(message || "Oqim olishda xatolik");
      })
      .finally(() => setIsGettingOrder(false));
  };

  useEffect(() => {
    if (allOrders?.length === 0) loadOrders();
    else setTimeout(() => setIsLoading(false), 300);
  }, []);

  return (
    <div className="container py-6 space-y-7">
      <h1>Buyurtmalar</h1>

      <div className="flex flex-wrap justify-between gap-5 w-full">
        {/* Nav tabs */}
        <Tabs name="orders" />

        {/* Get new order */}
        <div className="flex flex-col gap-5 w-full xs:w-auto xs:flex-row">
          <select
            name="Addresses"
            disabled={isGettingOrder}
            className="h-11 px-3.5 rounded-xl xs:h-12"
            onChange={(e) => setAddress(e.target.value)}
          >
            {addresses.map(({ label, value }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>

          <button
            onClick={handleGetOrder}
            disabled={isGettingOrder}
            className="btn-primary w-full h-11 rounded-xl xs:h-12 xs:w-60"
          >
            <LoadingText text="Buyurtma olish" loader={isGettingOrder} />
          </button>
        </div>
      </div>

      {/* Orders */}
      {!isLoading && !hasError && allOrders?.length >= 0 && (
        <div className="overflow-hidden rounded-xl">
          <OrdersTable orders={allOrders} />
        </div>
      )}

      {/* Loading animation */}
      {isLoading && !hasError && (
        <DotsLoader
          color="#0085FF"
          className="flex justify-center fixed top-1/2 inset-x-0 w-full"
        />
      )}

      {/* Reload button */}
      {hasError && !isLoading && (
        <div className="flex justify-center fixed top-[calc(50%-20px)] inset-x-0">
          <button
            title="Reload"
            aria-label="Reload"
            onClick={loadOrders}
            className="flex items-center justify-center size-10"
          >
            <Icon src={reloadIcon} alt="Reload icon" />
          </button>
        </div>
      )}
    </div>
  );
};

export default Orders;
