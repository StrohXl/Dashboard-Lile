import { ChangeEvent, ClipboardEvent } from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";

import { FormSignUpModel } from "@/features/sign-up/models/formSignUp.model";

import InputToken from "../../InputToken";
import { DataFields } from "../models/dataFields.model";

export default function RepeatInputToken({
  onPaste,
  register,
  onChange,
  errors,
}: {
  onPaste: (value: ClipboardEvent<HTMLInputElement>) => void;
  register: UseFormRegister<FormSignUpModel>;
  onChange: (value: {
    position: number;
    event: ChangeEvent<HTMLInputElement>;
  }) => void;
  errors: FieldErrors<FormSignUpModel>;
}) {
  const dataFields: DataFields[] = [
    { name: "token_1", position: 1, error: errors.token_1 },
    { name: "token_2", position: 2, error: errors.token_2 },
    { name: "token_3", position: 3, error: errors.token_3 },
    { name: "token_4", position: 4, error: errors.token_4 },
    { name: "token_5", position: 5, error: errors.token_5 },
    { name: "token_6", position: 6, error: errors.token_6 },
  ];

  return (
    <div className="flex justify-center gap-2 text-gray-800 dark:!text-white">
      {dataFields.map(({ name, position, error }) => {
        return (
          <InputToken
            key={name}
            onPaste={onPaste}
            inputName={name}
            register={register}
            options={{
              onChange: (event) => onChange({ position: position, event }),
              required: true,
            }}
            error={error}
          />
        );
      })}
    </div>
  );
}
