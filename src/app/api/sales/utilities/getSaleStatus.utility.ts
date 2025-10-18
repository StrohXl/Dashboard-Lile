export function getSaleStatus({
  totalPayments,
  totalPrice,
}: {
  totalPayments: number;
  totalPrice: number;
}): "completed" | "pending" {
  const status = totalPayments != totalPrice ? "pending" : "completed";
  return status;
}
