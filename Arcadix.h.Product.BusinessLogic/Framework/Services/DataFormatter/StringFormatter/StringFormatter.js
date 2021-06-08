
export const RestoreStringForXML = (strValue) => {
    var strReplace = strValue;
    var objRegExp = new RegExp("&amp;", 'g');
    strReplace = strReplace.replace(objRegExp, "&");
    objRegExp = new RegExp("&lt;", 'g');
    strReplace = strReplace.replace(objRegExp, "<");
    objRegExp = new RegExp("&#60;", 'g');
    strReplace = strReplace.replace(objRegExp, "<");
    objRegExp = new RegExp("&gt;", 'g');
    strReplace = strReplace.replace(objRegExp, ">");
    objRegExp = new RegExp("&quot;", 'g');
    strReplace = strReplace.replace(objRegExp, "\"");
    objRegExp = new RegExp("&apos;", 'g');
    strReplace = strReplace.replace(objRegExp, "'");
    return strReplace;
};


export const ReplaceStringForXML = (strValue) => {
    var strReplace = new String(strValue);
    vRegEx = new RegExp("&", "g");
    strReplace = strReplace.replace(vRegEx, "&amp;");
    var vRegEx = new RegExp("<", "g");
    strReplace = strReplace.replace(vRegEx, "&lt;");
    var vRegEx = new RegExp(">", "g");
    strReplace = strReplace.replace(vRegEx, "&gt;");
    //    vRegEx = new RegExp("\\", "g");
    //    strReplace = strReplace.replace(vRegEx, "\u0077");    
    vRegEx = new RegExp("\"", "g");
    strReplace = strReplace.replace(vRegEx, "&quot;");
    vRegEx = new RegExp("'", "g");
    strReplace = strReplace.replace(vRegEx, "&apos;");
    return strReplace;
}