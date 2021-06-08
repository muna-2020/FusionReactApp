//Selection related imports.
import * as Selection from "@root/Application/e.Editor/PC/Modules/7_Text/Text_Editor/Selection/Selection";
import { GetSelection } from "../../Selection/Selection";

//Link MetaData.
import * as CMSLink_Editor_MetaData from '@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSLink/CMSLink_Editor/CMSLink_Editor_MetaData';

//Application State Classes.
import EditorState from '@shared/Framework/DataService/EditorState/EditorState';

//Application state reducer of store.
import ApplicationState from '@shared/Framework/DataService/ApplicationState/ApplicationState';

/**
 * @name InsertMail
 * @param strMail mail id.
 * @summary this wrap the selected text with the mail.
 * */
const InsertMail = (strMail, objTargetLink) => {
    /* develblock:start */
    global.ApplicationLog.Log("Link.InsertMail: Entered");
    /* develblock:end */
    let objSelection = Selection.GetSelection();
    if (!objSelection.Selection.isCollapsed) {
        let objNewAnchor;
        if (!objTargetLink) {
            document.execCommand("Unlink");
            objSelection = Selection.GetSelection();
            objNewAnchor = document.createElement('a');
            objNewAnchor.appendChild(document.createTextNode(objSelection.Range.toString()));
            objNewAnchor.addEventListener('dblclick', (objEvent) => ShowMailPopup(objEvent.currentTarget));
            objSelection.Range.deleteContents();
            objSelection.Range.insertNode(objNewAnchor);
        } else {
            objNewAnchor = objTargetLink;
        }
        objNewAnchor.setAttribute('type', 'EmailLink');
        objNewAnchor.setAttribute('linkurl', strMail);
        objNewAnchor.setAttribute('actualtype', 'External');
        objNewAnchor.style.textDecoration = "underline";
        objNewAnchor.setAttribute("class", "PageOutputContentAnchor");
        objNewAnchor.href = "mailto:" + strMail;
        objNewAnchor.setAttribute("mailid", strMail);
    }
    /* develblock:start */
    global.ApplicationLog.Log("SpellCheck.InsertMail: Exited");
    /* develblock:end */
};

/**
 * @name ShowMailToPopup
 * @summary display the mail popup.
 * */
export const ShowMailPopup = (objLink) => {
    /* develblock:start */
    global.ApplicationLog.Log("Link.ShowMailPopup: Entered");
    /* develblock:end */
    let objTargetMail = null;
    if (objLink && objLink != null && objLink.tagName.toUpperCase() === "A") {
        objTargetMail = objLink;
    }
    editorPopup.ShowPopup({
        "Data": { objTargetMail: objTargetMail },
        "Meta": {
            "PopupName": "MailPopup",
            "Height": "auto",
            "Width": "500px",
            "ShowCloseIcon": true,
            "ShowToggleMaximizeIcon": true
        },
        "CallBacks": {
            "InsertMail": (strMail, objTargetMail) => InsertMail(strMail, objTargetMail)
        },
        "Events": {}
    });
    /* develblock:start */
    global.ApplicationLog.Log("SpellCheck.ShowMailPopup: Exited");
    /* develblock:end */
};

/**
 * create a link with element attributes and return
 * usage : internal
 * @param {*} objElement 
 */
const GetLink = (objElement) => {
    /* develblock:start */
    global.ApplicationLog.Log("Link.GetLink: Entered");
    /* develblock:end */
    let newAnchar = document.createElement('a');
    newAnchar.setAttribute("ielementid", objElement.Id);
    newAnchar.setAttribute("velementtype", objElement.Type);
    newAnchar.className = "PageOutputContentAnchor";
    newAnchar.setAttribute('type', 'Link');
    if (objElement.actualtype) {
        newAnchar.setAttribute('actualtype', "External");
    }
    if (objElement.processedhref) {
        newAnchar.setAttribute('processedhref', objElement.processedhref);
    }
    newAnchar.href = "javascript:openlink(&quot;V&quot;,&quot;258011&quot;,&quot;_&quot;)";
    newAnchar.elementtarget = "-";
    /* develblock:start */
    global.ApplicationLog.Log("Link.GetLink: Exited");
    /* develblock:end */
    return newAnchar;
};

/**
 * @name GetElementLink
 * @param {object} objElement object.
 * @summary this return the link element with all the attributes.
 */
const GetElementLink = (objElement) => {
    /* develblock:start */
    global.ApplicationLog.Log("Link.GetElementLink: Entered");
    /* develblock:end */
    let newAnchar = document.createElement('a');
    newAnchar.setAttribute("ielementid", objElement.iElementId);
    newAnchar.setAttribute("ielementtypeid", objElement.iElementTypeId);
    newAnchar.className = "PageOutputContentAnchor";
    newAnchar.setAttribute('type', 'Link');
    newAnchar.href = "javascript:openlink('I','" + objElement.iElementId + "','_');";
    /* develblock:start */
    global.ApplicationLog.Log("Link.GetElementLink: Exited");
    /* develblock:end */
    return newAnchar;
}

/**
 * @name ShowMailToPopup
 * @param {*} objEvt 
 * @summary display the mail Popup.
 */
const ShowMailToPopup_Old = (objEvt) => {
    // const FnShowPopup = EditorState.GetProperty("showeditorPopUp");
    editorPopup.ShowPopup({
        PopupName: 'mailtopopup',
        PopupProps: {
            Data: { email: objEvt.target.getAttribute('src') },
            PassedEvents: { MailTo: MailTo },
        }
    });
};

/**
 * @name ShowLinkPopup
 * @summary display the link popup.
 * */
export const ShowLinkPopup = (objContext, blnLinkChanged = false, MediaType = null, fnEditStatusCallBack = () => { }) => {
    /* develblock:start */
    global.ApplicationLog.Log("Link.ShowLinkPopup: Entered");
    /* develblock:end */
    var objSelection = Selection.GetSelection();
    var strMediaType = "Link";
    var blnShowContainerForExternalLink = strMediaType.toLowerCase() === "link" ? true : false
    if (objContext.props.MultiMediaUsageGroupId) {
        if (objContext.props.MultiMediaUsageGroupId.toLowerCase() === "usecasemediagroup") {
            strMediaType = "UseCase";
            blnShowContainerForExternalLink = false;
        }
    }
    if (MediaType && MediaType.toLowerCase().indexOf("usecase") !== -1) {
        strMediaType = "UseCase";
        blnShowContainerForExternalLink = false;
    }
    if (objSelection) {
        var objData = {
            "MediaType": strMediaType,
            "ComponentController": objContext.props.ComponentController,
            "ShowMultiMediaAddEdit": false,
            "ShowMultiMediaManagement": true,
            "ShowContainerForExternalLink": blnShowContainerForExternalLink,
            "ElementJson": { ...objContext.state.ElementJson }
        }
        if (blnLinkChanged) {
            objData = { ...objData, ["PreSelectNode"]: { ...objContext.state.ElementJson.vElementJson.Values[0] } };
            if (strMediaType.toLowerCase() === "link" && objContext.state.ElementJson && objContext.state.ElementJson.vElementJson.cIsExternalLink === "Y") {
                objData = { ...objData, ["vLinkURL"]: objContext.state.ElementJson.vElementJson.vLinkURL };
            }
        }
        editorPopup.ShowPopup({
            "Data": { ...objData },
            "Meta": {
                "PopupName": "MultiMediaPopup",
                "Height": strMediaType.toLowerCase() === "link" ? 'auto' : '583px',
                "Width": '800px',
                "ShowCloseIcon": true,
                "ShowToggleMaximizeIcon": true
            },
            "Resource": {
                "Text": {},
                "SkinPath": objContext.props.JConfiguration.IntranetSkinPath
            },
            "Events": {},
            "CallBacks": {
                "GetElementJson": (objElementJson) => {
                    var strSelectedText = objSelection.Range.toString();
                    if (strSelectedText) {
                        fnEditStatusCallBack();
                        if (objSelection.SourceElement && /(document|example)/gi.test(objSelection.SourceElement.getAttribute("velementtype"))) {
                            blnLinkChanged = true;
                        }
                        const objTextEditorRef = EditorState.GetReference("CurrentTextRef");
                        if (objTextEditorRef && objTextEditorRef.current && objTextEditorRef.current.AddSubElement) {
                            var objLinkElementJson = { ...CMSLink_Editor_MetaData.GetDefaultElementJson() };
                            var vLinkType = "link";
                            var objElementLinkProperties = {};
                            if (objElementJson["LinkProperties"]) {
                                objElementLinkProperties = { ...objElementJson["LinkProperties"] };
                            }
                            objLinkElementJson = {
                                ...objLinkElementJson, ["vElementJson"]: {
                                    ...objLinkElementJson["vElementJson"],
                                    "vLinkText": strSelectedText,
                                    ...objElementLinkProperties
                                }
                            }
                            delete objElementJson.LinkProperties;
                            if (objLinkElementJson["vElementJson"]["cIsExternalLink"] === "N") {
                                var objValues = {
                                    "iElementId": objElementJson["iElementId"],
                                    "vElementTypeName": objElementJson["vElementTypeName"]
                                }
                                if (objElementJson["vElementTypeName"]) {
                                    if (ApplicationState.GetProperty("SelectedNode") && objElementJson["vElementTypeName"].toLowerCase() === "usecaseexample") {
                                        var strModule = ApplicationState.GetProperty("SelectedNode").MultiMediaManagement_Tree.ElementJson.vModuleName;
                                        objValues = {
                                            ...objValues,
                                            "iElementId": objElementJson["uModuleId"],
                                            "vModuleName": strModule
                                        };
                                        vLinkType = "usecaseexample";
                                    }
                                    if (objElementJson["vElementTypeName"].toLowerCase() === "usecasedocument") {
                                        objValues = {
                                            ...objValues,
                                            "iElementId": objElementJson["uDocumentId"],
                                            "uDocumentId": objElementJson["uDocumentId"],
                                            "vFileType": objElementJson["vFileType"],
                                            "vFileName": objElementJson["vFileName"]
                                        };
                                        vLinkType = "usecasedocument";
                                    }
                                }
                                objLinkElementJson = {
                                    ...objLinkElementJson, ["vElementJson"]: {
                                        ...objLinkElementJson["vElementJson"],
                                        ["Values"]: [objValues],
                                        ["vLinkType"]: vLinkType
                                    },
                                    ["LinkElementDetails"]: objElementJson
                                }
                            }
                            if (!blnLinkChanged) {
                                objTextEditorRef.current.AddSubElement(objLinkElementJson);
                            }
                            else {
                                objContext.dispatch({ "type": "SET_STATE", "payload": { "ElementJson": objLinkElementJson } });
                            }
                        }
                    }
                }
            }
        });
    }
    /* develblock:start */
    global.ApplicationLog.Log("Link.ShowLinkPopup: Exited");
    /* develblock:end */
}

/**
 * 
 * @param {*} objSelection 
 */
const RemoveLinksNGetHtml = (objSelection) => {
    let tempDiv = document.createElement('div');
    tempDiv.appendChild(objSelection.RangeObject.extractContents());
    let arrAnchor = tempDiv.querySelectorAll('a[type="EmailLink"]');
    for (let i = 0; i < arrAnchor.length; i++) {
        arrAnchor[i].outerHTML = arrAnchor[i].innerHTML;
    }
    return tempDiv;
};

/**
 * @name AddElementLink
 * @param {object} objElement 
 * @summary wrap with element link
 */
export const AddElementLink = (objElement) => {
    /* develblock:start */
    global.ApplicationLog.Log("Link.AddElementLink: Entered");
    /* develblock:end */
    let objSelection = Selection.GetSelection();
    if (!objSelection.Selection.isCollapsed) {
        document.execCommand("Unlink");
        objSelection = Selection.GetSelection();
        let strDirection = objSelection.GetDirection();
        let objLastNode;
        if (strDirection === "LeftToRight") {
            objLastNode = objSelection.Selection.focusNode.parentNode;
        } else {
            objLastNode = objSelection.Selection.anchorNode.parentNode;
        }
        let objNewAnchar = GetElementLink(objElement);
        objNewAnchar.innerText = objSelection.Range.toString();
        objNewAnchar.addEventListener('dblclick', ShowLinkPopup);
        objSelection.Range.deleteContents();
        objSelection.Range.insertNode(objNewAnchar);
    }
    /* develblock:start */
    global.ApplicationLog.Log("Link.AddElementLink: Exited");
    /* develblock:end */
};

/**
 * @param {string} strLink link
 * @summary wrap content with external link
 */
export const AddExternalLink = (strLink) => {
    /* develblock:start */
    global.ApplicationLog.Log("Link.AddExternalLink: Entered");
    /* develblock:end */
    let objSelection = Selection.GetDomSelection();
    let objDirection = Selection.GetSelectionDirection();
    if (!objSelection.SelectionObject.isCollapsed) {
        document.execCommand("Unlink");
        objSelection = Selection.GetDomSelection();
        let objLastNode;
        if (objDirection.From === "Left" && objDirection.To === "Right") {
            objLastNode = objSelection.SelectionObject.focusNode.parentNode;
        } else {
            objLastNode = objSelection.SelectionObject.anchorNode.parentNode;
        }
        let newAnchor = GetLink({ actualtype: "external", processedhref: strLink });
        newAnchor.setAttribute("type", "Link");
        newAnchor.setAttribute("actualtype", "External");
        newAnchor.setAttribute('linkurl', link);
        newAnchor.setAttribute("href", "javascript:openlink('E'," + strLink + ",'_');''")
        if (objDirection.From === "Left" && objDirection.To === "Right") {
            objLastNode = objSelection.SelectionObject.focusNode.parentNode;
        } else {
            objLastNode = objSelection.SelectionObject.anchorNode.parentNode;
        }
        newAnchor.innerText = objSelection.RangeObject.toString();
        newAnchor.addEventListener('dblclick', ShowLinkPopup);
        objSelection.RangeObject.deleteContents();
        objSelection.RangeObject.insertNode(newAnchor);
    }
    /* develblock:start */
    global.ApplicationLog.Log("Link.AddExternalLink: Exited");
    /* develblock:end */
};

/**
 * @name RemoveLink
 * @summary remove links from the selection.
 */
export const RemoveLink = () => {
    /* develblock:start */
    global.ApplicationLog.Log("Link.RemoveLink: Entered");
    /* develblock:end */
    GetSelection();
    document.execCommand("Unlink");
    //GetSelection();
    /* develblock:start */
    global.ApplicationLog.Log("Link.RemoveLink: Exited");
    /* develblock:end */
};

const RemoveTextDecoration = () => {

}