import React from 'react';
import { GRAVEDAD } from '../../utils/constants';

const DecantadorCentrifugoHelper = ({ 
  fluidoA, 
  fluidoB, 
  radioInterno, 
  radioExterno, 
  radioInterfaz, 
  radioADescarga, 
  radioBDescarga, 
  velocidadRotacion, 
  animate 
}) => {
  // Calcular el factor G
  const velocidadRads = (velocidadRotacion * 2 * Math.PI) / 60;
  const factorG = (Math.pow(velocidadRads, 2) * radioExterno) / GRAVEDAD;
  
  return (
    <svg width="500" height="500" viewBox="0 0 500 500">
      {/* Fondo */}
      <rect x="0" y="0" width="500" height="500" fill="#f8fafc" />
      
      {/* Decantador centrífugo */}
      <g transform="translate(250, 250)">
        {/* Marco de referencia */}
        <line x1="-200" y1="0" x2="200" y2="0" stroke="#94a3b8" strokeWidth="1" strokeDasharray="5,3" />
        <line x1="0" y1="-200" x2="0" y2="200" stroke="#94a3b8" strokeWidth="1" strokeDasharray="5,3" />
        
        {/* Cuerpo del decantador (radio externo) */}
        <circle cx="0" cy="0" r={radioExterno * 1000} fill="none" stroke="#475569" strokeWidth="2" />
        
        {/* Cavidad central (radio interno) */}
        <circle cx="0" cy="0" r={radioInterno * 1000} fill="white" stroke="#475569" strokeWidth="2" />
        
        {/* Capa de líquido pesado */}
        <circle cx="0" cy="0" r={radioExterno * 1000} fill="#3b82f6" fillOpacity="0.8" />
        
        {/* Capa de líquido ligero */}
        <circle cx="0" cy="0" r={radioInterfaz * 1000} fill="#f59e0b" fillOpacity="0.5" />
        
        {/* Eje central y cavidad interna */}
        <circle cx="0" cy="0" r={radioInterno * 1000} fill="white" stroke="#475569" strokeWidth="2" />
        <circle cx="0" cy="0" r="5" fill="#475569" />
        
        {/* Interfaz líquido-líquido (zona neutra) */}
        <circle cx="0" cy="0" r={radioInterfaz * 1000} fill="none" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="5,3" />
        <text x="0" y="-5" textAnchor="middle" fill="#ef4444" fontSize="12">Interfaz (r = {radioInterfaz.toFixed(3)} m)</text>
        
        {/* Radio de descarga del líquido pesado */}
        <circle cx="0" cy="0" r={radioADescarga * 1000} fill="none" stroke="#1e40af" strokeWidth="1" strokeDasharray="3,2" />
        <text x="0" y={radioADescarga * 1000 + 15} textAnchor="middle" fill="#1e40af" fontSize="10">r_A = {radioADescarga.toFixed(3)} m</text>
        
        {/* Radio de descarga del líquido ligero */}
        <circle cx="0" cy="0" r={radioBDescarga * 1000} fill="none" stroke="#d97706" strokeWidth="1" strokeDasharray="3,2" />
        <text x="0" y={-(radioBDescarga * 1000 + 15)} textAnchor="middle" fill="#d97706" fontSize="10">r_B = {radioBDescarga.toFixed(3)} m</text>
        
        {/* Puertos de descarga */}
        <g>
          {/* Puerto de descarga del líquido pesado */}
          <rect x={radioADescarga * 1000 - 10} y="-15" width="20" height="30" fill="#1e40af" />
          <text x={radioADescarga * 1000 + 30} y="0" textAnchor="start" fill="#1e40af" fontSize="10">Salida Líquido Pesado</text>
          
          {/* Puerto de descarga del líquido ligero */}
          <rect x={radioBDescarga * 1000 - 10} y="-15" width="20" height="30" fill="#d97706" />
          <text x={radioBDescarga * 1000 - 30} y="0" textAnchor="end" fill="#d97706" fontSize="10">Salida Líquido Ligero</text>
        </g>
        
        {/* Indicador de rotación */}
        <g className={animate ? "rotating" : ""}>
          <path d="M0,-20 A20,20 0 0,1 17.32,-10 L0,0 Z" fill="#475569" fillOpacity="0.3" />
          <path d="M17.32,-10 A20,20 0 0,1 17.32,10 L0,0 Z" fill="#475569" fillOpacity="0.4" />
          <path d="M17.32,10 A20,20 0 0,1 0,20 L0,0 Z" fill="#475569" fillOpacity="0.5" />
          <path d="M0,20 A20,20 0 0,1 -17.32,10 L0,0 Z" fill="#475569" fillOpacity="0.6" />
          <path d="M-17.32,10 A20,20 0 0,1 -17.32,-10 L0,0 Z" fill="#475569" fillOpacity="0.7" />
          <path d="M-17.32,-10 A20,20 0 0,1 0,-20 L0,0 Z" fill="#475569" fillOpacity="0.8" />
          
          {animate && (
            <animateTransform 
              attributeName="transform" 
              type="rotate" 
              from="0" 
              to="360" 
              dur={`${10000/velocidadRotacion}s`} 
              repeatCount="indefinite"
            />
          )}
        </g>
        
        {/* Alimentación */}
        <rect x="-10" y="-70" width="20" height="30" fill="#475569" />
        <text x="0" y="-80" textAnchor="middle" fill="#475569" fontSize="12">Alimentación</text>
        
        {/* Animación del flujo si está activada */}
        {animate && (
          <g>
            {/* Partículas de alimentación */}
            {[...Array(5)].map((_, i) => (
              <circle key={`in-${i}`} r="3" fill="#cbd5e1">
                <animate
                  attributeName="cy" 
                  from="-55" 
                  to="0" 
                  dur="2s" 
                  begin={`${i * 0.4}s`} 
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="cx" 
                  from="0" 
                  to="0" 
                  dur="2s" 
                  begin={`${i * 0.4}s`} 
                  repeatCount="indefinite"
                />
              </circle>
            ))}
            
            {/* Rotación general */}
            <g>
              <animateTransform 
                attributeName="transform" 
                type="rotate" 
                from="0" 
                to="360" 
                dur={`${10000/velocidadRotacion}s`} 
                repeatCount="indefinite"
              />
              
              {/* Partículas del líquido pesado */}
              {[...Array(12)].map((_, i) => {
                const angle = (i * 30) * Math.PI / 180;
                const radiusRand = radioExterno * 0.9 + Math.random() * (radioExterno - radioInterfaz) * 0.1;
                const x = radiusRand * 1000 * Math.cos(angle);
                const y = radiusRand * 1000 * Math.sin(angle);
                
                return (
                  <circle key={`heavy-${i}`} cx={x} cy={y} r="3" fill="#3b82f6" />
                );
              })}
              
              {/* Partículas del líquido ligero */}
              {[...Array(8)].map((_, i) => {
                const angle = (i * 45) * Math.PI / 180;
                const radiusRand = radioInterno + Math.random() * (radioInterfaz - radioInterno) * 0.8;
                const x = radiusRand * 1000 * Math.cos(angle);
                const y = radiusRand * 1000 * Math.sin(angle);
                
                return (
                  <circle key={`light-${i}`} cx={x} cy={y} r="3" fill="#f59e0b" />
                );
              })}
            </g>
            
            {/* Partículas saliendo por los puertos */}
            {[...Array(3)].map((_, i) => (
              <circle key={`out-heavy-${i}`} r="3" fill="#3b82f6">
                <animate
                  attributeName="cx" 
                  from={radioADescarga * 1000} 
                  to={radioADescarga * 1000 + 50} 
                  dur="1.5s" 
                  begin={`${i * 0.5}s`} 
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="cy" 
                  from="0" 
                  to="0" 
                  dur="1.5s" 
                  begin={`${i * 0.5}s`} 
                  repeatCount="indefinite"
                />
              </circle>
            ))}
            
            {[...Array(3)].map((_, i) => (
              <circle key={`out-light-${i}`} r="3" fill="#f59e0b">
                <animate
                  attributeName="cx" 
                  from={radioBDescarga * 1000} 
                  to={radioBDescarga * 1000 - 50} 
                  dur="1.5s" 
                  begin={`${i * 0.5}s`} 
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="cy" 
                  from="0" 
                  to="0" 
                  dur="1.5s" 
                  begin={`${i * 0.5}s`} 
                  repeatCount="indefinite"
                />
              </circle>
            ))}
          </g>
        )}
      </g>
      
      {/* Leyenda */}
      <g transform="translate(380, 30)">
        <rect x="0" y="0" width="15" height="15" fill="#3b82f6" fillOpacity="0.8" />
        <text x="20" y="12" fill="#334155" fontSize="10">{fluidoA.nombre} (ρ = {fluidoA.densidad} kg/m³)</text>
        
        <rect x="0" y="20" width="15" height="15" fill="#f59e0b" fillOpacity="0.5" />
        <text x="20" y="32" fill="#334155" fontSize="10">{fluidoB.nombre} (ρ = {fluidoB.densidad} kg/m³)</text>
        
        <line x1="0" y1="45" x2="15" y2="45" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="5,3" />
        <text x="20" y="48" fill="#334155" fontSize="10">Zona Neutra</text>
      </g>
      
      {/* Indicador de velocidad de rotación y fuerza G */}
      <g transform="translate(20, 20)">
        <text x="0" y="12" fill="#334155" fontSize="12">ω = {velocidadRotacion.toFixed(0)} rpm</text>
        <text x="0" y="32" fill="#334155" fontSize="12">G = {factorG.toFixed(0)}</text>
      </g>
      
      {/* Agregar el CSS para las animaciones */}
      <style>
        {`
          .rotating {
            transform-origin: center;
          }
          
          @keyframes rotate {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          
          .rotating {
            animation: rotate ${10000/velocidadRotacion}s linear infinite;
          }
        `}
      </style>
    </svg>
  );
};

export default DecantadorCentrifugoHelper;