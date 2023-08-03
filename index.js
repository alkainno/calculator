var queue = [];
var input = 0;
function calculateQueue(value) {
  if (input !== 0) {
    input = parseFloat(input);

    addToQueue(input);
  }
  var answer = value[0];
  var dividedByZero = 0;
  for (var i = 2; i < value.length; i = i + 2) {
    switch (queue[i - 1]) {
      case "/":
        if (value[i] === 0) dividedByZero = 1;
        else answer = answer / value[i];
        break;
      case "*":
        answer = answer * value[i];
        break;
      case "+":
        answer += value[i];
        break;
      case "-":
        answer -= value[i];
        break;
    }
  }
  answer = answer.toFixed(10);
  answer = parseFloat(answer);
  if (dividedByZero === 1) {
    clearAll();
    document.getElementById("answer").innerHTML = "NaN";
  } else {
    document.getElementById("answer").innerHTML = answer;
    input = answer;
    queue = [];
  }
}
function addToQueue(input) {
  queue.push(input);
}
function clearAll() {
  queue = [];
  input = 0;
  document.getElementById("answer").innerHTML = "0";
}

function numericButton(arg) {
  if (
    document.getElementById("answer").innerHTML === "NaN" ||
    (document.getElementById("answer").innerHTML === "0" && arg != ".")
  ) {
    document.getElementById("answer").innerHTML = "";
  }
  if (!(arg === ".") || !String(input).match(/[.]/)) {
    if (document.getElementById("answer").innerHTML !== "0") {
      arg = arg === "." ? "0." : arg;
    }

    input += arg;
    document.getElementById("answer").innerHTML += arg;
  }
}
// function numericButton(arg) {
//     if (
//       document.getElementById("answer").innerHTML === "NaN" ||
//       (document.getElementById("answer").innerHTML == "0" && arg != ".")
//     ) {
//       document.getElementById("answer").innerHTML = "";
//     }

//     if (!(arg === ".") || !String(input).match(/[.]/)) {
//       // Check if the previous input was an operator
//       if (isNaN(input) && input !== "-") {
//         document.getElementById("answer").innerHTML += "0";
//       }

//       input += arg;
//       document.getElementById("answer").innerHTML += arg;
//     }
//   }

function operatorButton(arg) {
  if (input !== 0 && input !== "-") {
    input = parseFloat(input);
    addToQueue(input);
    addToQueue(arg);
    document.getElementById("answer").innerHTML += arg;
    input = 0;
  }
  if (arg == "-" && isNaN(queue[0]) && input !== "-") {
    input = "-";

    document.getElementById("answer").innerHTML = "-";
  }
}
