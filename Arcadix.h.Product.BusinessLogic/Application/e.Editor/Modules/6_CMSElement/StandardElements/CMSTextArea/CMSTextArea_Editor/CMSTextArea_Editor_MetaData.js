
//UniqueId.
import * as UniqueId from "@root/Framework/Services/UniqueId/UniqueId";

/**
 * @name GetDefaultCMSTextAreaJson
 * @returns {object} returns default TextArea json
 * */
export const GetDefaultCMSTextAreaJson = () => {
    return {
        "iElementId": UniqueId.GetUniqueId(),
        "iElementTypeId": 26,
        "vElementTypeName": "TextArea",
        "vElementJson": {
            "tDictationValue": "",
            "cIsDictation": "N",
            "iNumberOfRows": "4",
            "iWidthInPixel": "230",
            "dCorrectPoint": 0,
            "dWrongPoint": 0,
            "dNotAnsweredPoint": 0,
            "cIsAutoEvaluation": "N",
            "cIsLSA": "N",
            "cISBlueAlgorithm": "Y",
            "iNgrams": "2",
            "iPointType": "1",
            "iPointValue": "50",
            "iCorpusId": "0",
            "cIsMultiLine": 'N',
            "cIsICR": "N"
            //"blnReadOnly": true
        }
    };
};

/**
 * @name GetDefaultCMSTextAreaJson
 * @returns {object} returns default TextArea dictation json
 * */
export const GetDefaultCMSTextAreaDictationJson = () => {
    return {
        "iElementId": UniqueId.GetUniqueId(),
        "iElementTypeId": "26",
        "vElementTypeName": "TextArea",
        "vElementJson": {
            "tDictationValue": "Text",
            "cIsDictation": "Y",
            "iNumberOfRows": "4",
            "iWidthInPixel": "230",
            "cIsPointOverride": "N",
            "dCorrectPoint": 0,
            "dWrongPoint": 0,
            "dNotAnsweredPoint": 0,
            "cIsAutoEvaluation": "N",
            "cIsLSA": "N",
            "cISBlueAlgorithm": "Y",
            "iNgrams": "2",
            "iPointType": "1",
            "iPointValue": "50",
            "iCorpusId": "0",
            "cIsMultiLine": 'N',
            "cIsICR": "N"
            //"blnReadOnly": true
        }
    };
};