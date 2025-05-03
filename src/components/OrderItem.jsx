import React from "react";

// Redux
import { useSelector } from "react-redux";

// Data
import addresses from "@/data/addresses";
import orderStatuses from "@/data/orderStatuses";

// Components
import Icon from "./Icon";
import StickyCell from "./StickyCell";
import TruncatedCell from "./TruncatedCell";
import { OrderDetailDrawer } from "./OrderDetailDrawer";
import OrderActionAlertDialog from "./OrderActionAlertDialog";

// Images
import reloadIcon from "../assets/images/icons/double-reload.svg";

// Utils
import { extractNumbers, formatDate, getPercentageBgColor } from "@/utils";

const OrderItem = ({ data = {}, index = 0, isScrolled }) => {
  const {
    status,
    _id: orderId,
    client_mobile: tel,
    product_id: product,
    created_at: timestamp,
    client_name: firstName,
    order_code: orderNumber,
    client_address: address,
  } = data || {};

  const price = product?.price + 30000 || "0";

  const { status: workerRole } = useSelector((state) => state.user.data);
  const isCourier = workerRole === "courier";
  const isOperator = workerRole === "operator";

  const formattedProductId =
    typeof product === "string" ? product : product?._id;

  const formattedAddress =
    addresses.find(({ value }) => value == address)?.label ||
    address ||
    "Mavjud emas!";

  const formattedStatus =
    orderStatuses.find(({ value }) => value == status)?.label || status;

  const statusColor =
    orderStatuses.find(({ value }) => value == status)?.color || "black";

  // Update level
  const getLevel = () => {
    let level = 0;

    const addressNumber = Number(address) || -1;
    const firstNameLength = firstName?.length || 0;
    const telLength = extractNumbers(tel)?.length || 0;

    if (telLength === 12 || telLength === 9) level += 20;
    if (addressNumber > 0 && addressNumber < 15) level += 20;
    if (telLength === 12 && firstNameLength > 4) level += 10;
    if (firstNameLength > 3 && firstNameLength < 24) level += 20;
    if (
      telLength === 12 &&
      firstNameLength > 4 &&
      firstNameLength < 18 &&
      addressNumber > 0 &&
      addressNumber < 15
    ) {
      level += 20;
    }
    if (telLength < 8 || !telLength) level = 0;
    return level;
  };

  const level = getLevel();

  return (
    <tr className="group h-12 bg-neutral-50 even:bg-white">
      {/* Index */}
      <StickyCell children={index} isActive={isScrolled} />

      {/* User */}
      <TruncatedCell trunc="2">{firstName}</TruncatedCell>

      {/* Order Number */}
      {isCourier && (
        <OrderDetailDrawer data={data}>
          <td className="cursor-pointer">{orderNumber}</td>
        </OrderDetailDrawer>
      )}

      {/* Address */}
      <td>
        <address>{formattedAddress}</address>
        <OrderDetailDrawer />
      </td>

      {/* Phone */}
      <td>
        <a href={`tel:+${extractNumbers(tel)}`} className="primary-link">
          {tel}
        </a>
      </td>

      {/* Status */}
      <td style={{ color: statusColor }}>{formattedStatus}</td>

      {/* Product ID */}
      <TruncatedCell trunc="2">
        <a
          target="_blank"
          className="primary-link"
          href={`https://menemarket.netlify.app/products/product/${formattedProductId}`}
        >
          {formattedProductId}
        </a>
      </TruncatedCell>

      {/* Price */}
      <td>{price?.toLocaleString()} so'm</td>

      {/* Date */}
      <td>{formatDate(timestamp)}</td>

      {/* Level */}
      {isOperator && (
        <td>
          <div
            className={`${getPercentageBgColor(
              level
            )} flex items-center justify-center w-11 h-6 m-auto rounded-full text-white text-sm`}
          >
            {level}%
          </div>
        </td>
      )}

      {/* Action */}
      <td>
        <div className="flex justify-center w-full">
          <OrderActionAlertDialog orderId={orderId} clientName={firstName}>
            <button aria-label="Reload" className="btn size-11">
              <Icon
                size={20}
                src={reloadIcon}
                alt="Reload icon"
                className="size-5"
              />
            </button>
          </OrderActionAlertDialog>
        </div>
      </td>
    </tr>
  );
};

export default OrderItem;
