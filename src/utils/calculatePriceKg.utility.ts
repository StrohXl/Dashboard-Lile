export default function calculatePriceKg({
  price,
  weight,
}: {
  price: number;
  weight: number;
}): number {
  const priceKg = (weight * price);
  return priceKg;
}
