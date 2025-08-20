import { useRouter } from "next/navigation";
import { useState } from "react";

export default function FormClientHooks() {
  const [disabled, setDisabled] = useState<boolean>(false);
  const router = useRouter()

  return { disabled, setDisabled, router };
}
