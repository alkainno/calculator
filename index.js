var queue = [];
var input = 0;

function calculateQueue(value) {
  if (input !== 0) {
    input = parseFloat(input);
    addToQueue(input);
  }

  var stack = [];
  // for (var i = 0; i < value.length; i++) {
  //   if (value[i] === "(") {
  //     stack.push(i);
  //   } else if (value[i] === ")") {
  //     var start = stack.pop();
  //     var subValue = value.slice(start + 1, i);
  //     var subResult = calculateQueue(subValue);
  //     value.splice(start, i - start + 1, subResult);
  //     i = start;
  //   }
  // }

  // for (var i = 0; i < value.length; i++) {
  //   if (value[i] === "^") {
  //     var base = parseFloat(value[i - 1]);
  //     var exponent = parseFloat(value[i + 1]);
  //     var result = Math.pow(base, exponent);
  //     value.splice(i - 1, 3, result);
  //     i--;
  //   }
  // }

  for (var i = 0; i < value.length; i++) {
    if (value[i] === "/") {
      var divisor = parseFloat(value[i + 1]);
      var result = value[i - 1] / divisor;
      value.splice(i - 1, 3, result);
      i--;
    } else if (value[i] === "*") {
      var multiplier = parseFloat(value[i + 1]);
      var result = value[i - 1] * multiplier;
      value.splice(i - 1, 3, result);
      i--;
    }
  }

  var answer = parseFloat(value[0]);
  for (var i = 1; i < value.length; i += 2) {
    var operator = value[i];
    var operand = parseFloat(value[i + 1]);
    switch (operator) {
      case "+":
        answer += operand;
        break;
      case "-":
        answer -= operand;
        break;
    }
  }

  answer = answer.toFixed(20);
  answer = parseFloat(answer);
  if (isNaN(answer) || !isFinite(answer)) {
    clearAll();
    document.getElementById("answer").innerHTML = "NaN";
  } else {
    document.getElementById("answer").innerHTML = answer;
    input = answer;
    queue = [];
  }

  return answer;
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
    if (
      document.getElementById("answer").innerHTML !== "0" &&
      document.getElementById("answer").innerHTML === "NaN"
    ) {
      arg = arg === "." ? "0." : arg;
    }

    input += arg;
    document.getElementById("answer").innerHTML += arg;
  }
}

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
