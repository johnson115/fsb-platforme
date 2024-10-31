import React from 'react';
import './Events.css'; // Make sure to create this CSS file for styling

const Events = () => {
  return (
    <div className="events-container">
        <h1 className="events-title" >🎊</h1>
      <h1 className="events-title">Upcoming Events</h1>
      <p className="events-message">
        We are waiting for clubs to contact us.
      </p>
      <p className="events-update">
        This page will be updated as soon as possible!
      </p>
      <div className="animation">
        <div className="loader"></div>
      </div>
    </div>
  );
};

export default Events;
