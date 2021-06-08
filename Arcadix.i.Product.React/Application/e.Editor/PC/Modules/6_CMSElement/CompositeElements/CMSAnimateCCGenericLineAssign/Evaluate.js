



function findPolyfill() {
    if (!Array.prototype.find) {
        Object.defineProperty(Array.prototype, 'find', {
            value: function (predicate) {
                if (this == null) {
                    throw new TypeError('"this" is null or not defined');
                }
                var o = Object(this);
                var len = o.length >>> 0;
                if (typeof predicate !== 'function') {
                    throw new TypeError('predicate must be a function');
                }
                var thisArg = arguments[1];
                var k = 0;
                while (k < len) {
                    var kValue = o[k];
                    if (predicate.call(thisArg, kValue, k, o)) {
                        return kValue;
                    }
                    k++;
                }
                return undefined;
            },
            configurable: true,
            writable: true
        });
    }  
}


function JEvaluate(arrUser, objInitialAttributes, arrAnswerAttributes) {

    findPolyfill();
    var Exact_Answer = arrAnswerAttributes[0]['ResultArcadix_Data']['Min'];
    var User_Answer = JSON.parse(arrUser['ResultArcadix_Data'].toString().replace(/'/g, '"'));
    var isEvaluated = true;
    var EvaluationResult = {};


    for (var EALeftShapeId in Exact_Answer) {
        EvaluationResult[EALeftShapeId] = false;
        if (User_Answer[EALeftShapeId]) {
            for (var j = 0; j < Exact_Answer[EALeftShapeId].Lines.length; j++) {
                if (User_Answer[EALeftShapeId].Lines.find(function (a) { return a === Exact_Answer[EALeftShapeId].Lines[j] })) {
                    EvaluationResult[EALeftShapeId] = true;
                   
                }
            }
            for (var l = 0; l < User_Answer[EALeftShapeId].Lines.length; l++) {
                if (!Exact_Answer[EALeftShapeId].Lines.find(function (a) { return a === User_Answer[EALeftShapeId].Lines[l] })) {
                    EvaluationResult[EALeftShapeId] = false;
                    break
                }
            }
        }
    }


    for (var UALeftShapeId in EvaluationResult) {
        if (EvaluationResult[UALeftShapeId] == false) {
            isEvaluated = false;
        }
    }
    return isEvaluated;
}
