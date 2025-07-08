
import React from 'react';
import './style.css';

const Founders = () => {
  return (
    <div className="overlay" style={{ textAlign: "center", paddingTop: "60px" }}>
      <h1 style={{ color: "#fff", marginBottom: "30px" }}>Founders of EFT</h1>
      <img 
        src="/founders.jpg" 
        alt="EFT Founders" 
        style={{ maxWidth: "90%", borderRadius: "12px", boxShadow: "0 0 20px rgba(255,255,255,0.2)" }} 
      />
      <div style={{ marginTop: "40px" }}>
        <a href="/" style={{
          padding: "12px 24px",
          background: "#ffcc00",
          color: "#000",
          textDecoration: "none",
          fontWeight: "bold",
          borderRadius: "8px"
        }}>
          ⬅ Back to Presale
        </a>
      </div>
    </div>
  );
};

export default Founders;
