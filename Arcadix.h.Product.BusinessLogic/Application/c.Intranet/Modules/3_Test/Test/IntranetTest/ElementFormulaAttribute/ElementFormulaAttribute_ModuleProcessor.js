//Objects required for module.
import Object_Cockpit_MainClient_MainClientLanguage from '@shared/Object/c.Cockpit/MainClient/MainClientLanguage/MainClientLanguage';
import Object_Cockpit_Language from '@shared/Object/c.Cockpit/Language/Language';
import Object_Intranet_Setting_ElementFormulaAttribute from '@shared/Object/c.Intranet/8_Setting/ElementFormulaAttribute/ElementFormulaAttribute';

//Module related Object
import * as ElementFormulaAttribute_OfficeRibbon from '@shared/Application/c.Intranet/Modules/3_Test/Test/IntranetTest/ElementFormulaAttribute/ElementFormulaAttribute_OfficeRibbon';

/**
 * @name ElementFormulaAttribute_ModuleProcessor
 * @summary Class for ElementFormulaAttribute module display.
 */
class ElementFormulaAttribute_ModuleProcessor extends IntranetBase_ModuleProcessor {

    /**
     * @name StoreMapList     
     * @summary Returns list of objects used in the module
     * @return {Array} Array of object list
     */
    static StoreMapList() {
        return [
            "Object_Intranet_Setting_ElementFormulaAttribute",
            "Object_Cockpit_MainClient_MainClientLanguage",
            "Object_Cockpit_Language",
            "Object_Framework_Services_TextResource;Id;" + JConfiguration.LanguageCultureInfo + "/c.Intranet/Modules/3_Test/Test/IntranetTest/ElementFormulaAttribute",
        ];
    }
    /**
     * @name LoadInitialData
     * @param {object} objContext passes Context object
     * @summary Calls the Queue and Execute method
     */
    LoadInitialData(objContext) {
        (new ObjectQueue()).QueueAndExecuteAPI(this, objContext.props);
    }

    /**
     * @name InitialDataParams
     * @param {object} props passes props
     * @summary Get initial request params for the component.
     * @returns {object} return objDataCalls
     */
    InitialDataParams(props) {

        let arrDataRequest = [];

        //ElementFormulaAttribute
        Object_Intranet_Setting_ElementFormulaAttribute.Initialize({});
        arrDataRequest = [...arrDataRequest, Object_Intranet_Setting_ElementFormulaAttribute]

        // MainClient Language
        Object_Cockpit_MainClient_MainClientLanguage.Initialize({});
        arrDataRequest = [...arrDataRequest, Object_Cockpit_MainClient_MainClientLanguage];

        // Language
        Object_Cockpit_Language.Initialize({});
        arrDataRequest = [...arrDataRequest, Object_Cockpit_Language];

        // Text Resource
        let arrResourceParams = ["/c.Intranet/Modules/3_Test/Test/IntranetTest/ElementFormulaAttribute"];
        Object_Framework_Services_TextResource.Initialize(arrResourceParams);
        arrDataRequest = [...arrDataRequest, Object_Framework_Services_TextResource];

        return arrDataRequest;
    }

    /**
     * @name HandleChange
     * @param {string} strAttributeName consists of the vColumnName
     * @param {string} strValue consists of value of the input
     * @param {object} objContext takes objContext
     * @param {string} strLanguageId consists of LanguageId for metalanguage input if any
     * @summary Handle change method to handle changes in the jsx elements
     */
    HandleChange(strAttributeName, objFormulatAttribute, strValue, objContext, strLanguageId = "") {
        let arrnewFormulaAttributedata = new Array;
        //let objselectedElementAttribute =DataRef(objContext.props.Object_Intranet_Setting_ElementFormulaAttribute)["Data"].filter(obj => obj["cIsDefault"] === "Y" && obj["cIsForWholeTask"] === "Y" && obj["iMainClientId"] == objContext.props.ClientUserDetails.MainClientId)[0] != undefined ? DataRef(objContext.props.Object_Intranet_Setting_ElementFormulaAttribute)["Data"].filter(obj => obj["cIsDefault"] === "Y" && obj["cIsForWholeTask"] === "Y" && obj["iMainClientId"] == objContext.props.ClientUserDetails.MainClientId)[0] : DataRef(objContext.props.Object_Intranet_Setting_ElementFormulaAttribute)["Data"].filter(obj => obj["cIsDefault"] === "Y" && obj["cIsForWholeTask"] === "Y" && obj["iMainClientId"] == 0)[0];
        objContext.state.objselectedElementAttribute["t_TestDrive_Test_ResultAttribute_ElementAttribute"].map((objElementFormulaAttribute) => {
            if (objElementFormulaAttribute["uElementFormulaAttributeId"] == objFormulatAttribute["uElementFormulaAttributeId"]) {
                arrnewFormulaAttributedata.push({ ...objElementFormulaAttribute, [strAttributeName]: strValue })
            }
            else {
                arrnewFormulaAttributedata.push(objElementFormulaAttribute)
            }
        })
        objContext.dispatch({ type: "SET_STATE", payload: { "objselectedElementAttribute": { ...objContext.state.objselectedElementAttribute, "t_TestDrive_Test_ResultAttribute_ElementAttribute": arrnewFormulaAttributedata } } });
    }


    /**
     * @name CheckBoxClickHandler
     * @param {object} objLanguage takes objLanguage
     * @param {object} objApplicationType takes objApplicationType
     * @param {object} objContext takes objContext
     * @summary Handles checkBox click of MainClient Language
     */
    CheckBoxClickHandler(strcIsForWholeTask, objselectedData, objContext) {
        objContext.dispatch({ type: "SET_STATE", payload: { "objselectedElementAttribute": { ...objselectedData, "cIsDefault": "Y" }, "strcIsForWholeTask": objselectedData["cIsForWholeTask"] } })
    }

    /**
     * @name FullEvalutionHandleChange
     * @param {object} objLanguage takes objLanguage
     * @param {object} objApplicationType takes objApplicationType
     * @param {object} objContext takes objContext
     * @summary Handles checkBox click of MainClient Language
     */
    FullEvalutionHandleChange(strAttributeName, objFormulatAttribute, strValue, objContext, strLanguageId = "") {
        objContext.dispatch({ type: "SET_STATE", payload: { "objselectedElementAttribute": { ...objFormulatAttribute, [strAttributeName]: strValue } } });
    }

    /**
     * @name CheckBoxClickHandler
     * @param {object} objLanguage takes objLanguage
     * @param {object} objApplicationType takes objApplicationType
     * @param {object} objContext takes objContext
     * @summary Handles checkBox click of MainClient Language
     */
    OnRuleDescriptionClick(strsSelectedOption, objResultAttribute, objContext) {
        let arrnewResultAttributedata = new Array;
        //let objselectedElementAttribute = DataRef(objContext.props.Object_Intranet_Setting_ElementFormulaAttribute)["Data"].filter(obj => obj["cIsDefault"] === "Y" && obj["cIsForWholeTask"] === "Y" && obj["iMainClientId"] == objContext.props.ClientUserDetails.MainClientId)[0] != undefined ? DataRef(objContext.props.Object_Intranet_Setting_ElementFormulaAttribute)["Data"].filter(obj => obj["cIsDefault"] === "Y" && obj["cIsForWholeTask"] === "Y" && obj["iMainClientId"] == objContext.props.ClientUserDetails.MainClientId)[0] : DataRef(objContext.props.Object_Intranet_Setting_ElementFormulaAttribute)["Data"].filter(obj => obj["cIsDefault"] === "Y" && obj["cIsForWholeTask"] === "Y" && obj["iMainClientId"] == 0)[0];
        objContext.state.objselectedElementAttribute["t_TestDrive_Test_ResultAttribute_ElementRule"].map((objElementRuleAttribute) => {
            if (objElementRuleAttribute["uTestElementRuleId"] == objResultAttribute["uTestElementRuleId"]) {
                arrnewResultAttributedata.push({ ...objElementRuleAttribute, "iElementRuleId": strsSelectedOption })
            }
            else {
                arrnewResultAttributedata.push(objElementRuleAttribute)
            }
        })
        objContext.dispatch({ type: "SET_STATE", payload: { "objselectedElementAttribute": { ...objContext.state.objselectedElementAttribute, "t_TestDrive_Test_ResultAttribute_ElementRule": arrnewResultAttributedata } } });
    }

    /**
     * @name SaveData
     * @param {object} objContext takes objContext
     * @param {boolean} blnClose sends true when SaveAndClosed is pressed
     * @summary hits the add/edit API after validation succeeds
     */
    SaveData(objContext) {
        ApplicationState.SetProperty("blnShowAnimation", true);
        let vAddEditData = new Array();
        //let objselectedElementAttribute = DataRef(objContext.props.Object_Intranet_Setting_ElementFormulaAttribute)["Data"].filter(obj => obj["cIsDefault"] === "Y" && obj["cIsForWholeTask"] === "Y" && obj["iMainClientId"] == objContext.props.ClientUserDetails.MainClientId)[0] != undefined ? DataRef(objContext.props.Object_Intranet_Setting_ElementFormulaAttribute)["Data"].filter(obj => obj["cIsDefault"] === "Y" && obj["cIsForWholeTask"] === "Y" && obj["iMainClientId"] == objContext.props.ClientUserDetails.MainClientId)[0] : DataRef(objContext.props.Object_Intranet_Setting_ElementFormulaAttribute)["Data"].filter(obj => obj["cIsDefault"] === "Y" && obj["cIsForWholeTask"] === "Y" && obj["iMainClientId"] == 0)[0];
        if (objContext.state.objselectedElementAttribute["t_TestDrive_Test_ResultAttribute_ElementAttribute_Template_Data"].filter(obj => obj["iLanguageId"] == objContext.props.JConfiguration.InterfaceLanguageId).length > 0) {
            vAddEditData = objContext.state.objselectedElementAttribute["t_TestDrive_Test_ResultAttribute_ElementAttribute_Template_Data"]
        }
        else {
            vAddEditData = objContext.state.objselectedElementAttribute["t_TestDrive_Test_ResultAttribute_ElementAttribute_Template_Data"];
            vAddEditData.push({ "iLanguageId": objContext.props.JConfiguration.InterfaceLanguageId, "vTemplateName": objContext.state.objselectedElementAttribute["t_TestDrive_Test_ResultAttribute_ElementAttribute_Template_Data"][0]["vTemplateName"] });
        }

        if (objContext.state.objselectedElementAttribute["iMainClientId"] == 0) {
            let objData = {
                "vAddData": { ...objContext.state.objselectedElementAttribute, "t_TestDrive_Test_ResultAttribute_ElementAttribute_Template_Data": vAddEditData, "iMainClientId": objContext.props.ClientUserDetails.MainClientId },// objContext.state.objselectedElementAttribute,
                "uUserId": objContext.props.ClientUserDetails.UserId
            }

            Object_Intranet_Setting_ElementFormulaAttribute.AddData(objData, (objReturn, cIsNewData) => {
                let arrnewElementattributeData = objContext.state.arrElementAttributeData;
                arrnewElementattributeData.push(objReturn[0]);
                objContext.dispatch({ type: "SET_STATE", payload: { "objselectedElementAttribute": objReturn[0], "arrElementAttributeData": arrnewElementattributeData } });
                ApplicationState.SetProperty("blnShowAnimation", false);
            });
        }
        else {
            let objselectedElementAttribute = objContext.state.arrElementAttributeData.filter(obj => obj["uElementFormulaAttributeTemplateId"] == objContext.state.objselectedElementAttribute["uElementFormulaAttributeTemplateId"]);
            if (objselectedElementAttribute[0]["cIsDefault"] == "Y") {
                let objData = {
                    "vAddData": { ...objContext.state.objselectedElementAttribute, "t_TestDrive_Test_ResultAttribute_ElementAttribute_Template_Data": vAddEditData, "cIsDefault": "N" },
                    "uUserId": objContext.props.ClientUserDetails.UserId
                }

                Object_Intranet_Setting_ElementFormulaAttribute.AddData(objData, (objReturn, cIsNewData) => {
                    let arrnewElementattributeData = objContext.state.arrElementAttributeData;
                    arrnewElementattributeData.push(objReturn[0]);
                    objContext.dispatch({ type: "SET_STATE", payload: { "arrElementAttributeData": arrnewElementattributeData } });
                    ApplicationState.SetProperty("blnShowAnimation", false);
                })
            }

            else {
                let objData = {
                    "vEditData": { ...objContext.state.objselectedElementAttribute, "t_TestDrive_Test_ResultAttribute_ElementAttribute_Template_Data": vAddEditData, "cIsDefault": "N" },
                    "uUserId": objContext.props.ClientUserDetails.UserId
                }

                Object_Intranet_Setting_ElementFormulaAttribute.EditData(objData, (objReturn, cIsNewData) => {
                    let arrnewElementAttributedata = new Array;
                    objContext.state.arrElementAttributeData.map((objElementAttributeData) => {
                        if (objElementAttributeData["uElementFormulaAttributeTemplateId"] == objReturn[0]["uElementFormulaAttributeTemplateId"]) {
                            arrnewElementAttributedata.push(objReturn[0])
                        }
                        else {
                            arrnewElementAttributedata.push(objElementAttributeData)
                        }
                    })
                    objContext.dispatch({ type: "SET_STATE", payload: { "objselectedElementAttribute": objReturn[0], "arrElementAttributeData": arrnewElementAttributedata } });
                    ApplicationState.SetProperty("blnShowAnimation", false);
                });
            }
        }
    }

    /**
     * @name SaveAsData
     * @param {object} objContext takes objContext
     * @param {boolean} blnClose sends true when SaveAndClosed is pressed
     * @summary hits the add/edit API after validation succeeds
     */
    SaveAsData(objContext, strMethodType) {
        Popup.ShowPopup({
            Data: {
                objContext: objContext,
                strMethodType: strMethodType
            },
            Meta: {
                PopupName: 'ElementFormulaAttributePopUp',
                ShowHeader: true,
                ShowCloseIcon: true,
                ShowToggleMaximizeIcon: true,
                Height: 260,
                Width: 450
            },
            Resource: {
                SkinPath: objContext.props.JConfiguration.IntranetSkinPath,
            },
            Events: {
            },
            CallBacks: {
            },
            ParentProps: objContext.props,

        });
    }

    /**
     * @name onTemplateTextChange
     * @param {string} strAttributeName consists of the vColumnName
     * @param {string} strValue consists of value of the input
     * @param {object} objContext takes objContext
     * @param {string} strLanguageId consists of LanguageId for metalanguage input if any
     * @summary Handle change method to handle changes in the jsx elements
     */
    onTemplateTextChange(strAttributeName, strValue, objContext, strLanguageId = "") {
        let objNewData = Base_Form.HandleChange(objContext, strAttributeName, strValue, "objData", strLanguageId);
        objContext.dispatch({ type: "SET_STATE", payload: { "objData": objNewData } });
    }

    /**
     * @name onTemplatePopUpSave
     * @param {string} strAttributeName consists of the vColumnName
     * @param {string} strValue consists of value of the input
     * @param {object} objContext takes objContext
     * @param {string} strLanguageId consists of LanguageId for metalanguage input if any
     * @summary Handle change method to handle changes in the jsx elements
     */
    onTemplatePopUpSave(objContext, objSelectedData, arrElementAttributeData, ParentobjContext, strLanguageId = "", strMethodType) {
        let vAddEditData;
        if (objSelectedData["t_TestDrive_Test_ResultAttribute_ElementAttribute_Template_Data"].filter(obj => obj["iLanguageId"] == objContext.props.JConfiguration.InterfaceLanguageId).length > 0) {
            vAddEditData = objSelectedData["t_TestDrive_Test_ResultAttribute_ElementAttribute_Template_Data"].map((ObjSelectedTemplatedData) => {
                if (ObjSelectedTemplatedData["iLanguageId"] == objContext.props.JConfiguration.InterfaceLanguageId) {
                    return { ...ObjSelectedTemplatedData, "vTemplateName": objContext.state.objData["vTemplateName"] }
                }
                else {
                    return { ...ObjSelectedTemplatedData }
                }
            });
        }
        else {
            vAddEditData = objSelectedData["t_TestDrive_Test_ResultAttribute_ElementAttribute_Template_Data"];
            vAddEditData.push({ "iLanguageId": objContext.props.JConfiguration.InterfaceLanguageId, "vTemplateName": objContext.state.objData["vTemplateName"] });
        }
        ApplicationState.SetProperty("blnShowAnimation", true);
        let objData = {
            "vAddData": { ...objSelectedData, "t_TestDrive_Test_ResultAttribute_ElementAttribute_Template_Data": vAddEditData, "cIsDefault": "N", "iMainClientId": objContext.props.ParentProps.ClientUserDetails.MainClientId },
            "uUserId": objContext.props.ParentProps.ClientUserDetails.UserId
        };
        Object_Intranet_Setting_ElementFormulaAttribute.AddData(objData, (objReturn, cIsNewData) => {
            let arrnewElementattributeData = arrElementAttributeData;
            arrnewElementattributeData.push(objReturn[0]);
            ParentobjContext.dispatch({ type: "SET_STATE", payload: { "arrElementAttributeData": arrnewElementattributeData } });
            ApplicationState.SetProperty("blnShowAnimation", false);
            Popup.ClosePopup(objContext.props.Id);
        });

    }

    /**
     * @name OpenDeletePopup
     * @param {object} objContext passes Context object
     * @summary Call Confirmation pop-up for Deleting subject
     * @return null
     */
    OpenDeletePopup(objContext, objElementAttribute) {
        var objTextResource = Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/3_Test/Test/IntranetTest/ElementFormulaAttribute", objContext.props);

        if (objElementAttribute["uElementFormulaAttributeTemplateId"] != "") {
            Popup.ShowConfirmationPopup({
                Data: {},
                Meta: {
                    "ShowHeader": true,
                    "ShowCloseIcon": true,
                },
                Resource: {
                    Text: objTextResource,
                    TextResourcesKey: "DeleteConfirmationPopup",
                    SkinPath: objContext.props.JConfiguration.IntranetSkinPath,
                },
                Events: {
                    ConfirmEvent: (strPopupId) => this.DeleteElementAttribute(objContext, objElementAttribute, strPopupId)
                },
                CallBacks: {}
            });
        }
        else {
            Popup.ShowErrorPopup({
                Data: {},
                Meta: {
                    "ShowHeader": true,
                    "ShowCloseIcon": true,
                },
                Resource: {
                    Text: objTextResource,
                    TextResourcesKey: "DeleteErrorPopup",
                    SkinPath: objContext.props.JConfiguration.IntranetSkinPath
                },
                CallBacks: {}
            });
        }
    }

    /**
     * @name DeleteSubject
     * @param {array} arrSelectedRows selected row from the display grid
     * @param {object} objModal objModal
     * @summary Deletes Subject and close pop-up on success
     */
    DeleteElementAttribute(objContext, objElementAttribute, strPopupId) {
        Object_Intranet_Setting_ElementFormulaAttribute.DeleteData({ vDeleteData: { ...objElementAttribute, cIsDeleted: "Y" } }, (objReturn, blnDeleted) => {
            let arrnewElementAttributedata = new Array;
            objContext.state.arrElementAttributeData.map((objElementAttributeData) => {
                if (objElementAttributeData["uElementFormulaAttributeTemplateId"] != objReturn[0]["uElementFormulaAttributeTemplateId"]) {
                    arrnewElementAttributedata.push(objElementAttributeData)
                }
            })
            objContext.dispatch({ type: "SET_STATE", payload: { "arrElementAttributeData": arrnewElementAttributedata } });
            if (blnDeleted) {
                Popup.ClosePopup(strPopupId);
            }
        });
    }

    /**
     * @name SetRibbonData
     * @param {any} objContext
     * @summary To Set the Tab Data for the Module
     */
    SetRibbonData(objContext) {
        var objRibbonData = {
            objContext,
            "SaveMethod": () => objContext.ElementFormulaAttribute_ModuleProcessor.SaveAsData(objContext, "Save"),
            "SaveAsMethod": () => objContext.ElementFormulaAttribute_ModuleProcessor.SaveAsData(objContext, "SaveAs"),
        };
        ApplicationState.SetProperty("OfficeRibbonData", ElementFormulaAttribute_OfficeRibbon.GetElementFormulaAttributeOfficeRibbonData(objRibbonData));
    }

    /**
     * @name GetDynamicStyles
     * @param {object} props props
     * @returns {object} DynamicStyles
     */
    GetDynamicStyles(props) {
        return [
            props.JConfiguration.IntranetSkinPath + "/Css/Application/ReactJs/PC/Modules/3_Test/Test/IntranetTest/ElementFormulaAttribute/ElementFormulaAttribute.css",
            props.JConfiguration.IntranetSkinPath + "/Css/Framework/ReactJs/PC/Blocks/Popup/Popup.css",
        ];
    }

}

export default ElementFormulaAttribute_ModuleProcessor;