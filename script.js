// Estado de la app (temporal en memoria)
let vinoActual = null;
let stockInicial = 0;
let stockActual = 0;
let ventas = 0;

// Elementos
const inputNombre = document.getElementById('nombreVin');
const inputStockInicial = document.getElementById('stockInicial');
const btnGuardar = document.getElementById('btnGuardar');

const registrarSeccion = document.getElementById('registrar-vino');
const controlSeccion = document.getElementById('control-vino');
const stockDisplay = document.getElementById('stockDisplay');
const stockActualEl = document.getElementById('stockActual');
const btnVenta = document.getElementById('btnVenta');
const btnRestar = document.getElementById('btnRestar');
const btnAdd = document.getElementById('btnAdd');
const btnSumar = document.getElementById('btnSumar');
const btnFinalizar = document.getElementById('btnFinalizar');

const resumenSeccion = document.getElementById('resumen');
const resNombre = document.getElementById('resNombre');
const resInicial = document.getElementById('resInicial');
const resFinal = document.getElementById('resFinal');
const resVentas = document.getElementById('resVentas');

// Funciones
function actualizarVistaStock() {
  stockActualEl.textContent = stockActual;
  // color de fondo según stock
  if (stockActual <= 3) {
    stockDisplay.style.backgroundColor = '#fee2e2'; // rojo suave
  } else {
    stockDisplay.style.backgroundColor = '#e6f6ea'; // verde suave
  }
}

function resetearTurno() {
  vinoActual = null;
  stockInicial = 0;
  stockActual = 0;
  ventas = 0;
  // Ocultar/mostrar secciones
  registrarSeccion.hidden = false;
  controlSeccion.hidden = true;
  resumenSeccionHidden();
  // Limpiar inputs
  inputNombre.value = '';
  inputStockInicial.value = '';
}

function resumenSeccionHidden() {
  resumenSeccion.hidden = true;
}

function iniciarTurnoConDatos() {
  const nombre = inputNombre.value.trim();
  const inicial = Number(inputStockInicial.value);
  if (!nombre) {
    alert('Por favor, ingresa el nombre del vino.');
    return;
  }
  if (!Number.isFinite(inicial) || inicial < 0) {
    alert('Stock inicial debe ser un número 0 o mayor.');
    return;
  }
  vinoActual = nombre;
  stockInicial = inicial;
  stockActual = inicial;
  ventas = 0;

  // Actualizar vista
  registrarSeccion.hidden = true;
  controlSeccion.hidden = false;
  document.getElementById('stockActual').textContent = stockActual;
  actualizarVistaStock();
  // Mostrar solo las opciones relevantes
  btnRestar.style.display = 'inline-flex';
  btnSumar.style.display = 'inline-flex';
  // Enfocar primer botón
  btnVenta.focus();
}

// Eventos
btnGuardar.addEventListener('click', iniciarTurnoConDatos);

btnVenta.addEventListener('click', () => {
  if (stockActual <= 0) return;
  stockActual -= 1;
  ventas += 1;
  document.getElementById('stockActual').textContent = stockActual;
  actualizarVistaStock();
});

btnRestar.addEventListener('click', () => {
  if (stockActual <= 0) return;
  stockActual -= 1;
  ventas += 1; // considerar como retirada
  document.getElementById('stockActual').textContent = stockActual;
  actualizarVistaStock();
});

btnAdd.addEventListener('click', () => {
  stockActual += 1;
  document.getElementById('stockActual').textContent = stockActual;
  actualizarVistaStock();
});

btnSumar.addEventListener('click', () => {
  stockActual += 1;
  document.getElementById('stockActual').textContent = stockActual;
  actualizarVistaStock();
});

btnFinalizar.addEventListener('click', () => {
  // Mostrar resumen del cierre
  resNombre.textContent = 'Nombre: ' + (vinoActual ?? '-');
  resInicial.textContent = 'Stock inicial: ' + stockInicial;
  resFinal.textContent = 'Stock final: ' + stockActual;
  resVentas.textContent = 'Ventas registradas: ' + ventas;
  // Mostrar resumen
  resumenSeccion.hidden = false;
  // Ocultar control de turno para evitar cambios
  controlSeccion.hidden = true;
  // Nota: al finalizar, no guardamos nada en almacenamiento externo.
});

// Inicializar estado
(function main() {
  resetearTurno();
})();

// Opcional: reiniciar con F5 recarga de la página ya restablece por diseño
