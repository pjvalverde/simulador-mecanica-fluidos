// src/App.jsx
import React, { useState } from 'react';
import ManometroSimulacion from './components/Manometro/ManometroSimulacion';
import DecantadorGravedadSimulacion from './components/DecantadorGravedad/DecantadorGravedadSimulacion';
import DecantadorCentrifugoSimulacion from './components/DecantadorCentrifugo/DecantadorCentrifugoSimulacion';
import BombaSimulacion from './components/TrabajoBomba/BombaSimulacion';

function App() {
  const [activeTab, setActiveTab] = useState('intro');

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        <header className="bg-white shadow-md rounded-lg p-4 mb-4">
          <h1 className="text-2xl font-bold text-center text-blue-800">Simulador de Mecánica de Fluidos</h1>
          <p className="text-center text-gray-600 mt-2">
            Herramienta interactiva para el estudio de manómetros, decantadores y sistemas de bombeo
          </p>
        </header>

        {/* Navegación */}
        <div className="flex flex-wrap mb-4 bg-white shadow-md rounded-lg overflow-hidden">
          <button 
            className={`px-4 py-3 font-medium transition-colors duration-200 ${activeTab === 'intro' ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-blue-50'}`}
            onClick={() => setActiveTab('intro')}
          >
            Introducción
          </button>
          <button 
            className={`px-4 py-3 font-medium transition-colors duration-200 ${activeTab === 'manometro' ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-blue-50'}`}
            onClick={() => setActiveTab('manometro')}
          >
            Manómetros
          </button>
          <button 
            className={`px-4 py-3 font-medium transition-colors duration-200 ${activeTab === 'decantador-gravedad' ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-blue-50'}`}
            onClick={() => setActiveTab('decantador-gravedad')}
          >
            Decantador por Gravedad
          </button>
          <button 
            className={`px-4 py-3 font-medium transition-colors duration-200 ${activeTab === 'decantador-centrifugo' ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-blue-50'}`}
            onClick={() => setActiveTab('decantador-centrifugo')}
          >
            Decantador Centrífugo
          </button>
          <button 
            className={`px-4 py-3 font-medium transition-colors duration-200 ${activeTab === 'bomba-bernoulli' ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-blue-50'}`}
            onClick={() => setActiveTab('bomba-bernoulli')}
          >
            Trabajo de Bomba
          </button>
        </div>

        {/* Contenido principal */}
        <div className="bg-white shadow-md rounded-lg p-4">
          {activeTab === 'intro' && <IntroduccionSimulador setActiveTab={setActiveTab} />}
          {activeTab === 'manometro' && <ManometroSimulacion />}
          {activeTab === 'decantador-gravedad' && <DecantadorGravedadSimulacion />}
          {activeTab === 'decantador-centrifugo' && <DecantadorCentrifugoSimulacion />}
          {activeTab === 'bomba-bernoulli' && <BombaSimulacion />}
        </div>

        <footer className="mt-8 text-center text-gray-500 text-sm">
          <p>© 2025 Simulador de Mecánica de Fluidos - Creado para fines educativos</p>
        </footer>
      </div>
    </div>
  );
}

// Componente de introducción
const IntroduccionSimulador = ({ setActiveTab }) => {
  return (
    <div className="max-w-4xl mx-auto py-4">
      <h2 className="text-xl font-semibold mb-4 text-blue-700">Bienvenido al Simulador de Mecánica de Fluidos</h2>
      
      <p className="mb-4">
        Este simulador interactivo está diseñado para ayudar a comprender los principios físicos 
        y cálculos de diseño relacionados con diferentes dispositivos y fenómenos de la mecánica de fluidos.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <div className="bg-blue-50 p-4 rounded-lg shadow">
          <h3 className="text-lg font-medium text-blue-800 mb-2">Manómetros</h3>
          <p className="text-sm">
            Explora los principios básicos de los manómetros, instrumentos utilizados para medir diferencias de presión. 
            Aprende cómo la ecuación hidrostática relaciona la altura del fluido con la presión.
          </p>
          <button 
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            onClick={() => setActiveTab('manometro')}
          >
            Explorar
          </button>
        </div>
        
        <div className="bg-blue-50 p-4 rounded-lg shadow">
          <h3 className="text-lg font-medium text-blue-800 mb-2">Decantadores por Gravedad</h3>
          <p className="text-sm">
            Visualiza el proceso de separación de líquidos inmiscibles mediante la acción de la gravedad. 
            Comprende cómo las diferencias de densidad afectan la posición de la interfaz líquido-líquido.
          </p>
          <button 
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            onClick={() => setActiveTab('decantador-gravedad')}
          >
            Explorar
          </button>
        </div>
        
        <div className="bg-blue-50 p-4 rounded-lg shadow">
          <h3 className="text-lg font-medium text-blue-800 mb-2">Decantadores Centrífugos</h3>
          <p className="text-sm">
            Estudia la separación de líquidos mediante la fuerza centrífuga, especialmente útil cuando la 
            diferencia de densidades es pequeña. Analiza la influencia de la velocidad de rotación en la separación.
          </p>
          <button 
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            onClick={() => setActiveTab('decantador-centrifugo')}
          >
            Explorar
          </button>
        </div>
        
        <div className="bg-blue-50 p-4 rounded-lg shadow">
          <h3 className="text-lg font-medium text-blue-800 mb-2">Trabajo de Bomba en la Ecuación de Bernoulli</h3>
          <p className="text-sm">
            Comprende cómo incorporar el trabajo realizado por una bomba en la ecuación de Bernoulli. 
            Calcula presiones, potencias y eficiencias en sistemas de bombeo.
          </p>
          <button 
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            onClick={() => setActiveTab('bomba-bernoulli')}
          >
            Explorar
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;