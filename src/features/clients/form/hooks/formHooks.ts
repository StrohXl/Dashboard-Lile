
import { Client } from "@/app/api/clients/models/client.model";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { UseFormGetValues, UseFormReset } from "react-hook-form";

export default function FormClientHooks({
  reset,
  isDirty,
  getValues,
}: {
  isDirty: boolean;
  reset: UseFormReset<Client>;
  getValues: UseFormGetValues<Client>;
}) {
  const { id } = useParams();
  const [loading, setLoading] = useState<boolean>(true);
  const [client, setClient] = useState<Client>();
  const [disabled, setDisabled] = useState<boolean>(false);
  const router = useRouter();

  async function getClientById(id: number) {
    setLoading(true);
    setDisabled(true);
    try {
      const { data }: { data: Client | undefined } = await axios.get(
        `/api/clients/${id}`
      );
      if (data) {
        setClient(data);
        reset({
          name: data.name,
          last_name: data.last_name,
        });
      }
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  }

  useEffect(() => {
    if (id) {
      getClientById(Number(id));
    } else {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (
      id &&
      client?.name === getValues("name") &&
      client?.last_name === getValues("last_name")
    ) {
      setDisabled(true);
    }
  }, [isDirty]);

  return {
    id: Number(id),
    disabled,
    setDisabled,
    router,
    loading,
  };
}
