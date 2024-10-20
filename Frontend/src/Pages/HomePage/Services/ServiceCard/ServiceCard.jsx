import React from "react";
import "./ServiceCard.css";

const ServiceCard = ({ Icon, title, description }) => {
  return (
    <div className="service-card" data-testid = "service-card">
      <div className="icon-container">{Icon}</div>
      <h3 className="service-title">{title}</h3>
      <p className="service-description">{description}</p>
    </div>
  );
};

export default ServiceCard;
