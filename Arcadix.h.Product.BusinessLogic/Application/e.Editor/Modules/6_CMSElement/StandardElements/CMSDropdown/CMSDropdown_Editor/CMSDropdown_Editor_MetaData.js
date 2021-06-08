//UniqueId.
import * as UniqueId from "@root/Framework/Services/UniqueId/UniqueId";

/**
 * @name GetDefaultCMSDropdownJson
 * @summary This methods returns dropdown initial json.
 * @returns {object} Initial dropdown Json.
 * */
export const GetDefaultElementJson = () => {
    let intElementDropdownId = UniqueId.GetUniqueId();
    return {
        "iElementId": intElementDropdownId,
        "iElementTypeId": 6,
        "vElementTypeName": "DropDown",
        "vElementJson": {
            "cIsFixedWidth": "N",
            "iWidth": "",
            "vDefaultText": "?",
            "cIsDefaultTextEmpty": "N",
            "cHidePleaseSelect": "N",
            "cIsRandomizedDisplay": "N",
            "cIsPointOverride": "N",
            "dCorrectPoint": 0,
            "dNotAnsweredPoint": 0,
            "Values": [
                {
                    "iElementDropdownValueId": UniqueId.GetUniqueId(),
                    "iDisplayOrder": 1,
                    "cIsCorrectValue": "Y",
                    "dWrongPoint": 0,
                    "vText": ""
                },
                {
                    "iElementDropdownValueId": UniqueId.GetUniqueId(),
                    "iDisplayOrder": 2,
                    "cIsCorrectValue": "N",
                    "dWrongPoint": 0,
                    "vText": ""
                }
            ]
        },
        "cIsFirstLoad": "Y"
    };
};
