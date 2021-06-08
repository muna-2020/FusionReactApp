//UniqueId.
import * as UniqueId from "@root/Framework/Services/UniqueId/UniqueId";

/**
 * @name GetDefaultCMSInputTextJson
 * @summary This methods returns Simple input initialjson.
 * @returns {object} Initial input Json.
 * */
export const GetDefaultCMSInputTextJson = () => {
    let intElementInputId = UniqueId.GetUniqueId();
    return {
        "iElementId": intElementInputId,
        "iElementTypeId": 5,
        "vElementTypeName": "Input",
        "vElementJson": {
            "vMeasurementUnit": "",
            "cHasMeasurementPrefix": "N",
            "cIsCaseSensitive": "N",
            "iWidthInPixel": 50,
            "cIsNumber": "N",
            "iTextFieldType": 1,
            "dWrongPoint": null,
            "dNotAnsweredPoint": null,
            "cIsEditableInput": "Y",
            "dCorrectPoint": null,
            "cIsPointOverride": "N",
            "Values": []
        },
        "cIsFirstLoad": "Y"
    };
};

/**
 * @name GetDefaultCMSInputWordJson
 * @summary This methods returns Simple word only input initial json.
 * @returns {object} Initial word only input Json.
 * */
export const GetDefaultCMSInputWordJson = () => {
    let intElementInputId = UniqueId.GetUniqueId();
    return {
        "iElementId": intElementInputId,
        "iElementTypeId": 5,
        "vElementTypeName": "Input",
        "vElementJson": {
            "vMeasurementUnit": "",
            "cHasMeasurementPrefix": "N",
            "cIsCaseSensitive": "N",
            "iWidthInPixel": 50,
            "cIsNumber": "N",
            "iTextFieldType": 3,
            "dWrongPoint": null,
            "dNotAnsweredPoint": null,
            "cIsEditableInput": "Y",
            "dCorrectPoint": null,
            "cIsPointOverride": "N",
            "Values": []
        },
        "cIsFirstLoad": "Y"
    };
};

/**
 * @name GetDefaultCMSInputNumberJson
 * @summary This methods returns Simple number only input initial json.
 * @returns {object} Initial number only input Json.
 * */
export const GetDefaultCMSInputNumberJson = () => {
    let intElementInputId = UniqueId.GetUniqueId();
    return {
        "iElementId": intElementInputId,
        "iElementTypeId": 5,
        "vElementTypeName": "Input",
        "vElementJson": {
            "vMeasurementUnit": "",
            "cHasMeasurementPrefix": "N",
            "cIsCaseSensitive": "N",
            "iWidthInPixel": 50,
            "cIsNumber": "Y",
            "iTextFieldType": 4,
            "dWrongPoint": null,
            "dNotAnsweredPoint": null,
            "cIsEditableInput": "Y",
            "dCorrectPoint": null,
            "cIsPointOverride": "N",
            "Values": []
        },
        "cIsFirstLoad": "Y"
    };
};

/**
 * @name GetDefaultCMSInputLetterJson
 * @summary This methods returns Simple letter only input initial json.
 * @returns {object} Initial letter only input Json.
 * */
export const GetDefaultCMSInputLetterJson = () => {
    let intElementInputId = UniqueId.GetUniqueId();
    return {
        "iElementId": intElementInputId,
        "iElementTypeId": 5,
        "vElementTypeName": "Input",
        "vElementJson": {
            "vMeasurementUnit": "",
            "cHasMeasurementPrefix": "N",
            "cIsCaseSensitive": "N",
            "iWidthInPixel": 15,
            "cIsNumber": "N",
            "iTextFieldType": 2,
            "dWrongPoint": null,
            "dNotAnsweredPoint": null,
            "cIsEditableInput": "Y",
            "dCorrectPoint": null,
            "cIsPointOverride": "N",
            "Values": []
        },
        "cIsFirstLoad": "Y"
    };
};

/**
 * @name GetDefaultCMSInputDotJson
 * @summary This methods returns Simple Dot only input initial json.
 * @returns {object} Initial Dot only input Json.
 * */
export const GetDefaultCMSInputDotJson = () => {
    let intElementInputId = UniqueId.GetUniqueId();
    return {
        "iElementId": intElementInputId,
        "iElementTypeId": 5,
        "vElementTypeName": "Input",
        "vElementJson": {
            "vMeasurementUnit": "",
            "cHasMeasurementPrefix": "N",
            "cIsCaseSensitive": "N",
            "iWidthInPixel": 10,
            "cIsNumber": "N",
            "iTextFieldType": 5,
            "dWrongPoint": null,
            "dNotAnsweredPoint": null,
            "cIsEditableInput": "Y",
            "dCorrectPoint": null,
            "cIsPointOverride": "N",
            "Values": [
                {
                    "iElementInputValueId": UniqueId.GetUniqueId(),
                    "iDisplayOrder": 1,
                    "dTolerance": null,
                    "vText": "."
                }
            ]
        },
        "cIsFirstLoad": "Y"
    };
};

/**
 * @name GetDefaultCMSInputCommaJson
 * @summary This methods returns Simple comma only input initial json.
 * @returns {object} Initial comma only input Json.
 * */
export const GetDefaultCMSInputCommaJson = () => {
    let intElementInputId = UniqueId.GetUniqueId();
    return {
        "iElementId": intElementInputId,
        "iElementTypeId": 5,
        "vElementTypeName": "Input",
        "vElementJson": {
            "vMeasurementUnit": "",
            "cHasMeasurementPrefix": "N",
            "cIsCaseSensitive": "N",
            "iWidthInPixel": 10,
            "cIsNumber": "N",
            "iTextFieldType": 6,
            "dWrongPoint": null,
            "dNotAnsweredPoint": null,
            "cIsEditableInput": "Y",
            "dCorrectPoint": null,
            "cIsPointOverride": "N",
            "Values": [
                {
                    "iElementInputValueId": UniqueId.GetUniqueId(),
                    "iDisplayOrder": 1,
                    "dTolerance": null,
                    "vText": ","
                }
            ]
        },
        "cIsFirstLoad": "Y"
    };
};

/**
 * @name GetDefaultCMSInputSemicolonJson
 * @summary This methods returns Simple semicolon only input initial json.
 * @returns {object} Initial semicolon only input Json.
 * */
export const GetDefaultCMSInputSemicolonJson = () => {
    let intElementInputId = UniqueId.GetUniqueId();
    return {
        "iElementId": intElementInputId,
        "iElementTypeId": 5,
        "vElementTypeName": "Input",
        "vElementJson": {
            "vMeasurementUnit": "",
            "cHasMeasurementPrefix": "N",
            "cIsCaseSensitive": "N",
            "iWidthInPixel": 10,
            "cIsNumber": "N",
            "iTextFieldType": 7,
            "dWrongPoint": null,
            "dNotAnsweredPoint": null,
            "cIsEditableInput": "Y",
            "dCorrectPoint": null,
            "cIsPointOverride": "N",
            "Values": [
                {
                    "iElementInputValueId": UniqueId.GetUniqueId(),
                    "iDisplayOrder": 1,
                    "dTolerance": null,
                    "vText": ";"
                }
            ]
        },
        "cIsFirstLoad": "Y"
    };
};
