import { useEffect, useState } from "react";

const useWeather = (lat, lon) => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!lat || !lon) return;

    let isMounted = true;
    setLoading(true);
    setError(null);

    fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch weather");
        }
        return res.json();
      })
      .then((data) => {
        if (isMounted) {
          setWeather(data.current_weather);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err.message);
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [lat, lon]);

  return { weather, loading, error };
};

export default useWeather;
