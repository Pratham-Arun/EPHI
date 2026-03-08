# ExoPlanet Habitability Index

![ExoPlanet Habitability Index Header](https://img.shields.io/badge/Status-Completed-success) ![License](https://img.shields.io/badge/License-MIT-blue)

ExoPlanet Habitability Index is a beautiful, interactive, front-end web platform designed to demonstrate concepts related to exoplanet habitability analysis using planetary and stellar parameters.

This platform provides an educational interface that allows users to explore exoplanet data, visualize planetary orbits, and estimate potential habitability based on simplified heuristic rules. 

---

## 🚀 Features

- **Habitability Explorer**: Input planetary parameters (Planet Radius, Mass, Orbital Distance) and stellar properties to calculate an estimated habitability score and view the classification (Habitable, Potentially Habitable, Non-Habitable).
- **Standalone Orbitalis Simulation**: A state-of-the-art 3D interactive model of the solar system embedded as a dedicated workspace module.
- **Glassmorphic Space Aesthetics**: Detailed, premium, dark-mode CSS styling with glowing buttons, parallax star background, and animated interface components.
- **Methodology & Data Transparency**: Detailed explanations of the machine learning pipeline approach and data sources used to formulate habitability parameters.
- **Results & Data Visualization**: Interactive charts powered by `Chart.js` displaying the distribution of known habitable planets across various boundaries.

---

## 🛠️ Technology Stack

EPHI is built strictly as a **100% Client-Side Web Application** to ensure high performance and easy deployment without backend requirements.

- **Core**: HTML5, Vanilla JavaScript (ES6+), CSS3
- **Data Visualization**: `Chart.js`
- **Simulation Submodule ([Orbitalis](https://github.com/Pyugt/Orbitalis))**: React, Three.js, React Three Fiber, Zustand. *Compiled into a static output to retain the serverless nature of EPHI.*

---

## 📊 Data Sources

The heuristic rules and dataset parameters referenced within the application draw upon official astronomical archives:
1. **[NASA Exoplanet Archive](https://exoplanetarchive.ipac.caltech.edu/)** - The primary source of confirmed exoplanet data and stellar properties.
2. **[Kaggle Exoplanet Datasets](https://www.kaggle.com/datasets?search=exoplanet)** - Cleaned, machine-learning-ready datasets containing preprocessed features and labels.

---

## 💻 How to Run Locally

Since EPHI does not require a backend, running the project locally is incredibly simple:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Pratham-Arun/EPHI.git
   cd EPHI
   ```

2. **Serve the files**:
   You can use any local web server (like VS Code Live Server). Alternatively, use `npx serve`:
   ```bash
   npx serve -p 8080
   ```

3. **Open your browser**:
   Navigate to `http://localhost:8080` to experience the EPHI platform!

---

## 👥 Team Members

This project was brought to life by the following contributors:
- **Shreyas Jha** - [GitHub Profile](https://github.com/Zaa-Shreyas)
- **Pratham Arun** - [GitHub Profile](https://github.com/Pratham-Arun)
- **Saksham Mathur** - [GitHub Profile](https://github.com/WesselBoi)
- **Piyush Gautam** - [GitHub Profile](https://github.com/Pyugt)

*Thank you to the whole team for their open-source contributions to space exploration education.*
