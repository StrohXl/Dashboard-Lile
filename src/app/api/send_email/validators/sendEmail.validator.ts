import { z, ZodError } from "zod";

const emailSchema = z
  .object({
    email: z.email(),
  })
  .strict();

export type SendEmail = z.infer<typeof emailSchema>;

export function SendEmailValidator(body: SendEmail): SendEmail | ZodError {
  try {
    return emailSchema.parse(body);
  } catch (error) {
    if (error instanceof ZodError) return error;
    throw error;
  }
}
