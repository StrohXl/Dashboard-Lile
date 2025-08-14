import { UseFieldArrayRemove } from "react-hook-form";

export const removeField = ({
  index,
  remove,
}: {
  index: number;
  remove: UseFieldArrayRemove;
}) => {
  remove(index);
};
