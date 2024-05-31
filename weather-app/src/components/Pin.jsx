import React, { useState, useEffect, useCallback } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';

const Pin = React.memo(({ item }) => {
  const [data, setData] = useState(null);

  const fetchWeatherData = useCallback(async (location) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=53ed1a12294bf794e6891a613bb458e8`;
    try {
      const response = await axios.get(url);
      setData(response.data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  }, []);

  useEffect(() => {
    fetchWeatherData(item.city_name.En);
  }, [fetchWeatherData, item.city_name.En]);

  let answerTemp;
  let answerFeelsLike;
  if (data && data.main) {
    answerTemp = Math.round(data.main.temp - 273.15);
    answerFeelsLike = Math.round(data.main.feels_like - 273.15);
  }

  return (
    <div>
        <Marker position={[item.geo_position.latitude, item.geo_position.longitude]}>
        {data && (
            <Popup>
            <h1 className='font-bold text-3xl'>{item.city_name.Ru}</h1>
            <div className='flex gap-2'>
                <div>
                <p className='feels text-2xl'>{answerFeelsLike}°C</p>
                <p className='text-center'>Feels Like</p>
                </div>
                <div>
                <p className='humidity text-2xl'>{data.main.humidity}%</p>
                <p className='text-center'>Humidity</p>
                </div>
                <div>
                <p className='wind text-2xl'>{Math.round(data.wind.speed)}m/s</p>
                <p className='text-center'>Winds</p>
                </div>
            </div>
            </Popup>
        )}
        </Marker>
    </div>
  );
});

export default Pin;
