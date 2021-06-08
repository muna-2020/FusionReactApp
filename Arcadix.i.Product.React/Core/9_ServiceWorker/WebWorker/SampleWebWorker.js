function fnHeavyMultiplication() {
  postMessage("Computing in WebWorker..");
  while (true) {
    var intNum = 99999999999999999999 * 999999999999999999999;
    //postMessage(intNum);
  }
  //setTimeout("timedCount()", 500);
}

self.addEventListener(
  "message",
  function (e) {
    if (e.data == "Multiply") {
      fnHeavyMultiplication();
    }
    else if (e.data == "FibonacciSeries") {
      fnComputeFibonacci();
    }
    else if (e.data == "VLookUp") {
        fnVLookUp();
    }
    //self.postMessage(e.data);
  },
  false
);

// while (true) {
//   timedCount();
// }

function fnComputeFibonacci() {
  setTimeout(function () {
    var result = fib(40);
    postMessage(result);
  }, 100);
}

function fib(num) {
  var result = 0;
  if (num < 2) {
    result = num;
  } else {
    result = fib(num - 1) + fib(num - 2);
  }
  return result;
}

let fnVLookUp = () => {
    let arrRandomArray1 = [];
    for (let intIndex = 0; intIndex < 10 ** 7; intIndex++) {
        arrRandomArray1.push(Math.ceil(Math.random() * 100));
    }
    let arrRandomArray2 = Array.from(arrRandomArray1);
    //arrRandomArray2.sort();
    let blnIsMatch = false;
    arrRandomArray1.forEach((intNum) => {
        let intMatch = arrRandomArray2.find((intNo) => intNo == intNum);
        if (intMatch) blnIsMatch = true;
    });
    postMessage(blnIsMatch ? "Matched" : "Not Matched");
}
