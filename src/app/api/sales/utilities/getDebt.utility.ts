export function getDebt({
  totalPayments,
  totalPrice,
}: {
  totalPayments: number;
  totalPrice: number;
}): number {
  if (totalPayments < totalPrice) {
    const debt = totalPrice - totalPayments;
    return debt;
  }
  return 0;
}
