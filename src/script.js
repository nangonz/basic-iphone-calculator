const form = document.getElementById("calc-form")
const output = document.getElementById("output")
const operand_btns = document.querySelectorAll("button[data-type=operand]")
const operator_btns = document.querySelectorAll("button[data-type=operator]");
const prevOperation = document.getElementById("operation")
const clearButton = document.querySelector("button[data-type=clear]")
let is_operator = false
let equation = []

prevOperation.textContent = equation.join("")

// add event on clearButton to reset prevOperation
clearButton.addEventListener("click", ()=> {
  prevOperation.textContent = ""
})

//stop form from submiting whenever we click a button
form.addEventListener("submit", (event)=> {
  event.preventDefault()
})

// display the values of our operands when we click on the buttons
operand_btns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    remove_active()
    if (output.value == "0") {
      output.value = e.target.value
    } else if (is_operator) {
      is_operator = false
      output.value = e.target.value;
    } else if (output.value.includes(".")) {
      output.value = output.value + "" + e.target.value.replace(".", "")
    } else {
      output.value = output.value + "" + e.target.value
    }
  })
})

// Add events to buttons with data-type operator to specify what will happen whenever we click on them

operator_btns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    remove_active()
    e.currentTarget.classList.add("active");

    switch (e.target.value) {
      case "%":
        output.value = parseFloat(output.value) / 100;
        break
      case "invert":
        output.value = parseFloat(output.value) * -1;
        break
      case "=":
        equation.push(output.value)
        output.value = evaluateExpression(equation.join(""))
        prevOperation.textContent = stringifyEquation(equation)
        equation = []
        break
      default:
        let last_item = equation[equation.length - 1]
        if (["/", "*", "+", "-"].includes(last_item) && is_operator) {
          equation.pop();
          equation.push(e.target.value)
        } else {
          equation.push(output.value)
          equation.push(e.target.value)
        }
        is_operator = true
        break
    }
  });
});

// function to evaluate the equation
function evaluateExpression(expression) {
  return Function(`'use strict'; return (${expression})`)()
}


// this function removes the active class from buttons
const remove_active = () => {
  operator_btns.forEach((btn) => {
    btn.classList.remove("active");
  })
}

// convert equation into a string and replace multiply and divide operators
function stringifyEquation (array) {
  let stringOperation = array.join(" ").replace("*", "x").replace("/", "÷")
  return `${stringOperation} =`
}