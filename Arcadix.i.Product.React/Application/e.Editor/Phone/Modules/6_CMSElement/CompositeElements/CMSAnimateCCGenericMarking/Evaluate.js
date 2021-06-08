	   
function findPolyfill(){

if (!Array.prototype.find) {
	Object.defineProperty(Array.prototype, 'find', {
	  value: function(predicate) {

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
		    var isEvaluated = false;
		    var arrAdminRects = arrAnswerAttributes[0]['ResultArcadix_Data']['Min'];
		    var arrUserMarks = handleJSON(arrUser['ResultArcadix_Data'].toString().replace(/'/g, '"'));
		    var arrEvaluationResult = [];
		
		    if (arrUserMarks && arrAdminRects) {
		        if (arrUserMarks.length === arrAdminRects.length) {
                    for (var i = 0; i < arrAdminRects.length; i++) {
                        if (isMathFoundForShape(arrAdminRects[i]) === true) {
                            arrAdminRects[i].match = true;
                            arrEvaluationResult.push(arrAdminRects[i]);
                        } else {
                            arrAdminRects[i].match = false;
                            arrEvaluationResult.push(arrAdminRects[i]);
                        }
                    }
		
		            if (arrEvaluationResult.find(function (a) { return a.match === false; })) {
		                isEvaluated = false;
		                return isEvaluated;
		            } else {
		                isEvaluated = true;
		                return isEvaluated;
		            }
		        }else{
		            isEvaluated = false;
		            return isEvaluated;
		        }
		    } else {
		        isEvaluated = false;
		        return isEvaluated;
		    }
		  
		
		    function isMathFoundForShape(objRect) {
		
		        var matchFound = false;
		        if (objRect) {
		            if (arrUserMarks) {
		                for (var j = 0; j < arrUserMarks.length; j++) {
		                    if (isMarkWithinShape(objRect, arrUserMarks[j])) {
		                        matchFound = true;
		                
		                        return matchFound;
		                    }
		                }
		                return matchFound;
		            } else {
		                MathFound = false
		                return MathFound;
		            }
		        } else {
		            MathFound = false
		            MathFound;
		        }
		
			}
			
			function handleJSON(data) {
				debugger
				try {
					return JSON.parse(data);
				} catch (e) {
					return data;
				}
			}

		    function isMarkWithinShape(objRect, arrMark) {
		    
		        var RLeft = objRect.xMin;
		        var RRight = objRect.xMax;
		        var RTop = objRect.yMin;
		        var RBottom = objRect.yMax;
		        var isWithinShape = false;
		        var outSidePoint = arrMark.find(function (a) {
		            if ((a.x >= RLeft) && (a.x <= RRight) && (a.y >= RTop) && (a.y <= RBottom)) {
		                return false;
		            } else {
		                return true;
		            }
		        });
		        if (outSidePoint) {
		            isWithinShape = false;
		            return isWithinShape;
		        } else {
		            isWithinShape = true;
		            return isWithinShape;
		        }
		    }
		
		
		}
