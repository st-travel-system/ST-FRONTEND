'use client';
import React from 'react';
import "../styles/agencyinfo.css";
import { Clock4, Users, MapPin } from "lucide-react";
export default function AgencyInfo() {
  return (
    <section className="agency-info-container">
      <div className="info-box">
        <h2 className="title">ST TRAVEL</h2>
        <h3 className="subtitle">Agencia de viajes Digital</h3>
        <p className="description">
           En ST Travel creamos experiencias únicas en destinos como Europa, Asia, Medio Oriente y África. Ofrecemos tours con guía en habla hispana e itinerarios a la medida diseñados para adaptarse a tus gustos, necesidades y presupuesto.
        </p>
      </div>
      <div className="stats-container">
        <div className="stat-box">
          <span className="icon"><Clock4 className="w-8 h-w-8 text-white mx-auto " /></span>
          <h3>25+</h3>
          <p>Años de experiencia</p>
        </div>
        <div className="stat-box">
          <span className="icon"> <Users className="w-8 h-w-8 text-white mx-auto" /></span>
          <h3>10,000+</h3>
          <p>Viajeros satisfechos</p>
        </div>
        <div className="stat-box">
          <span className="icon"><MapPin className="w-8 h-w-8 text-white mx-auto" /></span>
          <h3>4</h3>
          <p>Destinos globales</p>
        </div>
      </div>
    </section>
  );
}
