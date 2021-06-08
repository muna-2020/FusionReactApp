// React related imports.
import React, { useReducer, useRef } from 'react';

//Module related fies.
import * as AddEditApplicationServer_Hook from '@shared/Application/c.Intranet/Modules/8_Setting/ApplicationServer/AddEditApplicationServer/AddEditApplicationServer_Hook';
import AddEditApplicationServer_ModuleProcessor from '@shared/Application/c.Intranet/Modules/8_Setting/ApplicationServer/AddEditApplicationServer/AddEditApplicationServer_ModuleProcessor';



/**
 * @name AddEditApplicationServer
 * @param {object} props props
 * @summary This component is used to Add/Edit the Competency Level data.
 * @returns {object} React.Fragement that contains the content to be added in popup required for add/edit.
 */
const AddEditApplicationServer = props => {

    /**
     * @name [state,dispatch]
     * @summary Define state and dispatch for the reducer to set state.
     * @returns {[]} state and dispatch
     */
    const [state, dispatch] = useReducer(IntranetBase_Hook.Reducer, AddEditApplicationServer_Hook.GetInitialState());

    /**
    * @name objContext
    * @summary Groups state.dispatch and module object(s) in objContext.
    * @returns {object} objContext
    */
    let objContext = { state, props, dispatch, "AddEditApplicationServer_ModuleProcessor": new AddEditApplicationServer_ModuleProcessor() };

    /**
    * @name Initialize
    * @param {object} objContext context object
    * @summary Initialize method call in AddEditClientHostUrl_Hook, that contains all the custom hooks.
    * @returns null
    */
    AddEditApplicationServer_Hook.Initialize(objContext);

    /**
  * @name GetLanguageDropDown
  * @summary Forms the  jsx required for the dropdown.
  * @returns {object} jsx, React.Fragment
  */
    const GetLanguageDropDown = (objTextResource) => {
        return (
            <WrapperComponent
                ComponentName={"Dropdown"}
                Id="iLanguageId"
                Data={{
                    DropdownData: props.Data.arrLanguageData,
                    SelectedValue: state.objData["iLanguageId"] != undefined && state.objData ? state.objData["iLanguageId"] : -1
                }}
                Meta={{
                    DependingTableName: "t_Framework_Language_Data",
                    IsLanguageDependent: "Y",
                    ValueColumn: "iFrameworkLanguageId",
                    DisplayColumn: "vLanguageName",
                    DefaultOptionValue: - 1,
                    ShowDefaultOption: "true"
                }}
                Resource={{
                    Text: {
                        DefaultOptionText: Localization.TextFormatter(objTextResource, "PleaseChoose")
                    },
                    JConfiguration: props.JConfiguration,
                    SkinPath: props.JConfiguration.IntranetSkinPath
                }}
                Callbacks={{
                    CheckDeletedDropDownData: (objNode) => {
                        return objNode["cIsDeleted"] == "N" ? true : false
                    }
                }}
                Events={{
                    OnChangeEventHandler: (objChangeData, props) => objContext.AddEditApplicationServer_ModuleProcessor.HandleDropDownChange("iLanguageId", objChangeData, props, objContext),
                    CheckDeletedDropDownData: objContext.AddEditApplicationServer_ModuleProcessor.CreateItemEventHandler
                }}
                ParentProps={{ ...props }}
            />
        );
    }



    let objTextResource = props.Resource.Text;

    const GetContent = () => {
        return (
            <React.Fragment>
                <div className="subject-container">
                    <div className="col col-2">
                        <div className="col-item">
                            <div className="row-left"><span>{Localization.TextFormatter(objTextResource, "Server")}</span></div>
                            <div className="row-right">
                                <input className="text-input"
                                    autoFocus
                                    id="vServerName"
                                    type="text"
                                    onChange={(e) => {
                                        objContext.AddEditApplicationServer_ModuleProcessor.HandleChange("vServerName", e.target.value, objContext)
                                    }}
                                    onFocus={() => objContext.AddEditApplicationServer_ModuleProcessor.ValidateFocus(objContext, "vServerName")}
                                    onKeyDown={(e) => objContext.AddEditApplicationServer_ModuleProcessor.HandleEnterKeyDown(e, objContext.AddEditApplicationServer_ModuleProcessor, objContext)}
                                    value={state.objData["vServerName"]} />
                            </div>
                        </div>
                        <div className="col-item">
                            <div className="row-left"><span>{Localization.TextFormatter(objTextResource, "URL")}</span></div>
                            <div className="row-right">
                                <input className="text-input"
                                    id="vHostName"
                                    type="text"
                                    onChange={(e) => {
                                        objContext.AddEditApplicationServer_ModuleProcessor.HandleChange("vHostName", e.target.value, objContext)
                                    }}
                                    onFocus={() => objContext.AddEditApplicationServer_ModuleProcessor.ValidateFocus(objContext, "vHostName")}
                                    onKeyDown={(e) => objContext.AddEditApplicationServer_ModuleProcessor.HandleEnterKeyDown(e, objContext.AddEditApplicationServer_ModuleProcessor, objContext)}
                                    value={state.objData["vHostName"]} />
                            </div>
                        </div>

                    </div>
                    <div className="col col-2">
                        <div className="col-item">
                            <div className="row-left"><span>{Localization.TextFormatter(objTextResource, "Gewichtung")}</span></div>
                            <div className="row-right">
                                <input className="text-input"
                                    id="iNumberOfTimeToBeShown"
                                    type="text"
                                    onChange={(e) => {
                                        objContext.AddEditApplicationServer_ModuleProcessor.HandleChange("iNumberOfTimeToBeShown", e.target.value, objContext)
                                    }}
                                    onFocus={() => objContext.AddEditApplicationServer_ModuleProcessor.ValidateFocus(objContext, "iNumberOfTimeToBeShown")}
                                    onKeyDown={(e) => objContext.AddEditApplicationServer_ModuleProcessor.HandleEnterKeyDown(e, objContext.AddEditApplicationServer_ModuleProcessor, objContext)}
                                    value={state.objData["iNumberOfTimeToBeShown"]} />
                            </div>
                        </div>
                        <div className="col-item">
                            <div className="row-left"><span>{Localization.TextFormatter(objTextResource, "Anzeige")}</span></div>
                            <div className="row-right">
                                <input className="text-input"
                                    id="iOrder"
                                    type="text"
                                    onChange={(e) => {
                                        objContext.AddEditApplicationServer_ModuleProcessor.HandleChange("iOrder", e.target.value, objContext)
                                    }}
                                    onFocus={() => objContext.AddEditApplicationServer_ModuleProcessor.ValidateFocus(objContext, "iOrder")}
                                    onKeyDown={(e) => objContext.AddEditApplicationServer_ModuleProcessor.HandleEnterKeyDown(e, objContext.AddEditApplicationServer_ModuleProcessor, objContext)}
                                    value={state.objData["iOrder"]} />
                            </div>
                        </div>

                    </div>
                    <div className="col col-2">
                        <div className="col-item">
                            <div className="row-left">
                                <span>{Localization.TextFormatter(objTextResource, "Aktiv")}</span>
                            </div>
                            <div className="row-right">
                                <label className="checkbox">
                                    <input id="cIsActive"
                                        name="check"
                                        type="checkbox"
                                        checked={state.objData["cIsActive"] == "Y"}//{blnIsActive}
                                        onChange={(e) => {
                                            objContext.AddEditApplicationServer_ModuleProcessor.HandleChange("cIsActive", e.target.checked ? "Y" : "N", objContext)
                                        }} />
                                    <span className="checkmark" />
                                </label>
                            </div>
                        </div>
                        <div className="col-item">
                            <div className="row-left"><span>{Localization.TextFormatter(objTextResource, "QueryString")}</span></div>
                            <div className="row-right">
                                <input className="text-input"
                                    id="vQueryString"
                                    type="text"
                                    onChange={(e) => {
                                        objContext.AddEditApplicationServer_ModuleProcessor.HandleChange("vQueryString", e.target.value, objContext)
                                    }}
                                    onFocus={() => objContext.AddEditApplicationServer_ModuleProcessor.ValidateFocus(objContext, "vQueryString")}
                                    onKeyDown={(e) => objContext.AddEditApplicationServer_ModuleProcessor.HandleEnterKeyDown(e, objContext.AddEditApplicationServer_ModuleProcessor, objContext)}
                                    value={state.objData["vQueryString"]} />
                            </div>
                        </div>
                    </div>
                    <div className="col col-2">
                        <div className="col-item">
                            <div className="row-left"><span>{Localization.TextFormatter(objTextResource, "ApplicationName")}</span></div>
                            <div className="row-right">
                                <input className="text-input"
                                    id="vApplicationName"
                                    type="text"
                                    onChange={(e) => {
                                        objContext.AddEditApplicationServer_ModuleProcessor.HandleChange("vApplicationName", e.target.value, objContext)
                                    }}
                                    onFocus={() => objContext.AddEditApplicationServer_ModuleProcessor.ValidateFocus(objContext, "vApplicationName")}
                                    onKeyDown={(e) => objContext.AddEditApplicationServer_ModuleProcessor.HandleEnterKeyDown(e, objContext.AddEditApplicationServer_ModuleProcessor, objContext)}
                                    value={state.objData["vApplicationName"]} />
                            </div>
                        </div>
                        <div className="col-item">
                            <div className="row-left"><span>{Localization.TextFormatter(objTextResource, "Group")}</span></div>
                            <div className="row-right">
                                <input className="text-input"
                                    id="vGroup"
                                    type="text"
                                    onChange={(e) => {
                                        objContext.AddEditApplicationServer_ModuleProcessor.HandleChange("vGroup", e.target.value, objContext)
                                    }}
                                    onFocus={() => objContext.AddEditApplicationServer_ModuleProcessor.ValidateFocus(objContext, "vGroup")}
                                    onKeyDown={(e) => objContext.AddEditApplicationServer_ModuleProcessor.HandleEnterKeyDown(e, objContext.AddEditApplicationServer_ModuleProcessor, objContext)}
                                    value={state.objData["vGroup"]} />
                            </div>
                        </div>
                    </div>

                    <div className="col col-2">
                        <div className="col-item">
                            <div className="row-left"><span>{Localization.TextFormatter(objTextResource, "LanguageName")}</span></div>
                            <div className="row-right" Id="iLanguageId">
                                {GetLanguageDropDown(objTextResource)}
                            </div>
                        </div>
                    </div>



                    <div id="ValidationError"></div>
                </div>
            </React.Fragment >
        );
    }

    return state.objData ? GetContent() : <React.Fragment />;
};

export default AddEditApplicationServer;