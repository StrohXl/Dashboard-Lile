import {useState } from "react";

export function HookFormBuy() {
  // States
  const [disabled, setDisabled] = useState<boolean>(false);
  return {
    disabled,
    setDisabled,
  };
}
