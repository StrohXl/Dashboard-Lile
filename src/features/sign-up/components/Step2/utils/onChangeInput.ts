import { ChangeEvent } from "react";
import { UseFormSetFocus, UseFormSetValue } from "react-hook-form";
import { FormSignUpModel } from "../../../models/formSignUp.model";

export function onChangeInput({
  position,
  event,
  setValue,
}: {
  position: number;
  event: ChangeEvent<HTMLInputElement>;
  setValue: UseFormSetValue<FormSignUpModel>;
  setFocus: UseFormSetFocus<FormSignUpModel>;
}) {
  let value = event.target.value;
  if (value.length == 2) {
    value = value[1];
  }
  if (position == 1) {
    setValue("token_1", value);
  }
  if (position == 2) {
    setValue("token_2", value);
  }
  if (position == 3) {
    setValue("token_3", value);
  }
  if (position == 4) {
    setValue("token_4", value);
  }
  if (position == 5) {
    setValue("token_5", value);
  }
  if (position == 6) {
    setValue("token_6", value);
  }
}
