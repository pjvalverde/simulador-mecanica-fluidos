// src/components/Manometro/ManometroHelper.js
import React from 'react';

const ManometroHelper = ({ fluidoA, fluidoB, diferenciaMm, presionA, presionB, animate }) => {
  return (
    <svg width="400" height="500" viewBox="0 0 400 500">
      {/* Fondo */}
      <rect x="0" y="0" width="400" height="500" fill="#f8fafc" />
      
      {/* Tubo del manómetro */}
      <g>
        {/* Tubo vertical izquierdo */}
        <rect x="100" y="100" width="20" height="300" fill="none" stroke="#475569" strokeWidth="2" />
        
        {/* Tubo horizontal */}
        <rect x="100" y="400" width="200" height="20" fill="none" stroke="#475569" strokeWidth="2" />
        
        {/* Tubo vertical derecho */}
        <rect x="280" y="100" width="20" height="300" fill="none" stroke="#475569" strokeWidth="2" />
        
        {/* Etiquetas de presión */}
        <text x="90" y="80" textAnchor="end" fill="#334155" fontSize="14">Presión A</text>
        <text x="310" y="80" textAnchor="start" fill="#334155" fontSize="14">Presión B</text>
        
        {/* Flechas de presión */}
        <path d="M90,90 L90,110 L70,100 Z" fill={presionA > presionB ? "#3b82f6" : "#94a3b8"} />
        <path d="M310,90 L310,110 L330,100 Z" fill={presionB > presionA ? "#3b82f6" : "#94a3b8"} />
      </g>
      
      {/* Líquido manométrico */}
      <g>
        {/* Base del líquido manométrico (siempre presente) */}
        <rect x="100" y="380" width="200" height="40" fill="#6b7280" fillOpacity="0.3" />
        
        {/* Nivel del líquido en el tubo izquierdo */}
        {diferenciaMm >= 0 ? (
          <rect 
            x="100" 
            y={280 - Math.min(Math.abs(diferenciaMm)/2, 180)} 
            width="20" 
            height={100 + Math.min(Math.abs(diferenciaMm)/2, 180)} 
            fill={fluidoA.nombre === "Mercurio" ? "#94a3b8" : fluidoA.nombre === "Agua" ? "#3b82f6" : "#f59e0b"}
          />
        ) : (
          <rect 
            x="100" 
            y="280" 
            width="20" 
            height="100" 
            fill={fluidoA.nombre === "Mercurio" ? "#94a3b8" : fluidoA.nombre === "Agua" ? "#3b82f6" : "#f59e0b"}
          />
        )}
        
        {/* Nivel del líquido en el tubo derecho */}
        {diferenciaMm < 0 ? (
          <rect 
            x="280" 
            y={280 - Math.min(Math.abs(diferenciaMm)/2, 180)} 
            width="20" 
            height={100 + Math.min(Math.abs(diferenciaMm)/2, 180)} 
            fill={fluidoA.nombre === "Mercurio" ? "#94a3b8" : fluidoA.nombre === "Agua" ? "#3b82f6" : "#f59e0b"}
          />
        ) : (
          <rect 
            x="280" 
            y="280" 
            width="20" 
            height="100" 
            fill={fluidoA.nombre === "Mercurio" ? "#94a3b8" : fluidoA.nombre === "Agua" ? "#3b82f6" : "#f59e0b"}
          />
        )}
        
        {/* Líquido superior en el tubo izquierdo */}
        {diferenciaMm >= 0 ? (
          <rect 
            x="100" 
            y="100" 
            width="20" 
            height={180 - Math.min(Math.abs(diferenciaMm)/2, 180)} 
            fill={fluidoB.nombre === "Aire" ? "#f8fafc" : fluidoB.nombre === "Agua" ? "#3b82f6" : "#94a3b8"}
            fillOpacity={fluidoB.nombre === "Aire" ? "0.2" : "0.7"}
          />
        ) : (
          <rect 
            x="100" 
            y="100" 
            width="20" 
            height="180" 
            fill={fluidoB.nombre === "Aire" ? "#f8fafc" : fluidoB.nombre === "Agua" ? "#3b82f6" : "#94a3b8"}
            fillOpacity={fluidoB.nombre === "Aire" ? "0.2" : "0.7"}
          />
        )}
        
        {/* Líquido superior en el tubo derecho */}
        {diferenciaMm < 0 ? (
          <rect 
            x="280" 
            y="100" 
            width="20" 
            height={180 - Math.min(Math.abs(diferenciaMm)/2, 180)} 
            fill={fluidoB.nombre === "Aire" ? "#f8fafc" : fluidoB.nombre === "Agua" ? "#3b82f6" : "#94a3b8"}
            fillOpacity={fluidoB.nombre === "Aire" ? "0.2" : "0.7"}
          />
        ) : (
          <rect 
            x="280" 
            y="100" 
            width="20" 
            height="180" 
            fill={fluidoB.nombre === "Aire" ? "#f8fafc" : fluidoB.nombre === "Agua" ? "#3b82f6" : "#94a3b8"}
            fillOpacity={fluidoB.nombre === "Aire" ? "0.2" : "0.7"}
          />
        )}
        
        {/* Indicador de diferencia de altura */}
        {Math.abs(diferenciaMm) > 5 && (
          <g>
            <line 
              x1={diferenciaMm >= 0 ? "120" : "280"} 
              y1={diferenciaMm >= 0 ? 280 - Math.min(Math.abs(diferenciaMm)/2, 180) : 280}
              x2={diferenciaMm >= 0 ? "280" : "120"} 
              y2={diferenciaMm >= 0 ? 280 : 280 - Math.min(Math.abs(diferenciaMm)/2, 180)}
              stroke="#ef4444" 
              strokeWidth="1" 
              strokeDasharray="5,3"
            />
            <text 
              x="200" 
              y={280 - Math.min(Math.abs(diferenciaMm)/4, 90)}
              textAnchor="middle" 
              fill="#ef4444" 
              fontSize="12"
            >
              {Math.abs(diferenciaMm).toFixed(1)} mm
            </text>
          </g>
        )}
      </g>
      
      {/* Animación de flujo si está activada */}
      {animate && (
        <g>
          {/* Partículas moviéndose en el tubo */}
          {[...Array(5)].map((_, i) => (
            <circle 
              key={`particle-${i}`} 
              className="particle" 
              r="3" 
              fill={fluidoA.nombre === "Mercurio" ? "#94a3b8" : fluidoA.nombre === "Agua" ? "#3b82f6" : "#f59e0b"}
            >
              <animate
                attributeName="cx"
                values={diferenciaMm >= 0 ? "110;110;110;110;110" : "110;110;200;290;290"}
                dur="4s"
                begin={`${i * 0.8}s`}
                repeatCount="indefinite"
              />
              <animate
                attributeName="cy"
                values={diferenciaMm >= 0 ? 
                  `380;${300 - Math.min(Math.abs(diferenciaMm)/2, 180)};${300 - Math.min(Math.abs(diferenciaMm)/2, 180)};${300 - Math.min(Math.abs(diferenciaMm)/2, 180)};${300 - Math.min(Math.abs(diferenciaMm)/2, 180)}` : 
                  "380;380;410;380;280"
                }
                dur="4s"
                begin={`${i * 0.8}s`}
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                values="1;1;1;1;0"
                dur="4s"
                begin={`${i * 0.8}s`}
                repeatCount="indefinite"
              />
            </circle>
          ))}
        </g>
      )}
      
      {/* Leyenda */}
      <g transform="translate(10, 450)">
        <rect x="0" y="0" width="15" height="15" fill={fluidoA.nombre === "Mercurio" ? "#94a3b8" : fluidoA.nombre === "Agua" ? "#3b82f6" : "#f59e0b"} />
        <text x="20" y="12" fill="#334155" fontSize="12">{fluidoA.nombre}</text>
        
        <rect x="0" y="20" width="15" height="15" fill={fluidoB.nombre === "Aire" ? "#f8fafc" : fluidoB.nombre === "Agua" ? "#3b82f6" : "#94a3b8"} 
          fillOpacity={fluidoB.nombre === "Aire" ? "0.2" : "0.7"} />
        <text x="20" y="32" fill="#334155" fontSize="12">{fluidoB.nombre}</text>
      </g>
    </svg>
  );
};

export default ManometroHelper;