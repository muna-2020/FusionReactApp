// React related imports.
import React from 'react';

//Base classes.
import EditorBase_ModuleProcessor from '@shared/Framework/BaseClass/EditorBaseClass/EditorBase_ModuleProcessor';

//Objects required for module.

import Object_Intranet_Member_IntranetAdministrator from '@shared/Object/c.Intranet/5_Member/IntranetAdministrator/IntranetAdministrator';

//Helper classes.
import ObjectQueue from '@shared/Framework/DataService/ObjectQueue/ObjectQueue';

//Application state Classes
import EditorState from '@shared/Framework/DataService/EditorState/EditorState';

/**
* @name Audit_ModuleProcessor
* @summary Class for Task module display.
*/
class Audit_ModuleProcessor extends EditorBase_ModuleProcessor {

    /**
     * @name StoreMapList     
     * @summary Returns list of objects used in the module
     * @return {Array} Array of object list
     */
    static StoreMapList() {
        return ["Object_Intranet_Member_IntranetAdministrator"];
    }

    /**
     * @name LoadInitialData
     * @param {object} objContext passes Context object
     * @summary Calls the Queue and Execute method
     */
    LoadInitialData(objContext) {
        (new ObjectQueue()).QueueAndExecute(this.InitialDataParams(objContext.props));
    }

    /**
     * @name InitialDataParams
     * @param {object} props passes props
     * @summary Get initial request params for the component.
     * @returns {object} return objDataCalls
     */
    InitialDataParams(props) {

        let arrDataRequest = [];

        Object_Intranet_Member_IntranetAdministrator.Initialize({});
        arrDataRequest = [...arrDataRequest, Object_Intranet_Member_IntranetAdministrator];

        return arrDataRequest;
    }

    /**
   * @name GetAdministratorName
   * @param {string} strUserId takes userid 
   * @param {object} objContext takes objContext
   * @returns {string} administrator name
   * @summary Returns name of Administrator
   */
    GetAdministratorName(strUserId, objContext) {
        var arrIntranetadministrators = objContext.props.Object_Intranet_Member_IntranetAdministrator.Data;
        var objIntranetadministrator = arrIntranetadministrators.find(objIntranetadministrator => {
            return objIntranetadministrator["uMainClientUserId"] === strUserId;
        });
        let strAdministratorName = objIntranetadministrator ? objIntranetadministrator["vFirstName"] + " " + objIntranetadministrator["vName"] : "";
        return strAdministratorName;
    }

    /**
     * @name GetSelectedRowData
     * @param {object} objContext {state, props, dispatch}
     * @param {object} objRowData selected row data
     */
    GetSelectedRowData(objContext, objRowData) {
        objContext.dispatch({ "type": "SET_STATE", "payload": { "objPageJson": JSON.parse(objRowData.vData), "blnAuditHighlight": true } });
    }

    /**
     * @name HandleAuditHighlight
     * @param {any} objContext
     */
    HandleAuditHighlight(objContext) {
        try {
            var objSelectedRow = objContext.state.objPageJson;
            var PageContent_HandlerRef = EditorState.GetReference("ActivePageContentRef");
            var objPreviousRow = PageContent_HandlerRef.current.GetSavedPageJson();

            var arrSelectedContainers = objSelectedRow.Containers;
            var arrPreviousContainers = objPreviousRow.Containers;

            if (arrSelectedContainers.length > 0) {
                for (var i = 0; i < arrSelectedContainers.length; i++) {
                    // if there is no matching container id, then container will be highlighted.  
                    var intLength = arrPreviousContainers.filter(e => e.iContainerTemplateId.toString() === arrSelectedContainers[i].iContainerTemplateId.toString()).length;
                    if (intLength === 0) {
                        this.HandleContainerBackgroundHighlight(`container-${arrSelectedContainers[i].iContainerId}-template-${arrSelectedContainers[i].iContainerTemplateId}`);
                    }
                    else {
                        // if container id's are matching, elements are checked here. 
                        var arrSelectedElements = arrSelectedContainers[i].Elements;
                        var arrPreviousElements = arrPreviousContainers[i].Elements;
                        var arrPreviousElementsFilter
                        if (arrSelectedElements.length > 0) {
                            for (var j = 0; j < arrSelectedElements.length; j++) {
                                // if there is no matching element id, then element will be highlighted.  
                                var intFilteredArrLength = arrPreviousElements.filter(e => e.iElementId.toString() === arrSelectedElements[j].iElementId.toString()).length;
                                if (intFilteredArrLength === 0) {
                                    this.HandleBackgroundHighlight(arrSelectedElements[j].iElementId, true);
                                }
                                else {
                                    var blnElementChanged = false
                                    if (arrPreviousElements.length > 0 && j < arrPreviousElements.length) {

                                        var objSelectedElement = arrSelectedElements[j];
                                        var objPreviousElement = arrPreviousElements[j];

                                        delete objSelectedElement.dtModifiedOn;
                                        delete objPreviousElement.dtModifiedOn;

                                        if (JSON.stringify(objSelectedElement) !== JSON.stringify(objPreviousElement)) {
                                            blnElementChanged = true;
                                        }
                                        if (arrSelectedElements[j].iElementId != arrPreviousElements[j].iElementId) {
                                            this.HandleBackgroundHighlight(arrSelectedElements[j].iElementId, true);
                                        }
                                        else {
                                            // Check for text element
                                            if (arrSelectedElements[j].vElementTypeName.toLowerCase() === "text") {
                                                var objSelectedTextElement = arrSelectedElements[j];
                                                var objPreviousTextElement = arrPreviousElements[j];
                                                if (typeof objSelectedTextElement !== "undefined" && objPreviousTextElement !== null) {
                                                    this.CompareTextElement(objPreviousTextElement, objSelectedTextElement);
                                                }
                                            }
                                            else {
                                                var arrSelectedTextElements = arrSelectedElements[j].vElementJson.TextElements;
                                                var arrPreviousTextElements = arrPreviousElements[j].vElementJson.TextElements;

                                                var arrSelectedValues = arrSelectedElements[j].vElementJson.Values;
                                                var arrPreviousValues = arrPreviousElements[j].vElementJson.Values;

                                                if (typeof arrSelectedTextElements !== "undefined" && arrSelectedTextElements !== null) {
                                                    this.HandleTextElements(arrPreviousTextElements, arrSelectedTextElements);
                                                }
                                            }
                                        }
                                        if (blnElementChanged) {
                                            this.HandleBackgroundHighlight(arrSelectedElements[j].iElementId, true);
                                        }
                                    }
                                    arrPreviousElementsFilter = arrPreviousElements.filter(e => e.iElementId.toString() !== arrSelectedElements[j].iElementId.toString());
                                }
                            }

                            if (typeof arrPreviousElementsFilter !== "undefined" && arrPreviousElementsFilter !== null) {
                                setTimeout(function () {

                                    arrPreviousElementsFilter.map((ele, i) => {
                                        console.log(ele);
                                        var rowId = `container-${arrSelectedContainers[i].iContainerId}-template-${arrSelectedContainers[i].iContainerTemplateId}-row-${ele.iOrder}`;
                                        var element = document.getElementById("Audit-Page-Content-Wrapper");
                                        var rowEle = element.querySelector(`[id='${rowId}']`);
                                        var overlayEle = rowEle.querySelector("[class='empty-overlay-image']");
                                        if (overlayEle) {
                                            overlayEle.style.backgroundColor = "yellow";
                                        }
                                        //else {
                                        //    element.querySelector(`[id='${strElementId}']`).style.backgroundColor = "yellow";
                                        //}
                                    });
                                }.bind(this), 400);
                            }
                        }
                        else {
                            // highlight's template row, if no elements found in the selected container.
                            if (arrPreviousElements.length > 0) {
                                for (var p = 0; p < arrPreviousElements.length; p++) {
                                    var rowId = `container-${arrPreviousContainers[i].iContainerId}-template-${arrPreviousContainers[i].iContainerTemplateId}-row-${arrPreviousElements[p].iOrderId}`;
                                    this.HandleBackgroundHighlight(rowId);
                                }
                            }
                        }
                        arrPreviousContainers = arrPreviousContainers.filter(e => e.iContainerId.toString() !== arrSelectedContainers[i].iContainerId.toString());
                    }
                }
            }
            else {
                if (arrPreviousContainers.length > 0) {
                    this.HandleBackgroundHighlight(`activeworkarea_edit_${objSelectedRow.iPageId}`);
                }
            }
        }
        catch (e) {
            console.log("AUDIT_HIGHLIGHT_ERROR", e);
        }
    }


    HandleContainerBackgroundHighlight(strContainerTemplateId) {
        try {
            var containerWrapper = document.getElementById("Audit-Page-Content-Wrapper");
            var template = containerWrapper.querySelector(`[id='${strContainerTemplateId}']`);
            if (template) {
                template = containerWrapper.querySelector(`[id='${strContainerTemplateId}']`).children;
                for (var t = 0; t < template.length; t++) {
                    template[t].style.backgroundColor = "yellow";
                }
            }
        }
        catch (e) {
            console.log("AUDIT_HandleContainerBackgroundHighlight_ERROR", e);
        }
    }

    HandleBackgroundHighlight(strElementId, blnAccessByAttribute = false, i = 0) {
        try {
            if (i < 5) {
                var ele = document.getElementById("Audit-Page-Content-Wrapper");
                if (!blnAccessByAttribute) {
                    ele.querySelector(`[id='${strElementId}']`).style.backgroundColor = "yellow";
                }
                else {
                    var r = ele.querySelector(`[ielementid='${strElementId}']`);
                    if (r) {
                        r.style.backgroundColor = "yellow";
                    }
                    else {
                        setTimeout(function () {
                            this.HandleBackgroundHighlight(strElementId, blnAccessByAttribute, i + 1);
                        }.bind(this), 200);
                    }
                }
            }
        }
        catch (e) {
            console.log("AUDIT_HandleBackgroundHighlight_ERROR", e);
        }
    }

    HandleTextElements(arrPreviousTextElements, arrSelectedTextElements) {
        try {
            if (arrSelectedTextElements.length > 0) {
                if (typeof arrPreviousTextElements !== "undefined" && arrPreviousTextElements !== null) {
                    arrSelectedTextElements = arrSelectedTextElements.filter((e, i) => {
                        var len = arrPreviousTextElements.filter(r => r === e).length;
                        if (len === 0) {
                            arrPreviousTextElements = arrPreviousTextElements.filter(s => s !== e);
                            return e;
                        }
                    });
                }
                for (var i = 0; i < arrSelectedTextElements.length; i++) {
                    this.HandleBackgroundHighlight(arrSelectedTextElements[i].iElementId, true);
                }
            }
        }
        catch (e) {
            console.log("AUDIT_HandleTextElements_ERROR", e);
        }
    }

    CompareTextElement(objPreviousTextElement, objSelectedTextElement) {
        try {
            if (typeof objPreviousTextElement !== "undefined" && objPreviousTextElement !== null) {
                if (objPreviousTextElement.vElementJson.vText !== objSelectedTextElement.vElementJson.vText) {
                    this.HandleBackgroundHighlight(objSelectedTextElement.iElementId);
                }
            }
            else {
                this.HandleBackgroundHighlight(objSelectedTextElement.iElementId);
            }
        }
        catch (e) {
            console.log("AUDIT_CompareTextElement_ERROR", e);
        }
    }


    /**
     * @name GetInitialRowData
     * @param {object} objContext {state, props, dispatch}
     * @param {object} objRowData initial row data
     */
    GetInitialRowData(objContext, objRowData) {
        if (objRowData) {
            objContext.dispatch({ "type": "SET_STATE", "payload": { "objPageJson": JSON.parse(objRowData["vData"]) } });
        }
        else {
            //editorPopup.ClosePopup(objContext.props.Id);
        }
    }

    /**
     * @name handleOkClick
     * @param {object} objContext {state, props, dispatch}
     */
    handleOkClick(objContext) {
        if (objContext.state.objPageJson) {
            objContext.props.Data.EditorWorkAreaRef.current.UpdatePageJsonForAudit(objContext.state.objPageJson);
        }
        editorPopup.ClosePopup(objContext.props.Id);
    }

    /**
     * @name handleCancelClick
     * @param {object} objContext {state, props, dispatch}
     */
    handleCancelClick(objContext) {
        editorPopup.ClosePopup(objContext.props.Id);
    }

    /**
    * @name GetDynamicStyles
    * @param {object} props component props.
    * @summary this returns the styles for the SSR.
    */
    GetDynamicStyles(props) {
        return [
            props.JConfiguration.EditorSkinPath + "/Css/Application/ReactJs/PC/Modules/1_EditorFrame/TopLeft/AuditPopup/AuditPopup.css"
        ];
    }
}

export default Audit_ModuleProcessor;