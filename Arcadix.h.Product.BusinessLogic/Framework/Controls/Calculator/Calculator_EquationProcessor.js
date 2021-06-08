import { evaluate, format } from 'mathjs';

/**
 * @name EvaluateCalculatorExpression
 * @param {string} strCalculatorEquation equation string.
 * @summary Evaluate calculator expression.
 * @returns {number} returns calculator result.
 */
export const EvaluateCalculatorExpression = (strCalculatorEquation) => {
    var precision = 14;
    return format(evaluate(strCalculatorEquation), precision)
}

/**
 * @name JcalculatorLastValue
 * @param {object} objContext {state, props, dispatch}
 */
export const JcalculatorLastValue = (objContext) => {
    var strJcalculatorEquation = objContext.DataRef.strJcalculatorEquation;
    if (strJcalculatorEquation.length > 0) return strJcalculatorEquation.replace(/<span>&radic;<\/span><span style="width:3px;border-top: 0px solid #969696;"> <\/span>\(/g, '').substring(strJcalculatorEquation.replace(/<span>&radic;<\/span><span style="width:3px;border-top: 0px solid #969696;"> <\/span>\(/g, '').length - 1)
    else return "";
}

/**
 * @name JcalculatorNoPeriod
 * @param {object} objContext {state, props, dispatch}
 * @returns {boolean} return's true if period is found in the sub equation's.
 */
export const JcalculatorNoPeriod = (objContext) => {
    var blnFoundPeriod = true;
    var strJcalculatorEquation = objContext.DataRef.strJcalculatorEquation;
    if (strJcalculatorEquation === "" || /(\+|\-|\*|\/|\()/.test(strJcalculatorEquation[strJcalculatorEquation.length - 1])) {
        objContext.DataRef.strJcalculatorEquation = strJcalculatorEquation + "0";
    }
    if (strJcalculatorEquation.length > 0) {
        for (var i = strJcalculatorEquation.length; i > -1; i--) {
            if (/(\+|\/|\-|\*|\|\)|\(|\,|\^)/.test(strJcalculatorEquation[i])) {
                break;
            }
            if (strJcalculatorEquation[i] === ".") {
                blnFoundPeriod = false;
                break;
            }
        }
    }
    return blnFoundPeriod;
}

/**
 * @name JcalculatorAppendText
 * @param {object} objContext {state, props, dispatch}
 * @param {string} strText gets appended to the end of the equation.
 */
export const JcalculatorAppendText = (objContext, strText) => {
    var strJcalculatorEquation = objContext.DataRef.strJcalculatorEquation;
    var str_equation = ""
    var blnHitSymbol = false
    var str_len = strJcalculatorEquation.length;
    var blnAllBrackets = false;

    if (strJcalculatorEquation[str_len - 1] === "0") {
        for (var j = str_len - 2; j > -1; j--) {
            if (/(\/|\+|\-|\^|\*)/.test(strJcalculatorEquation[j])) {
                blnHitSymbol = true;
                blnAllBrackets = false;
                break;
            }
            if (strJcalculatorEquation[j] === "(") {
                blnAllBrackets = true;
            }
            else {
                blnAllBrackets = false;
                break;
            }
        }

        if (JcalculatorLastInteger(objContext).length === 1 || blnAllBrackets || blnHitSymbol) {
            if (strText === "0") {
                return false;
            }
            else {
                if (blnAllBrackets) {
                    if (strText === ".") {
                        objContext.DataRef.strJcalculatorEquation = strJcalculatorEquation + strText
                    }
                    else {
                        objContext.DataRef.strJcalculatorEquation = strJcalculatorEquation.substring(0, str_len - 1) + strText;
                    }
                }
                else {
                    if (/(\+|\-|\*|\/|\)|\.|\^)/.test(strText)) {
                        objContext.DataRef.strJcalculatorEquation = strJcalculatorEquation + strText;
                    }
                    else {
                        if (strJcalculatorEquation.length === 1) {
                            objContext.DataRef.strJcalculatorEquation = strText;
                        }
                        else {
                            objContext.DataRef.strJcalculatorEquation = strJcalculatorEquation.substring(0, str_len - 1) + strText;

                        }
                    }
                }
                //objContext.dispatch({ "type": "SET_STATE", "payload": { "strJcalculatorEquation": strJcalculatorEquation } });
                return false;
            }
        }
    }
    if (JcalculatorLastInteger(objContext).length >= 16 && (!isNaN(strText))) return true; //to solve overflow issue 16 = 16 digits for equation 
    objContext.DataRef.strJcalculatorEquation = strJcalculatorEquation + strText;
}

/**
 * @name JcalculatorIsNumber
 * @param {object} objContext {state, props, dispatch}
 * @param {boolean} isPeriod
 * @returns {booelan} returns true if last value of the equation is a number.
 */
export const JcalculatorIsNumber = (objContext, isPeriod) => {
    if (isPeriod == null || isPeriod == false) {
        switch (JcalculatorLastValue(objContext)) {
            case "0": case "1": case "2": case "3": case "4": case "5": case "6": case "7": case "8": case "9": case ")": case "e": case "π": case "!": case "%": return true;
            default: return false;
        }
    }
    else {
        switch (JcalculatorLastValue(objContext)) {
            case "0": case "1": case "2": case "3": case "4": case "5": case "6": case "7": case "8": case "9": case ")": case "e": case "π": case "!": case "%": case "": case "(": case "+": case "-": case "*": case "/": return true;
            default: return false;
        }
    }
}

/**
 * @name JcalculatorLastInteger
 * @param {object} objContext {state, props, dispatch}
 * @param {number} LastIntegerEquation last equation value.
 * @returns {string} returns last value of the equation. 
 */
export const JcalculatorLastInteger = (objContext, LastIntegerEquation) => {
    if (LastIntegerEquation == undefined) LastIntegerEquation = objContext.DataRef.strJcalculatorEquation;
    var InsertIndex = Math.max(LastIntegerEquation.lastIndexOf("+"), LastIntegerEquation.lastIndexOf("-"), LastIntegerEquation.lastIndexOf("*"), LastIntegerEquation.lastIndexOf("/"), LastIntegerEquation.indexOf("("), LastIntegerEquation.indexOf(")"), LastIntegerEquation.indexOf(","));
    if (InsertIndex > -1) {
        LastIntegerEquation = LastIntegerEquation.substring(InsertIndex + 1);
    }
    return LastIntegerEquation;
}

/**
 * @name JcalculatorIsInteger
 * @param {any} objContext
 * @returns {boolean} returns true if equation last value is an integer. 
 */
export const JcalculatorIsInteger = (objContext) => {
    if (JcalculatorLastInteger(objContext).indexOf('.') > -1) {
        return false;
    } else {
        return true;
    }
}

/**
 * @name JcalculatorIsOperators
 * @param {object} objContext {state, props, dispatch}
 * @returns {boolean} returns true if last of the equation is an operator. 
 */
export const JcalculatorIsOperators = (objContext) => {
    switch (JcalculatorLastValue(objContext)) {
        case "-": case "+": case "/": case "*": case "^": case "": case "(": return true;
        default: return false;
    }
}

/**
/**
 * @name JcalculatorReplaceString
 * @param {string} strSourceString source string 
 * @param {string} strRegularExpression regular expression
 * @param {string} strReplacingString replace value
 */
export const JcalculatorReplaceString = (strSourceString, strRegularExpression, strReplacingString) => {
    var objRegularExpression = new RegExp(strRegularExpression, "g");
    strSourceString = strSourceString.replace(objRegularExpression, strReplacingString);
    return strSourceString;
};

/**
 * @name JcalculatorGetLastInteger
 * @param {object} objContext {state, props, dispatch}
 * @param {string} LastIntegerEquation sub equation. 
 * @param {boolean} blnDoubleBrackets  
 * @returns {string} returns equation last value.
 */
export const JcalculatorGetLastInteger = (objContext, LastIntegerEquation, blnDoubleBrackets) => {
    if (LastIntegerEquation == undefined) LastIntegerEquation = objContext.DataRef.strJcalculatorEquation;
    var InsertIndex
    if (!blnDoubleBrackets) {
        InsertIndex = Math.max(LastIntegerEquation.lastIndexOf("+"), LastIntegerEquation.lastIndexOf("-"), LastIntegerEquation.lastIndexOf("*"), LastIntegerEquation.lastIndexOf("/"), LastIntegerEquation.indexOf("("), LastIntegerEquation.indexOf(")"), LastIntegerEquation.indexOf(","));
    }
    else {
        InsertIndex = Math.max(LastIntegerEquation.lastIndexOf("+"), LastIntegerEquation.lastIndexOf("-"), LastIntegerEquation.lastIndexOf("*"), LastIntegerEquation.lastIndexOf("/"), LastIntegerEquation.lastIndexOf("("), LastIntegerEquation.indexOf(")"), LastIntegerEquation.indexOf(","));
    }
    if (InsertIndex > -1) {
        LastIntegerEquation = LastIntegerEquation.substring(InsertIndex + 1);
    }
    return LastIntegerEquation;
}

/**
 * @name JcalculatorGetAllFactorial
 * @param {string} StrFactorial factorial equation.
 * @returns {string} returns factorial of all the numbers in the equation.
 */
export const JcalculatorGetAllFactorial = (StrFactorial) => {
    var ArrSubEquation = StrFactorial.split("!");
    if (ArrSubEquation.length > 1) {
        StrFactorial = "";
        ArrSubEquation.map(function (SubEquation, intIndex) {
            if (ArrSubEquation.length - 1 !== intIndex) {
                var InsertIndex = Math.max(SubEquation.lastIndexOf("+"), SubEquation.lastIndexOf("-"), SubEquation.lastIndexOf("*"), SubEquation.lastIndexOf("/"), SubEquation.indexOf("("), SubEquation.indexOf(")"), SubEquation.indexOf("^"), SubEquation.indexOf(","));

                if (InsertIndex > -1) {
                    var blnDoubleBrackets = false;
                    for (var i = InsertIndex + 1; i < SubEquation.length - 1; i++) {
                        if (SubEquation[i] === "(") {
                            InsertIndex = InsertIndex + 1;
                            blnDoubleBrackets = true;
                        }
                        else {
                            break;
                        }
                    }

                    StrFactorial += SubEquation.substring(0, InsertIndex + 1) + JcalculatorGetFactorial(parseInt(JcalculatorGetLastInteger(objContext, SubEquation, blnDoubleBrackets))).toString();
                }
                else StrFactorial += JcalculatorGetFactorial(parseInt(JcalculatorLastInteger(objContext, SubEquation))).toString();
            } else StrFactorial += SubEquation;
        });
    }
    return StrFactorial;
}

/**
 * @name JcalculatorGetFactorial
 * @param {string} StrFactorial factorial equation.
 * @returns {number} returns factorial of a number.
 */
export const JcalculatorGetFactorial = (StrFactorial) => {
    if (StrFactorial > 1) return StrFactorial * JcalculatorGetFactorial(StrFactorial - 1)
    else return 1;
}

/**
 * @name JcalculatorGetAllLog
 * @param {any} StrLogEquation Calculator equation
 * @summary {string} forms proper log equation for evaluation. 
 */
export const JcalculatorGetAllLog = (StrLogEquation) => {
    var i = 0
    while (i < StrLogEquation.length) {
        var diff_length = StrLogEquation.length
        var blnFoundBracket = false
        var second_string = "";
        var p
        var blnStringChanged = false
        if (StrLogEquation.substring(i, i + 3) === "log") {
            for (var j = i + 4; j < StrLogEquation.length; j++) {
                if (StrLogEquation[j] === "(") {
                    blnFoundBracket = true
                }

                if (/(\))/.test(StrLogEquation[j]) && !blnFoundBracket) {
                    p = j;
                    break;
                }
                else {

                    second_string = second_string + StrLogEquation[j];
                    if (blnFoundBracket && StrLogEquation[j] === ")") {
                        blnFoundBracket = false
                    }
                }
            }
            StrLogEquation = StrLogEquation.substring(0, i) + "(Math.log(" + second_string + ")/Math.log(10))" + StrLogEquation.substring(p + 1, StrLogEquation.length);
            blnStringChanged = true

        }
        if (blnStringChanged) {
            i = p + StrLogEquation.length - diff_length + 2;
        }
        else {
            i++;
        }
    }
    return StrLogEquation;
}

/**
 * @name JcalculatorGetAllPower
 * @param {string} str equation
 * @summary {string} forms proper square root equation for evaluation.
 */
export const JcalculatorGetAllPower = (str) => {
    var i = 0;
    var blnChanged = false;
    var len1 = 0;
    var len2 = 0;
    var lastNumber = "";
    for (var z = str.length - 1; z > 0; z--) {
        if (!/(\/|\+|\-|\*|\)|\^)/.test(str[z])) {
            lastNumber = str[z] + lastNumber
        }
        else {
            if (str.charAt(z) === "-") {
                lastNumber = str[z] + lastNumber
            }
            break;
        }
    }
    while (str.indexOf("^") !== -1) {
        str = str.replace(/ /gi, "");
        if (str.charAt(i) === "^") {
            var p = null
            var sub_str_one = "";
            var sub_str_two = "";
            var blnFoundNearestSymbol = false;
            var blnFractionExponent = false;
            var blnOpenBracket = false;
            var blnbFound = false
            var b_bracket_count = 0
            var f_bracket_count = 0
            var sub_str = str.substring(i + 1, str.length);
            var sub_first_str = str.substring(0, str.indexOf('^'));
            var y;
            var blnLengthOne = false;
            for (var j = i - 1; j > -1; j--) {
                if (/(\))/.test(str[j])) {
                    blnbFound = true
                    break;
                }

                if (/(\/|\+|\-|\*|\()/.test(str[j])) {
                    p = j;
                    break;
                }
                else {
                    sub_str_one = str[j] + sub_str_one
                }

            }
            if (blnbFound) {
                for (var x = i - 1; x > -1; x--) {
                    if (/(\))/.test(str[x])) {
                        b_bracket_count = b_bracket_count + 1;
                    }
                    if (/(\()/.test(str[x])) {
                        b_bracket_count = b_bracket_count - 1;
                    }
                    sub_str_one = str[x] + sub_str_one
                    if (b_bracket_count === 0) {
                        p = x;
                        for (var z = x - 1; z > -1; z--) {
                            if (/(\/|\+|\-|\*|\()/.test(str[z])) {
                                p = z + 1;
                                break;
                            }
                            sub_str_one = str[z] + sub_str_one;
                        }
                        break;
                    }
                }
            }

            for (var k = 0; k <= sub_str.length - 1; k++) {
                //if(sub_str.length === 1 || (sub_str.length === 2 && sub_str.charAt(0) ==="-")){
                if (sub_str === lastNumber) {
                    blnLengthOne = true;
                }
                if (sub_str.charAt(k) === ")") {
                    //blnFractionExponent = true;			
                    blnOpenBracket = false
                }
                if (k === 0 && sub_str[k] === "(" && ((sub_str[k + 1] === "(" && sub_str[k + 2] === "-") || sub_str[k + 1] === "-")) {
                    //objContext.DataRef.blnIsPowerNegative = true;
                    blnOpenBracket = true
                }
                if (/(\/|\+|\-|\*|\))/.test(sub_str[k]) && !blnFoundNearestSymbol) {
                    if (k === 0 && sub_str[k] === "-") {
                        sub_str_two = sub_str_two + sub_str[k];
                        //objContext.DataRef.blnIsPowerNegative = true;
                        continue;
                    }
                    //sub_str_two = sub_str_two + ")" + sub_str[k];
                    //blnFoundNearestSymbol = true;
                    if (sub_str_two !== "(" && !blnFractionExponent && !blnOpenBracket) {
                        sub_str_two = sub_str_two + ")" + sub_str[k];
                        blnFoundNearestSymbol = true
                    }
                    else {
                        sub_str_two = sub_str_two + sub_str[k];
                        if (blnFractionExponent && sub_str[k] === "/") {
                            blnFractionExponent = false
                        }
                    }
                }
                else {
                    sub_str_two = sub_str_two + sub_str[k];
                }
            }

            if (blnLengthOne) {
                sub_str_two += ")"
            }

            if (blnbFound) {
                y = p
            }
            else {
                y = p + 1
            }

            len1 = str.length;
            len2 = str.length;

            if (str.substring(0, y) !== sub_str_one) {
                if (!/(\/|\+|\-|\*|\)|\^|\()/.test(sub_first_str)) {
                    y = 0;
                }
                //str = str.substring(0, y ) + "Math.pow(" + sub_str_one + "," + sub_str_two;
                var res = str.substring(0, y).match(/^[A-Za-z]+$/)
                if (res === null) {
                    str = str.substring(0, y) + "Math.pow(" + sub_str_one + "," + sub_str_two;
                }
                else {
                    str = "Math.pow(" + sub_str_one + "," + sub_str_two;
                }
                blnChanged = true
            }
            else {
                str = "Math.pow(" + sub_str_one + "," + sub_str_two;
                blnChanged = true
            }
        }
        if (blnChanged) {
            i = i + len2 - len1;
        }
        else {
            i++;
        }
        blnChanged = false
    }
    return str;
}

/**
 * @name JcalculatorPercentage
 * @param {any} str
 * @summary {string} forms proper percentage equation for evaluation.
 */
export const JcalculatorPercentage = (str) => {
    var len = str.length;
    var i = len - 1;
    while (i > -1) {
        var r = str[i];
        if (str[i] === '%') {
            var z = i;
            var sub_str = "";
            var sub_sym = "";
            while (true && i > 0) {
                i = i - 1;
                if (!/(\+|\/|\-|\*|\|\)|\(|\,|\^)/.test(str[i])) {
                    sub_str = str[i] + sub_str;
                }
                else {
                    sub_sym = str[i];
                    break;
                }
            }
            str = str.substring(0, i) + sub_sym + '(' + sub_str + '/100)' + str.substring(z + 1, len);
            sub_sym = "";
            len = str.length;
            blnBracketsAdded = true;
        }
        i = i - 1;
    }
    return str;
};

/**
 * @name AppendPercentage
 * @param {any} objContext {state, props, dispatch}
 * @summary add's percentage to calculator equation.
 */
export const AppendPercentage = (objContext) => {
    var equation = objContext.DataRef.strJcalculatorEquation;
    var strJcalculatorEquation = objContext.DataRef.strJcalculatorEquation;
    var position = ApplyValue(equation === "." ? "0" : equation);
    if (position.s === 0 && position.e === equation.length - 1) {
        objContext.DataRef.strJcalculatorEquation = "(" + equation + "%)";
    }

    else {
        var partone = equation.substr(0, position.s);
        var parttwo = equation.substr(position.s, position.e);
        if (parttwo !== '') {
            if (strJcalculatorEquation.replace(/<span>&radic;<\/span><span style="width:3px;border-top: 0px solid #969696;"> <\/span>\(/g, '').length >= 15 && (!isNaN(strText))) return true;
            objContext.DataRef.strJcalculatorEquation = partone.toString() + "(" + parttwo + "%)";
        }
    }
}

/**
 * @name ApplyValue
 * @param {any} equation Calculator equation.
 * @summary used by AppendPercentage method for adding percentage symbol to the equation. 
 */
export const ApplyValue = (equation) => {
    var sbrackets = [];
    var ebrackets = [];
    var plus = [];
    var minus = [];
    var mul = [];
    var div = [];
    for (var i = 0; i < equation.length; i++) {
        switch (equation[i]) {
            case '(': sbrackets.push(i);
                break;
            case ')': ebrackets.push(i);
                break;
            case '+': plus.push(i);
                break;
            case '-': minus.push(i);
                break;
            case '*': mul.push(i);
                break;
            case '/': div.push(i);
                break;
            default: break;
        };
    }
    var startpos = -1;
    var endpos = -1;
    var bracketpos = -1;
    if (equation[equation.length - 1] === ')') {
        for (var j = ebrackets.length - 1; j >= 0; j--) {
            if (ebrackets[j] === equation.length - 1) {
                bracketpos = j;
                break;
            }
        }
        endpos = ebrackets[bracketpos];
        startpos = sbrackets[(sbrackets.length - 1) - bracketpos];
        return { s: startpos, e: endpos };
    }
    else {
        var stopped = false;
        for (var k = equation.length - 1; k >= 0; k--) {
            if (equation[k] === '(' || equation[k] === '+' || equation[k] === '-' || equation[k] === '*' || equation[k] === "/") {
                if (k !== equation.length - 1) {
                    startpos = k + 1;
                }
                stopped = true;
                break;
            }
        }
        if (stopped === false) {
            startpos = 0;
        }
        return { s: startpos, e: equation.length - 1 }
    }
}

/**
* @name EvaluateEquation
* @param {any} objContext {state, props, dispatch}
* @param {object} e key press event object.
*/
export const EvaluateEquation = (objContext, strkeyPressID) => {
    var strJcalculatorEquation = objContext.DataRef.strJcalculatorEquation;
    switch (strkeyPressID) {
        case "JcalculatorSin":
            if (objContext.DataRef.blnJcalculatorIsEvaluated) objContext.DataRef.strJcalculatorEquation = "";
            if (objContext.DataRef.blnJcalculatorSecond) {
                if (JcalculatorIsOperators(objContext)) JcalculatorAppendText(objContext, "asin(");
                else if (JcalculatorIsNumber(objContext)) JcalculatorAppendText(objContext, "*asin(");
            }
            else {
                if (JcalculatorIsOperators(objContext)) JcalculatorAppendText(objContext, "sin(");
                else if (JcalculatorIsNumber(objContext)) JcalculatorAppendText(objContext, "*sin(");
            }
            break;
        case "JcalculatorCos":
            if (objContext.DataRef.blnJcalculatorIsEvaluated) objContext.DataRef.strJcalculatorEquation = "";
            if (objContext.DataRef.blnJcalculatorSecond) {
                if (JcalculatorIsOperators(objContext)) JcalculatorAppendText(objContext, "acos(");
                else if (JcalculatorIsNumber(objContext)) JcalculatorAppendText(objContext, "*acos(");
            }
            else {
                if (JcalculatorIsOperators(objContext)) JcalculatorAppendText(objContext, "cos(");
                else if (JcalculatorIsNumber(objContext)) JcalculatorAppendText(objContext, "*cos(");
            }
            break;
        case "JcalculatorTan":
            if (objContext.DataRef.blnJcalculatorIsEvaluated) objContext.DataRef.strJcalculatorEquation = "";
            if (objContext.DataRef.blnJcalculatorSecond) {
                if (JcalculatorIsOperators(objContext)) JcalculatorAppendText(objContext, "atan(");
                else if (JcalculatorIsNumber(objContext)) JcalculatorAppendText(objContext, "*atan(");
            }
            else {
                if (JcalculatorIsOperators(objContext)) JcalculatorAppendText(objContext, "tan(");
                else if (JcalculatorIsNumber(objContext)) JcalculatorAppendText(objContext, "*tan(");
            }
            break;
        case "JcalculatorInverse":
            if (objContext.DataRef.blnJcalculatorIsEvaluated) objContext.DataRef.strJcalculatorEquation = "";
            if (JcalculatorIsOperators(objContext)) JcalculatorAppendText(objContext, "1/");
            else if (JcalculatorIsNumber(objContext) && JcalculatorLastValue(objContext) !== "%") JcalculatorAppendText(objContext, "*1/")
            break;
        case "JcalculatorFactorial":
            if (objContext.DataRef.blnJcalculatorIsEvaluated) objContext.DataRef.strJcalculatorEquation = objContext.DataRef.strJcalculatorResult;
            if (JcalculatorIsNumber(objContext) && JcalculatorIsInteger(objContext) && JcalculatorLastValue(objContext) !== "!" && JcalculatorLastValue(objContext) !== "%") JcalculatorAppendText(objContext, "!");
            break;
        case "JcalculatorExponent":
            if (objContext.DataRef.blnJcalculatorIsEvaluated) objContext.DataRef.strJcalculatorEquation = "";
            if (JcalculatorIsOperators(objContext)) JcalculatorAppendText(objContext, "e");
            else if (JcalculatorIsNumber(objContext)) JcalculatorAppendText(objContext, "*e");
            break;
        case "JcalculatorPi":
            if (objContext.DataRef.blnJcalculatorIsEvaluated) objContext.DataRef.strJcalculatorEquation = "";
            if (JcalculatorIsOperators(objContext)) JcalculatorAppendText(objContext, "π");
            else if (JcalculatorIsNumber(objContext)) JcalculatorAppendText(objContext, "*π");
            break;
        case "JcalculatorNaturalLog":
            if (objContext.DataRef.blnJcalculatorIsEvaluated) objContext.DataRef.strJcalculatorEquation = "";
            if (JcalculatorIsOperators(objContext)) JcalculatorAppendText(objContext, "ln(");
            if (JcalculatorIsNumber(objContext)) JcalculatorAppendText(objContext, "*ln(");
            break;
        case "JcalculatorLog":
            if (objContext.DataRef.blnJcalculatorIsEvaluated) objContext.DataRef.strJcalculatorEquation = "";
            if (JcalculatorIsOperators(objContext)) JcalculatorAppendText(objContext, "log(");
            if (JcalculatorIsNumber(objContext)) JcalculatorAppendText(objContext, "*log(");
            break;
        case "JcalculatorSqureRoot":
            if (objContext.DataRef.blnJcalculatorIsEvaluated == false) {
                strJcalculatorEquation = objContext.DataRef.strJcalculatorEquation;
                if (strJcalculatorEquation.replace(/<span>&radic;<\/span><span style="width:3px;border-top: 0px solid #969696;"> <\/span>\(/g, '').length <= 15) {
                    if (JcalculatorIsOperators(objContext)) {
                        objContext.DataRef.strJcalculatorEquation = objContext.DataRef.strJcalculatorEquation + '<span>&radic;</span><span style="width:3px;border-top: 0px solid #969696;"> </span>(';
                    }
                    else {
                        objContext.DataRef.strJcalculatorEquation = objContext.DataRef.strJcalculatorEquation + '*<span>&radic;</span><span style="width:3px;border-top: 0px solid #969696;"> </span>(';
                    }
                }
            } else {
                objContext.DataRef.strJcalculatorEquation = '<span>&radic;</span><span style="width:3px;border-top: 0px solid #969696;"> </span>(' + objContext.DataRef.strJcalculatorResult;
            }
            break;
        case "JcalculatorSqure":
            if (JcalculatorIsNumber(objContext) && JcalculatorLastValue(objContext) !== "%" && JcalculatorLastValue(objContext) !== "π" && JcalculatorLastValue(objContext) !== "e" && JcalculatorLastValue(objContext) !== "!") JcalculatorAppendText(objContext, "^2");
            break;
        case "JcalculatorPower":
            if (JcalculatorIsNumber(objContext) && JcalculatorLastValue(objContext) !== "%" && JcalculatorLastValue(objContext) !== "π" && JcalculatorLastValue(objContext) !== "e" && JcalculatorLastValue(objContext) !== "!") JcalculatorAppendText(objContext, "^");
            break;
        case "JcalculatorMemoryRecall":
            if (objContext.DataRef.blnJcalculatorSecond) {
                objContext.DataRef.strJcalculatorMemoryValue = "0";
                objContext.DataRef.JcalculatorMemoryDisplay = false;
            }
            else if (JcalculatorMemoryDisplay && !isNaN(objContext.DataRef.strJcalculatorMemoryValue) && objContext.DataRef.strJcalculatorMemoryValue.toString() !== "") {
                objContext.DataRef.strJcalculatorMemoryValue = parseFloat(evaluate(objContext.DataRef.strJcalculatorMemoryValue.toString().replace(/e\+/g, '*10^')));
                if (JcalculatorIsOperators(objContext)) JcalculatorAppendText(objContext, objContext.DataRef.strJcalculatorMemoryValue);
                else if (JcalculatorIsNumber(objContext)) JcalculatorAppendText(objContext, "*" + objContext.DataRef.strJcalculatorMemoryValue);
            }
            break;
        case "JcalculatorMemoryPlus":
            if (objContext.DataRef.strJcalculatorMemoryValue.toString() === "") {
                objContext.DataRef.strJcalculatorMemoryValue = 0;
            }
            HandleCalculatorEqualsClick(objContext);
            if (!isNaN(objContext.DataRef.strJcalculatorResult)) {
                objContext.DataRef.strJcalculatorMemoryValue = EvaluateCalculatorExpression(objContext.DataRef.strJcalculatorMemoryValue + "+" + objContext.DataRef.strJcalculatorResult);
            }

            if (!objContext.DataRef.blnJcalculatorSecond) {
                if (objContext.DataRef.blnJcalculatorIsEvaluated) {
                    objContext.DataRef.JcalculatorMemoryDisplay = true;
                    objContext.DataRef.blnJcalculatorIsEvaluated = true;

                }
            } else {
                if (objContext.DataRef.blnJcalculatorIsEvaluated) {
                    objContext.DataRef.JcalculatorMemoryDisplay = true
                }
            }
            break;
        case "JcalculatorMemoryMinus":
            if (objContext.DataRef.strJcalculatorMemoryValue.toString() === "") {
                objContext.DataRef.strJcalculatorMemoryValue = 0;
            }
            HandleCalculatorEqualsClick(objContext);
            if (!isNaN(objContext.DataRef.strJcalculatorResult)) {
                objContext.DataRef.strJcalculatorMemoryValue = EvaluateCalculatorExpression(objContext.DataRef.strJcalculatorMemoryValue + "-" + objContext.DataRef.strJcalculatorResult);
            }
            if (!objContext.DataRef.blnJcalculatorSecond) {
                if (objContext.DataRef.blnJcalculatorIsEvaluated) {
                    objContext.DataRef.JcalculatorMemoryDisplay = true
                    objContext.DataRef.blnJcalculatorIsEvaluated = true;

                }
            }
            break;
        case "JcalculatorMemoryStore":
            if (objContext.DataRef.strJcalculatorEquation.toString() !== "") {
                HandleCalculatorEqualsClick(objContext);
                if (!isNaN(objContext.DataRef.strJcalculatorResult)) {
                    objContext.DataRef.strJcalculatorMemoryValue = parseFloat(objContext.DataRef.strJcalculatorResult);
                }
                if (!objContext.DataRef.blnJcalculatorSecond) {
                    if (objContext.DataRef.blnJcalculatorIsEvaluated) {
                        objContext.DataRef.JcalculatorMemoryDisplay = true;
                        objContext.DataRef.blnJcalculatorIsEvaluated = true;
                    }
                }
            }
            break;
        case "JcalculatorMemoryClear":
            objContext.DataRef.strJcalculatorMemoryValue = "";
            break;
        case "JcalculatorPercentage": if (objContext.DataRef.blnJcalculatorIsEvaluated) objContext.DataRef.strJcalculatorEquation = objContext.DataRef.strJcalculatorResult;
            if (JcalculatorIsNumber(objContext) && JcalculatorLastValue(objContext) !== "%" && JcalculatorLastValue(objContext) !== "π" && JcalculatorLastValue(objContext) !== "e" && JcalculatorLastValue(objContext) !== "!") { AppendPercentage(objContext); }
            break;
        case "JcalculatorFunctionBtn":
            if (objContext.DataRef.blnJcalculatorSecond) {
                objContext.DataRef.blnJcalculatorSecond = false;
                objContext.DataRef.JcalculatorFunction = "";
            }
            else {
                objContext.DataRef.blnJcalculatorSecond = "1";
                objContext.DataRef.JcalculatorFunction = "2nd";
            }
            break;
        case "JcalculatorOpenBracket":
            if (JcalculatorIsOperators(objContext))
                JcalculatorAppendText(objContext, "(");
            else if (JcalculatorIsNumber(objContext))
                JcalculatorAppendText(objContext, "*(");
            break;
        case "JcalculatorCloseBracket":
            if (JcalculatorIsNumber(objContext)) {
                JcalculatorAppendText(objContext, ")");
            }
            break;
        case "Jcalculator0": if (objContext.DataRef.blnJcalculatorIsEvaluated) objContext.DataRef.strJcalculatorEquation = ""; if ((JcalculatorIsNumber(objContext) || JcalculatorIsOperators(objContext) || JcalculatorLastValue(objContext) == "." || JcalculatorLastValue(objContext) == "^") && JcalculatorLastValue(objContext) !== "π" && JcalculatorLastValue(objContext) !== "e" && JcalculatorLastValue(objContext) !== ")" && JcalculatorLastValue(objContext) !== "!" && JcalculatorLastValue(objContext) !== "%") { JcalculatorAppendText(objContext, "0"); } break;
        case "Jcalculator1": if (objContext.DataRef.blnJcalculatorIsEvaluated) objContext.DataRef.strJcalculatorEquation = ""; if ((JcalculatorIsNumber(objContext) || JcalculatorIsOperators(objContext) || JcalculatorLastValue(objContext) == "." || JcalculatorLastValue(objContext) == "^") && JcalculatorLastValue(objContext) !== "π" && JcalculatorLastValue(objContext) !== "e" && JcalculatorLastValue(objContext) !== ")" && JcalculatorLastValue(objContext) !== "!" && JcalculatorLastValue(objContext) !== "%") { JcalculatorAppendText(objContext, "1"); } break;
        case "Jcalculator2": if (objContext.DataRef.blnJcalculatorIsEvaluated) objContext.DataRef.strJcalculatorEquation = ""; if ((JcalculatorIsNumber(objContext) || JcalculatorIsOperators(objContext) || JcalculatorLastValue(objContext) == "." || JcalculatorLastValue(objContext) == "^") && JcalculatorLastValue(objContext) !== "π" && JcalculatorLastValue(objContext) !== "e" && JcalculatorLastValue(objContext) !== ")" && JcalculatorLastValue(objContext) !== "!" && JcalculatorLastValue(objContext) !== "%") { JcalculatorAppendText(objContext, "2"); } break;
        case "Jcalculator3": if (objContext.DataRef.blnJcalculatorIsEvaluated) objContext.DataRef.strJcalculatorEquation = ""; if ((JcalculatorIsNumber(objContext) || JcalculatorIsOperators(objContext) || JcalculatorLastValue(objContext) == "." || JcalculatorLastValue(objContext) == "^") && JcalculatorLastValue(objContext) !== "π" && JcalculatorLastValue(objContext) !== "e" && JcalculatorLastValue(objContext) !== ")" && JcalculatorLastValue(objContext) !== "!" && JcalculatorLastValue(objContext) !== "%") { JcalculatorAppendText(objContext, "3"); } break;
        case "Jcalculator4": if (objContext.DataRef.blnJcalculatorIsEvaluated) objContext.DataRef.strJcalculatorEquation = ""; if ((JcalculatorIsNumber(objContext) || JcalculatorIsOperators(objContext) || JcalculatorLastValue(objContext) == "." || JcalculatorLastValue(objContext) == "^") && JcalculatorLastValue(objContext) !== "π" && JcalculatorLastValue(objContext) !== "e" && JcalculatorLastValue(objContext) !== ")" && JcalculatorLastValue(objContext) !== "!" && JcalculatorLastValue(objContext) !== "%") { JcalculatorAppendText(objContext, "4"); } break;
        case "Jcalculator5": if (objContext.DataRef.blnJcalculatorIsEvaluated) objContext.DataRef.strJcalculatorEquation = ""; if ((JcalculatorIsNumber(objContext) || JcalculatorIsOperators(objContext) || JcalculatorLastValue(objContext) == "." || JcalculatorLastValue(objContext) == "^") && JcalculatorLastValue(objContext) !== "π" && JcalculatorLastValue(objContext) !== "e" && JcalculatorLastValue(objContext) !== ")" && JcalculatorLastValue(objContext) !== "!" && JcalculatorLastValue(objContext) !== "%") { JcalculatorAppendText(objContext, "5"); } break;
        case "Jcalculator6": if (objContext.DataRef.blnJcalculatorIsEvaluated) objContext.DataRef.strJcalculatorEquation = ""; if ((JcalculatorIsNumber(objContext) || JcalculatorIsOperators(objContext) || JcalculatorLastValue(objContext) == "." || JcalculatorLastValue(objContext) == "^") && JcalculatorLastValue(objContext) !== "π" && JcalculatorLastValue(objContext) !== "e" && JcalculatorLastValue(objContext) !== ")" && JcalculatorLastValue(objContext) !== "!" && JcalculatorLastValue(objContext) !== "%") { JcalculatorAppendText(objContext, "6"); } break;
        case "Jcalculator7": if (objContext.DataRef.blnJcalculatorIsEvaluated) objContext.DataRef.strJcalculatorEquation = ""; if ((JcalculatorIsNumber(objContext) || JcalculatorIsOperators(objContext) || JcalculatorLastValue(objContext) == "." || JcalculatorLastValue(objContext) == "^") && JcalculatorLastValue(objContext) !== "π" && JcalculatorLastValue(objContext) !== "e" && JcalculatorLastValue(objContext) !== ")" && JcalculatorLastValue(objContext) !== "!" && JcalculatorLastValue(objContext) !== "%") { JcalculatorAppendText(objContext, "7"); } break;
        case "Jcalculator8": if (objContext.DataRef.blnJcalculatorIsEvaluated) objContext.DataRef.strJcalculatorEquation = ""; if ((JcalculatorIsNumber(objContext) || JcalculatorIsOperators(objContext) || JcalculatorLastValue(objContext) == "." || JcalculatorLastValue(objContext) == "^") && JcalculatorLastValue(objContext) !== "π" && JcalculatorLastValue(objContext) !== "e" && JcalculatorLastValue(objContext) !== ")" && JcalculatorLastValue(objContext) !== "!" && JcalculatorLastValue(objContext) !== "%") { JcalculatorAppendText(objContext, "8"); } break;
        case "Jcalculator9": if (objContext.DataRef.blnJcalculatorIsEvaluated) objContext.DataRef.strJcalculatorEquation = ""; if ((JcalculatorIsNumber(objContext) || JcalculatorIsOperators(objContext) || JcalculatorLastValue(objContext) == "." || JcalculatorLastValue(objContext) == "^") && JcalculatorLastValue(objContext) !== "π" && JcalculatorLastValue(objContext) !== "e" && JcalculatorLastValue(objContext) !== ")" && JcalculatorLastValue(objContext) !== "!" && JcalculatorLastValue(objContext) !== "%") { JcalculatorAppendText(objContext, "9"); } break;
        case "JcalculatorClear":
            objContext.DataRef.strJcalculatorEquation = "";
            objContext.DataRef.strJcalculatorResult = "0";
            break;
        case "JcalculatorAllClear": objContext.DataRef.strJcalculatorEquation = "";
            objContext.DataRef.strJcalculatorResult = "0";
            objContext.DataRef.JSquareRootClicked = false;
            break;
        case "JcalculatorBack":
            if (objContext.DataRef.strJcalculatorEquation.length > 0) {
                if (JcalculatorIsNumber(objContext)) objContext.DataRef.strJcalculatorEquation = objContext.DataRef.strJcalculatorEquation.substring(0, strJcalculatorEquation.length - 1);
                else {
                    if (objContext.DataRef.strJcalculatorEquation.match(/<span>&radic;<\/span><span style="width:3px;border-top: 0px solid #969696;"> <\/span>\($/)) {
                        objContext.DataRef.strJcalculatorEquation = strJcalculatorEquation.replace(/<span>&radic;<\/span><span style="width:3px;border-top: 0px solid #969696;"> <\/span>\($/, "");
                    }
                    else {
                        while (!JcalculatorIsNumber(objContext) && objContext.DataRef.strJcalculatorEquation.length > 0) {
                            objContext.DataRef.strJcalculatorEquation = objContext.DataRef.strJcalculatorEquation.substring(0, objContext.DataRef.strJcalculatorEquation.length - 1);
                        }
                    }
                }
            }
            break;
        case "JcalculatorAnswer":
            if (objContext.DataRef.strJcalculatorIsLastAnswerValue !== "0") {
                if (objContext.DataRef.blnJcalculatorIsEvaluated) objContext.DataRef.strJcalculatorEquation = "";
                if (objContext.DataRef.strJcalculatorEquation !== "" && JcalculatorIsNumber(objContext)) JcalculatorAppendText(objContext, "*" + objContext.DataRef.strJcalculatorIsLastAnswerValue);
                else JcalculatorAppendText(objContext, objContext.DataRef.strJcalculatorIsLastAnswerValue);
            }
            break;
        case "JcalculatorPeriod": if (JcalculatorIsNumber(objContext, true) && JcalculatorNoPeriod(objContext) && JcalculatorLastValue(objContext) !== "%" && JcalculatorLastValue(objContext) !== "π" && JcalculatorLastValue(objContext) !== "e" && JcalculatorLastValue(objContext) !== ")" && JcalculatorLastValue(objContext) !== "!") JcalculatorAppendText(objContext, "."); break;
        case "JcalculatorMultiply":
            if (objContext.DataRef.blnJcalculatorIsEvaluated) objContext.DataRef.strJcalculatorEquation = objContext.DataRef.strJcalculatorResult;
            if (JcalculatorIsNumber(objContext)) {
                JcalculatorAppendText(objContext, "*");
            }
            break;
        case "JcalculatorDivide":
            if (objContext.DataRef.blnJcalculatorIsEvaluated) objContext.DataRef.strJcalculatorEquation = objContext.DataRef.strJcalculatorResult;
            if (JcalculatorIsNumber(objContext)) {
                JcalculatorAppendText(objContext, "/");
            }
            break;
        case "JcalculatorPlus":
            if (objContext.DataRef.blnJcalculatorIsEvaluated) objContext.DataRef.strJcalculatorEquation = objContext.DataRef.strJcalculatorResult;
            if (JcalculatorIsNumber(objContext)) {
                JcalculatorAppendText(objContext, "+");
            }
            break;
        case "JcalculatorMinus":
            if (objContext.DataRef.blnJcalculatorIsEvaluated) objContext.DataRef.strJcalculatorEquation = objContext.DataRef.strJcalculatorResult;
            if ((JcalculatorIsNumber(objContext) || JcalculatorIsOperators(objContext) || JcalculatorLastValue(objContext) === "(") && JcalculatorLastValue(objContext) !== "-" && JcalculatorLastValue(objContext) !== "+") {
                JcalculatorAppendText(objContext, "-");
            }
            break;
    };

    if (objContext.DataRef.blnJcalculatorIsEvaluated && strkeyPressID !== "JcalculatorEqual" && strkeyPressID !== "JcalculatorFunctionBtn" && strkeyPressID !== "JcalculatorMemoryPlus" && strkeyPressID !== "JcalculatorMemoryMinus") {
        objContext.DataRef.blnJcalculatorIsEvaluated = false;
    }

    if (strkeyPressID !== "JcalculatorFunctionBtn") {
        objContext.DataRef.blnJcalculatorSecond = false;
        objContext.DataRef.JcalculatorFunction = "";
    }

}

/**
 * @name HandleCalculatorEqualsClick
 * @param {any} objContext {state, props, dispatch}
 */
export const HandleCalculatorEqualsClick = (objContext) => {
    if (objContext.DataRef.strJcalculatorEquation.length > 0) {
        try {
            var intJcalculatorFixStatus = objContext.DataRef.intJcalculatorFixStatus;
            if (intJcalculatorFixStatus > 0) { objContext.DataRef.strJcalculatorResult = parseFloat(EvaluateCalculatorExpression(Evaluate())).toFixed(intJcalculatorFixStatus).toString(); }
            else {
                var unprocessedAnswer = parseFloat(EvaluateCalculatorExpression(Evaluate(objContext)));
                if (unprocessedAnswer.toString().indexOf("e+") === -1 && unprocessedAnswer.toString().indexOf("e-") === -1) {
                    objContext.DataRef.strJcalculatorResult = parseFloat(unprocessedAnswer).toString();
                }
                else {
                    objContext.DataRef.strJcalculatorResult = unprocessedAnswer.toString();
                }
            }
            if (isNaN(objContext.DataRef.strJcalculatorResult)) {
                objContext.DataRef.blnJcalculatorIsEvaluated = false;
                objContext.DataRef.strJcalculatorResult = "Error";
            } else {
                objContext.DataRef.strJcalculatorResult = JcalculatorReplaceString(objContext.DataRef.strJcalculatorResult, "\\+", "");
                objContext.DataRef.strJcalculatorResult = JcalculatorReplaceString(objContext.DataRef.strJcalculatorResult, "e", "*10^");
                objContext.DataRef.strJcalculatorIsLastAnswerValue = objContext.DataRef.strJcalculatorResult;
                objContext.DataRef.blnJcalculatorIsEvaluated = true;
            }
            objContext.DataRef.JEqualClicked = true;
            objContext.DataRef.JSquareRootClicked = false;
        }
        catch (e) {
            objContext.DataRef.blnJcalculatorIsEvaluated = false;
            objContext.DataRef.strJcalculatorResult = "BAD EXPRESSION";
        }
    }
}

/**
 * @name Evaluate
 * @param {object} objContext {state, props, dispatch}
 * @param {any} strCalculateEquation Calculator equation.
 */
export const Evaluate = (objContext) => {
    var mathEquation = objContext.DataRef.strJcalculatorEquation;
    if (mathEquation !== "") {
        if (mathEquation.indexOf("span") !== -1) {
            mathEquation = mathEquation.replace(/<span>&radic;<\/span><span style="width:3px;border-top: 0px solid #969696;"> <\/span>\(/g, "sqrt(");
        }
        mathEquation = JcalculatorGetAllFactorial(mathEquation);
        mathEquation = JcalculatorGetAllLog(mathEquation);
        mathEquation = JcalculatorGetAllPower(mathEquation);
        mathEquation = JcalculatorReplaceString(mathEquation, "Math.pow", "pow")
        var strConvertToDegree = "1";
        if (objContext.DataRef.blnJcalculatorModeDegree) strConvertToDegree = "(PI / 180)";
        mathEquation = JcalculatorReplaceString(mathEquation, "asin", "Math.as");
        mathEquation = JcalculatorReplaceString(mathEquation, "acos", "Math.ac");
        mathEquation = JcalculatorReplaceString(mathEquation, "atan", "Math.at");
        mathEquation = JcalculatorReplaceString(mathEquation, "sin\\(", "sin(" + strConvertToDegree + "*");
        mathEquation = JcalculatorReplaceString(mathEquation, "cos\\(", "cos(" + strConvertToDegree + "*");
        mathEquation = JcalculatorReplaceString(mathEquation, "tan\\(", "tan(" + strConvertToDegree + "*");
        mathEquation = JcalculatorReplaceString(mathEquation, "Math.as", "(1/" + strConvertToDegree + ")*asin");
        mathEquation = JcalculatorReplaceString(mathEquation, "Math.ac", "(1/" + strConvertToDegree + ")*acos");
        mathEquation = JcalculatorReplaceString(mathEquation, "Math.at", "(1/" + strConvertToDegree + ")*atan");
        //mathEquation = JcalculatorReplaceString(mathEquation, "sqrt", "Math.sqrt");
        if (isNaN(mathEquation)) {
            mathEquation = JcalculatorReplaceString(mathEquation, "e", "E");
        }
        mathEquation = JcalculatorReplaceString(mathEquation, "π", "PI");
        mathEquation = JcalculatorReplaceString(mathEquation, "%", "/100");
        mathEquation = JcalculatorReplaceString(mathEquation, "ln", "log");
        return mathEquation;
    } else {
        return "0";
    }
}