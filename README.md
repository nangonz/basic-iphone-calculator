# Basic Iphone Calculator app - Javascript, HTML, CSS
We're going to build the basic iPhone calculator to put our JavaScript skills to the test. 
To get started, we are gonna create an HTML, a CSS file, and a JavaScript file.  
Our calculator is basically an HTML form with a lot of buttons and an input field.  
To style it, we're gonna use CSS so that it resembles the calculator on iPhones.

## Adding functionality
Instead of selecting all the buttons one after the other, we used the querySelectorAll().  
This will select all the buttons we specified and put them in a NodeList (an array with node items).

```Javascript
// select all buttons which atribute data-type is operand
const operand_btns = document.querySelectorAll("button[data-type=operand]")
```
We cannot access any of those selected buttons unless we iterate over the array using one of the  
loop methods javascript provides.

```Javascript
btn.addEventListener("click", (e) => {
  // control what happens when a button is clicked
});
```
Now, whenever we click on any operand value, the value of that number is displayed on the calculator.  
In the `else..if` statement, we check if there is a decimal in our output value. If there is, we simply  
stop adding any further decimal point by replacing it with an empty string.

```Javascript
output.value = output.value + "" + e.target.value.replace(".", "");
```
Another `else..if` statement checks to see whether we've previously clicked on an operator button.  
If we have and then click on an operand button, we want to set the `is_operator` value to false  
and restart the value in the output from the new value.

```Javascript
else if (is_operator) {
  is_operator = false;
  output.value = e.target.value;
}
```

Now let's also select the buttons with `data-type` operator and specify what will happen whenever  
we click on any of the buttons.

```Javascript
const operator_btns = document.querySelectorAll("button[data-type=operator]");
...
let equation = [];

operator_btns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    remove_active()
    e.currentTarget.classList.add("active");

    switch (e.target.value) {
      case "%":
        output.value = parseFloat(output.value) / 100;
        break;
      case "invert":
        output.value = parseFloat(output.value) * -1;
        break;
      case "=":
        equation.push(output.value);
        output.value = evaluateExpression(equation.join(""));
        equation = [];
        break;
      default:
        let last_item = equation[equation.length - 1];
        if (["/", "*", "+", "-"].includes(last_item) && is_operator) {
          equation.pop();
          equation.push(e.target.value);
        } else {
          equation.push(output.value);
          equation.push(e.target.value);
        }
        is_operator = true;
        break;
    }
  });
});
```

The `switch` statement accepts a value (the condition), in this example the value of the button  
that was clicked. For each case, the value is checked. In the first case a % simply converts the  
number in the output to a percentage. If it were the `invert` button, we would simply "invert"  
the output result by multiplying it by "-1."

If the = button was clicked, we add the last value from the output value to our equation array,  
use evaluateExpression(expression) to quickly evaluate every equation there, and then clear the  
equation array.  

The code in the default runs when any other operator button that is not one of those we listed  
before is clicked. In the default first, we obtain the last item in the array by using this code:  

```Javascript
let last_item = equation[equation.length - 1];
```

Then, if the previous button we clicked was an operator, that is, if it was one of the following:  
`/, *, +, or -`, we simply delete it from the equation using equation.pop() and add the new one we  
clicked with equation.push().

If our last array item was not an operator, we add the output value and the value of the button we  
clicked to the equation array.

```Javascript
else {
  equation.push(output.value);
  equation.push(e.target.value);
}
```

Lastly we also set the value of `is_operator` to true anytime we click on any `operator` button:

```Javascript
default:
  let last_item = equation[equation.length - 1];
  if (["/", "*", "+", "-"].includes(last_item) && is_operator) {
    equation.pop();
    equation.push(e.target.value);
  } else {
    equation.push(output.value);
    equation.push(e.target.value);
  }
  is_operator = true;
  break;
```

You'll notice that for each case we pass in the break statement. The break statement here will  
stop the execution of the switch anytime a case is true and the code finishes executing.  

And there you have it – a fully functional calculator application!  
And here's the live preview: `url`