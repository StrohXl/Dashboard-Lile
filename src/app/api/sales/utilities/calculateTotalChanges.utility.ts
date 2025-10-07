import { UpdateChangeManager } from "@/models/change_manager";

export function calculateTotalChanges({
  dollar,
  changes,
}: {
  changes: UpdateChangeManager[] | undefined;
  dollar: number;
}): number {
  if (changes) {
    const priceTotalChanges = changes.reduce(
      (accumulator, item) =>
        accumulator +
        (item.change_method == "divisa"
          ? Number(item.change_amount)
          : Number(item.change_amount) / dollar),
      0
    );
    return priceTotalChanges;
  }
  return 0;
}
