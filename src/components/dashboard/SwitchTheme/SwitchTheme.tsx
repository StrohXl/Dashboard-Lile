import { FaCloudMoon, FaCloudSun } from "react-icons/fa6";

import { useContextLayout } from "../hooks/ContextLayout";
import switchThemeCookie from "./utils/switchThemeCookie";

export default function SwitchTheme() {
  const { setTheme, theme } = useContextLayout();

  return (
    <div
      className="flex items-center outline-none 
     bg-white dark:bg-gray-800 transition-colors duration-300 shadow-sm rounded-full cursor-pointer  relative"
      onClick={() => {
        switchThemeCookie(theme == "dark" ? "light" : "dark");
        setTheme((value) => (value == "dark" ? "light" : "dark"));
      }}
    >
      <button
        type="button"
        className="hs-dark-mode size-10 cursor-pointer flex items-center justify-center text-yellow-600   duration-300 rounded-full text-sm dark:text-white  "
      >
        <FaCloudSun size={20} />
      </button>
      <button
        type="button"
        className={`hs-dark-mode size-10 cursor-pointer flex items-center bg-transparent dark:text-white duration-300
           transition-colors justify-center rounded-full text-sm text-gray-600`}
      >
        <FaCloudMoon size={20} />
      </button>
      <div
        className={`bg-gray-400/60 dark:bg-gray-700/60 absolute size-10 backdrop-blur-[1px] rounded-full duration-300 transition-all ${theme == "dark" ? "left-0 right-auto " : "left-[50%]"}`}
      ></div>
    </div>
  );
}
