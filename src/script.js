const form = document.getElementById("calc-form")
const output = document.getElementById("output")
const operand_btns = document.querySelectorAll("button[data-type=operand]")
let is_operator = false

//stop form from submiting whenever we click a button
form.addEventListener("submit", (event)=> {
  event.preventDefault()
})

// display the values of our operands when we click on the buttons
operand_btns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
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