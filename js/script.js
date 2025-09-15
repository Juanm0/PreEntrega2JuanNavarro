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

function saveHistoryToStorage(list) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    } catch (e) {
        console.error('No se pudo guardar en localStorage', e);
    }
}


function loadHistoryFromStorage() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        return raw ? JSON.parse(raw) : [];
    } catch (e) {
        console.error('Error leyendo localStorage', e);
        return [];
    }
}


function formatOperationText(op) {
    switch (op) {
        case 'sum': return '+';
        case 'sub': return '-';
        case 'mul': return '×';
        case 'div': return '÷';
        case 'pow': return '^';
        case 'mod': return '%';
        default: return op;
    }
}

// Calculo principal en una función parametrizada (escalabilidad)
function compute(a, b, operation) {
    const x = Number(a);
    const y = Number(b);


    if (isNaN(x) || isNaN(y)) {
        throw new Error('Los valores deben ser numéricos');
    }


    switch (operation) {
        case 'sum': return x + y;
        case 'sub': return x - y;
        case 'mul': return x * y;
        case 'div':
            if (y === 0) throw new Error('División por cero');
            return x / y;
        case 'pow': return Math.pow(x, y);
        case 'mod':
            if (y === 0) throw new Error('Módulo por cero');
            return x % y;
        default: throw new Error('Operación no soportada');
    }
}

// --- Render y UI ---
function renderHistory(list) {
    historyList.innerHTML = '';
    if (!list || list.length === 0) {
        const li = document.createElement('li');
        li.className = 'small-muted';
        li.textContent = 'No hay operaciones aún.';
        historyList.appendChild(li);
        return;
    }


    // mostrar de más reciente a más antiguo
    list.slice().reverse().forEach(item => {
        const li = document.createElement('li');
        li.className = 'history-item';


        const left = document.createElement('div');
        left.innerHTML = `<div><strong>${item.a} ${formatOperationText(item.operation)} ${item.b}</strong></div><div class='small-muted'>${new Date(item.timestamp).toLocaleString()}</div>`;


        const right = document.createElement('div');
        right.innerHTML = `<div><strong>${item.result}</strong></div>`;


        li.appendChild(left);
        li.appendChild(right);
        historyList.appendChild(li);
    });
}


function showResultText(text) {
    resultadoDiv.textContent = text;
}

// --- Eventos ---
calculatorForm.addEventListener('submit', function (ev) {
    ev.preventDefault();


    const a = inputA.value.trim();
    const b = inputB.value.trim();
    const op = selectOperacion.value;


    // validación en DOM
    if (a === '' || b === '') {
        showResultText('Por favor completa ambos valores.');
        return;
    }


    try {
        const result = compute(a, b, op);
        const display = Number(result.toFixed(6)); // limitar decimales útiles
        showResultText(display);


        // crear objeto, empujar al historial y guardar
        const calcObj = createCalculationObject(a, b, op, display);
        historial.push(calcObj);
        saveHistoryToStorage(historial);
        renderHistory(historial);


    } catch (err) {
        // mostrar errores amigables en el DOM (no alert)
        showResultText('Error: ' + err.message);
    }
});

limpiarFormBtn.addEventListener('click', function () {
    calculatorForm.reset();
    showResultText('-');
});


clearHistoryBtn.addEventListener('click', function () {
    if (!confirm('¿Borrar todo el historial?')) return; // confirm usado solo para evitar borrados accidentales
    historial = [];
    saveHistoryToStorage(historial);
    renderHistory(historial);
});


exportJsonBtn.addEventListener('click', function () {
    const dataStr = JSON.stringify(historial, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'calculadora_historial.json';
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
});


// opcional: cargar historial al inicio (ya ejecutado arriba). Aquí se ofrece una función pública por si se necesita re-render
window.reloadHistory = function () {
    historial = loadHistoryFromStorage();
    renderHistory(historial);
};