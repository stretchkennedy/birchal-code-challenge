import { useState, useEffect, useCallback } from "react";

export type FetchState<T> = {
  data: T
  error?: Error;
  loading: boolean;
  reload: () => Promise<void>;
}

function useFetch<T>(url: string, defaultVal: T): FetchState<T> {
  const [data, setData] = useState<T>(defaultVal);
  const [error, setError] = useState<Error>();
  const [loading, setLoading] = useState<boolean>(false);

  const reload = useCallback(async () => {
    if (loading) {
      return;
    }
    try {
      setLoading(true);
      const res = await fetch(url);
      setData(await res.json());
    } catch (maybeError) {
      const definitelyError = maybeError instanceof Error ? maybeError : new Error("unknown error");
      setError(definitelyError);
    } finally {
      setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    reload();
  }, [reload]);

  return { data, error, loading, reload };
}

export default useFetch;
