"use client";
import { Tooltip } from "react-tooltip";
import { usePathname } from "next/navigation";
import SideBarNav from "@/components/dashboard/sideBar";
import { sideBarMenu } from "@/components/dashboard/sideBar/data/sideBarMenu";
export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <div
      className="flex p-6 gap-6 "
      style={{ minHeight: "calc(100dvh - 48px)" }}
    >
      <div className="w-full md:w-64">
        <div
          className="fixed w-full md:w-64"
          style={{ height: "calc(100dvh - 48px)" }}
        >
          <SideBarNav />
        </div>
      </div>
      <div style={{ width: "calc(100% - 256px - 24px)" }}>
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
