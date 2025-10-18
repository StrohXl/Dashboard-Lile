import { ConfirmToken } from "@/documents/emails/confirmToken";
import { customAlphabet } from "nanoid";
import { NextResponse } from "next/server";
import * as nodemailer from "nodemailer";

import { SendEmail } from "../validators/sendEmail.validator";
import { createUnverifiedUser } from "./createUnverifiedUser.service";

export async function confirmEmail({ body }: { body: SendEmail }) {
  const alphabet =
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

  const genereateToken = customAlphabet(alphabet, 6);
  const token: string = genereateToken();

  const config = {
    host: "smtp.gmail.com",
    port: 587,
    auth: {
      user: process.env.EMAIL ?? "",
      pass: process.env.EMAIL_PASS ?? "",
    },
  };
  const emailData = {
    from: "dashboardlile@gmail.com",
    to: body.email,
    subject: "Confirmar correo",
    html: ConfirmToken(token),
  };
  const transport = nodemailer.createTransport(config);

  try {
    await transport.sendMail(emailData);

    // Create Unverified User
    await createUnverifiedUser({ body: { email: body.email, token } });

    return NextResponse.json({ message: "Se envío un correo de verificación a su email", data: token });
  } catch (error) {
    console.error(error);
    return NextResponse.json("Error", { status: 500 });
  }
}
