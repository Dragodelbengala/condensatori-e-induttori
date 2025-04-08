document.getElementById('start-simulation').addEventListener('click', startSimulation);

const canvas = document.getElementById('circuit-canvas');
const ctx = canvas.getContext('2d');

// Impostiamo le dimensioni del canvas
canvas.width = 600;
canvas.height = 400;

// Parametri di simulazione
let resistance = 1000;  // Ω
let capacitance = 0.001;  // F
let inductance = 0.002;  // H

// Parametri di tempo
const timeStep = 0.1;  // secondi
let time = 0;  // tempo in secondi

// Funzione per caricare il condensatore (Circuito RC)
function simulateRC() {
  const tau = resistance * capacitance;
  const voltageMax = 5; // Tensione massima della fonte in V
  const voltage = voltageMax * (1 - Math.exp(-time / tau));  // Legge di carica del condensatore
  
  // Simuliamo la carica del condensatore disegnando il suo progresso
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // Disegniamo il condensatore
  ctx.beginPath();
  ctx.arc(300, 200, 50, 0, 2 * Math.PI);
  ctx.fillStyle = `rgb(${Math.min(voltage * 50, 255)}, 50, 50)`;  // Colore che cambia con la tensione
  ctx.fill();
  ctx.stroke();

  // Aggiorniamo il tempo
  time += timeStep;
  
  // Continuare la simulazione fino a quando non è completamente carico
  if (time < 5 * tau) {
    requestAnimationFrame(simulateRC);
  }
}

// Funzione per la simulazione RL
function simulateRL() {
  const tau = resistance / inductance;
  const currentMax = 5 / resistance; // Corrente massima teorica
  const current = currentMax * (1 - Math.exp(-time / tau));  // Legge di crescita della corrente

  // Simuliamo l'aumento della corrente disegnando una linea
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // Disegniamo l'induttore
  ctx.beginPath();
  ctx.moveTo(0, 250);
  ctx.lineTo(current * 100, 250);  // La lunghezza della linea cambia con la corrente
  ctx.strokeStyle = `rgb(50, ${Math.min(current * 100, 255)}, 50)`;  // Colore che cambia con la corrente
  ctx.lineWidth = 6;
  ctx.stroke();

  // Aggiorniamo il tempo
  time += timeStep;
  
  // Continuare la simulazione fino a quando non raggiunge il valore massimo
  if (time < 5 * tau) {
    requestAnimationFrame(simulateRL);
  }
}

// Funzione per avviare la simulazione
function startSimulation() {
  // Prendi i valori di input
  resistance = parseFloat(document.getElementById('resistance').value);
  capacitance = parseFloat(document.getElementById('capacitance').value);
  inductance = parseFloat(document.getElementById('inductance').value);

  // Ripristina il tempo e avvia la simulazione
  time = 0;
  
  // Scegli quale simulazione eseguire
  if (capacitance > 0) {
    simulateRC();
  } else if (inductance > 0) {
    simulateRL();
  }
}
