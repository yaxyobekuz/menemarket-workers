import { useState } from "react";

// Ui components
import {
  Dialog,
  DialogTitle,
  DialogHeader,
  DialogContent,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerTitle,
  DrawerFooter,
  DrawerHeader,
  DrawerContent,
  DrawerTrigger,
  DrawerDescription,
} from "@/components/ui/drawer";

// Data
import addresses from "@/data/addresses";

// Hooks
import useMediaQuery from "@/hooks/useMediaQuery";

// Utils
import { extractNumbers, formatDate } from "@/utils";

export function OrderDetailDrawer({ children, data = {} }) {
  const {
    status,
    total_price: price,
    client_mobile: tel,
    product_id: product,
    created_at: timestamp,
    client_name: firstName,
    order_code: orderNumber,
    client_address: address,
    full_address: fullAddress,
  } = data || {};
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const formattedAddress =
    addresses.find(({ value }) => value == address)?.label ||
    address ||
    "Mavjud emas!";

  const ContentBody = ({ className }) => {
    return (
      <div className={`${className} max-h-64 overflow-y-auto scroll-hidden`}>
        <ul className="space-y-1.5 text-[15px]">
          {/* User */}
          <li className="flex gap-3.5">
            <h3 className="font-medium">Foydalanuvchi</h3>
            <p className="text-neutral-500 line-clamp-1">{firstName}</p>
          </li>

          {/* Region */}
          <li className="flex gap-3.5">
            <h3 className="font-medium">Manzil</h3>
            <p className="text-neutral-500 line-clamp-1">{formattedAddress}</p>
          </li>

          {/* Tel */}
          <li className="flex gap-3.5">
            <h3 className="font-medium">Tel raqam</h3>
            <a
              href={`tel:+${extractNumbers(tel)}`}
              className="primary-link text-neutral-500"
            >
              {tel}
            </a>
          </li>

          {/* Price */}
          <li className="flex gap-3.5">
            <h3 className="font-medium">Narxi</h3>
            <p className="text-neutral-500">{price?.toLocaleString()} so'm</p>
          </li>

          {/* Timestamp */}
          <li className="flex gap-3.5">
            <h3 className="font-medium">Sana</h3>
            <p className="text-neutral-500">{formatDate(timestamp)}</p>
          </li>

          {/* Full address */}
          <li className="space-y-0.5">
            <h3 className="font-medium shrink-0">To'liq manzil:</h3>
            <address className="text-neutral-500">{fullAddress}</address>
          </li>

          {/* Product */}
          <li className="space-y-0.5">
            <h3 className="font-medium shrink-0">Mahsulot nomi:</h3>
            <a
              target="_blank"
              className="text-primary-default line-clamp-3"
              href={`https://menemarket.uz/products/product/${product?._id}`}
            >
              {product?.title || "Mahsulot sarlavhasi mavjud emas!"}
            </a>

            {/* Product images */}
            <div className="grid grid-cols-3 gap-4 pt-1">
              {product?.images?.slice(0, 3)?.map((image, index) => (
                <img
                  key={index}
                  width={164}
                  height={219}
                  src={image?.medium}
                  alt="Product image"
                  className="aspect-[3/4] bg-gray-light object-cover rounded xs:rounded-lg"
                />
              ))}
            </div>
          </li>
        </ul>
      </div>
    );
  };

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent className="sm:max-w-xl">
          {/* Header */}
          <DialogHeader>
            <DialogTitle>{orderNumber} - Buyurtma</DialogTitle>
            <DialogDescription>
              Buyurtma haqida ba'tafsil ma'lumotlar
            </DialogDescription>
          </DialogHeader>

          {/* Body */}
          <ContentBody />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent>
        {/* Header */}
        <DrawerHeader className="text-left">
          <DrawerTitle>{orderNumber} - Buyurtma</DrawerTitle>
          <DrawerDescription>
            Buyurtma haqida ba'tafsil ma'lumotlar
          </DrawerDescription>
        </DrawerHeader>

        {/* Body */}
        <ContentBody className="px-4" />

        {/* Footer */}
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <button className="btn-primary h-10">Yopish</button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
