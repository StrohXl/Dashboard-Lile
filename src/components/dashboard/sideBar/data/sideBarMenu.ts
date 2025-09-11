import { RiDashboardFill } from "react-icons/ri";
import { HiArchiveBox } from "react-icons/hi2";
import { MdLogout } from "react-icons/md";
import { MdShoppingCart } from "react-icons/md";
import { HiUsers } from "react-icons/hi";
import { FaCashRegister } from "react-icons/fa6";
import { MdOutlinePayments } from "react-icons/md";
import { MdCurrencyExchange } from "react-icons/md";

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
  {
    title: "Ventas",
    link: "/dashboard/sales",
    icon: FaCashRegister,
  },
  {
    title: "Pagos",
    link: "/dashboard/payments",
    icon: MdOutlinePayments,
  },
  {
    title: "Cambios",
    link: "/dashboard/change_manager",
    icon: MdCurrencyExchange,
  },
];

export const sideBarMenuSecond = [
  {
    title: "Cerrar Sesión",
    link: "/",
    icon: MdLogout,
  },
];
