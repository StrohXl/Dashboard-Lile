import { RiDashboardFill } from "react-icons/ri";
import { HiArchiveBox } from "react-icons/hi2";
import { MdLogout } from "react-icons/md";

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
];

export const sideBarMenuSecond = [
  {
    title: "Cerrar Sesión",
    link: "/",
    icon: MdLogout,
  },
];
