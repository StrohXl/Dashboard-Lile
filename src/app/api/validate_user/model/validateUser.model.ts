import z from "zod";

import { validateUserSchema } from "../validators/validateUser.validator";

export type ValidateUserModel = z.infer<typeof validateUserSchema>;
