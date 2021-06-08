//React related imports...
import React, { useEffect } from 'react';

//Internal services
import { LoadDynamicStyles } from '@shared/Framework/Services/CssLoader/CssLoader';

const WebWorkerSample = props => {

    const GetContent = () => {   
    CircleAnimation();
    return <div id="WebWorkerSample">
        <button className="btn" onClick={() => startWorker()}>Start WebWorker</button>
        <button className="btn" onClick={() => stopWorker()}>Stop WebWorker</button>
        <p>
            <b>WebWorker Result: </b>
            <span id="webworker_result"></span>
        </p>
        
        <p/>
        <button className="btn" onClick={() => HeavyMultiplication_Worker()}>Heavy Multiplication WebWorker</button>
        <button className="btn" onClick={() => ComputeFibonacci_Worker()}>Compute Fibonacci WebWorker</button>
        <button className="btn" onClick={() => VLookUp_Worker()}>VLookUp of Dynamic Arrays</button>

        <p>
            <b>ClientSide Result: </b>
            <span id="client_result"></span>
        </p>
        <button className="btn" onClick={() => HeavyMultiplication_Client()}>Heavy Multiplication Client Side</button>
        <button className="btn" onClick={() => ComputeFibonacci_Client()}>Compute Fibonacci Client Side</button>
        <button className="btn" onClick={() => VLookUp_Client()}>VLookUp of Dynamic Arrays</button>

        <p>
            <b>Counter : </b>
            <span id="counter"></span>
        </p>
        <button className="btn" onClick={() => StartClientCounter()}>Increment</button>
        <div className="circle" id="circle"></div>
    </div>
   };

    var w;
    var intClientCounter = 0;
    function startWorker() {
      if (typeof Worker !== "undefined") {
        if (typeof w == "undefined") {
          w = new Worker(JConfiguration.BaseUrl + "WebWorker/SampleWebWorker.js");
        }
        w.onmessage = function (event) {
          document.getElementById("webworker_result").innerHTML = event.data;
        };
      } else {
        document.getElementById("webworker_result").innerHTML =
          "Sorry, your browser does not support Web Workers...";
      }
    }

    function stopWorker() {
      if (w) {
        w.terminate();
        w = undefined;
      }
      document.getElementById("webworker_result").innerHTML = "";
    }

    function CircleAnimation() {
    useEffect(() => {       
        //---------------------animates the circle-------------------------
        var objDOMCircle = document.getElementById("circle");
        var X = 0; // animation parameters
        var Y = 0;

        setInterval(function () {
            X += 0.04;
            Y += 0.05;
            if (objDOMCircle) {
                objDOMCircle.style.marginLeft = Math.sin(Math.sin(X) * 4) * 13 + "px";
                objDOMCircle.style.marginTop = Math.sin(Math.sin(Y) * 4) * 5 + "px";
            }
        }, 20);
        //-------------------------------------------------------------------
    }, []);
}

    function HeavyMultiplication_Worker() {
        if (w) {
        w.postMessage("Multiply");
        }
    }

    function ComputeFibonacci_Worker() {
        if (w) {
        w.postMessage("FibonacciSeries");
        }
    }

    function StartClientCounter() {
        intClientCounter += 1;
        document.getElementById("counter").innerHTML = intClientCounter;
    }

    function HeavyMultiplication_Client() {
        var intNum = 999999999999999999999999999999999999999999999 *  999999999999999999999999999999999999999999999;
        document.getElementById("client_result").innerHTML = intNum;
        setTimeout("startCalculation()", 10);
    }

    function ComputeFibonacci_Client() {
        var output = document.getElementById("client_result");

        output.innerHTML = "";
        //highlight(true);

        setTimeout(function () {
            var result = Fibonacci(40);
        output.innerHTML = result;
        //highlight(false);
        }, 100);
    }

    let Fibonacci = function (num) {
        var result = 0;
        if (num < 2) {
            result = num;
        } else {
            result = Fibonacci(num - 1) + Fibonacci(num - 2);
        }
        return result;
    }

    let VLookUp_Client = () => {
        document.getElementById("client_result").innerHTML = "Performing VLookup";
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
        document.getElementById("client_result").innerHTML = blnIsMatch
            ? "Matched"
            : "Not Matched";
    }

    let VLookUp_Worker = () => {
        document.getElementById("webworker_result").innerHTML = "Performing VLookup";
        if (w) {
            w.postMessage("VLookUp");
        }
    }

    return (
        GetContent()
    );
}

LoadDynamicStyles(JConfiguration.ProductManagementSkinPath + "/Css/Application/ReactJs/PC/Modules/4_Example/WebWorkerSample/WebWorkerSample.css");

export default WebWorkerSample;