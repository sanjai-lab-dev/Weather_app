import React, { useEffect, useState } from "react";
import useWeather from "./Data.jsx";

// Helper to map codes to human-readable descriptions
const getWeatherDescription = (code) => {
  if (code === 0) return "Clear Sky";
  if (code <= 3) return "Partly Cloudy";
  if (code >= 51 && code <= 67) return "Drizzle/Rain";
  if (code >= 71 && code <= 82) return "Snow/Showers";
  return "Unknown Conditions";
};

function Front() {
  const [land, setLand] = useState(12.97); 
  const [long, setLong] = useState(77.59);
  
  // Initialize with a fallback image
  const [bgImage, setBgImage] = useState("https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=2070&auto=format&fit=crop");

  const { weather, loading, error } = useWeather(land, long);

  const handleCityChange = (e) => {
    const [lat, lon] = e.target.value.split(",");
    setLand(parseFloat(lat));
    setLong(parseFloat(lon));
  };

  useEffect(() => {
    if (!weather) return;

    // Mapping weather codes to images
    let imageUrl = "";
    const code = weather.weathercode;

    if (code >= 0 && code <= 2) {
      imageUrl = "https://images.unsplash.com/photo-1501973801540-537f08ccae7b?q=80&w=2070&auto=format&fit=crop"; // Clear
    } else if (code === 3) {
      imageUrl = "https://images.unsplash.com/photo-1501630834273-4b5604d2ee31?q=80&w=2070&auto=format&fit=crop"; // Cloudy
    } else if (code >= 51 && code <= 82) {
      imageUrl = "https://images.unsplash.com/photo-1501696461415-6bd6660c6742?q=80&w=2070&auto=format&fit=crop"; // Rain
    } else {
      imageUrl = "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=2070&auto=format&fit=crop"; // Default
    }

    setBgImage(imageUrl);
  }, [weather]);

  return (
    <div
      className="h-screen w-full bg-cover bg-center text-white flex flex-col items-center justify-center transition-all duration-700 ease-in-out"
      style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(${bgImage})` }}
    >
      <h1 className="text-4xl font-extrabold mb-8 drop-shadow-lg">🌤️ Weather App</h1>

      <select
        onChange={handleCityChange}
        className="bg-white/20 backdrop-blur-md border border-white/30 text-white p-3 rounded-lg mb-8 outline-none cursor-pointer hover:bg-white/30 transition-colors"
      >
        <option className="text-black" value="12.97,77.59">Bangalore</option>
        <option className="text-black" value="13.08,80.27">Chennai</option>
        <option className="text-black" value="28.61,77.20">Delhi</option>
        <option className="text-black" value="19.07,72.87">Mumbai</option>
        <option className="text-black" value="2.57,88.36">Kolkata</option>
      </select>

      {loading && <div className="animate-pulse">Fetching sky data...</div>}
      {error && <div className="text-red-300 bg-red-900/50 p-4 rounded">Failed to load weather.</div>}

      {!loading && weather && (
        <div className="bg-black/40 backdrop-blur-xl p-8 rounded-2xl text-center border border-white/10 shadow-2xl">
          <h2 className="text-xl font-semibold mb-2">{getWeatherDescription(weather.weathercode)}</h2>
          <div className="text-6xl font-bold mb-4">{weather.temperature}°C</div>
          <div className="flex gap-4 justify-center text-sm opacity-90">
            <span>💨 {weather.windspeed} km/h</span>
            <span>📍 {land}, {long}</span>
            <span>{weather.time}</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default Front;