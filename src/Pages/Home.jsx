import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Home() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/weather_report');

        setWeather(res.data.current_weather);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  return (
    <section className="flex flex-col md:flex-row items-center justify-between px-10 py-16 bg-gray-50 min-h-screen gap-10">
      {/* LEFT SIDE IMAGE */}
      <img
        src="https://st2.depositphotos.com/1518767/5392/i/600/depositphotos_53923403-stock-photo-smiling-doctors-all-standing-together.jpg"
        alt="Doctors"
        className="w-full md:w-[500px] rounded-lg shadow-md"
      />

      {/* RIGHT SIDE CONTENT */}
      <div className="max-w-md mt-8 md:mt-0">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Stay Safe, Stay Healthy</h1>

        <p className="text-gray-600 mb-6 leading-7">
          We provide the best healthcare services with experienced doctors and modern medical facilities for your better
          care.
        </p>

        <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition mb-6">
          Learn More
        </button>

        {/* 🌦️ WEATHER CARD */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-3">Weather Report 🌤️</h2>

          {loading ? (
            <p>Loading weather...</p>
          ) : weather ? (
            <div className="space-y-1">
              <p>
                <b>Temperature:</b> {weather.temperature}°C
              </p>
              <p>
                <b>Wind Speed:</b> {weather.windspeed} km/h
              </p>
              <p>
                <b>Time:</b> {weather.time}
              </p>
            </div>
          ) : (
            <p>No weather data</p>
          )}
        </div>
      </div>
    </section>
  );
}

export default Home;
