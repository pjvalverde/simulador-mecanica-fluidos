// src/components/Manometro/ManometroSimulacion.jsx
import React, { useState, useEffect } from 'react';
import { calcularDiferenciaManometro } from '../../utils/fluidMechanics';
import { DENSIDADES, GRAVEDAD, PRESION_ATMOSFERICA } from '../../utils/constants';
import ManometroHelper from './ManometroHelper';

const ManometroSimulacion = () => {
  // Estados para los parámetros del manómetro
  const [fluidoA, setFluidoA] = useState({ nombre: "Mercurio", densidad: DENSIDADES.MERCURIO });
  const [fluidoB, setFluidoB] = useState({ nombre: "Aire", densidad: DENSIDADES.AIRE });
  const [presionA, setPresionA] = useState(PRESION_ATMOSFERICA); // Pa (1 atm)
  const [presionB, setPresionB] = useState(PRESION_ATMOSFERICA); // Pa (1 atm)
  const [diferenciaMm, setDiferenciaMm] = useState(0);
  const [animate, setAnimate] = useState(false);
  
  // Calculamos la diferencia de altura cuando cambian los parámetros
  useEffect(() => {
    const calcularDiferencia = () => {
      // Si la densidad de A es mayor que la de B, usamos la fórmula normal
      if (fluidoA.densidad > fluidoB.densidad) {
        const diferencia = calcularDiferenciaManometro(
          presionA, 
          presionB, 
          fluidoA.densidad, 
          fluidoB.densidad,
          GRAVEDAD
        );
        setDiferenciaMm(diferencia);
      } else {
        // Si la densidad de B es mayor, el menisco se mueve en dirección opuesta
        const diferencia = calcularDiferenciaManometro(
          presionA, 
          presionB, 
          fluidoB.densidad, 
          fluidoA.densidad,
          GRAVEDAD
        );
        setDiferenciaMm(-diferencia);
      }
    };
    
    calcularDiferencia();
  }, [presionA, presionB, fluidoA.densidad, fluidoB.densidad]);
  
  return (
    <div className="flex flex-col md:flex-row">
      {/* Panel de control */}
      <div className="w-full md:w-1/3 p-4 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Parámetros del Manómetro</h2>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Fluido Manométrico: {fluidoA.nombre}
          </label>
          <select 
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            value={fluidoA.nombre}
            onChange={(e) => {
              const options = {
                "Mercurio": DENSIDADES.MERCURIO,
                "Agua": DENSIDADES.AGUA,
                "Aceite": DENSIDADES.ACEITE
              };
              setFluidoA({ 
                nombre: e.target.value, 
                densidad: options[e.target.value] 
              });
            }}
          >
            <option value="Mercurio">Mercurio (13590 kg/m³)</option>
            <option value="Agua">Agua (1000 kg/m³)</option>
            <option value="Aceite">Aceite (850 kg/m³)</option>
          </select>
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Fluido Superior: {fluidoB.nombre}
          </label>
          <select 
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            value={fluidoB.nombre}
            onChange={(e) => {
              const options = {
                "Aire": DENSIDADES.AIRE,
                "Agua": DENSIDADES.AGUA,
                "Tetracloruro de Carbono": DENSIDADES.TETRACLORURO
              };
              setFluidoB({ 
                nombre: e.target.value, 
                densidad: options[e.target.value] 
              });
            }}
          >
            <option value="Aire">Aire (1.2 kg/m³)</option>
            <option value="Agua">Agua (1000 kg/m³)</option>
            <option value="Tetracloruro de Carbono">Tetracloruro de Carbono (1600 kg/m³)</option>
          </select>
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Presión A: {(presionA/1000).toFixed(2)} kPa
          </label>
          <input 
            type="range" 
            min="90000" 
            max="150000" 
            step="1000"
            value={presionA}
            onChange={(e) => setPresionA(Number(e.target.value))}
            className="w-full"
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Presión B: {(presionB/1000).toFixed(2)} kPa
          </label>
          <input 
            type="range" 
            min="90000" 
            max="150000" 
            step="1000"
            value={presionB}
            onChange={(e) => setPresionB(Number(e.target.value))}
            className="w-full"
          />
        </div>
        
        <div className="p-3 bg-blue-50 rounded-md">
          <h3 className="font-semibold text-blue-800 mb-2">Resultados:</h3>
          <p className="text-sm">Diferencia de presión: {Math.abs(presionA - presionB).toFixed(0)} Pa</p>
          <p className="text-sm">Lectura del manómetro: {Math.abs(diferenciaMm).toFixed(2)} mm</p>
          <p className="text-sm">Dirección: {diferenciaMm >= 0 ? "Rama A más alta" : "Rama B más alta"}</p>
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
          <ManometroHelper 
            fluidoA={fluidoA}
            fluidoB={fluidoB}
            diferenciaMm={diferenciaMm}
            presionA={presionA}
            presionB={presionB}
            animate={animate}
          />
        </div>
      </div>
    </div>
  );
};

export default ManometroSimulacion;