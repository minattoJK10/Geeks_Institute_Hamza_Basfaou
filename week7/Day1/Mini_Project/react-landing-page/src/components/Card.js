import React from 'react';

const Card = ({ icon, title, description }) => {
  return (
    <div className="col-md-4 text-center mb-4">
      <i className={`fa ${icon} fa-3x mb-3`} style={{ color: '#007bff' }}></i>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
};

export default Card;