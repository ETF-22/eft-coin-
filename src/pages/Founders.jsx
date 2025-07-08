
import React from 'react';
import './Founders.css';

const founders = [
  { name: "GHOST", image: "/ghost.png", role: "The Architect" },
  { name: "ZERODAY", image: "/zeroday.png", role: "The Coder" },
  { name: "VEGA", image: "/vega.png", role: "The Operator" }
];

const Founders = () => {
  return (
    <div className="founders-page">
      <h2 className="founders-title">Founding Team</h2>
      <div className="founders-list">
        {founders.map((founder, index) => (
          <div key={index} className="founder-card">
            <img src={founder.image} alt={founder.name} className="founder-img" />
            <p className="founder-name">{founder.name}</p>
            <p className="founder-role">{founder.role}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Founders;
