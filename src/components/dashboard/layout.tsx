"use client";

import { usePathname } from "next/navigation";
import { Suspense, useState } from "react";
import { Tooltip } from "react-tooltip";

import SideBarNav from "@/components/dashboard/sideBar";
import { sideBarMenu } from "@/components/dashboard/sideBar/data/sideBarMenu";
import Avatar from "./Avatar";
import SwitchTheme from "./SwitchTheme/SwitchTheme";
import { useContextLayout } from "./hooks/ContextLayout";
import { ResponseData } from "@/models/response/responseData.model";
import { User } from "@/models/api/user/user.model";
import AvatarLoading from "./AvatarLoading";

export default function LayoutDashboard({
  children,
  openSideBar,
  user,
}: {
  children: React.ReactNode;
  openSideBar: boolean;
  user: Promise<ResponseData<User>>;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState<boolean>(openSideBar);
  const [showLogo, setShowLogo] = useState<boolean>(openSideBar);
  const { theme } = useContextLayout();

  return (
    <main
      data-theme={theme}
      className="flex p-6 gap-6 text-gray-800 dark:text-white flex-col md:flex-row min-h-dvh bg-light dark:bg-dark"
    >
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
        <div className="flex items-center justify-end mb-4 gap-4">
          <SwitchTheme />
          <Suspense fallback={<AvatarLoading />}>
            <Avatar user={user} />
          </Suspense>
        </div>
        {sideBarMenu.map((item, index) => {
          if (item.link === pathname) {
            return (
              <h2
                key={index}
                className="text-5xl font-semibold mb-10 text-gray-800 dark:text-white font-open_sans"
              >
                {item.title}
              </h2>
            );
          }
        })}
        {children}
        <Tooltip id="my-tooltip" />
      </div>
    </main>
  );
}
