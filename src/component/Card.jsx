// src/Card.jsx
import React from 'react';

function Card({ country, onClick }) {
  return (
    <div className='w-60 h-72 rounded-lg overflow-hidden shadow-lg cursor-pointer' onClick={onClick}>
      <img src={country.flags.png} alt={country.name} className='w-full h-2/4 rounded-lg rounded-b-none'/>
      <div className='w-full h-3/5 p-2 bg-white'>
        <h1 className='text-gray-800'>Name: <span className='text-gray-900'>{country.name}</span></h1>
        <p className='text-gray-800'>Capital: <span className='text-gray-900'>{country.capital}</span></p>
        <p className='text-gray-800'>Population: <span className='text-gray-900'>{country.population}</span></p>
        <p className='text-gray-800'>Region: <span className='text-gray-900'>{country.region}</span></p>
      </div>
    </div>
  );
}

export default Card;
