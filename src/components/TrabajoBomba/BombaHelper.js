// src/components/TrabajoBomba/BombaHelper.js
import React from 'react';

const BombaHelper = ({ 
  densidad, 
  diametroSuccion, 
  diametroDescarga, 
  alturaDescarga, 
  velocidadSuccion, 
  velocidadDescarga, 
  trabajoBomba, 
  potenciaBomba, 
  eficienciaBomba,
  animate 
}) => {
  return (
    <svg width="600" height="500" viewBox="0 0 600 500">
      {/* Fondo */}
      <rect x="0" y="0" width="600" height="500" fill="#f8fafc" />
      
      {/* Tanque de succión */}
      <rect x="50" y="300" width="150" height="150" fill="#e2e8f0" stroke="#475569" strokeWidth="2" />
      <rect x="50" y="340" width="150" height="110" fill="#bae6fd" fillOpacity="0.8" />
      <text x="125" y="420" textAnchor="middle" fill="#334155" fontSize="14">Tanque A</text>
      <text x="125" y="330" textAnchor="middle" fill="#334155" fontSize="12">Z₁ = 0 m</text>
      
      {/* Tubería de succión */}
      <rect x="200" y="370" width="80" height={diametroSuccion / 5} fill="#94a3b8" />
      <text x="240" y="360" textAnchor="middle" fill="#334155" fontSize="10">D₁ = {diametroSuccion} mm</text>
      
      {/* Bomba */}
      <circle cx="320" cy="380" r="30" fill="#3b82f6" stroke="#1e40af" strokeWidth="2" />
      <path d="M305,380 L335,380 M320,365 L320,395" stroke="white" strokeWidth="4" />
      <text x="320" y="410" textAnchor="middle" fill="#1e40af" fontSize="12">η = {eficienciaBomba}%</text>
      
      {/* Tubería de descarga vertical */}
      <rect x="320" y={380 - alturaDescarga * 5} width={diametroDescarga / 5} height={alturaDescarga * 5 - 30} fill="#94a3b8" />
      <text x={320 + diametroDescarga / 5 + 10} y="220" textAnchor="start" fill="#334155" fontSize="10">D₂ = {diametroDescarga} mm</text>
      
      {/* Tanque de descarga */}
      <rect x="400" y={380 - alturaDescarga * 5 - 60} width="150" height="60" fill="#e2e8f0" stroke="#475569" strokeWidth="2" />
      <rect x="400" y={380 - alturaDescarga * 5 - 50} width="150" height="50" fill="#bae6fd" fillOpacity="0.6" />
      <text x="475" y={380 - alturaDescarga * 5 - 20} textAnchor="middle" fill="#334155" fontSize="14">Tanque B</text>
      <text x="475" y={380 - alturaDescarga * 5 - 70} textAnchor="middle" fill="#334155" fontSize="12">Z₂ = {alturaDescarga.toFixed(1)} m</text>
      
      {/* Conexión tubería horizontal a tanque de descarga */}
      <rect x="320" y={380 - alturaDescarga * 5 - 30} width="80" height={diametroDescarga / 5} fill="#94a3b8" />
      
      {/* Indicador de diferencia de altura */}
      <line x1="30" y1="380" x2="30" y2={380 - alturaDescarga * 5 - 30} stroke="#475569" strokeWidth="1" strokeDasharray="5,3" />
      <line x1="25" y1="380" x2="35" y2="380" stroke="#475569" strokeWidth="1" />
      <line x1="25" y1={380 - alturaDescarga * 5 - 30} x2="35" y2={380 - alturaDescarga * 5 - 30} stroke="#475569" strokeWidth="1" />
      <text x="22" y="220" textAnchor="end" fill="#475569" fontSize="12" transform="rotate(-90, 22, 220)">Altura = {alturaDescarga.toFixed(1)} m</text>
      
      {/* Trabajo y potencia de la bomba */}
      <text x="320" y="470" textAnchor="middle" fill="#1e40af" fontSize="14">Trabajo: {trabajoBomba.toFixed(1)} J/kg</text>
      <text x="320" y="490" textAnchor="middle" fill="#1e40af" fontSize="14">Potencia: {potenciaBomba.toFixed(2)} kW</text>
      
      {/* Animación del flujo si está activada */}
      {animate && (
        <g>
          {/* Partículas en la tubería de succión */}
          {[...Array(5)].map((_, i) => (
            <circle key={`in-${i}`} r="3" fill="#60a5fa" className="particle-in">
              <animate
                attributeName="cx"
                from="170"
                to="290"
                dur="2s"
                begin={`${i * 0.4}s`}
                repeatCount="indefinite"
              />
              <animate
                attributeName="cy"
                from="380"
                to="380"
                dur="2s"
                begin={`${i * 0.4}s`}
                repeatCount="indefinite"
              />
            </circle>
          ))}
          
          {/* Partículas en la tubería vertical */}
          {[...Array(10)].map((_, i) => (
            <circle key={`vert-${i}`} r="3" fill="#60a5fa" className="particle-vert">
              <animate
                attributeName="cx"
                from="320"
                to="320"
                dur="3s"
                begin={`${i * 0.3}s`}
                repeatCount="indefinite"
              />
              <animate
                attributeName="cy"
                from="380"
                to={380 - alturaDescarga * 5}
                dur="3s"
                begin={`${i * 0.3}s`}
                repeatCount="indefinite"
              />
            </circle>
          ))}
          
          {/* Partículas en la tubería horizontal superior */}
          {[...Array(3)].map((_, i) => (
            <circle key={`out-${i}`} r="3" fill="#60a5fa" className="particle-out">
              <animate
                attributeName="cx"
                from="320"
                to="400"
                dur="1.5s"
                begin={`${i * 0.5 + 3}s`}
                repeatCount="indefinite"
              />
              <animate
                attributeName="cy"
                from={380 - alturaDescarga * 5 - 30 + diametroDescarga / 10}
                to={380 - alturaDescarga * 5 - 30 + diametroDescarga / 10}
                dur="1.5s"
                begin={`${i * 0.5 + 3}s`}
                repeatCount="indefinite"
              />
            </circle>
          ))}
          
          {/* Animación de la bomba girando */}
          <g transform={`translate(320, 380)`}>
            <circle cx="0" cy="0" r="20" fill="#3b82f6" fillOpacity="0.5">
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0"
                to="360"
                dur="1s"
                repeatCount="indefinite"
              />
            </circle>
            <path d="M-15,0 L15,0 M0,-15 L0,15" stroke="white" strokeWidth="4" strokeLinecap="round">
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0"
                to="360"
                dur="1s"
                repeatCount="indefinite"
              />
            </path>
          </g>
        </g>
      )}
      
      {/* Ecuación de Bernoulli con bomba */}
      <g transform="translate(50, 50)">
        <rect x="0" y="0" width="500" height="60" fill="white" stroke="#475569" strokeWidth="1" rx="5" />
        <text x="250" y="25" textAnchor="middle" fill="#1e3a8a" fontSize="16" fontWeight="bold">Ecuación de Bernoulli con Bomba</text>
        <text x="250" y="45" textAnchor="middle" fill="#334155" fontSize="14">
          p₁/ρ + gz₁ + V₁²/2 + ηWₚ = p₂/ρ + gz₂ + V₂²/2 + hₑ
        </text>
      </g>
      
      {/* Leyenda */}
      <g transform="translate(480, 130)">
        <text x="0" y="0" fill="#334155" fontSize="12" fontWeight="bold">Leyenda:</text>
        <text x="0" y="20" fill="#334155" fontSize="10">ρ = {densidad} kg/m³</text>
        <text x="0" y="35" fill="#334155" fontSize="10">V₁ = {velocidadSuccion.toFixed(2)} m/s</text>
        <text x="0" y="50" fill="#334155" fontSize="10">V₂ = {velocidadDescarga.toFixed(2)} m/s</text>
        <text x="0" y="65" fill="#334155" fontSize="10">ΔZ = {alturaDescarga.toFixed(1)} m</text>
        <text x="0" y="80" fill="#334155" fontSize="10">Wp = {trabajoBomba.toFixed(1)} J/kg</text>
      </g>
    </svg>
  );
};

export default BombaHelper;