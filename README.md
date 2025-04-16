# Simulador de Mecánica de Fluidos

<div align="center">
  <img src="https://github.com/pjvalverde/simulador-mecanica-fluidos/raw/main/public/assets/images/logo.png" alt="Simulador de Mecánica de Fluidos Logo" width="200"/>
  <br/>
  <p><strong>Una herramienta educativa interactiva para la enseñanza y aprendizaje de mecánica de fluidos</strong></p>
  <a href="#características">Características</a> •
  <a href="#visualizaciones">Visualizaciones</a> •
  <a href="#instalación">Instalación</a> •
  <a href="#uso">Uso</a> •
  <a href="#estructura-del-proyecto">Estructura</a> •
  <a href="#tecnologías">Tecnologías</a>
</div>

## Descripción

El Simulador de Mecánica de Fluidos es una aplicación web interactiva diseñada para facilitar la comprensión de conceptos fundamentales en la mecánica de fluidos. La aplicación proporciona simulaciones visuales detalladas de manómetros, decantadores por gravedad, decantadores centrífugos y sistemas de bombeo, permitiendo a estudiantes y profesionales explorar los principios físicos y variables de diseño de manera práctica.

Desarrollada con React y SVG animado, esta herramienta educativa ofrece una experiencia interactiva que complementa el estudio teórico, facilitando la visualización de fenómenos complejos y la comprensión de ecuaciones y principios de la mecánica de fluidos.

## Características

- **Interfaz Unificada**: Navegación intuitiva entre las diferentes simulaciones desde un panel central.
- **Simulaciones Interactivas**:
  - **Manómetros**: Visualización de la relación entre presión y altura en manómetros de tubo en U.
  - **Decantadores por Gravedad**: Simulación del proceso de separación de líquidos inmiscibles por acción gravitatoria.
  - **Decantadores Centrífugos**: Modelado de la separación de líquidos mediante fuerza centrífuga.
  - **Trabajo de Bomba**: Análisis del trabajo y potencia en sistemas de bombeo según la ecuación de Bernoulli.
- **Controles Paramétricos**: Ajuste en tiempo real de variables como densidades, dimensiones, velocidades y eficiencias.
- **Visualización Dinámica**: Animaciones que representan el comportamiento de los fluidos bajo diferentes condiciones.
- **Cálculos Automáticos**: Resultados numéricos instantáneos basados en ecuaciones fundamentales de la mecánica de fluidos.
- **Material Didáctico**: Guías tutoriales complementarias con ejercicios resueltos.

## Visualizaciones

<div align="center">
  <img src="https://github.com/pjvalverde/simulador-mecanica-fluidos/raw/main/public/assets/images/screenshots/manometro.png" alt="Simulación de Manómetro" width="400"/>
  <p><em>Simulación de Manómetro de Tubo en U</em></p>
  <br/>
  <img src="https://github.com/pjvalverde/simulador-mecanica-fluidos/raw/main/public/assets/images/screenshots/decantador-gravedad.png" alt="Simulación de Decantador por Gravedad" width="400"/>
  <p><em>Simulación de Decantador por Gravedad</em></p>
  <br/>
  <img src="https://github.com/pjvalverde/simulador-mecanica-fluidos/raw/main/public/assets/images/screenshots/decantador-centrifugo.png" alt="Simulación de Decantador Centrífugo" width="400"/>
  <p><em>Simulación de Decantador Centrífugo</em></p>
  <br/>
  <img src="https://github.com/pjvalverde/simulador-mecanica-fluidos/raw/main/public/assets/images/screenshots/bomba-bernoulli.png" alt="Simulación de Trabajo de Bomba" width="400"/>
  <p><em>Simulación de Trabajo de Bomba según la ecuación de Bernoulli</em></p>
</div>

## Instalación

### Requisitos Previos

- Node.js (v14.0.0 o superior)
- npm (v6.0.0 o superior)

### Pasos de Instalación

1. Clone el repositorio:
   ```bash
   git clone https://github.com/pjvalverde/simulador-mecanica-fluidos.git
   cd fluid-mechanics-simulator
   ```

2. Instale las dependencias:
   ```bash
   npm install
   ```

3. Inicie el servidor de desarrollo:
   ```bash
   npm start
   ```

4. Acceda a la aplicación en su navegador:
   ```
   http://localhost:3000
   ```

## Uso

### Navegación por el Simulador

1. En la página principal, seleccione la simulación que desea explorar haciendo clic en el botón correspondiente.
2. Cada simulación cuenta con un panel de control donde puede ajustar los parámetros relevantes.
3. La visualización se actualiza en tiempo real conforme modifica los parámetros.
4. Utilice el botón "Iniciar Simulación" para activar las animaciones del flujo de fluidos.

### Guías de Aprendizaje

- Consulte las guías tutoriales complementarias para profundizar en los conceptos teóricos:
  - **Guía Tutorial: Manómetros y Decantadores**: Principios físicos y métodos de cálculo.
  - **Tutorial de Ejercicios Resueltos: Trabajo de Bomba**: Problemas prácticos resueltos paso a paso.

## Estructura del Proyecto

```
simulador-mecanica-fluidos/
│
├── public/
│   ├── index.html
│   └── assets/
│       └── images/
│
├── src/
│   ├── components/
│   │   ├── Manometro/
│   │   │   ├── ManometroSimulacion.jsx
│   │   │   └── ManometroHelper.js
│   │   │
│   │   ├── DecantadorGravedad/
│   │   │   ├── DecantadorGravedadSimulacion.jsx
│   │   │   └── DecantadorGravedadHelper.js
│   │   │
│   │   ├── DecantadorCentrifugo/
│   │   │   ├── DecantadorCentrifugoSimulacion.jsx
│   │   │   └── DecantadorCentrifugoHelper.js
│   │   │
│   │   └── TrabajoBomba/
│   │       ├── BombaSimulacion.jsx
│   │       └── BombaHelper.js
│   │
│   ├── utils/
│   │   ├── fluidMechanics.js
│   │   └── constants.js
│   │
│   ├── App.jsx
│   └── index.js
│
├── docs/
│   ├── guia-manometros-decantadores.md
│   └── tutorial-trabajo-bomba.md
│
├── package.json
└── README.md
```

## Tecnologías

- **React**: Framework de JavaScript para la interfaz de usuario
- **SVG**: Gráficos vectoriales para las visualizaciones dinámicas
- **TailwindCSS**: Framework de CSS para el diseño de la interfaz
- **JavaScript ES6+**: Funcionalidades modernas de JavaScript
- **HTML5**: Estructura semántica del documento

## Implementación en Entornos Educativos

### Para Profesores

1. **Integración en LMS**: La aplicación puede embeberse en sistemas de gestión de aprendizaje mediante iframe.
2. **Material Complementario**: Utilice las guías tutoriales como material de apoyo para sus clases.
3. **Ejercicios Prácticos**: Asigne problemas específicos que los estudiantes puedan resolver utilizando el simulador.

### Para Estudiantes

1. **Estudio Autónomo**: Explore los conceptos a su propio ritmo, experimentando con diferentes parámetros.
2. **Verificación de Cálculos**: Compruebe sus soluciones manuales con las predicciones del simulador.
3. **Comprensión Visual**: Visualice conceptos abstractos para mejorar su entendimiento teórico.

## Contribución

Las contribuciones son bienvenidas y apreciadas. Para contribuir:

1. Haga un fork del proyecto
2. Cree una rama para su característica (`git checkout -b feature/nueva-caracteristica`)
3. Realice sus cambios y haga commit (`git commit -m 'Añadir nueva característica'`)
4. Haga push a la rama (`git push origin feature/nueva-caracteristica`)
5. Abra un Pull Request

Para contribuciones importantes, por favor abra primero un issue para discutir los cambios propuestos.

## Licencia

Este proyecto está bajo la licencia MIT. Consulte el archivo `LICENSE` para más detalles.

## Contacto

Para preguntas, sugerencias o colaboraciones, por favor contacte:

- **Desarrollador Principal**: [Pablo Valverde](mailto:pblvalverde@gmail.com)
- **Institución**: [PUCE](https://www.puce.edu.ec)

---

<div align="center">
  <p>Desarrollado con ❤️ para la enseñanza de la mecánica de fluidos</p>
  <p>© 2025 - [PUCE]</p>
</div>