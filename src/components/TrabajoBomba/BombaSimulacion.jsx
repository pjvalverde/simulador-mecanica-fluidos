// src/components/TrabajoBomba/BombaSimulacion.jsx
import React, { useState, useEffect } from 'react';
import { calcularTrabajoBomba, calcularPotenciaBomba } from '../../utils/fluidMechanics';
import { DENSIDADES, GRAVEDAD } from '../../utils/constants';
import BombaHelper from './BombaHelper';

const BombaSimulacion = () => {
  // Estados para los parámetros del sistema
  const [densidad, setDensidad] = useState(DENSIDADES.AGUA);
  const [diametroSuccion, setDiametroSuccion] = useState(75); // mm (3 in)
  const [diametroDescarga, setDiametroDescarga] = useState(50); // mm (2 in)
  const [alturaDescarga, setAlturaDescarga] = useState(15.2); // m (50 ft)
  const [eficienciaBomba, setEficienciaBomba] = useState(60); // %
  const [caudalSuccion, setCaudalSuccion] = useState(0.914); // m³/s (3 ft/s)
  const [perdidasFriccion, setPerdidasFriccion] = useState(29.9); // J/kg
  
  // Estados calculados
  const [velocidadSuccion, setVelocidadSuccion] = useState(0); // m/s
  const [velocidadDescarga, setVelocidadDescarga] = useState(0); // m/s
  const [trabajoBomba, setTrabajoBomba] = useState(0); // J/kg
  const [presionBomba, setPresionBomba] = useState(0); // kPa
  const [potenciaBomba, setPotenciaBomba] = useState(0); // kW
  const [flujoMasa, setFlujoMasa] = useState(0); // kg/s
  const [animate, setAnimate] = useState(false); // Control de animación
  
  // Cálculo de parámetros derivados cuando cambian los valores de entrada
  useEffect(() => {
    // Convertir diámetros de mm a m
    const areaSuccion = Math.PI * Math.pow(diametroSuccion / 1000, 2) / 4; // m²
    const areaDescarga = Math.PI * Math.pow(diametroDescarga / 1000, 2) / 4; // m²
    
    // Calcular velocidades basadas en continuidad (Q = A×V)
    const vSuccion = caudalSuccion / areaSuccion; // m/s
    const vDescarga = caudalSuccion / areaDescarga; // m/s
    
    setVelocidadSuccion(vSuccion);
    setVelocidadDescarga(vDescarga);
    
    // Calcular flujo másico
    const mDot = densidad * caudalSuccion; // kg/s
    setFlujoMasa(mDot);
    
    // Calcular trabajo de bomba utilizando la función de utilidad
    const trabajoReal = calcularTrabajoBomba(
      GRAVEDAD, 
      alturaDescarga, 
      vSuccion, 
      vDescarga, 
      perdidasFriccion, 
      eficienciaBomba
    );
    setTrabajoBomba(trabajoReal);
    
    // Calcular la presión desarrollada por la bomba
    // p = ρ·Wp
    const presion = densidad * trabajoReal / 1000; // kPa
    setPresionBomba(presion);
    
    // Calcular la potencia de la bomba utilizando la función de utilidad
    const potencia = calcularPotenciaBomba(trabajoReal, mDot);
    setPotenciaBomba(potencia);
    
  }, [densidad, diametroSuccion, diametroDescarga, alturaDescarga, 
      eficienciaBomba, caudalSuccion, perdidasFriccion]);
  
  return (
    <div className="flex flex-col md:flex-row">
      {/* Panel de control */}
      <div className="w-full md:w-1/3 p-4 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Parámetros del Sistema de Bombeo</h2>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Fluido: {densidad === DENSIDADES.AGUA ? "Agua" : densidad === DENSIDADES.DISOLUCION ? "Disolución (SG=1.84)" : "Personalizado"}
          </label>
          <select 
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            value={densidad}
            onChange={(e) => setDensidad(Number(e.target.value))}
          >
            <option value={DENSIDADES.AGUA}>Agua (1000 kg/m³)</option>
            <option value={DENSIDADES.DISOLUCION}>Disolución (1840 kg/m³)</option>
            <option value={DENSIDADES.ACIDO}>Ácido (1150 kg/m³)</option>
          </select>
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Diámetro Tubería Succión: {diametroSuccion} mm
          </label>
          <input 
            type="range" 
            min="25" 
            max="150" 
            step="5"
            value={diametroSuccion}
            onChange={(e) => setDiametroSuccion(Number(e.target.value))}
            className="w-full"
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Diámetro Tubería Descarga: {diametroDescarga} mm
          </label>
          <input 
            type="range" 
            min="15" 
            max="100" 
            step="5"
            value={diametroDescarga}
            onChange={(e) => setDiametroDescarga(Number(e.target.value))}
            className="w-full"
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Altura de Descarga: {alturaDescarga.toFixed(1)} m
          </label>
          <input 
            type="range" 
            min="5" 
            max="50" 
            step="0.5"
            value={alturaDescarga}
            onChange={(e) => setAlturaDescarga(Number(e.target.value))}
            className="w-full"
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Caudal en Succión: {caudalSuccion.toFixed(3)} m³/s
          </label>
          <input 
            type="range" 
            min="0.1" 
            max="2" 
            step="0.05"
            value={caudalSuccion}
            onChange={(e) => setCaudalSuccion(Number(e.target.value))}
            className="w-full"
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Eficiencia de la Bomba: {eficienciaBomba}%
          </label>
          <input 
            type="range" 
            min="20" 
            max="95" 
            step="5"
            value={eficienciaBomba}
            onChange={(e) => setEficienciaBomba(Number(e.target.value))}
            className="w-full"
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Pérdidas por Fricción: {perdidasFriccion.toFixed(1)} J/kg
          </label>
          <input 
            type="range" 
            min="0" 
            max="100" 
            step="5"
            value={perdidasFriccion}
            onChange={(e) => setPerdidasFriccion(Number(e.target.value))}
            className="w-full"
          />
        </div>
        
        <div className="p-3 bg-blue-50 rounded-md">
          <h3 className="font-semibold text-blue-800 mb-2">Resultados:</h3>
          <p className="text-sm">Velocidad en Succión: {velocidadSuccion.toFixed(2)} m/s</p>
          <p className="text-sm">Velocidad en Descarga: {velocidadDescarga.toFixed(2)} m/s</p>
          <p className="text-sm">Trabajo de Bomba: {trabajoBomba.toFixed(2)} J/kg</p>
          <p className="text-sm">Presión Desarrollada: {presionBomba.toFixed(2)} kPa</p>
          <p className="text-sm">Potencia de la Bomba: {potenciaBomba.toFixed(2)} kW</p>
          <p className="text-sm">Potencia Entregada al Fluido: {(potenciaBomba * eficienciaBomba / 100).toFixed(2)} kW</p>
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
          <BombaHelper 
            densidad={densidad}
            diametroSuccion={diametroSuccion}
            diametroDescarga={diametroDescarga}
            alturaDescarga={alturaDescarga}
            velocidadSuccion={velocidadSuccion}
            velocidadDescarga={velocidadDescarga}
            trabajoBomba={trabajoBomba}
            potenciaBomba={potenciaBomba}
            eficienciaBomba={eficienciaBomba}
            animate={animate}
          />
        </div>
      </div>
    </div>
  );
};

export default BombaSimulacion;