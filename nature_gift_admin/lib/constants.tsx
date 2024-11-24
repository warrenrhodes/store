import {
  Image as LucideImage,
  LayoutDashboard,
  Shapes,
  ShoppingBag,
  Tag,
  UsersRound,
  Gift,
  Stars,
} from "lucide-react";

export const navLinks = [
  {
    url: "/",
    icon: <LayoutDashboard />,
    label: "Dashboard",
  },
  {
    url: "/categories",
    icon: <Shapes />,
    label: "Categories",
  },
  {
    url: "/products",
    icon: <Tag />,
    label: "Products",
  },
  {
    url: "/promotions",
    icon: <Gift />,
    label: "Promotions",
  },
  {
    url: "/medias",
    icon: <LucideImage />,
    label: "Medias",
  },
  {
    url: "/orders",
    icon: <ShoppingBag />,
    label: "Orders",
  },
  {
    url: "/customers",
    icon: <UsersRound />,
    label: "Customers",
  },
  {
    url: "/reviews",
    icon: <Stars />,
    label: "Reviews",
  },
];
