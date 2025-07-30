"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { sideBarMenu, sideBarMenuSecond } from "./data/sideBarMenu";
import axios from "axios";

const SideBarNav = () => {
  const pathname = usePathname();
  const links = pathname.split("/");

  const logoutUser = async () => {
    try {
      await axios.get("http://localhost:3000/api/logout");
      window.location.href = "/";
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-white p-3 h-full rounded-2xl">
      <div className="logo"></div>
      <div className="menu">
        <ul className="flex flex-col gap-6 mt-12">
          {sideBarMenu.map((item, index) => {
            const Icon = item.icon;
            return (
              <li key={index}>
                <Link
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
                  {item.title}
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
                  {item.title}
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
