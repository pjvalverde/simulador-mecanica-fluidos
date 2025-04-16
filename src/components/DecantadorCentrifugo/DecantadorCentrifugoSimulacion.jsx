import React, { useState, useEffect } from 'react';
import { calcularInterfazCentrifugo, calcularPresionPared } from '../../utils/fluidMechanics';
import { DENSIDADES } from '../../utils/constants';
import DecantadorCentrifugoHelper from './DecantadorCentrifugoHelper';

const DecantadorCentrifugoSimulacion = () => {
  // Estados para los parámetros del decantador
  const [fluidoA, setFluidoA] = useState({ nombre: "Agua", densidad: DENSIDADES.AGUA });
  const [fluidoB, setFluidoB] = useState({ nombre: "Aceite", densidad: DENSIDADES.ACEITE });
  const [velocidadRotacion, setVelocidadRotacion] = useState(2000); // rpm
  const [radioInterno, setRadioInterno] = useState(0.075); // m
  const [radioExterno, setRadioExterno] = useState(0.125); // m
  const [radioADescarga, setRadioADescarga] = useState(0.12); // m (radio de descarga del líquido pesado)
  const [radioBDescarga, setRadioBDescarga] = useState(0.08); // m (radio de descarga del líquido ligero)
  
  // Estados calculados
  const [radioInterfaz, setRadioInterfaz] = useState(0);
  const [presionPared, setPresionPared] = useState(0);
  const [animate, setAnimate] = useState(false);
  
  // Cálculo del radio de la interfaz y la presión en la pared
  useEffect(() => {
    // Calcular el radio de la interfaz usando la función de utilidad
    const calculatedRadio = calcularInterfazCentrifugo(
      radioADescarga,
      radioBDescarga,
      fluidoA.densidad,
      fluidoB.densidad
    );
    
    // Limitamos a valores físicamente posibles
    setRadioInterfaz(Math.max(radioInterno, Math.min(calculatedRadio, radioExterno)));
    
    // Calcular la presión en la pared usando la función de utilidad
    const calculatedPresion = calcularPresionPared(
      velocidadRotacion,
      radioInterno,
      radioExterno,
      fluidoA.densidad
    );
    
    setPresionPared(calculatedPresion);
  }, [fluidoA.densidad, fluidoB.densidad, velocidadRotacion, radioInterno, 
      radioExterno, radioADescarga, radioBDescarga]);
  
  // Actualizar el radio de descarga si cambia la interfaz
  useEffect(() => {
    if (radioADescarga < radioInterfaz) {
      setRadioADescarga(radioInterfaz);
    }
    if (radioBDescarga > radioInterfaz) {
      setRadioBDescarga(radioInterfaz);
    }
  }, [radioInterfaz]);
  
  return (
    <div className="flex flex-col md:flex-row">
      {/* Panel de control */}
      <div className="w-full md:w-1/3 p-4 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Parámetros del Decantador Centrífugo</h2>
        
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
                "Anilina": DENSIDADES.ANILINA
              };
              setFluidoA({ 
                nombre: e.target.value, 
                densidad: options[e.target.value] 
              });
            }}
          >
            <option value="Agua">Agua (1000 kg/m³)</option>
            <option value="Ácido">Ácido (1150 kg/m³)</option>
            <option value="Anilina">Anilina (1100 kg/m³)</option>
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
            Velocidad de Rotación: {velocidadRotacion.toFixed(0)} rpm
          </label>
          <input 
            type="range" 
            min="500" 
            max="8000" 
            step="100"
            value={velocidadRotacion}
            onChange={(e) => setVelocidadRotacion(Number(e.target.value))}
            className="w-full"
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Radio Interno: {radioInterno.toFixed(3)} m
          </label>
          <input 
            type="range" 
            min="0.05" 
            max={radioExterno - 0.01} 
            step="0.005"
            value={radioInterno}
            onChange={(e) => setRadioInterno(Number(e.target.value))}
            className="w-full"
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Radio Externo: {radioExterno.toFixed(3)} m
          </label>
          <input 
            type="range" 
            min={radioInterno + 0.01} 
            max="0.2" 
            step="0.005"
            value={radioExterno}
            onChange={(e) => setRadioExterno(Number(e.target.value))}
            className="w-full"
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Radio de Descarga (Líquido Pesado): {radioADescarga.toFixed(3)} m
          </label>
          <input 
            type="range" 
            min={radioInterfaz} 
            max={radioExterno}
            step="0.005"
            value={radioADescarga}
            onChange={(e) => setRadioADescarga(Number(e.target.value))}
            className="w-full"
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Radio de Descarga (Líquido Ligero): {radioBDescarga.toFixed(3)} m
          </label>
          <input 
            type="range" 
            min={radioInterno}
            max={radioInterfaz}
            step="0.005"
            value={radioBDescarga}
            onChange={(e) => setRadioBDescarga(Number(e.target.value))}
            className="w-full"
          />
        </div>
        
        <div className="p-3 bg-blue-50 rounded-md">
          <h3 className="font-semibold text-blue-800 mb-2">Resultados:</h3>
          <p className="text-sm">Radio de la interfaz (zona neutra): {radioInterfaz.toFixed(3)} m</p>
          <p className="text-sm">Presión en la pared: {presionPared.toFixed(2)} kPa</p>
          <p className="text-sm">Diferencia de densidades: {(fluidoA.densidad - fluidoB.densidad).toFixed(0)} kg/m³</p>
          <p className="text-sm">Factor G: {((Math.pow(velocidadRotacion * 2 * Math.PI / 60, 2) * radioExterno) / 9.81).toFixed(0)}</p>
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
          <DecantadorCentrifugoHelper 
            fluidoA={fluidoA}
            fluidoB={fluidoB}
            radioInterno={radioInterno}
            radioExterno={radioExterno}
            radioInterfaz={radioInterfaz}
            radioADescarga={radioADescarga}
            radioBDescarga={radioBDescarga}
            velocidadRotacion={velocidadRotacion}
            animate={animate}
          />
        </div>
      </div>
    </div>
  );
};

export default DecantadorCentrifugoSimulacion;