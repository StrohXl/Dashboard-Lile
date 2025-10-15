import { ClipboardEvent } from "react";
import { UseFormSetValue } from "react-hook-form";
import { FormSignUpModel } from "../../../models/formSignUp.model";

export function onPaste({
  event,
  validateEmail,
  setValue,
}: {
  event: ClipboardEvent<HTMLInputElement>;
  validateEmail: (value: string) => void;
  setValue: UseFormSetValue<FormSignUpModel>;
}) {
  event.preventDefault();
  const pastedText = event.clipboardData.getData("text");
  setValue("token_1", pastedText[0]);
  setValue("token_2", pastedText[1]);
  setValue("token_3", pastedText[2]);
  setValue("token_4", pastedText[3]);
  setValue("token_5", pastedText[4]);
  setValue("token_6", pastedText[5]);

  validateEmail(pastedText);
}
