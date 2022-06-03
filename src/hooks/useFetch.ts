import { useState, useEffect } from "react";
import axios from "axios";

const useFetch = (url?: string, headers?: any) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (url) {
      setLoading(true);
      setData(null);
      setError(null);
      const source = axios.CancelToken.source();
      axios
        .get(url, { cancelToken: source.token, headers })
        .then((res) => {
          setLoading(false);
          setData(res.data);
          setError(null);
        })
        .catch((err) => {
          setData(null);
          setLoading(false);
          setError("An error occurred!");
        });
      return () => {
        source.cancel();
      };
    }
  }, [url, headers]);

  return { data, loading, error };
};
export default useFetch;
