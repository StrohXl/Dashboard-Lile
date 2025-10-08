import { CreateChangeManager } from "./createChangeManager.model";

export interface UpdateChangeManager
  extends Omit<CreateChangeManager, "sale_id"> {
  id: number;
}
