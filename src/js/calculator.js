
const previousOperandElement = document.querySelector('.previous-operand');
const currentOperandElement = document.querySelector('.current-operand');
let currentOperand = '';
let previousOperand = '';
let operation = null;

function updateDisplay() {
    currentOperandElement.textContent = currentOperand;
    previousOperandElement.textContent = operation
        ? `${previousOperand} ${operation}`
        : previousOperand;
}
function appendNumber(number) {
    if (number === '.' && currentOperand.includes('.')) return;
    currentOperand += number;
}
function chooseOperation(op) {
    if (currentOperand === '') return;
    if (previousOperand !== '') {
        compute();
    }
    operation = op;
    previousOperand = currentOperand;
    currentOperand = '';
}
function compute() {
    let computation;
    const prev = parseFloat(previousOperand);
    const current = parseFloat(currentOperand);
    if (isNaN(prev) || isNaN(current)) return;

    switch (operation) {
        case '+':
            computation = prev + current;
            break;
        case '-':
            computation = prev - current;
            break;
        case '×':
            computation = prev * current;
            break;
        case '÷':
            computation = current === 0 ? 'Error' : prev / current;
            break;
        default:
            return;
    }
    currentOperand = computation.toString();
    operation = null;
    previousOperand = '';
}
function clearAll() {
    currentOperand = '';
    previousOperand = '';
    operation = null;
}
function deleteLast() {
    currentOperand = currentOperand.slice(0, -1);
}
document.querySelectorAll('.number').forEach(button => {
    button.addEventListener('click', () => {
        appendNumber(button.textContent);
        updateDisplay();
    });
});

document.querySelectorAll('.input').forEach(button => {
    if (button.classList.contains('addition')) button.addEventListener('click', () => chooseOperation('+'));
    if (button.classList.contains('minus')) button.addEventListener('click', () => chooseOperation('-'));
    if (button.classList.contains('multiply')) button.addEventListener('click', () => chooseOperation('×'));
    if (button.classList.contains('division')) button.addEventListener('click', () => chooseOperation('÷'));
});

document.querySelector('.equal').addEventListener('click', () => {
    compute();
    updateDisplay();
});

document.querySelector('.clear').addEventListener('click', () => {
    clearAll();
    updateDisplay();
});

document.querySelector('.delete').addEventListener('click', () => {
    deleteLast();
    updateDisplay();
});
