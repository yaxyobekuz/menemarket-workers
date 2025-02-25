export default {
  main: [
    {
      path: "/",
      label: "Bosh sahifa",
    },
    {
      path: "/products",
      label: "Mahsulotlar",
    },
    {
      path: "/orders",
      label: "Buyurtmalar",
    },
    {
      path: "/profile",
      label: "Profil",
    },
    {
      path: "/settings",
      label: "Sozlamalar",
    },
  ],

  products: [
    {
      end: true,
      path: "/products",
      label: "Asosiy",
    },
    {
      path: "/products/search",
      label: "Qidirish",
      disabled: true,
    },
  ],

  orders: [
    {
      end: true,
      path: "/orders",
      label: "Asosiy",
    },
  ],

  profile: [
    {
      end: true,
      path: "/profile",
      label: "Asosiy",
    },
    {
      disabled: true,
      path: "/profile/edit",
      label: "Tahrirlash",
    },
  ],

  settings: [
    {
      end: true,
      path: "/settings",
      label: "Asosiy",
    },
  ],
};
