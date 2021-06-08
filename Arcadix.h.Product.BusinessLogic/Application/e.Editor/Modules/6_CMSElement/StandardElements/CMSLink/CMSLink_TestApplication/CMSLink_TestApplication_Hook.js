// React related impoprts.
import { useEffect, useImperativeHandle } from 'react';

import Document_ModuleProcessor from "@shared/Application/c.ProductManagement/Modules/5_Document/Document_ModuleProcessor";

/**
 * @name GetInitialState
 * @param {object} props component props
 * @summary Initialize the component's local state.
 * @returns {object} Returns the local state of the component.
 */
export const GetInitialState = (props) => {
    return {
        "ElementJson": { ...props.ElementJson },
        "ViewSolution": false,
        "ViewComparison": false,
        "LoadUserResponse": false,
        "PageId": props.PageId,
        "ComponentKey": props.ComponentKey,
        "isLoadComplete": false
    };
};

/**
 * @name Initialize
 * @param {object} objContext {props, state, dispatch, CMSLink_TestApplication_ModuleProcessor}
 * @summary Initialize the custom hooks.
 */
export const Initialize = (objContext) => {

    /**
     * @summary attaches attributes/events to hyperlink based on link properties 
     */
    useEffect(() => {

        var objElementJson = { ...objContext.state.ElementJson };
        var ele = objContext.Ref.current;
        if (objElementJson.vElementJson.cIsExternalLink === "Y") {
            ele.href = objElementJson.vElementJson.vLinkURL;
            ele.target = "_blank";
            ele.setAttribute("iElementType", "External");
        }
        else {
            if (objElementJson.vElementJson.Values.length > 0) {
                var strElementTypeName = objElementJson.vElementJson.Values[0].vElementTypeName;
                if (!/(image|audio|video)/.test(strElementTypeName.toLowerCase())) {
                    //if (objElementJson.vElementJson.vLinkURL) {
                    //    ele.href = objElementJson.vElementJson.vLinkURL;
                    //}
                    //else {
                    var strLink;
                    if (strElementTypeName.toLowerCase().indexOf("document") !== -1) {
                        strLink = `${objContext.props.JConfiguration.WebDataPath}Repo/Document/${objContext.props.JConfiguration.MainClientId}/${objElementJson.LinkElementDetails.iElementId}_Document_${objElementJson.LinkElementDetails.vElementJson.iDocumentFileVersion}.${objElementJson.LinkElementDetails.vElementJson.vDocumentType}`;
                        ele.href = strLink;
                    }
                    if (strElementTypeName.toLowerCase().indexOf("usecasedocument") !== -1) {
                        var objDocumentJson = objElementJson.vElementJson.Values[0];
                        //strLink = objContext.props.JConfiguration.BaseUrl + "API/Framework/Services/StreamFile?FileName=" + objDocumentJson.uDocumentId + "." + objDocumentJson.vFileType + "&Type=ProductManagement&DisplayFileName=" + objDocumentJson.vFileName + "." + objDocumentJson.vFileType + "&sessionkey=" + objContext.props.JConfiguration.SessionKey;
                        //ele.href = strLink;
                        ele.onclick = function () {
                            new Document_ModuleProcessor().Open(objDocumentJson, {}, false);
                        }
                    }
                    if (strElementTypeName.toLowerCase().indexOf("usecaseexample") !== -1) {
                        ele.href = objContext.props.JConfiguration.BaseUrl + "ModulePreview?PreviewComponent=" + objElementJson.vElementJson.Values[0].vModuleName + "&sessionkey=" + objContext.props.JConfiguration.SessionKey;
                    }
                    //}
                    ele.target = "_blank";
                    ele.setAttribute("iElementType", strElementTypeName);
                }
                else {
                    ele.setAttribute("iElementType", strElementTypeName);
                    ele.onclick = function () {
                        objContext.CMSLink_TestApplication_ModuleProcessor.OpenLinkInfoPopUp(objContext, strElementTypeName);
                    }
                }
            }
        }
    }, []);
};




