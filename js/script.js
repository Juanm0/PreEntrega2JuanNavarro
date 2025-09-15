// --- Constantes y selectores ---
const calculatorForm = document.getElementById('calculatorForm');
const inputA = document.getElementById('valorA');
const inputB = document.getElementById('valorB');
const selectOperacion = document.getElementById('operacion');
const resultadoDiv = document.getElementById('resultado');
const historyList = document.getElementById('historyList');
const clearHistoryBtn = document.getElementById('clearHistoryBtn');
const exportJsonBtn = document.getElementById('exportJsonBtn');
const limpiarFormBtn = document.getElementById('limpiarFormBtn');


// Key para localStorage
const STORAGE_KEY = 'entregable2_calculadora_historial_v1';


// Carga inicial del historial desde storage
let historial = loadHistoryFromStorage();
renderHistory(historial);


// --- Funciones utilitarias ---
function createCalculationObject(a, b, operation, result) {
return {
id: Date.now(),
timestamp: new Date().toISOString(),
a: Number(a),
b: Number(b),
operation,
result
};
}