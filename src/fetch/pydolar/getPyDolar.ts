import axios from "axios";

type PyDolar = {
  monitors: {
    usd: {
      price: number;
    };
  };
};

const getPyDollarVe = async (): Promise<number | undefined> => {
  try {
    const { data }: { data: PyDolar | undefined } = await axios.get(
      "https://pydolarve.org/api/v2/tipo-cambio"
    );
    return data?.monitors.usd.price;
  } catch (error) {
    console.log(error);
    throw new Error();
  }
};

const getDolarApi = async (): Promise<number | undefined> => {
  try {
    const { data }: { data: { promedio: number } | undefined } =
      await axios.get("https://ve.dolarapi.com/v1/dolares/oficial");
    return data?.promedio;
  } catch (error) {
    console.log(error);
    throw new Error();
  }
};

async function getPyDollar() {
  const dolarApi = (await getDolarApi()) ?? new Error();
  if (dolarApi instanceof Error) {
    const pydollarVe = await getPyDollarVe();
    return pydollarVe;
  }
  return dolarApi;
}

export default getPyDollar;
