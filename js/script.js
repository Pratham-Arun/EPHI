/* ==========================================
   EPHI — Exoplanet Habitability Index
   Main JavaScript
   ========================================== */

// ---- DOM Ready ----
document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initScrollReveal();
    initCharts();
    initExplorerDefaults();
});

// ==========================================
// NAVIGATION
// ==========================================

function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');

    // Scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile toggle
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('open');
            navToggle.classList.toggle('active');
        });
    }

    // Close menu on link click
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('open');
            navToggle?.classList.remove('active');
        });
    });
}

// ==========================================
// SCROLL REVEAL ANIMATION
// ==========================================

function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    reveals.forEach(el => observer.observe(el));
}

// ==========================================
// CHART.JS VISUALIZATIONS (Results Page)
// ==========================================

function initCharts() {
    // Only run on results page
    if (!document.getElementById('modelComparisonChart')) return;

    // Global Chart.js defaults
    Chart.defaults.color = '#9ca3af';
    Chart.defaults.font.family = "'Inter', sans-serif";
    Chart.defaults.plugins.legend.labels.padding = 16;
    Chart.defaults.plugins.legend.labels.usePointStyle = true;

    createModelComparisonChart();
    createFeatureImportanceChart();
    createHabitabilityDistChart();
    createCorrelationChart();
}

function createModelComparisonChart() {
    const ctx = document.getElementById('modelComparisonChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Logistic Regression', 'Decision Tree', 'Random Forest', 'XGBoost'],
            datasets: [
                {
                    label: 'Accuracy',
                    data: [0.872, 0.891, 0.928, 0.942],
                    backgroundColor: 'rgba(56, 189, 248, 0.8)',
                    borderColor: 'rgba(56, 189, 248, 1)',
                    borderWidth: 1,
                    borderRadius: 6,
                },
                {
                    label: 'Precision',
                    data: [0.854, 0.876, 0.915, 0.935],
                    backgroundColor: 'rgba(52, 211, 153, 0.8)',
                    borderColor: 'rgba(52, 211, 153, 1)',
                    borderWidth: 1,
                    borderRadius: 6,
                },
                {
                    label: 'Recall',
                    data: [0.831, 0.862, 0.901, 0.921],
                    backgroundColor: 'rgba(251, 191, 36, 0.8)',
                    borderColor: 'rgba(251, 191, 36, 1)',
                    borderWidth: 1,
                    borderRadius: 6,
                },
                {
                    label: 'F1 Score',
                    data: [0.842, 0.869, 0.913, 0.928],
                    backgroundColor: 'rgba(167, 139, 250, 0.8)',
                    borderColor: 'rgba(167, 139, 250, 1)',
                    borderWidth: 1,
                    borderRadius: 6,
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            scales: {
                y: {
                    beginAtZero: false,
                    min: 0.7,
                    max: 1.0,
                    grid: { color: 'rgba(56, 189, 248, 0.05)' },
                    ticks: {
                        callback: (val) => (val * 100).toFixed(0) + '%'
                    }
                },
                x: {
                    grid: { display: false }
                }
            },
            plugins: {
                tooltip: {
                    callbacks: {
                        label: (ctx) => ctx.dataset.label + ': ' + (ctx.parsed.y * 100).toFixed(1) + '%'
                    }
                }
            }
        }
    });
}

function createFeatureImportanceChart() {
    const ctx = document.getElementById('featureImportanceChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: [
                'Insolation Flux',
                'Eq. Temperature',
                'Semi-Major Axis',
                'Stellar Temp',
                'Planet Radius',
                'Orbital Period',
                'Planet Mass',
                'Stellar Luminosity',
                'Stellar Radius'
            ],
            datasets: [{
                label: 'Importance',
                data: [0.281, 0.198, 0.142, 0.112, 0.089, 0.067, 0.052, 0.038, 0.021],
                backgroundColor: [
                    'rgba(56, 189, 248, 0.85)',
                    'rgba(96, 165, 250, 0.85)',
                    'rgba(167, 139, 250, 0.85)',
                    'rgba(52, 211, 153, 0.75)',
                    'rgba(251, 191, 36, 0.75)',
                    'rgba(248, 113, 113, 0.65)',
                    'rgba(56, 189, 248, 0.55)',
                    'rgba(96, 165, 250, 0.45)',
                    'rgba(167, 139, 250, 0.35)',
                ],
                borderWidth: 0,
                borderRadius: 6,
            }]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: true,
            scales: {
                x: {
                    grid: { color: 'rgba(56, 189, 248, 0.05)' },
                    ticks: {
                        callback: (val) => (val * 100).toFixed(0) + '%'
                    }
                },
                y: {
                    grid: { display: false }
                }
            },
            plugins: {
                legend: { display: false },
                tooltip: {
                    callbacks: {
                        label: (ctx) => 'Importance: ' + (ctx.parsed.x * 100).toFixed(1) + '%'
                    }
                }
            }
        }
    });
}

function createHabitabilityDistChart() {
    const ctx = document.getElementById('habitabilityDistChart').getContext('2d');
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Non-Habitable', 'Potentially Habitable', 'Habitable'],
            datasets: [{
                data: [4120, 720, 160],
                backgroundColor: [
                    'rgba(248, 113, 113, 0.8)',
                    'rgba(251, 191, 36, 0.8)',
                    'rgba(52, 211, 153, 0.8)',
                ],
                borderColor: [
                    'rgba(248, 113, 113, 1)',
                    'rgba(251, 191, 36, 1)',
                    'rgba(52, 211, 153, 1)',
                ],
                borderWidth: 2,
                hoverOffset: 10,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            cutout: '55%',
            plugins: {
                legend: {
                    position: 'bottom',
                },
                tooltip: {
                    callbacks: {
                        label: (ctx) => {
                            const total = ctx.dataset.data.reduce((a, b) => a + b, 0);
                            const pct = ((ctx.parsed / total) * 100).toFixed(1);
                            return ctx.label + ': ' + ctx.parsed.toLocaleString() + ' (' + pct + '%)';
                        }
                    }
                }
            }
        }
    });
}

function createCorrelationChart() {
    const ctx = document.getElementById('correlationChart').getContext('2d');
    const features = ['Radius', 'Mass', 'Period', 'SMA', 'S.Temp', 'S.Lum', 'Flux', 'Eq.Temp'];

    // Correlation matrix data (simplified)
    const correlationData = [
        [1.00, 0.85, 0.12, 0.15, -0.05, 0.08, -0.22, -0.18],
        [0.85, 1.00, 0.18, 0.20, -0.03, 0.10, -0.25, -0.20],
        [0.12, 0.18, 1.00, 0.92, -0.08, 0.15, -0.72, -0.55],
        [0.15, 0.20, 0.92, 1.00, -0.10, 0.18, -0.78, -0.62],
        [-0.05, -0.03, -0.08, -0.10, 1.00, 0.72, 0.35, 0.68],
        [0.08, 0.10, 0.15, 0.18, 0.72, 1.00, -0.12, 0.42],
        [-0.22, -0.25, -0.72, -0.78, 0.35, -0.12, 1.00, 0.82],
        [-0.18, -0.20, -0.55, -0.62, 0.68, 0.42, 0.82, 1.00],
    ];

    // Build scatter data for heatmap
    const data = [];
    correlationData.forEach((row, i) => {
        row.forEach((val, j) => {
            data.push({ x: j, y: i, v: val });
        });
    });

    // Draw heatmap using a bubble chart
    new Chart(ctx, {
        type: 'bubble',
        data: {
            datasets: [{
                data: data.map(d => ({
                    x: d.x,
                    y: d.y,
                    r: Math.abs(d.v) * 18 + 4,
                })),
                backgroundColor: data.map(d => {
                    if (d.v > 0.5) return 'rgba(52, 211, 153, 0.8)';
                    if (d.v > 0.2) return 'rgba(56, 189, 248, 0.6)';
                    if (d.v > -0.2) return 'rgba(156, 163, 175, 0.4)';
                    if (d.v > -0.5) return 'rgba(251, 191, 36, 0.6)';
                    return 'rgba(248, 113, 113, 0.8)';
                }),
                borderWidth: 0,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            scales: {
                x: {
                    type: 'linear',
                    min: -0.5,
                    max: 7.5,
                    grid: { color: 'rgba(56, 189, 248, 0.05)' },
                    ticks: {
                        callback: (val) => features[val] || '',
                        stepSize: 1,
                    }
                },
                y: {
                    type: 'linear',
                    min: -0.5,
                    max: 7.5,
                    grid: { color: 'rgba(56, 189, 248, 0.05)' },
                    ticks: {
                        callback: (val) => features[val] || '',
                        stepSize: 1,
                    },
                    reverse: true,
                }
            },
            plugins: {
                legend: { display: false },
                tooltip: {
                    callbacks: {
                        label: (ctx) => {
                            const idx = ctx.dataIndex;
                            const d = data[idx];
                            return features[d.x] + ' vs ' + features[d.y] + ': ' + d.v.toFixed(2);
                        }
                    }
                }
            }
        }
    });
}

// ==========================================
// HABITABILITY EXPLORER
// ==========================================

function initExplorerDefaults() {
    const resultPanel = document.getElementById('resultPanel');
    if (resultPanel) {
        resultPanel.classList.add('visible');
    }
}

// Planetary presets
const presets = {
    earth: { dist: 1.0, temp: 5778, radius: 1.0, mass: 1.0 },
    mars: { dist: 1.524, temp: 5778, radius: 0.532, mass: 0.107 },
    venus: { dist: 0.723, temp: 5778, radius: 0.949, mass: 0.815 },
    jupiter: { dist: 5.203, temp: 5778, radius: 11.21, mass: 317.8 },
    proxima: { dist: 0.049, temp: 3042, radius: 1.08, mass: 1.27 },
    trappist: { dist: 0.029, temp: 2566, radius: 0.92, mass: 0.69 },
};

function setPreset(name) {
    const p = presets[name];
    if (!p) return;
    document.getElementById('orbitalDistance').value = p.dist;
    document.getElementById('stellarTemp').value = p.temp;
    document.getElementById('planetRadius').value = p.radius;
    document.getElementById('planetMass').value = p.mass;
    predictHabitability();
}

function predictHabitability() {
    const dist = parseFloat(document.getElementById('orbitalDistance').value) || 1.0;
    const sTemp = parseFloat(document.getElementById('stellarTemp').value) || 5778;
    const radius = parseFloat(document.getElementById('planetRadius').value) || 1.0;
    const mass = parseFloat(document.getElementById('planetMass').value) || 1.0;

    // ---- Derived calculations ----

    // Stellar luminosity estimate (relative to Sun)
    const luminosity = Math.pow(sTemp / 5778, 4);

    // Insolation flux (relative to Earth)
    const flux = luminosity / (dist * dist);

    // Equilibrium temperature (K)
    const eqTemp = 278 * Math.pow(flux, 0.25);

    // Surface gravity factor (relative to Earth)
    const gravity = mass / (radius * radius);

    // ---- Habitability scoring ----
    let score = 0;

    // Flux scoring (weight: 35%)
    // Ideal range: 0.36 – 1.11 S⊕
    if (flux >= 0.36 && flux <= 1.11) {
        score += 35 * (1 - Math.abs(flux - 0.75) / 0.75);
    } else if (flux > 0.2 && flux < 2.0) {
        score += 15 * (1 - Math.min(Math.abs(flux - 0.75) / 1.25, 1));
    }

    // Temperature scoring (weight: 30%)
    // Ideal range: 200 – 320 K
    if (eqTemp >= 200 && eqTemp <= 320) {
        score += 30 * (1 - Math.abs(eqTemp - 260) / 120);
    } else if (eqTemp >= 150 && eqTemp <= 400) {
        score += 10 * (1 - Math.min(Math.abs(eqTemp - 260) / 200, 1));
    }

    // Size scoring (weight: 20%)
    // Ideal radius: 0.5 – 2.5 R⊕
    if (radius >= 0.5 && radius <= 2.5) {
        score += 20 * (1 - Math.abs(radius - 1.0) / 2.0);
    } else if (radius >= 0.3 && radius <= 5.0) {
        score += 5;
    }

    // Gravity scoring (weight: 15%)
    // Ideal gravity: 0.4 – 2.0 g
    if (gravity >= 0.4 && gravity <= 2.0) {
        score += 15 * (1 - Math.abs(gravity - 1.0) / 1.5);
    } else if (gravity >= 0.1 && gravity <= 5.0) {
        score += 3;
    }

    // Clamp score
    score = Math.max(0, Math.min(100, score));

    // Classification
    let classification, emoji, cssClass;
    if (score >= 65) {
        classification = 'Habitable';
        emoji = '🌍';
        cssClass = 'habitable';
    } else if (score >= 35) {
        classification = 'Potentially Habitable';
        emoji = '🟡';
        cssClass = 'potentially';
    } else {
        classification = 'Non-Habitable';
        emoji = '🔴';
        cssClass = 'non-habitable';
    }

    // Simulated confidence
    const confidence = (70 + Math.random() * 25).toFixed(1);

    // ---- Update UI ----
    const resultPanel = document.getElementById('resultPanel');
    resultPanel.classList.add('visible');

    document.getElementById('resultEmoji').textContent = emoji;

    const scoreEl = document.getElementById('resultScore');
    scoreEl.textContent = score.toFixed(1) + '%';
    scoreEl.className = 'result-score ' + cssClass;

    document.getElementById('resultClass').textContent = classification;
    document.getElementById('resultConfidence').textContent = 'Confidence: ' + confidence + '% (simulated)';

    document.getElementById('detailFlux').textContent = flux.toFixed(3) + ' S⊕';
    document.getElementById('detailTemp').textContent = eqTemp.toFixed(1) + ' K';
    document.getElementById('detailGravity').textContent = gravity.toFixed(3) + ' g';

    // HZ position
    const innerHZ = 0.95 * Math.sqrt(luminosity);
    const outerHZ = 1.37 * Math.sqrt(luminosity);
    let hzStatus;
    if (dist >= innerHZ && dist <= outerHZ) {
        hzStatus = '✅ Inside HZ';
    } else if (dist < innerHZ) {
        hzStatus = '🔥 Inside inner edge';
    } else {
        hzStatus = '❄️ Outside outer edge';
    }
    document.getElementById('detailHZ').textContent = hzStatus;

    // Animate the result panel
    resultPanel.style.animation = 'none';
    resultPanel.offsetHeight; // trigger reflow
    resultPanel.style.animation = 'fadeSlideUp 0.5s ease-out';
}
