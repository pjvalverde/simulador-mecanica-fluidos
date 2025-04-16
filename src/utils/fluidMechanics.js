// src/utils/fluidMechanics.js
// Funciones de cálculo para mecánica de fluidos

// Cálculo de presión hidrostática
export const calcularPresionHidrostatica = (densidad, gravedad, altura) => {
    return densidad * gravedad * altura;
  };
  
  // Cálculo de diferencia de altura en manómetro
  export const calcularDiferenciaManometro = (presionA, presionB, densidadA, densidadB, gravedad = 9.81) => {
    const diferenciaPa = presionA - presionB;
    const diferenciaRho = densidadA - densidadB;
    
    // R_m = (p_a - p_b) / [g·(ρ_A - ρ_B)]
    const lecturaMetros = diferenciaPa / (gravedad * diferenciaRho);
    
    return lecturaMetros * 1000; // Convertir a mm
  };
  
  // Cálculo de interfaz en decantador por gravedad
  export const calcularInterfazGravedad = (alturaA2, alturaTotal, densidadA, densidadB) => {
    const relacionDensidades = densidadB / densidadA;
    const denominador = 1 - relacionDensidades;
    const interfaz = (alturaA2 - alturaTotal * relacionDensidades) / denominador;
    
    return interfaz;
  };
  
  // Cálculo de interfaz en decantador centrífugo
  export const calcularInterfazCentrifugo = (radioA, radioB, densidadA, densidadB) => {
    const relacionDensidades = densidadB / densidadA;
    const numerador = Math.pow(radioA, 2) - relacionDensidades * Math.pow(radioB, 2);
    const denominador = 1 - relacionDensidades;
    const radioInterfaz = Math.sqrt(numerador / denominador);
    
    return radioInterfaz;
  };
  
  // Cálculo de presión en pared de decantador centrífugo
  export const calcularPresionPared = (velocidadRPM, radioInterno, radioExterno, densidad) => {
    // Convertir RPM a rad/s
    const velocidadRads = (velocidadRPM * 2 * Math.PI) / 60;
    
    // p_2 - p_1 = ω²·ρ·(r_2² - r_1²)/2
    const presionDiferencia = (Math.pow(velocidadRads, 2) * densidad * 
                              (Math.pow(radioExterno, 2) - Math.pow(radioInterno, 2))) / 2;
    
    return presionDiferencia / 1000; // Convertir a kPa
  };
  
  // Cálculo de trabajo de bomba
  export const calcularTrabajoBomba = (gravedad, alturaDescarga, velocidadA, velocidadB, perdidasFriccion, eficiencia) => {
    const trabajoTeorico = gravedad * alturaDescarga + 
                           (Math.pow(velocidadB, 2) - Math.pow(velocidadA, 2)) / 2 + 
                           perdidasFriccion;
    
    // Trabajo real considerando la eficiencia
    const trabajoReal = trabajoTeorico / (eficiencia / 100);
    
    return trabajoReal;
  };
  
  // Cálculo de potencia de bomba
  export const calcularPotenciaBomba = (trabajoBomba, flujoMasico) => {
    return (trabajoBomba * flujoMasico) / 1000; // kW
  };