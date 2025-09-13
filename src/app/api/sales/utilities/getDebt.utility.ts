export function getDebt({
  totalPayments,
  totalPrice,
}: {
  totalPayments: number;
  totalPrice: number;
}): number {
  if (totalPayments < totalPrice) {
    const debt = Math.abs(totalPrice - totalPayments);
    return debt;
  }
  return 0;
}
