//React imports
import React from 'react';

//Module realted fies.
import CMSColorFillWrapper_Editor_ContextMenu from "@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSColorFillWrapper/CMSColorFillWrapper_Editor/CMSColorFillWrapper_Editor_ContextMenu";

//Application State classes.
import ApplicationState from '@shared/Framework/DataService/ApplicationState/ApplicationState';

import * as CMSColorFillWrapper_Editor_MetaData from '@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSColorFillWrapper/CMSColorFillWrapper_Editor/CMSColorFillWrapper_Editor_MetaData';

//UniqueId.
import * as UniqueId from "@root/Framework/Services/UniqueId/UniqueId";

//BaseCMSElement import.
import * as BaseCMSElement from "@shared/Framework/BaseClass/EditorBaseClass/BaseCMSElement";

/**
 * @name CMSColorFillWrapper_Editor_ModuleProcessor
 * @summary Contains the ColorFill's editor version module specific methods.
 * */
class CMSColorFillWrapper_Editor_ModuleProcessor extends CMSColorFillWrapper_Editor_ContextMenu {

    /**
    * @name UpdateElementJson
    * @param {object} objContext {props, state, dispatch}
    * @param {object} objElementJson element json
    * @summary Updates the selected elemnt json
    */
    UpdateElementJson(objContext, objElementJson) {
        var objNewColorFillInstanceJson = CMSColorFillWrapper_Editor_MetaData.GetDefaultElementJson(objContext.state.ElementJson.iOrder, objElementJson);
        var svg = document.getElementById(`alphasvg_editor_${objContext.state.ElementJson.iElementId}`);
        console.log(svg);
        if (svg) {
            svg.innerHTML = "";
        }
        objContext.arrColorFill.current = [];
        objContext.dispatch({
            type: "SET_STATE",
            payload: {
                "ElementJson": {
                    ...objNewColorFillInstanceJson
                },
                "cIsFirstLoad": "Y",
                "blnChanged": true
            }
        });
        objContext.CMSColorFillWrapper_Editor_ModuleProcessor.UpdateTaskEditStatus(objContext);
    }

    /**
     * @name OpenAddPopup
     * @param {object} objContext {props, state, dispatch, PassedEvents, Data}
     * @summary opens ColorFill add edit popup
     */
    OpenAddPopup(objContext) {
        editorPopup.ShowPopup({
            "Data": {
                "MediaType": "ColorFill",
                "ShowMultiMediaAddEdit": true,
                //"ShowMultiMediaManagement": true,
                "ActionType": "Add",
                "PreSelectNode": { ...objContext.state.ElementJson.vColorFillElementJson },
                "iContainerId": objContext.props.iContainerId,
                "ElementJson": { ...objContext.state.ElementJson }
            },
            "Meta": {
                "PopupName": "MultiMediaPopup",
                "Height": 'auto',
                "Width": '800px',
                "ShowHeader": false,
                "ShowCloseIcon": true,
                "ShowToggleMaximizeIcon": true,
            },
            "Resource": {
                "Text": {},
                "SkinPath": objContext.props.JConfiguration.IntranetSkinPath
            },
            "Events": {},
            "CallBacks": {
                "GetElementJson": (objElementJson) => {
                    objContext.CMSColorFillWrapper_Editor_ModuleProcessor.UpdateElementJson(objContext, objElementJson);
                }
            }
        });
    }

    /**
     * @name SetAnswerRange
     * @param {object} objParams {objContext, iElementId, vColorValue}
     * @summary adds selected shape with it's color value as an answer
     */
    SetAnswerRange(objParams) {
        const { objContext, iElementId, vColorValue } = objParams;
    }

    /**
     * @name RemoveAnswerRange
     * @param {object} objParams {objContext, iElementId, vColorValue}
     * @summary removes selected shape from answer array
     */
    RemoveAnswerRange(objParams) {
        const { objContext, iElementId, vColorValue } = objParams;
    }

    /**
     * @name ShowPropertiesSidebar
     * @param {object} objContext {state, props, dispatch}
     * @summary Opens up the color fill property side bar.
     */
    ShowPropertiesSidebar(objContext) {
        objContext.CMSColorFillWrapper_Editor_ModuleProcessor.ClosePropertiesSidebar();
        const fnShowSidebar = ApplicationState.GetProperty("showSidebar");
        fnShowSidebar({
            ...objContext.props,
            "ElementJson": objContext.state.ElementJson.vColorFillElementJson,
            "blnShowColorFill": false,
            "SidebarProps": {
                "SidebarName": "ColorFillWrapperProperties",
                "Header": objContext.objTextResource["Title"],
                "Title": objContext.objTextResource["Subtitle"],
                "Status": 1,
                "AutoHide": false
            }
        });
    }

    /**
     * @name ClosePropertiesSidebar
     * @summary Closes the side bar.
     */
    ClosePropertiesSidebar() {
        const fnHideSidebar = ApplicationState.GetProperty("hideSidebar");
        fnHideSidebar();
    }
}

export default CMSColorFillWrapper_Editor_ModuleProcessor;
