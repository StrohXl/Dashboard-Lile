"use server";

import { CreateUser } from "@/models/api/user/createUser.model";
import { FormSignUpModel } from "../models/formSignUp.model";
import bcrypt from "bcrypt";
import createData from "@/services/post/createData";

export async function onSubmitSignUp({
  salt,
  body,
}: {
  body: FormSignUpModel;
  salt: number;
}) {
  const passwordHash = await bcrypt.hash(body.confirm_password, salt);

  const newBody: CreateUser = {
    email: body.email,
    name: body.name,
    last_name: body.last_name,
    password: passwordHash,
    token: `${body.token_1}${body.token_2}${body.token_3}${body.token_4}${body.token_5}${body.token_6}`,
  };

  try {
    await createData({ apiUrl: "/users", body: newBody });
  } catch (error) {
    throw error;
  }
}
