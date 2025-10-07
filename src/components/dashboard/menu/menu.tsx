import { ReactNode } from "react";

import { OptionList } from "./models/optionList.model";
import "./css/menu.css";

export default function Menu({
  children,
  optionList,
  open,
  sizeIcon = 20,
  close,
  mouseHandlerLiCloseMenu = true,
  place = "right",
  onClickItem,
}: {
  open: boolean;
  close: (value: boolean) => void;
  children: ReactNode;
  optionList: OptionList[];
  sizeIcon?: number;
  mouseHandlerLiCloseMenu?: boolean;
  place?: "left" | "right";
  onClickItem: (value: string) => void;
}) {
  const functionOnClick = (title: string) => {
    if (mouseHandlerLiCloseMenu) {
      close(false);
    }
    onClickItem(title);
  };

  return (
    <div className="container-menu">
      <div className="container-menu-children">{children}</div>
      <div
        className={`container-menu-list ${
          place == "right" ? "right-0" : "left-0"
        } ${!open && "hidden"} `}
      >
        <ul>
          {optionList.map(({ title, iconEnd, iconStart }, index) => {
            const IconStart = iconStart;
            const IconEnd = iconEnd;

            return (
              <li
                key={index}
                className="!px-4 transition-colors text-gray-700 items-center grid grid-cols-[auto_1fr_auto] gap-2 duration-300 font-roboto hover:bg-primary hover:text-white cursor-pointer py-[6px]"
                onClick={() => functionOnClick(title)}
              >
                {IconStart && <IconStart size={sizeIcon} />}
                <span className="line-clamp-1">{title}</span>
                {IconEnd && <IconEnd size={sizeIcon} />}
              </li>
            );
          })}
        </ul>
      </div>
      <div
        className={`fixed top-0  z-20  left-0 w-full h-full bg-transparent ${
          !open && "hidden"
        }`}
        onClick={() => close(false)}
      ></div>
    </div>
  );
}
