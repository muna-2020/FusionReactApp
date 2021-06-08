//React imports
import React, { forwardRef } from 'react';

//EditorState State classes/methods
import EditorState from "@shared/Framework/DataService/EditorState/EditorState";
import ApplicationState from "@shared/Framework/DataService/ApplicationState/ApplicationState";

/**
 * @name GetTextEditorInnerHtml
 * @param {string} strMode
 * @param {string} strId
 * @summary Returns the InnerHtml of the text editor.
 * @returns {any} Inner Html of text editor.
 */
export const GetTextEditorInnerHtml = (strMode, strId) => {
    let objTextEditor = document.getElementById("texteditor_" + strMode + "_" + strId);
    return objTextEditor.innerHTML;
};

/**
 * @name forwardComponent
 * @param {any} Component
 * @summary Attaches props to the component with forward ref.
 * @returns {any} forwarded component.
 */
// to be delete
export const forwardComponent = (Component) => {
    const ForwardedComponent = forwardRef((props, ref) => {
        return <Component {...props} />
    });
    let arrComponentProperties = Object.keys(Component);
    arrComponentProperties.map(strProperty => {
        if (strProperty !== "$$typeof") {
            ForwardedComponent[strProperty] = Component[strProperty];
        }
    })
    return ForwardedComponent;
};

/**
 * @name AttachRequiredKeysToElementJson 
 * @param {object} objElementJson Element Json.
 * @param {number} intContainerId Container Id.
 * @param {number} intFolderId Folder Id.
 * @summary Adds the required keys to Element Json. 
 * @returns {object} Element json with added required keys.
 */
export const AttachRequiredKeysToElementJson = (objElementJson, intContainerId, intFolderId = null) => {
    let objClientUserDetails = ApplicationState.GetProperty("ClientUserDetails") ? ApplicationState.GetProperty("ClientUserDetails") : ClientUserDetails;
    return {
        ...objElementJson,
        "iContainerId": intContainerId,
        "iMainClientId": parseInt(objClientUserDetails["MainClientId"]),
        "iFolderID": intFolderId === null ? -1 : intFolderId,
        "cIsDeleted": "N",
        "cIsDisplayedInElementTree": "Y",
        "cIsSecure": "Y",
        "uUserId": objClientUserDetails["UserId"],
        "vElementSkinName": null,
        "cIsQuestionPlaceholder": "N",
        "cHasTextOnTop": "N",
        "vHeaderText": null
    };
};


/**
 * @name UpdateDisplayOrder
 * @param {any} arrData array of data of which Display order is to be updated.
 * @summary Updates the display order in the passed array of data.
 * @returns {any} array of data after modification.
 */
export const UpdateOrder = (arrData) => {
    return arrData.map((objItem, intIndex) => {
        return {
            ...objItem,
            ["iOrder"]: intIndex + 1
        };
    });
};

/**
 * @name GetUniqueId
 * @summary Generates a unique id base Date,month,year. Used to avoid browser caching of pages
 * @returns {number} Numeric unique id.
 */
export const GetUniqueId = () => {
    let uid = Math.floor(new Date().valueOf() * Math.random());
    return parseInt(uid.toString().substr(0, 9));
};

/**
 * @name GetGUID
 * @summary Forms a guid string.
 * @returns {string} GUID.
 * */
export const GetGUID = () => {
    let strGUID = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
    return strGUID.toUpperCase();
};

/**
 * @name GetTextElementJson
 * @param {object} objTextJson
 */
export const GetTextElementJson = (props) => {
    let { ComponentController, ElementJson } = props;
    //if (ReactDomServer && ChunkExtractor && parse) {
    if (jsdom) {
        const { JSDOM } = jsdom;
        const { document } = (new JSDOM('')).window;
        const vText = ElementJson.vElementJson.vText;
        //let elementwrapper = parse(vText);
        let elementwrapper = document.createElement('DIV');
        elementwrapper.innerHTML = vText;
        for (var intCount = 0; intCount < ElementJson.vElementJson.SubElements.length; intCount++) {
            let objSubElementJson = ElementJson.vElementJson.SubElements[intCount]
            if (objSubElementJson) {
                let subelement = elementwrapper.querySelector(`[ielementid="${objSubElementJson["iElementId"]}"], [ielementaccessid="${objSubElementJson["iElementId"]}"]`);
                let NewSubElement = ComponentController.GetElement(objSubElementJson["vElementTypeName"]);
                if (subelement) {
                    const strStatsFile = path.join(props.JConfiguration.BasePhysicalPath, "/Arcadix.i.Product.React.Bundle/" + BundleFolderName + "/" + props.JConfiguration.ApplicationFolderName + props.JConfiguration.DeviceType + "/ServerBuild/loadable-stats.json");
                    const objExtractor = new ChunkExtractor({ statsFile: strStatsFile });
                    let Jsx = objExtractor.collectChunks(<NewSubElement {...props} ElementJson={objSubElementJson} IsSubElement={"Y"} />);
                    //subelement.insertAdjacentHTML("beforebegin", ReactDomServer.renderToString(Jsx));
                    //subelement.remove();
                    subelement.outerHTML = ReactDomServer.renderToString(Jsx);
                }
            }
        }
        ElementJson["vElementJson"]["vText"] = elementwrapper.innerHTML;
    }
    return ElementJson;
}