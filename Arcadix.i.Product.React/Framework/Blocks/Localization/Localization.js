//let objTextResource = {
//    "Task:1": "This is a string 1",
//    "Task:2": "This is a string 2",
//    "Task:3": "This is a string 3",
//    "Task:4": "This is a string 4",
//    "Task:n": "This is a string {n}th"
//};
export function TextPluralFormatter(objTextResource, strKey, strNumber) { //expects TextPluralFormatter(objTextResource,"Task","9")
    let strKeyNumberPair = strKey + ":" + strNumber;
    let strKeyNumberNthPair = strKey + ":" + "n";
    let strResult = "";    
    if (objTextResource[strKeyNumberPair]) {
        strResult = objTextResource[strKeyNumberPair];
    }     
    else if (objTextResource[strKeyNumberNthPair]) {
        strResult = objTextResource[strKeyNumberNthPair].replace(/{n}/, strNumber);
    }
    return strResult;
}

export function TextFormatter(objTextResource, strKey) {

    if (objTextResource == null || objTextResource == undefined)
        return "";
    else if (objTextResource[strKey] == undefined || objTextResource[strKey] == null)
        return "";
    else
    return objTextResource[strKey];   
}

export function DateFormatter(Value) //expects DateFormatter(UniversalDateString) or DateFormatter(objDate)
{
    let strCulture = JConfiguration.LanguageCultureInfo + "-" + JConfiguration.CountryCultureInfo;
    var strResult = "",objDate;
    if (typeof Value == "string") {
        objDate = new Date(Value);
    }
    else {
        objDate = Value
    }
    
    if (isNaN(objDate)) {
        strResult = "Invalid date";
    }
    else {
        strResult = new Intl.DateTimeFormat(strCulture).format(objDate);
        try {
            let arrDate = strResult.split('.');
            let strDay = parseInt(arrDate[0]) > 9 ? arrDate[0] : "0" + arrDate[0];
            let strMonth = parseInt(arrDate[1]) > 9 ? arrDate[1] : "0" + arrDate[1];
            let strYear = arrDate[2];
            strResult = strDay + "." + strMonth + "." + strYear;
        } catch (err) {
            strResult = new Intl.DateTimeFormat(strCulture).format(objDate);
        }
    }
    return strResult;
}

export function DateTimeFormatter(Value) //expects DateTimeFormatter("2016/05/17") or DateFormatter(new Date("2016/05/17"))
{
    let strCulture = JConfiguration.LanguageCultureInfo + "-" + JConfiguration.CountryCultureInfo;
    var strResult = "", objDate;
    if (typeof Value == "string") {
        objDate = new Date(Value);
    }
    else {
        objDate = Value
    }

    if (isNaN(objDate)) {
        strResult = "Invalid date";
    }
    else {
        strResult = new Intl.DateTimeFormat(strCulture).format(objDate) + " " + objDate.toLocaleTimeString(strCulture);
    }
    return strResult;
}

export function GetFormattedDate(Value) { //expects DateTimeFormatter("2016/05/17") or DateFormatter(new Date("2016/05/17"))
    let strCulture = JConfiguration.LanguageCultureInfo + "-" + JConfiguration.CountryCultureInfo;
    var strResult = "", objDate;
    if (typeof Value == "string") {
        objDate = new Date(Value);
    }
    else {
        objDate = Value;
    }

    if (isNaN(objDate)) {
        strResult = "Invalid date";
    }
    else {
        strResult = new Intl.DateTimeFormat(strCulture).format(objDate) + " " + objDate.toLocaleTimeString(strCulture);
        let arrDateAndTime = strResult.split(' ');
        let strDate = arrDateAndTime[0];
        let strTime = arrDateAndTime[1];

        let arrDate = strDate.split('.');
        let strDay = parseInt(arrDate[0]) > 10 ? arrDate[0] : "0" + arrDate[0];
        let strMonth = parseInt(arrDate[1]) > 10 ? arrDate[1] : "0" + arrDate[1];
        let strYear = arrDate[2].substring(2);

        let arrTime = strTime.split(':');
        let strHour = arrTime[0];
        let strMin = arrTime[1];

        let strFormattedDateAndTime = strDay + "." + strMonth + "." + strYear + " " + strHour + ":" + strMin;
        return strFormattedDateAndTime; //returns dd:mm:yy hh:mm
    }
}

export function TimeFormatter(Value) //expects TimeFormatter("2016/05/17") or DateFormatter(new Date("2016/05/17"))
{
    let strCulture = JConfiguration.LanguageCultureInfo + "-" + JConfiguration.CountryCultureInfo;
    var strResult = "", objDate;
    if (typeof Value == "string") {
        objDate = new Date(Value);
    }
    else {
        objDate = Value
    }

    if (isNaN(objDate)) {
        strResult = "Invalid date";
    }
    else {
        strResult = objDate.toLocaleTimeString(strCulture);
    }
    return strResult;
}

export function NumberFormatter(dblValue) { // expects NumberFormatter(123456.789)
    let strCulture = JConfiguration.LanguageCultureInfo + "-" + JConfiguration.CountryCultureInfo;
    return new Intl.NumberFormat(strCulture).format(dblValue);
}

export function CurrencyFormatter(dblValue) { // expects CurrencyFormatter(123456.789)
    let strCulture = JConfiguration.LanguageCultureInfo + "-" + JConfiguration.CountryCultureInfo;
    let objStyle = { style: 'currency', currency: JConfiguration.CurrencyInfo };
    return new Intl.NumberFormat(strCulture, objStyle).format(dblValue);
}

export function GetDateRegex() {
    let strCulture = JConfiguration.LanguageCultureInfo + "-" + JConfiguration.CountryCultureInfo;
    var objDate = new Date("12/31/2000");
    var strCultureFormattedDate = new Intl.DateTimeFormat(strCulture).format(objDate);    
    var strMonthRegex = "(0?[1-9]|1[012])";
    var strDateRegex = "(0?[1-9]|[12][0-9]|3[01])";
    var strYearRegex = "[1-9]{1}[0-9]{3}";
    var strRegex = "^(";// "^((0?[1-9]|[12][0-9]|3[01])[- /.](0?[1-9]|1[012])[- /.][1-9]{1}[0-9]{3})*$";
    switch (strCultureFormattedDate.substring(0, 1)) {
        case "1":
            strRegex += strMonthRegex;
            break;
        case "3":
            strRegex += strDateRegex;
            break;    
    }
    strRegex += "[" + strCultureFormattedDate.substring(2, 3) + "]";
    switch (strCultureFormattedDate.substring(3, 4)) {
        case "1":
            strRegex += strMonthRegex;
            break;
        case "3":
            strRegex += strDateRegex;
            break;      
    }
    strRegex += "[" + strCultureFormattedDate.substring(5, 6) + "]";
    strRegex += strYearRegex + ")*$"
    return strRegex;
}

export function GetMonthName(intMonth) {
    let objDATETIME_FORMATS = JConfiguration.Locale.DATETIME_FORMATS;
    let arrMonthNames = objDATETIME_FORMATS.MONTH;
    return arrMonthNames[intMonth - 1];
}

export function GetMonthNames(strFromMonth_To_ToMonth) {
    var intFromMonth = parseInt(strFromMonth_To_ToMonth.substring(0, 1)) + 1;
    var intToMonth = parseInt(strFromMonth_To_ToMonth.substring(1, 2)) + 1;
    let objDATETIME_FORMATS = JConfiguration.Locale.DATETIME_FORMATS;
    let arrMonthNames = objDATETIME_FORMATS.MONTH;
    let arrReturnMonthNames = [];
    for (intMonth = intFromMonth; intMonth <= intToMonth; i++) {
        arrReturnMonthNames = [...arrReturnMonthNames, arrMonthNames[intMonth]]
    }
    return arrReturnMonthNames;
}

export function GetDayName(intDay) {
    let objDATETIME_FORMATS = JConfiguration.Locale.DATETIME_FORMATS;
    let arrDayNames = objDATETIME_FORMATS.DAY;
    return arrDayNames[intDay + 1];
}

export function GetDayNames(strFromDay_To_ToDay) {
    var intFromDay = parseInt(strFromDay_To_ToDay.substring(0, 1)) + 1;
    var intToDay = parseInt(strFromDay_To_ToDay.substring(1, 2)) + 1;
    let objDATETIME_FORMATS = JConfiguration.Locale.DATETIME_FORMATS;
    let arrDayNames = objDATETIME_FORMATS.DAY;
    let arrReturnDayNames = [];
    for (intDay = intFromDay; intDay <= intToDay; i++) {
        arrReturnDayNames = [...arrReturnDayNames, arrDayNames[intDay]]
    }
    return arrReturnDayNames;
}