import React from 'react';

function CountryCard({ image_url, title, population, region, capital }) {
  return (
    <div className="container rounded-lg shadow-lg bg-white dark:bg-gray-700 dark:text-white h-full hover:scale-105 cursor-pointer">
      <img
        src={image_url}
        className="h-40 w-full rounded-tl-lg rounded-tr-lg object-cover" 
        alt={title}
      />
      <div className="p-4">
        <h3 className="font-bold mb-4">{title}</h3>
        <p className="text-sm">Population: <span className="text-gray-700 dark:text-gray-300">{population}</span></p>
        <p className="text-sm">Region: <span className="text-gray-700 dark:text-gray-300">{region || "NA"}</span></p>
        <p className="text-sm">Capital: <span className="text-gray-700 dark:text-gray-300">{capital}</span></p>
      </div>
    </div>
  );
}

export default CountryCard;
