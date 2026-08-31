import { useCallback, useEffect, useState } from "react";

// A reusable data-fetching hook.
//
// Runs `fetcher` on mount and whenever `fetcher` or `requestId` changes,
// guarding against state updates after unmount / stale responses.
//
// `refetch()` re-runs the fetch without the initial spinner unless
// `{ showLoadingOnRefetch: true }` is provided.
function useFetch(fetcher, options = {}) {
  const { showLoadingOnRefetch = false } = options;

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [requestId, setRequestId] = useState(0);

  useEffect(() => {
    let cancelled = false;

    const execute = async () => {
      const isFirstRun = requestId === 0;

      if (isFirstRun || showLoadingOnRefetch) {
        setLoading(true);
      }

      setError(null);

      try {
        const result = await fetcher();

        if (cancelled) return;

        setData(result);
      } catch (err) {
        if (!cancelled) setError(err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    execute();

    return () => {
      cancelled = true;
    };
  }, [fetcher, requestId, showLoadingOnRefetch]);

  const refetch = useCallback(() => {
    setRequestId((id) => id + 1);
  }, []);

  return { data, loading, error, setData, refetch };
}

export default useFetch;
