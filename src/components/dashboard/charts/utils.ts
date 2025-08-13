import { DataBuyType } from "@/app/api/buys/type";

type DataType = {
  time: string;
  value: number;
};

export const arrayDates = (data: DataBuyType) => {
  const weekDate: DataType[] = [];
  const montDate: DataType[] = [];

  data.data.forEach((item) => {
    const stock = item.list_products.reduce(
      (acumulador, item) => acumulador + item.stock,
      0
    );
    const findWeekData = weekDate.find(
      (itemWeek) => itemWeek.time == item.createdAT.split("T")[0]
    );
    if (findWeekData) {
      findWeekData.value = findWeekData.value + stock;
    } else {
      weekDate.push({
        time: item.createdAT.split("T")[0],
        value: stock,
      });
    }
    const findMontDate = montDate.find(
      (itemMont) => itemMont.time == item.createdAT.split("T")[0]
    );
    if (findMontDate) {
      findMontDate.value = findMontDate.value + stock;
    } else {
      montDate.push({
        time: item.createdAT.split("T")[0],
        value: stock,
      });
    }
  });

  return { weekDate: weekDate.slice(0, 7), montDate: montDate.slice(0, 30) };
};
