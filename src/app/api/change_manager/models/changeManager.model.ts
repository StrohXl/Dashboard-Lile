import { CreateChangeManager } from "../validators/createChange.validator";

export interface ChangeManager extends CreateChangeManager {
  id: number;
  created_at: string;
  updated_at: string
}
