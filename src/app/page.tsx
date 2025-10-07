import Image from "next/image";

import FormLogin from "@/features/login/forms/formLogin";

export default function Home() {
  return (
    <main>
      <section className="h-dvh relative flex items-center justify-center">
        <Image
          src={"/21317.jpg"}
          className="-z-1 object-cover "
          fill
          alt="Login"
        />
        <FormLogin />
      </section>
    </main>
  );
}
