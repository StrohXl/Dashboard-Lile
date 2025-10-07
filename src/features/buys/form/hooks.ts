import { useRouter } from "next/navigation";
import { useState } from "react";


export function HookFormBuy() {
  // States
  const [disabled, setDisabled] = useState<boolean>(false);

  const router = useRouter();
  
  return {
    disabled,
    setDisabled,
    router,
  };
}
