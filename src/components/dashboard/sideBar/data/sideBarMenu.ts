import { RiDashboardFill } from "react-icons/ri";
import { HiArchiveBox } from "react-icons/hi2";
import { MdLogout } from "react-icons/md";
import { MdShoppingCart } from "react-icons/md";
import { HiUsers } from "react-icons/hi";
export const sideBarMenu = [
  {
    title: "Dashboard",
    link: "/dashboard",
    icon: RiDashboardFill,
  },
  {
    title: "Productos",
    link: "/dashboard/products",
    icon: HiArchiveBox,
  },
  {
    title: "Compras",
    link: "/dashboard/buys",
    icon: MdShoppingCart,
  },
  {
    title: "Clientes",
    link: "/dashboard/clients",
    icon: HiUsers,
  },

];

export const sideBarMenuSecond = [
  {
    title: "Cerrar Sesión",
    link: "/",
    icon: MdLogout,
  },
];
