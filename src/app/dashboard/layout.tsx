import getDataById from "@/services/get/byId/getDataById";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

import { User } from "@/models/api/user/user.model";
import { Token } from "@/models/token";

import { ContextLayout } from "@/components/dashboard/hooks/ContextLayout";
import LayoutDashboard from "@/components/dashboard/layout";


export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const openSideBar = cookieStore.get("openSideBar");
  const themeCookie = cookieStore.get("theme");
  const theme: "dark" | "light" =
    themeCookie?.value == "light" ? "light" : "dark";
  const token = cookieStore.get("myToken");
  let data: number | undefined = 0;

  if (token) {
    const key = process.env.JWT_KEY || "epale";
    const { id } = jwt.verify(token.value, key) as Token;
    data = id;
  }

  const user = getDataById<User>({
    apiUrl: "/users",
    id: data,
  });

  const value = openSideBar
    ? openSideBar.value == "false"
      ? false
      : true
    : true;

  return (
    <ContextLayout themeCookie={theme}>
      <LayoutDashboard user={user} openSideBar={value}>
        {children}
      </LayoutDashboard>
    </ContextLayout>
  );
}
