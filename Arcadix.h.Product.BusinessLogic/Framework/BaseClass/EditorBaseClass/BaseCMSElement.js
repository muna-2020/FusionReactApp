import React from 'react';

//Store related imports
import ApplicationState from "@shared/Framework/DataService/ApplicationState/ApplicationState";

/**
 * @name forwardComponent
 * @param {any} Component
 * @summary Attaches props to the component with forward ref.
 * @returns {any} forwarded component
 */
// to be delete
export const forwardComponent = (Component) => {
    const ForwardedComponent = forwardRef((props, ref) => {
        return <Component {...props} />;
    });
    let arrComponentProperties = Object.keys(Component);
    arrComponentProperties.map(strProperty => {
        if (strProperty !== "$$typeof") {
            ForwardedComponent[strProperty] = Component[strProperty];
        }
    });
    return ForwardedComponent;
};

/**
 * @name AttachRequiredKeysToElementJson
 * @param {object} objElementJson Element Json
 * @param {number} intContainerId Container Id
 * @param {number} intFolderId Folder Id
 * @summary Adds the required keys to Element Json.
 * @returns {object} Element json with added required keys
 */
export const AttachRequiredKeysToElementJson = (objElementJson, intContainerId, intFolderId = null) => {
    let objClientUserDetails = ApplicationState.GetProperty("ClientUserDetails") ? ApplicationState.GetProperty("ClientUserDetails") : ClientUserDetails;
    return {
        ...objElementJson,
        "iContainerId": intContainerId !== null ? intContainerId : -1,
        "iMainClientId": parseInt(objClientUserDetails["MainClientId"]),
        "iFolderID": intFolderId === null ? -1 : intFolderId,
        "cIsDeleted": "N",
        "cIsDisplayedInElementTree": objElementJson["cIsDisplayedInElementTree"] ? objElementJson["cIsDisplayedInElementTree"] : "N",
        "cIsSecure": "Y",
        "uUserId": objClientUserDetails["UserId"],
        "vElementSkinName": null,
        "cIsQuestionPlaceholder": "N",
        "cHasTextOnTop": "N",
        "vHeaderText": null
    };
};

/**
 * @name objElementJson
 * @param {object} objElementJson Element json from which Ref/TextEditorRef has to be removed
 * @summary Removes the ref key from passed json
 * @returns {object} Element Json
 */
export const RemoveRefKeyFromJson = (objElementJson) => {
    let { Ref, TextRef, ...objNewElementJson } = objElementJson;
    return objNewElementJson;
};

/**
 * @name UpdateDisplayOrder
 * @param {any} arrData array of data of which Display order is to be updated.
 * @summary Updates the display order in the passed array of data.
 * @returns {any} array of data after modification.
 */
export const UpdateDisplayOrder = (arrData, strColumnName = "iDisplayOrder") => {
    return arrData.map((objItem, intIndex) => {
        return {
            ...objItem,
            [strColumnName]: intIndex + 1
        };
    });
};

/**
 * @name ImmutableSwap
 * @param {any} arrData Array of data which contains data to indexed to be swapped.
 * @param {number} intIndex1 Index if first data.
 * @param {number} intIndex2 Index of second data.
 * @summary Swaps the object places immutably.
 * @returns {any} Array after swapping
 */
export const ImmutableSwap = (arrData, intIndex1, intIndex2) => {
    const arrNew = arrData.slice();
    let temp = arrNew[intIndex1];
    arrNew[intIndex1] = arrNew[intIndex2];
    arrNew[intIndex2] = temp;
    return arrNew;
};

/**
 * @name ShuffleArray
 * @param {any} arrData array of data which is to be shuffled.
 * @summary Shuffles elements of an array. 
 * @returns {any} shuffled array.
 */
export const ShuffleArray = (arrData) => {
    if (arrData.length > 0) {
        for (let intCounter = arrData.length - 1; intCounter > 0; intCounter--) {
            let intRandomNumber = Math.floor(Math.random() * (intCounter + 1));
            [arrData[intCounter], arrData[intRandomNumber]] = [arrData[intRandomNumber], arrData[intCounter]];
        }
    }
    return arrData;
};

/** 
 * @name AttachRef 
 * @param {object} objElementJson Element Json of the element.
 * @summary Adds a Ref key to the TextElements(if "TextElements" are present) and the main element. 
 * @returns {object} ElementJson with added Ref.
 */
export const AttachRef = (objElementJson) => {
    return {
        ...objElementJson,
        ["vElementJson"]: {
            ...objElementJson["vElementJson"],
            ["TextElements"]: objElementJson["vElementJson"]["TextElements"] ? [...objElementJson["vElementJson"]["TextElements"].map(objTempData => {
                return {
                    ...objTempData,
                    ["Ref"]: React.createRef(), // ref for CMSText.
                    ["TextRef"]: React.createRef() // ref for Text_Editor.
                };
            })] : undefined
        },
        ["Ref"]: React.createRef() // ref for CMS<InteractionType>_Editor.
    };
};

/**
 * @name getDate
 * @param {string} strDate date 
 * @returns {string} returns date in DD:MM:YYYY format
 */
export const GetDate = (strDate) => {
    var objDate = new Date(strDate);
    return objDate.getDate() + ":" + (objDate.getMonth() + 1) + ":" + objDate.getFullYear();
};


