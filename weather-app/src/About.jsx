import React, { useState } from 'react'
import Map from './components/Map'
import citiesData from "../src/cities.json"
import axios from 'axios'

const About = () => {
  const infoData = citiesData.cities;

  const [data, setData] = useState({});
  const [location, setLocation] = useState('');


  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=53ed1a12294bf794e6891a613bb458e8`;  

  const searchLocation = (event) => {
    if (event.key === "Enter") {
      axios.get(url)
        .then((response) => {
          setData(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          console.error('Error fetching weather data:', error);
        });
    }
  }  

  let answerTemp;
  let answerFeelsLike;
  if (data.main && data.main.temp && data.main.feels_like) {
    let transformTemp = parseInt(data.main.temp)
    let resultTemp = transformTemp - 273.15;
    answerTemp = Math.round(resultTemp)
    let transformTempFeelsLike = parseInt(data.main.feels_like)
    let resultTempFeelsLike = transformTempFeelsLike - 273.15
    answerFeelsLike = Math.round(resultTempFeelsLike)
    // Assuming you need these values for something else
    let latitude = data.coord.lat;
    let longitude = data.coord.lon;
  } 

  return (
    <div className='max-w-[1220px] mx-auto p-4'>
      <div className='bg-purple-400'>
        <div className='container flex flex-col justify-between items-center'>
          <div>
            <input type="text" value={location} onChange={event => setLocation(event.target.value)} placeholder='Enter Location' onKeyDown={searchLocation} className='py-3 px-8 rounded-md input'/>
          </div>
          <div className='top flex flex-col gap-y-12'>
            <h1 className='city-name text-4xl font-bold'>{data.name}</h1>
            <div className='flex flex-col gap-y-12'>
              {data.main ? <p className='city-temp text-8xl font-extrabold'>{answerTemp}°C</p> : null}
              <p className='description text-4xl'>{data.weather ? data.weather[0].main : null}</p>
            </div>
          </div>
          {data.main ? (
            <div className='bottom flex gap-x-14 py-4 px-8 rounded-md max-sm:gap-x-6 max-sm:px-4 max-sm:py-2'>
              <div>
                <p className='feels text-2xl'>{data.main ? answerFeelsLike : null}°C</p>
                <p>Feels Like</p>
              </div>
              <div>
                <p className='humidity text-2xl'>{data.main ? data.main.humidity : null}%</p>
                <p>Humidity</p>
              </div>
              <div>
                <p className='wind text-2xl'>{data.wind ? Math.round(data.wind.speed) : null}m/s</p>
                <p>Winds</p>
              </div>
            </div>
          ) : null}
        </div>
      </div>
      <Map items={infoData}/>
    </div>
  )
}

export default About;
