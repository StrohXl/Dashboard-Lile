import { cookies } from "next/headers";

import LayoutDashboard from "@/components/dashboard/layout";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const openSideBar = cookieStore.get("openSideBar");
  const value = openSideBar
    ? openSideBar.value == "false"
      ? false
      : true
    : true;
  return <LayoutDashboard openSideBar={value}>{children}</LayoutDashboard>;
}
