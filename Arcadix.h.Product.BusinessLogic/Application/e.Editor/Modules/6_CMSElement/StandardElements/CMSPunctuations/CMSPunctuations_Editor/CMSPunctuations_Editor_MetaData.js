import * as UniqueId from "@root/Framework/Services/UniqueId/UniqueId";

/**
 * @name GetDefaultCrossOutWordElementJson
 * @param {number} intOrder The order where the Element needs to be added.
 * @summary This method returns the initial json for adding a CrossOutWord element.
 * @returns {object} Initial CrossOutWord Json.
 */
export const GetDefaultElementJson = (intOrder) => {
    let objElementJson = {
        "iElementId": UniqueId.GetUniqueId(),
        "iOrder": intOrder,
        "vElementTypeName": "Punctuations",
        "iElementTypeId": 36,
        "vElementJson": {
            "cShowHeaderText": "N",
            "HeaderValues": [
                {
                    "iElementTextId": null,
                    "vHeaderType": "ElementHeader"
                }
            ],
            "dCorrectPoint": 1,
            "dWrongPoint": -0.5,
            "dNotAnsweredPoint": 0.0,
            "vSentence": "",
            "cIsRandomDisplay": "N",
            "Values": [],
            "SubElements": [],
            "TextElements": []

        }
    }
    return objElementJson;
}

/**
 * @name GetDefaultAlternativeSolutionJson
 * @param {int} iElementId puctuation id
 * @summary This method returns the initial json for adding an alternative punctuation solution.
 * @returns {object} Initial alternative solution Json.
 * */
export const GetDefaultAlternativeSolutionJson = (iElementId) => {

    var objAlternativeSolution = {
        "iElementPunctuationAlternateSolutionId": UniqueId.GetUniqueId(),
        "iElementPunctuationId": iElementId,
        "vElementPunctuationsAlternateSolution": ""
    }
    return objAlternativeSolution;
}

/**
 * @name GetPunctuationsMarks
 * @returns {array} returns punctuation symbols
 * */
export const GetPunctuationsMarks = () => {
    return [
        { "type": "Comma", "key": "Comma", "hexcode": "&#x2c;", "htmlcode": "&#44;", "htmlentity": "&comma;", "symbol": "," },
        { "type": "Period", "key": "Period", "hexcode": "&#x2e;", "htmlcode": "&#46;", "htmlentity": "&period;", "symbol": "." },
        { "type": "Exclamation", "key": "Exclamation", "hexcode": "&#x21;", "htmlcode": "&#33;", "htmlentity": "&excl;", "symbol": "!" },
        { "type": "QuestionMark", "key": "QuestionMark", "hexcode": "&#x3f;", "htmlcode": "&#41;", "htmlentity": "&rpar;", "symbol": "?" },
        { "type": "Colon", "key": "Colon", "hexcode": "&#x3a;", "htmlcode": "&#58;", "htmlentity": "&colon;", "symbol": ":" },
        { "type": "LightAngleQuote", "key": "LightAngleQuote", "hexcode": "&#xab;", "htmlcode": "&#171;", "htmlentity": "&laquo;", "symbol": "«" },
        { "type": "RightAngleQuote", "key": "RightAngleQuote", "hexcode": "&#xbb;", "htmlcode": "&#187;", "htmlentity": "&raquo;", "symbol": "»" },
        { "type": "Hyphen", "key": "Hyphen", "hexcode": "&#x2010;", "htmlcode": "&#8208;", "htmlentity": "&hyphen;", "symbol": "-" },
        { "type": "Apostrophe", "key": "Apostrophe", "hexcode": "&#x27;", "htmlcode": "&#39;", "htmlentity": "&apos;", "symbol": "'" }
    ];
}