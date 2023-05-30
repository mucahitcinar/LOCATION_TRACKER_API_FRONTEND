import React, { useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [updatedLocation, setUpdatedLocation] = useState('');
  const [previousLocations, setPreviousLocations] = useState([]);

  const handleInputChange = (e) => {
    setUpdatedLocation(e.target.value);
  };

  const handleUpdateClick = () => {
    axios
      .get("http://127.0.0.1:3000/SMSapi/v1/messages/")
      .then((res) => {
        const updatedLocations = res.data.all.map((item) => item.context);
        setPreviousLocations(updatedLocations);
        setUpdatedLocation(res.data.all[res.data.all.length-1].context)
        handleLocationClick(res.data.all[res.data.all.length-1].context)
      });
  };

  const handleLocationClick = (location) => {
    window.open(location, '_blank');
  };

  return (
    <div className="container">
      <h1 className="title">Updated Location:</h1>
      <div className="input-container">
        <input
          type="text"
          className="input-field"
          value={updatedLocation}
          onChange={handleInputChange}
        />
        <button className="update-button" onClick={handleUpdateClick}>
          Update
        </button>
      </div>
      <div className="previous-locations">
        <h2 className="subheading">All Locations:</h2>
        <ul className="location-list">
          {previousLocations.map((location, index) => (
            <li key={index} className="location-item">
              <a href="#" onClick={() => handleLocationClick(location)}>
                {location}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
