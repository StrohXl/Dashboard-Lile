import TypeUser from "@/app/api/users/type/typeUser";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";

export async function onSubmitLogin({
  data,
  setError,
  setLoading,
}: {
  data: TypeUser;
  setLoading: (value: boolean) => void;
  setError: (value: string) => void;
}) {
  try {
    setLoading(true);
    await axios.post("/api/login", data);
    setError("");
    toast.success("Iniciando Sesión");
    setTimeout(() => window.location.assign("/dashboard"), 1000);
  } catch (error) {
    console.log(error);
    if (error instanceof AxiosError) {
      setError(error.response?.data.message);
    }
    setLoading(false);
  }
}
