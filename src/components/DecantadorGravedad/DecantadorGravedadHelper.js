import React from 'react';

const DecantadorGravedadHelper = ({ 
  fluidoA, 
  fluidoB, 
  alturaTotal, 
  alturaBrazoA, 
  interfaz, 
  animate 
}) => {
  return (
    <svg width="600" height="400" viewBox="0 0 600 400">
      {/* Fondo */}
      <rect x="0" y="0" width="600" height="400" fill="#f8fafc" />
      
      {/* Tanque decantador */}
      <g>
        {/* Cuerpo del tanque */}
        <rect x="100" y="100" width="400" height="200" fill="none" stroke="#475569" strokeWidth="2" />
        
        {/* Línea de alimentación */}
        <line x1="50" y1="150" x2="100" y2="150" stroke="#475569" strokeWidth="2" />
        <polygon points="90,145 100,150 90,155" fill="#475569" />
        <text x="40" y="145" textAnchor="end" fill="#334155" fontSize="12">Alimentación</text>
        
        {/* Líquido pesado */}
        <rect x="100" y={300 - interfaz * 100} width="400" height={interfaz * 100} fill="#3b82f6" fillOpacity="0.8" />
        
        {/* Líquido ligero */}
        <rect x="100" y="100" width="400" height={200 - interfaz * 100} fill="#f59e0b" fillOpacity="0.5" />
        
        {/* Línea de desborde del líquido pesado */}
        <line x1="500" y1={300 - alturaBrazoA * 100} x2="550" y2={300 - alturaBrazoA * 100} stroke="#475569" strokeWidth="2" />
        <polygon points={`540,${300 - alturaBrazoA * 100 - 5} 550,${300 - alturaBrazoA * 100} 540,${300 - alturaBrazoA * 100 + 5}`} fill="#475569" />
        <text x="560" y={300 - alturaBrazoA * 100 + 5} textAnchor="start" fill="#334155" fontSize="12">Líquido Pesado</text>
        
        {/* Línea de desborde del líquido ligero */}
        <line x1="500" y1="100" x2="550" y2="100" stroke="#475569" strokeWidth="2" />
        <polygon points="540,95 550,100 540,105" fill="#475569" />
        <text x="560" y="105" textAnchor="start" fill="#334155" fontSize="12">Líquido Ligero</text>
        
        {/* Respiradero */}
        <line x1="300" y1="80" x2="300" y2="100" stroke="#475569" strokeWidth="2" />
        <circle cx="300" cy="70" r="10" fill="none" stroke="#475569" strokeWidth="2" />
        <text x="310" y="65" textAnchor="start" fill="#334155" fontSize="12">Respiradero</text>
        
        {/* Interfaz líquido-líquido */}
        <line x1="100" y1={300 - interfaz * 100} x2="500" y2={300 - interfaz * 100} stroke="#ef4444" strokeWidth="1" strokeDasharray="5,3" />
        <text x="310" y={300 - interfaz * 100 - 5} textAnchor="middle" fill="#ef4444" fontSize="12">Interfaz</text>
        
        {/* Altura del líquido total */}
        <line x1="80" y1="100" x2="80" y2="300" stroke="#475569" strokeWidth="1" />
        <line x1="75" y1="100" x2="85" y2="100" stroke="#475569" strokeWidth="1" />
        <line x1="75" y1="300" x2="85" y2="300" stroke="#475569" strokeWidth="1" />
        <text x="70" y="200" textAnchor="end" fill="#334155" fontSize="12" transform="rotate(-90, 70, 200)">Altura Total: {alturaTotal} m</text>
        
        {/* Indicador de altura del brazo de descarga */}
        <line x1="520" y1={300 - alturaBrazoA * 100} x2="520" y2="300" stroke="#475569" strokeWidth="1" />
        <line x1="515" y1={300 - alturaBrazoA * 100} x2="525" y2={300 - alturaBrazoA * 100} stroke="#475569" strokeWidth="1" />
        <line x1="515" y1="300" x2="525" y2="300" stroke="#475569" strokeWidth="1" />
        <text x="535" y="250" textAnchor="start" fill="#334155" fontSize="12" transform="rotate(90, 535, 250)">Brazo: {alturaBrazoA.toFixed(2)} m</text>
      </g>
      
      {/* Animación del flujo si está activada */}
      {animate && (
        <g>
          {/* Partículas de alimentación */}
          {[...Array(5)].map((_, i) => (
            <circle key={`in-${i}`} r="3" fill={Math.random() > 0.5 ? "#3b82f6" : "#f59e0b"}>
              <animate
                attributeName="cx"
                from="50"
                to="120"
                dur="3s"
                begin={`${i * 0.6}s`}
                repeatCount="indefinite"
              />
              <animate
                attributeName="cy"
                from="150"
                to="150"
                dur="3s"
                begin={`${i * 0.6}s`}
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                from="1"
                to="0"
                dur="3s"
                begin={`${i * 0.6 + 2.5}s`}
                repeatCount="indefinite"
              />
            </circle>
          ))}
          
          {/* Partículas del líquido pesado */}
          {[...Array(3)].map((_, i) => (
            <circle key={`out-heavy-${i}`} r="3" fill="#3b82f6">
              <animate
                attributeName="cx"
                from="500"
                to="550"
                dur="2s"
                begin={`${i * 0.7}s`}
                repeatCount="indefinite"
              />
              <animate
                attributeName="cy"
                from={300 - alturaBrazoA * 100}
                to={300 - alturaBrazoA * 100}
                dur="2s"
                begin={`${i * 0.7}s`}
                repeatCount="indefinite"
              />
            </circle>
          ))}
          
          {/* Partículas del líquido ligero */}
          {[...Array(3)].map((_, i) => (
            <circle key={`out-light-${i}`} r="3" fill="#f59e0b">
              <animate
                attributeName="cx"
                from="500"
                to="550"
                dur="2s"
                begin={`${i * 0.7}s`}
                repeatCount="indefinite"
              />
              <animate
                attributeName="cy"
                from="100"
                to="100"
                dur="2s"
                begin={`${i * 0.7}s`}
                repeatCount="indefinite"
              />
            </circle>
          ))}
          
          {/* Partículas moviéndose dentro del tanque */}
          {[...Array(8)].map((_, i) => {
            // Partículas de líquido pesado
            const yPos = 300 - Math.random() * interfaz * 50;
            const xPos = 150 + Math.random() * 300;
            const duration = 10 + Math.random() * 20;
            const delay = Math.random() * 5;
            
            return (
              <g key={`particle-heavy-${i}`}>
                <circle r="2" fill="#3b82f6" opacity="0.8">
                  <animate
                    attributeName="cx"
                    from={xPos}
                    to={xPos + 30 - Math.random() * 60}
                    dur={`${duration}s`}
                    begin={`${delay}s`}
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="cy"
                    from={yPos}
                    to={yPos - 20 + Math.random() * 10}
                    dur={`${duration}s`}
                    begin={`${delay}s`}
                    repeatCount="indefinite"
                  />
                </circle>
              </g>
            );
          })}
          
          {[...Array(8)].map((_, i) => {
            // Partículas de líquido ligero
            const yPos = 120 + Math.random() * (180 - interfaz * 100);
            const xPos = 150 + Math.random() * 300;
            const duration = 10 + Math.random() * 20;
            const delay = Math.random() * 5;
            
            return (
              <g key={`particle-light-${i}`}>
                <circle r="2" fill="#f59e0b" opacity="0.8">
                  <animate
                    attributeName="cx"
                    from={xPos}
                    to={xPos + 30 - Math.random() * 60}
                    dur={`${duration}s`}
                    begin={`${delay}s`}
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="cy"
                    from={yPos}
                    to={yPos - 10 + Math.random() * 20}
                    dur={`${duration}s`}
                    begin={`${delay}s`}
                    repeatCount="indefinite"
                  />
                </circle>
              </g>
            );
          })}
        </g>
      )}
      
      {/* Leyenda */}
      <g transform="translate(450, 350)">
        <rect x="0" y="0" width="15" height="15" fill="#3b82f6" fillOpacity="0.8" />
        <text x="20" y="12" fill="#334155" fontSize="12">{fluidoA.nombre} (ρ = {fluidoA.densidad} kg/m³)</text>
        
        <rect x="0" y="20" width="15" height="15" fill="#f59e0b" fillOpacity="0.5" />
        <text x="20" y="32" fill="#334155" fontSize="12">{fluidoB.nombre} (ρ = {fluidoB.densidad} kg/m³)</text>
      </g>
    </svg>
  );
};

export default DecantadorGravedadHelper;