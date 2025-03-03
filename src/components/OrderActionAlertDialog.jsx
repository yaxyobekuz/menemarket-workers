import { useState } from "react";

// UI Components
import {
  AlertDialog,
  AlertDialogTitle,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogDescription,
} from "@/components/ui/alert-dialog";

// Components
import FormInputWrapper from "./FormInputWrapper";
import ordersService from "@/api/services/ordersService";

// Notification
import { notification } from "@/notification";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { updateOrders } from "@/store/features/ordersSlice";

const OrderActionAlertDialog = ({ children, clientName = "", orderId }) => {
  const dispatch = useDispatch();
  const [description, setDescription] = useState("");
  const orders = useSelector((state) => state.orders.data);
  const { status: workerRole } = useSelector((state) => state.user.data);
  const isCourier = workerRole === "courier";
  const isOperator = workerRole === "operator";
  const [status, setStatus] = useState(isOperator ? "check" : "success");

  const handleStatusChange = (e) => {
    const value = e.target.value;

    setStatus(value);
    if (value !== "check") setDescription("");
  };

  const deleteOrder = () => {
    const filtered = orders.filter((order) => order?._id !== orderId);
    dispatch(updateOrders(filtered));
  };

  const handleFetchApi = () => {
    if (!orderId) return notification.error("Buyurtma ID raqami noto'g'ri");

    // Check order
    notification.promise(
      ordersService
        .updateOrderStatus(orderId, status, { full_address: description })
        .then(deleteOrder),
      {
        loading: "Buyurtma holati o'zgartirilmoqda...",
        error: "Buyurtma holatini o'zgartirishda xatolik!",
        success: `Buyurtma holati ${status}ga o'zgartirildi!`,
      }
    );
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>

      {/* Alert dialog content  */}
      <AlertDialogContent>
        {/* Header */}
        <AlertDialogHeader>
          <AlertDialogTitle>Holatni o'zgartirish</AlertDialogTitle>
          <AlertDialogDescription>
            <span className="flex flex-wrap">
              {clientName
                ?.slice(0, 96)
                ?.split("")
                .map((item, index) => (
                  <span
                    key={index}
                    children={item}
                    className={
                      item === " " ? "inline-block w-1.5" : "font-medium"
                    }
                  />
                ))}
              {" buyurtmasining holatini o'zgartirish"
                .split("")
                .map((item, index) => (
                  <span
                    key={index}
                    children={item}
                    className={item === " " ? "inline-block w-1.5" : ""}
                  />
                ))}
            </span>
          </AlertDialogDescription>
        </AlertDialogHeader>

        {/* Body */}
        <div className="group flex flex-col items-center justify-center gap-2 relative overflow-hidden w-full rounded-b-lg">
          {/* Label */}
          <div className="w-full">
            <label htmlFor="status" className="pl-1.5">
              Holat *
            </label>
          </div>

          {/* Select */}
          <select
            id="status"
            name="status"
            defaultValue={status}
            onChange={handleStatusChange}
            className="h-11 px-3 bg-gray-light"
          >
            {isOperator && (
              <>
                <option value="check">Tekshirilgan</option>
                <option value="cancel">Bekor qilingan</option>
              </>
            )}

            {isCourier && (
              <>
                <option value="success">Yetkazilgan</option>
                <option value="return">Qaytarilgan</option>
              </>
            )}
          </select>
        </div>

        {status === "check" && isOperator && (
          <FormInputWrapper
            as="textarea"
            label="Ba'tafsil ma'lumot *"
            placeholder="Manzil, tel raqam va hk"
            onChange={(value) => setDescription(value)}
            className="order-alert-dialog-textarea textarea"
          />
        )}

        {/* Footer */}
        <AlertDialogFooter>
          <AlertDialogCancel>Bekor qilish</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleFetchApi}
            className="btn-primary hover:bg-primary-default/80"
            disabled={status === "check" && description?.length < 10}
          >
            O'zgartirish
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default OrderActionAlertDialog;
