const display = document.querySelector(".displayValue");
let currentValue = "0";
let previousValue = "";
let operator = "";
let waitingForNewValue = false;

document.querySelectorAll(".btn").forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.textContent;

    if (!isNaN(value) || value === ".") {
      inputDigit(value);
    } else if (["+", "-", "×", "÷", "%"].includes(value)) {
      handleOperator(value);
    } else {
      handleAction(value);
    }
    updateDisplay();
  });
});

function inputDigit(digit) {
  if (waitingForNewValue) {
    currentValue = digit;
    waitingForNewValue = false;
  } else {
    if (digit === ".") {
      if (currentValue.includes(".")) return;
      currentValue = currentValue === "0" ? "0." : currentValue + ".";
    } else {
      currentValue = currentValue === "0" ? digit : currentValue + digit;
    }
  }
}

function handleOperator(nextOperator) {
  if (previousValue && operator && !waitingForNewValue) {
    calculate();
  }

  previousValue = currentValue;
  operator = nextOperator;
  waitingForNewValue = true;
}

function handleAction(action) {
  switch (action) {
    case "C":
      currentValue = "0";
      previousValue = "";
      operator = "";
      waitingForNewValue = false;
      break;
    case "←":
      if (currentValue.length > 1) {
        currentValue = currentValue.slice(0, -1);
      } else {
        currentValue = "0";
      }
      break;
    case "+/-":
      currentValue = String(-parseFloat(currentValue));
      break;
    case "=":
      if (previousValue && operator) {
        calculate();
        operator = "";
        previousValue = "";
      }
      break;
  }
}

function calculate() {
  const prev = parseFloat(previousValue);
  const curr = parseFloat(currentValue);
  let result = 0;

  switch (operator) {
    case "+":
      result = prev + curr;
      break;
    case "-":
      result = prev - curr;
      break;
    case "×":
      result = prev * curr;
      break;
    case "÷":
      if (curr === 0) {
        currentValue = "Error";
        return;
      }
      result = prev / curr;
      break;
    case "%":
      result = prev % curr;
      break;
  }

  result = parseFloat(result.toFixed(10));
  currentValue = String(result);
  waitingForNewValue = true;
}

function updateDisplay() {
  display.textContent = currentValue;
}
