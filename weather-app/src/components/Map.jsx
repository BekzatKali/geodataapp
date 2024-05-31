import React from 'react'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import Pin from './Pin';

const Map = ({items}) => {
  return (
    <div className='w-full h-[800px] rounded-3xl'>
        <MapContainer center={[51.13, 71.43]} zoom={8} scrollWheelZoom={false} className='w-full h-full'>
        <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {items.map(item => (
            <Pin item={item} key={item.city_id}/>
        ))}
        </MapContainer>
    </div>
  )
}

export default Map