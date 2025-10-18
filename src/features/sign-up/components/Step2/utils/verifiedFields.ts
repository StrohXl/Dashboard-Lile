import { UseFormGetValues, UseFormSetError } from "react-hook-form";

import { FormSignUpModel } from "@/features/sign-up/models/formSignUp.model";

export function verifiedFields({
  getValues,
  setError,
}: {
  getValues: UseFormGetValues<FormSignUpModel>;
  setError: UseFormSetError<FormSignUpModel>;
}): boolean {
  const fields: {
    name: "token_1" | "token_2" | "token_3" | "token_4" | "token_5" | "token_6";
    value: string;
  }[] = [
    {
      name: "token_1",
      value: getValues("token_1"),
    },
    {
      name: "token_2",
      value: getValues("token_2"),
    },
    {
      name: "token_3",
      value: getValues("token_3"),
    },
    {
      name: "token_4",
      value: getValues("token_4"),
    },
    {
      name: "token_5",
      value: getValues("token_5"),
    },
    {
      name: "token_6",
      value: getValues("token_6"),
    },
  ];
  const value = fields.map((item) => {
    if (item.value == "") {
      setError(item.name, { type: "required" });
      return false;
    } else {
      return true;
    }
  });
  return !value.includes(false);
}
