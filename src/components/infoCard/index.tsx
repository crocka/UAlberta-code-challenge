import React from 'react';

// interface { render
// }

function InfoCard({ information }: { information: string[] }) {

  const [name, lat, lon, population] = information;

  return (

    <div className="infoCard-container">
      <h3>City: {name}</h3>
      <p>Latitude: {lat}</p>
      <p>Longitude: {lon}</p>
      <p>Population: {population}</p>
    </div>

  );
};

export default InfoCard;
