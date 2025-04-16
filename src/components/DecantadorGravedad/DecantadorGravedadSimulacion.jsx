import React, { useState, useEffect } from 'react';
import { calcularInterfazGravedad } from '../../utils/fluidMechanics';
import { DENSIDADES, VISCOSIDADES, GRAVEDAD } from '../../utils/constants';
import DecantadorGravedadHelper from './DecantadorGravedadHelper';

const DecantadorGravedadSimulacion = () => {
  // Estados para los parámetros del decantador
  const [fluidoA, setFluidoA] = useState({ nombre: "Agua", densidad: DENSIDADES.AGUA });
  const [fluidoB, setFluidoB] = useState({ nombre: "Aceite", densidad: DENSIDADES.ACEITE });
  const [viscosidad, setViscosidad] = useState(VISCOSIDADES.AGUA); // cP
  const [alturaTotal, setAlturaTotal] = useState(1); // m
  const [alturaBrazoA, setAlturaBrazoA] = useState(0.75); // m
  const [caudal, setCaudal] = useState(10); // m³/h
  
  // Estados calculados
  const [interfaz, setInterfaz] = useState(0);
  const [tiempoSeparacion, setTiempoSeparacion] = useState(0);
  const [animate, setAnimate] = useState(false);
  
  // Cálculo de la posición de la interfaz y tiempo de separación
  useEffect(() => {
    // Calcular la posición de la interfaz
    const calculatedInterfaz = calcularInterfazGravedad(
      alturaBrazoA,
      alturaTotal,
      fluidoA.densidad,
      fluidoB.densidad
    );
    
    // Limitamos a valores físicamente posibles
    setInterfaz(Math.max(0, Math.min(calculatedInterfaz, alturaTotal)));
    
    // Calcular el tiempo de separación usando la ecuación 2.15: t = 100μ/(ρA - ρB)
    const diferenciaDensidad = fluidoA.densidad - fluidoB.densidad;
    const tiempo = (100 * viscosidad) / diferenciaDensidad;
    
    setTiempoSeparacion(tiempo);
  }, [fluidoA.densidad, fluidoB.densidad, viscosidad, alturaTotal, alturaBrazoA]);
  
  return (
    <div className="flex flex-col md:flex-row">
      {/* Panel de control */}
      <div className="w-full md:w-1/3 p-4 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Parámetros del Decantador por Gravedad</h2>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Líquido Pesado: {fluidoA.nombre}
          </label>
          <select 
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            value={fluidoA.nombre}
            onChange={(e) => {
              const options = {
                "Agua": DENSIDADES.AGUA,
                "Ácido": DENSIDADES.ACIDO,
                "Mercurio": DENSIDADES.MERCURIO
              };
              setFluidoA({ 
                nombre: e.target.value, 
                densidad: options[e.target.value] 
              });
            }}
          >
            <option value="Agua">Agua (1000 kg/m³)</option>
            <option value="Ácido">Ácido (1150 kg/m³)</option>
            <option value="Mercurio">Mercurio (13590 kg/m³)</option>
          </select>
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Líquido Ligero: {fluidoB.nombre}
          </label>
          <select 
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            value={fluidoB.nombre}
            onChange={(e) => {
              const options = {
                "Aceite": DENSIDADES.ACEITE,
                "Queroseno": DENSIDADES.QUEROSENO,
                "Gasolina": DENSIDADES.GASOLINA
              };
              setFluidoB({ 
                nombre: e.target.value, 
                densidad: options[e.target.value] 
              });
            }}
          >
            <option value="Aceite">Aceite (850 kg/m³)</option>
            <option value="Queroseno">Queroseno (820 kg/m³)</option>
            <option value="Gasolina">Gasolina (750 kg/m³)</option>
          </select>
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Viscosidad: {viscosidad.toFixed(1)} cP
          </label>
          <input 
            type="range" 
            min="0.5" 
            max="5" 
            step="0.1"
            value={viscosidad}
            onChange={(e) => setViscosidad(Number(e.target.value))}
            className="w-full"
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Altura Total: {alturaTotal.toFixed(2)} m
          </label>
          <input 
            type="range" 
            min="0.5" 
            max="2" 
            step="0.05"
            value={alturaTotal}
            onChange={(e) => setAlturaTotal(Number(e.target.value))}
            className="w-full"
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Altura Brazo Descarga (Líquido Pesado): {alturaBrazoA.toFixed(2)} m
          </label>
          <input 
            type="range" 
            min="0.1" 
            max={alturaTotal}
            step="0.05"
            value={alturaBrazoA}
            onChange={(e) => setAlturaBrazoA(Number(e.target.value))}
            className="w-full"
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Caudal: {caudal.toFixed(1)} m³/h
          </label>
          <input 
            type="range" 
            min="1" 
            max="50" 
            step="1"
            value={caudal}
            onChange={(e) => setCaudal(Number(e.target.value))}
            className="w-full"
          />
        </div>
        
        <div className="p-3 bg-blue-50 rounded-md">
          <h3 className="font-semibold text-blue-800 mb-2">Resultados:</h3>
          <p className="text-sm">Posición de la interfaz: {interfaz.toFixed(2)} m</p>
          <p className="text-sm">Tiempo de separación: {tiempoSeparacion.toFixed(2)} h</p>
          <p className="text-sm">Volumen requerido: {(caudal * tiempoSeparacion).toFixed(2)} m³</p>
        </div>
        
        <button 
          className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
          onClick={() => setAnimate(!animate)}
        >
          {animate ? "Pausar Simulación" : "Iniciar Simulación"}
        </button>
      </div>
      
      {/* Visualización */}
      <div className="w-full md:w-2/3 p-4">
        <div className="bg-white rounded-lg shadow-md p-4 h-full flex justify-center items-center">
          <DecantadorGravedadHelper 
            fluidoA={fluidoA}
            fluidoB={fluidoB}
            alturaTotal={alturaTotal}
            alturaBrazoA={alturaBrazoA}
            interfaz={interfaz}
            animate={animate}
          />
        </div>
      </div>
    </div>
  );
};

export default DecantadorGravedadSimulacion;