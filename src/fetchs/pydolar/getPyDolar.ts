import axios from "axios";

type PyDolar = {
  monitors: {
    usd: {
      price: number;
    };
  };
};

const getPyDollar = async (): Promise<number | undefined> => {
  try {
    const { data }: { data: PyDolar | undefined } = await axios.get(
      "https://pydolarve.org/api/v2/tipo-cambio"
    );
    return data?.monitors.usd.price;
  } catch (error) {
    console.log(error);
  }
};
export default getPyDollar;
