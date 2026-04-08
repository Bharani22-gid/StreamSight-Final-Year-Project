// import { useEffect, useState, useCallback } from "react";

// const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

// export function useMetrics(range = "1h") {
//   const [history, setHistory] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const fetchHistory = useCallback(async () => {
//     try {
//       const res = await fetch(`${API_URL}/api/metrics/history?range=${range}`);
//       if (!res.ok) throw new Error("Failed to fetch metrics history");
//       const data = await res.json();
//       setHistory(data);
//       setError(null);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   }, [range]);

//   useEffect(() => {
//     fetchHistory();
//     const interval = setInterval(fetchHistory, 30000);
//     return () => clearInterval(interval);
//   }, [fetchHistory]);

//   return { history, loading, error };
// }



// frontend/dashboard/src/hooks/useMetrics.js — FIXED
import { useEffect, useState, useCallback, useRef } from "react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

export function useMetrics(range = "1h") {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);
  const prevRange = useRef(range);

  const fetchHistory = useCallback(async () => {
    try {
      // ✅ Cache-bust with timestamp → prevents 304 "Not Modified" returning stale empty data
      const bust = Date.now();
      const res = await fetch(
        `${API_URL}/api/metrics/history?range=${range}&_=${bust}`,
        {
          headers: {
            // Tell browser + server: never serve from cache
            "Cache-Control": "no-cache",
            "Pragma": "no-cache",
          },
        }
      );

      if (!res.ok) throw new Error(`HTTP ${res.status} — Failed to fetch metrics history`);

      const data = await res.json();

      if (!Array.isArray(data)) {
        throw new Error("Unexpected response format from /api/metrics/history");
      }

      setHistory(data);
      setError(null);
    } catch (err) {
      console.error("[useMetrics]", err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [range]);

  useEffect(() => {
    // ✅ Clear data immediately when range changes so old chart data doesn't flash
    if (prevRange.current !== range) {
      setHistory([]);
      setLoading(true);
      prevRange.current = range;
    }

    fetchHistory();

    // Refresh every 15 seconds (was 30s — faster so charts feel live)
    const interval = setInterval(fetchHistory, 15000);
    return () => clearInterval(interval);
  }, [fetchHistory, range]);

  return { history, loading, error };
}
