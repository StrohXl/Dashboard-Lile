import { UpdateClient } from "@/models/api/client/updateClient.model";

import { createClientSchema } from "./createClient.validator";

export default function updateClientValidator(body: UpdateClient) {
  try {
    const valid = createClientSchema.parse(body);
    return valid;
  } catch (error) {
    console.error(error);
    return error;
  }
}
