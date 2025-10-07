"use client";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Tooltip } from "react-tooltip";


import SideBarNav from "@/components/dashboard/sideBar";
import { sideBarMenu } from "@/components/dashboard/sideBar/data/sideBarMenu";

export default function LayoutDashboard({
  children,
  openSideBar,
}: {
  children: React.ReactNode;
  openSideBar: boolean;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState<boolean>(openSideBar);
  const [showLogo, setShowLogo] = useState<boolean>(openSideBar);
  return (
    <div className="flex p-6 gap-6 flex-col md:flex-row min-h-dvh">
      <div
        className={`w-full h-auto transition-all duration-300 ${
          open ? "md:w-64" : "md:w-[70px]"
        } `}
      >
        <div
          className={`fixed md:h-(--heigth-dynamic) w-full transition-all duration-300 ${
            open ? "md:w-64" : "md:w-[70px]"
          }`}
        >
          <SideBarNav
            showLogo={showLogo}
            setShowLogo={setShowLogo}
            open={open}
            setOpen={setOpen}
          />
        </div>
      </div>
      <div
        className={`transition-all duration-300 w-full ${
          open ? "md:w-(--width-sidebar-open)" : "md:w-(--width-sidebar-close)"
        }`}
      >
        {sideBarMenu.map((item, index) => {
          if (item.link === pathname) {
            return (
              <h2
                key={index}
                className="text-5xl font-semibold mb-10 text-gray-800 font-open_sans"
              >
                {item.title}
              </h2>
            );
          }
        })}
        {children}
        <Tooltip id="my-tooltip" />
      </div>
    </div>
  );
}
