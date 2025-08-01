"use client";
import { Tooltip } from "react-tooltip";
import { usePathname } from "next/navigation";
import SideBarNav from "@/components/dashboard/sideBar";
import { sideBarMenu } from "@/components/dashboard/sideBar/data/sideBarMenu";
import { useState } from "react";
export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState<boolean>(true);
  const [showLogo, setShowLogo] = useState<boolean>(true);
  return (
    <div
      className="flex p-6 gap-6 "
      style={{ minHeight: "calc(100dvh - 48px)" }}
    >
      <div
        className={`w-full transition-all duration-300 ${
          open ? "md:w-64" : "md:w-[70px]"
        } `}
      >
        <div
          className={`fixed w-full transition-all duration-300 ${
            open ? "md:w-64" : "md:w-[70px]"
          }`}
          style={{ height: "calc(100dvh - 48px)" }}
        >
          <SideBarNav
            showLogo={showLogo}
            setShowLogo={setShowLogo}
            open={open}
            setOpen={setOpen}
          />
        </div>
      </div>
      <div className="transition-all duration-300" style={{ width: `calc(100% - ${open ? "256px" : "70px"} - 24px)` }}>
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
