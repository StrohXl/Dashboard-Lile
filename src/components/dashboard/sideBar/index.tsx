"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { sideBarMenu, sideBarMenuSecond } from "./data/sideBarMenu";
import axios from "axios";
import { BsPcDisplayHorizontal } from "react-icons/bs";
import { FaChevronLeft } from "react-icons/fa";

const SideBarNav = ({
  open,
  setOpen,
  showLogo,
  setShowLogo,
}: {
  open: boolean;
  setOpen: (value: boolean) => void;
  showLogo: boolean;
  setShowLogo: (value: boolean) => void;
}) => {
  const pathname = usePathname();
  const links = pathname.split("/");

  const logoutUser = async () => {
    try {
      await axios.get("/api/logout");
      window.location.href = "/";
    } catch (error) {
      console.log(error);
    }
  };

  const openSideBar = () => {
    setOpen(!open);
    if (showLogo) {
      setShowLogo(!showLogo);
    } else {
      setTimeout(() => setShowLogo(!showLogo), 200);
      document.cookie = `openSideBar=false;path=/`;
    }
    document.cookie = `openSideBar=${!open};path=/`;
  };
  const closeSideBar = () => {
    setOpen(false);
    setShowLogo(false);
    document.cookie = `openSideBar=false;path=/`;
  };

  return (
    <div className="bg-white p-3 h-full rounded-2xl">
      <div className="logo  h-10 flex items-center justify-between gap-3 mt-6 px-2">
        {showLogo && (
          <>
            <span className="flex gap-2 items-center absolute  font-roboto text-3xl text-gray-800 font-semibold">
              <BsPcDisplayHorizontal size={40} />
              Lile
            </span>
          </>
        )}

        <button
          onClick={() => openSideBar()}
          className="close-sidebar border-2 relative  ms-auto border-gray-700 text-gray-700 transition-colors duration-300 hover:text-primary hover:border-primary cursor-pointer h-[30px] w-[30px] flex justify-center items-center rounded-full"
        >
          <FaChevronLeft
            size={13}
            className={`transition-transform duration-300 ${
              !open && "rotate-y-180"
            }`}
          />
        </button>
      </div>
      <div className="menu">
        <ul className="flex flex-col gap-6 mt-10">
          {sideBarMenu.map((item, index) => {
            const Icon = item.icon;
            return (
              <li key={index}>
                <Link
                  onClick={() => closeSideBar()}
                  className={`font-open_sans flex items-center gap-4 w-full  font-medium px-2 rounded-md transition-colors duration-300 hover:text-primary-ligth text-[#B2ABAB] text-lg ${
                    links.length >= 3
                      ? item.link.includes(links[2])
                        ? "!text-primary"
                        : ""
                      : pathname == item.link
                      ? "!text-primary"
                      : ""
                  }`}
                  href={item.link}
                >
                  <Icon size={30} />
                  {showLogo && item.title}
                </Link>
              </li>
            );
          })}
          <hr className="my-3 mx-3 text-gray-500" />
          {sideBarMenuSecond.map((item, index) => {
            const Icon = item.icon;
            return (
              <li key={index}>
                <span
                  className={`font-open_sans flex items-center gap-4 w-full  font-medium px-2 rounded-md transition-colors duration-300 cursor-pointer hover:text-primary-ligth text-gray-600 text-lg `}
                  onClick={() => item.link === "/" && logoutUser()}
                >
                  <Icon size={30} />
                  {showLogo && item.title}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
export default SideBarNav;
