export default function calculatePriceKg({
  price,
  weight,
}: {
  price: number;
  weight: number;
}): number {
  const priceKg = (weight * price) / 1000;
  return priceKg;
}
