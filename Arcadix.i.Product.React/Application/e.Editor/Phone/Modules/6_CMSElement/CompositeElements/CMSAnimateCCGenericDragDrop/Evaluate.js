

(
    function () {
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
)()

function JEvaluate(arrUser, objInitialAttributes, arrAnswerAttributes) {
    var Exact_Answer = arrAnswerAttributes[0]['ResultArcadix_Data']['Min'];
    var User_Answer = JSON.parse(arrUser['ResultArcadix_Data'].toString().replace(/'/g, '"'));
    var isEvaluated = false;
    var EvaluationResult = {};
    for (var item in Exact_Answer) {
        EvaluationResult[item] = {
            length_passed: false,
            items_passed: false
        }
        if (User_Answer[item]) {
            if (User_Answer[item].length === Exact_Answer[item].length) {
                EvaluationResult[item].length_passed = true;    
                for (var i = 0; i < Exact_Answer[item].length; i++) {
                    if (User_Answer[item].find(function(a){  
					if(a['ElementId'] === Exact_Answer[item][i]['ElementId']){return true;}else{return false;}})) {
                        EvaluationResult[item].items_passed = true;
                    } else {
                        EvaluationResult[item].items_passed = false;
                    }
                }
            }
        }
    }

    for (var item in EvaluationResult) {
        isEvaluated = EvaluationResult[item].length_passed;
        isEvaluated = EvaluationResult[item].items_passed;
    }

    return isEvaluated;
}
