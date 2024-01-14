import { useEffect, useState } from "react";
import { ProductResponse } from "../types";

const useFetchAPI = () => {
  const [data, setData] = useState<ProductResponse[] | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchAPI() {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        if(response.status >= 400) {
          throw new Error("server error");
        }
        const data: unknown = await response.json();
        setData(data as ProductResponse[]);
      } catch(error) {
        if (error instanceof Error) setError(error);
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchAPI();
  }, []);

  return {data, error, isLoading};
}

export default useFetchAPI;
