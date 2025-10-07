import { CreateChangeManager } from "./createChangeManager.model";

export interface ChangeManager extends CreateChangeManager {
  id: number;
  created_at: string;
  updated_at: string
}
