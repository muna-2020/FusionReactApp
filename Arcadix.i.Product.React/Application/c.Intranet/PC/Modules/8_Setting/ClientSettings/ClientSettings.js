//React related imports...
import React, { useReducer } from 'react';
import { connect } from 'react-redux';

//Module related fies...
import * as ClientSettings_Hook from '@shared/Application/c.Intranet/Modules/8_Setting/ClientSettings/ClientSettings_Hook';
import ClientSettings_ModuleProcessor from '@shared/Application/c.Intranet/Modules/8_Setting/ClientSettings/ClientSettings_ModuleProcessor';


/**
* @name ClientSettings
* @param {object} props props
* @summary This component displays the ClientSettings data
* @returns {object} React.Fragement that contains ClientSettings details.
*/
const ClientSettings = props => {

    /**
     * @name [state,dispatch]
     * @summary Define state and dispatch for the reducer to set state.
     * @returns {[]} state and dispatch
     */
    const [state, dispatch] = useReducer(IntranetBase_Hook.Reducer, ClientSettings_Hook.GetInitialState(props));

    /**
     * @name objContext
     * @summary Groups state.dispatch and module object(s) in objContext.
     * @returns {object} objContext
     */
    let objContext = { state, props, dispatch, ["ModuleName"]: "ClientSettings", ["ClientSettings_ModuleProcessor"]: new ClientSettings_ModuleProcessor() };

    /**
      * @name  Initialize
      * @param {object} objContext context object
      * @summary Initializing API and DynamicStyles
      * @returns null
      */
    objContext.ClientSettings_ModuleProcessor.Initialize(objContext, objContext.ClientSettings_ModuleProcessor);

    /**
     * @name Initialize
     * @param {object} objContext context object
     * @summary Initialize method call to load the custom hooks.
     * @returns null
     */
    ClientSettings_Hook.Initialize(objContext);

    /**
     * @name GetNavigationBlock
     * @summary Forms the jsx required for the NavigationBlock in the Top.
     * @returns {object} jsx
     */
    const GetNavigationBlock = (objTextResource) => {
        return <ul className="settings-navigation" id="FilterBlock">
            <li>
                <span id="Common" className="active" onClick={() => { objContext.ClientSettings_ModuleProcessor.HandleTabChange("Common", objContext) }} >{Localization.TextFormatter(objTextResource, "Common")} </span>
            </li>
            <li>
                <span id="Intranet" onClick={() => { objContext.ClientSettings_ModuleProcessor.HandleTabChange("Intranet", objContext) }} >{Localization.TextFormatter(objTextResource, "Intranet")} </span>
            </li>
            <li>
                <span id="Extranet" onClick={() => { objContext.ClientSettings_ModuleProcessor.HandleTabChange("Extranet", objContext) }} >{Localization.TextFormatter(objTextResource, "Extranet")} </span>
            </li>
            <li>
                <span id="ResultOutput" onClick={() => { objContext.ClientSettings_ModuleProcessor.HandleTabChange("ResultOutput", objContext) }} >{Localization.TextFormatter(objTextResource, "ResultOutput")} </span>
            </li>
            <li>
                <span id="Test" onClick={() => { objContext.ClientSettings_ModuleProcessor.HandleTabChange("Test", objContext) }} >{Localization.TextFormatter(objTextResource, "TestApplication")} </span>
            </li>
        </ul>
    }

    /**
     * @name GetCommonDiv
     * @summary Forms jsx required for the CommonDiv.
     * @returns {object} jsx
     */
    const GetCommonDiv = (objTextResource) => {
        let arrCommonData = objContext.ClientSettings_ModuleProcessor.GetDivData("Common", "TestingUnitMailConfig", objContext) ?? [];
        let arrCommonIISData = objContext.ClientSettings_ModuleProcessor.GetDivData("Common", "IISCreation", objContext) ?? [];
        let arrCommonOneDriveData = objContext.ClientSettings_ModuleProcessor.GetDivData("Common", "OneDrive", objContext) ?? [];
        return <React.Fragment>
            <div className="title">{Localization.TextFormatter(objTextResource, "Common")}</div>
            {arrCommonData.map(objData => {
                return <div className="col col-1">
                    <div className="col-item" style={{ flex: "0 0 35%" }}>
                        <div className="row-left">
                            <span className="nowrap">{Localization.TextFormatter(objTextResource, objData["vKey"])}</span>
                        </div>
                        <div className="row-right" style={{ width: "80%" }}>
                            <input type="text"
                                className="text-input"
                                value={objData["vValue"] ? objData["vValue"] : ""}
                                onChange={(e) => objContext.ClientSettings_ModuleProcessor.HandleSettingsChange(objData["uXMLConfigurationId"], e.target.value, objContext)}
                            />
                        </div>
                    </div>
                </div>
            })}
            {objContext.props.JConfiguration["ProjectIdentifier"] ? <React.Fragment>
                <div className="title">{Localization.TextFormatter(objTextResource, "IISSettings")}</div>
                {arrCommonIISData.map(objData => {
                    return <div className="col col-1">
                        <div className="col-item" style={{ flex: "0 0 35%" }}>
                            <div className="row-left">
                                <span className="nowrap">{Localization.TextFormatter(objTextResource, objData["vKey"])}</span>
                            </div>
                            <div className="row-right" style={{ width: "80%" }}>
                                <input type="text"
                                    className="text-input"
                                    value={objData["vValue"] ? objData["vValue"] : ""}
                                    onChange={(e) => objContext.ClientSettings_ModuleProcessor.HandleSettingsChange(objData["uXMLConfigurationId"], e.target.value, objContext)}
                                />
                            </div>
                        </div>
                    </div>
                })}
                <div className="title">{Localization.TextFormatter(objTextResource, "OneDrive")}</div>
                {arrCommonOneDriveData.map(objData => {
                    return <div className="col col-1">
                        <div className="col-item" style={{ flex: "0 0 35%" }}>
                            <div className="row-left">
                                <span className="nowrap">{Localization.TextFormatter(objTextResource, objData["vKey"])}</span>
                            </div>
                            <div className="row-right" style={{ width: "80%" }}>
                                <input type="text"
                                    className="text-input"
                                    value={objData["vValue"] ? objData["vValue"] : ""}
                                    onChange={(e) => objContext.ClientSettings_ModuleProcessor.HandleSettingsChange(objData["uXMLConfigurationId"], e.target.value, objContext)}
                                />
                            </div>
                        </div>
                    </div>
                })}
            </React.Fragment> : <React.Fragment />}

        </React.Fragment>
    }

    /**
     * @name GetExtranetDiv
     * @summary Forms jsx required for the ExtranetDiv.
     * @returns {object} jsx
     */
    const GetExtranetDiv = (objTextResource) => {
        //let arrExtranetData = objContext.props.Object_Cockpit_MainClient_ClientSettings["Data"].filter(objSettingsData => objSettingsData["vParentKey"] == "ExtranetTeacher" );
        let arrExtranetTeacherData = objContext.ClientSettings_ModuleProcessor.GetDivData("ExtranetTeacher", "", objContext) ?? [];
        let arrExtranetPupilData = objContext.ClientSettings_ModuleProcessor.GetDivData("ExtranetPupil", "", objContext) ?? [];

        return <div>
            <div className="title">{Localization.TextFormatter(objTextResource, "ExtranetTeacher")}</div>
            {arrExtranetTeacherData.map(objData => {
                return <div className="col col-1">
                    <div className="col-item">
                        <div className="row-left">
                            <span className="nowrap">{Localization.TextFormatter(objTextResource, objData["vKey"])}</span>
                        </div>
                        <div className="row-right" style={{ width: "75%" }}>
                            <input type="text"
                                className="text-input"
                                style={{ width: "30%" }}
                                value={objData["vValue"] ? objData["vValue"] : ""}
                                onChange={(e) => objContext.ClientSettings_ModuleProcessor.HandleSettingsChange(objData["uXMLConfigurationId"], e.target.value, objContext)}
                            />
                        </div>
                    </div>
                </div>
            })}
            <div className="title">{Localization.TextFormatter(objTextResource, "ExtranetTeacher")}</div>
            <div className="checkbox-flex">
                {arrExtranetPupilData.map(objData => {
                    return <div className="mr-20">
                        <label className="checkbox mr-10 ml-10">
                            <input type="checkbox"
                                checked={objData["vValue"] == 'Y' ? true : false}
                                onChange={(e) => objContext.ClientSettings_ModuleProcessor.HandleSettingsChange(objData["uXMLConfigurationId"], e.target.checked ? 'Y' : 'N', objContext)}
                            />
                            <span className="checkmark" />

                        </label>
                        <span className="mr-10">{Localization.TextFormatter(objTextResource, objData["vKey"])}</span>
                    </div>
                })}
            </div>
        </div>

    }

    /**
     * @name GetIntranetDiv
     * @summary Forms jsx required for the IntranetDiv.
     * @returns {object} jsx
     */
    const GetIntranetDiv = (objTextResource) => {
        let arrIntranetBasicSetupData = objContext.ClientSettings_ModuleProcessor.GetDivData("Intranet", "BasicSetup", objContext) ?? [];
        let arrIntranetTaskGridDisplayData = objContext.ClientSettings_ModuleProcessor.GetDivData("Intranet", "TaskColumnsDisplay", objContext) ?? [];
        let objIntranetTaskDifficultyLevelData = objContext.state.arrData.find(objSettingsData => objSettingsData["vKey"] == "TaskDifficultyLevel") ?? [];
        return <div>
            <div className="title">{Localization.TextFormatter(objTextResource, "TaskGridColumn")}</div>
            <div className="checkbox-flex">
                {arrIntranetTaskGridDisplayData.map(objData => {
                    if (objData["vKey"] != "TaskDifficultyLevel")
                        return <div className="mr-20">
                            <label className="checkbox mr-10">
                                <input type="checkbox"
                                    checked={objData["vValue"] == 'Y' ? true : false}
                                    onChange={(e) => objContext.ClientSettings_ModuleProcessor.HandleSettingsChange(objData["uXMLConfigurationId"], e.target.checked ? 'Y' : 'N', objContext)}
                                />
                                <span className="checkmark" />

                            </label>
                            <span className="mr-10">{Localization.TextFormatter(objTextResource, objData["vKey"])}</span>
                        </div>
                })}
            </div>

            <div className="title">{Localization.TextFormatter(objTextResource, "Taxonomy")}</div>
            {arrIntranetBasicSetupData.map(objData => {
                if (objData["vKey"] != "TaskDifficultyLevel")
                    return <div className="col col-1">
                        <div className="col-item">
                            <div className="row-left">
                                <span className="mr-10 nowrap">{Localization.TextFormatter(objTextResource, objData["vKey"])}</span>
                            </div>
                            <div className="row-right">
                                <label className="checkbox">
                                    <input
                                        type="checkbox"
                                        checked={objData["vValue"] == 'Y' ? true : false}
                                        onChange={(e) => objContext.ClientSettings_ModuleProcessor.HandleSettingsChange(objData["uXMLConfigurationId"], e.target.checked ? 'Y' : 'N', objContext)}
                                    />
                                    <span className="checkmark" />
                                </label>
                            </div>
                        </div>
                    </div>
            })}

            {objIntranetTaskDifficultyLevelData ?
                <div>
                    <div className="title">{Localization.TextFormatter(objTextResource, "TaskDifficultyLevel")}</div>
                    <div className="col col-1">
                        <div className="col-item" style={{ flex: "0 0 20%" }}>
                            <div className="row-left">
                                <label className="radio ml-10">
                                    <input
                                        type="radio"
                                        checked={objIntranetTaskDifficultyLevelData["vValue"] == 'None' ? true : false}
                                        value="None"
                                        onChange={(e) => objContext.ClientSettings_ModuleProcessor.HandleSettingsChange(objIntranetTaskDifficultyLevelData["uXMLConfigurationId"], "None", objContext)}
                                    />
                                    <span className="checkmark" name="group1" />
                                </label>

                            </div>
                            <div className="row-right">
                                <span>{Localization.TextFormatter(objTextResource, "None")}</span>
                            </div>
                        </div>
                    </div>

                    <div className="col col-1">
                        <div className="col-item" style={{ flex: "0 0 20%" }}>
                            <div className="row-left">
                                <label className="radio ml-10">
                                    <input
                                        type="radio"
                                        checked={objIntranetTaskDifficultyLevelData["vValue"] == 'All' ? true : false}
                                        value="All"
                                        onChange={(e) => objContext.ClientSettings_ModuleProcessor.HandleSettingsChange(objIntranetTaskDifficultyLevelData["uXMLConfigurationId"], "All", objContext)}
                                    />
                                    <span className="checkmark" />
                                </label>

                            </div>
                            <div className="row-right">
                                <span>{Localization.TextFormatter(objTextResource, "All")}</span>
                            </div>
                        </div>
                    </div>

                    <div className="col col-1">
                        <div className="col-item" style={{ flex: "0 0 20%" }}>
                            <div className="row-left">
                                <label className="radio ml-10">
                                    <input
                                        type="radio"
                                        checked={objIntranetTaskDifficultyLevelData["vValue"] == 'BySchoolYear' ? true : false}
                                        value="BySchoolYear"
                                        onChange={(e) => objContext.ClientSettings_ModuleProcessor.HandleSettingsChange(objIntranetTaskDifficultyLevelData["uXMLConfigurationId"], "BySchoolYear", objContext)}
                                    />
                                    <span className="checkmark" />
                                </label>

                            </div>
                            <div className="row-right">
                                <span>{Localization.TextFormatter(objTextResource, "BySchoolYear")}</span>
                            </div>
                        </div>
                    </div>
                </div>
                : <div />}
        </div>

    }

    /**
     * @name GetTestApplicationDiv
     * @summary Forms jsx required for the TestApplicationDiv.
     * @returns {object} jsx
     */
    const GetTestApplicationDiv = (objTextResource) => {
        let arrTestConfigurationData = objContext.ClientSettings_ModuleProcessor.GetDivData("TestConfiguration", "", objContext) ?? [];
        let arrTestApplicationData = objContext.ClientSettings_ModuleProcessor.GetDivData("TestApplication", "TestApplicationLogin", objContext) ?? [];
        let arrAdaptivePropertiesData = objContext.ClientSettings_ModuleProcessor.GetDivData("TestApplication", "", objContext)?.filter(objAdaptiveData => objAdaptiveData["vSubParentKey"] != "TestApplicationLogin").sort((a, b) => b["vKey"] > a["vKey"] ? -1 : 1) ?? [];

        return <div>
            {arrTestApplicationData.length > 0 ?
                <React.Fragment>
                    <div className="title">{Localization.TextFormatter(objTextResource, "TestApplication")}</div>
                    {arrTestApplicationData.map(objData => {
                        return <div className="col col-1">
                            <div className="col-item">
                                <div className="row-left">
                                    <span className="nowrap">{Localization.TextFormatter(objTextResource, objData["vKey"])}</span>
                                </div>
                                <div className="row-right" style={{ width: "70%" }}>
                                    <label className="checkbox">
                                        <input
                                            type="checkbox"
                                            style={{ width: "30%" }}
                                            checked={objData["vValue"] == 'Y' ? true : false}
                                            onChange={(e) => objContext.ClientSettings_ModuleProcessor.HandleSettingsChange(objData["uXMLConfigurationId"], e.target.checked ? 'Y' : 'N', objContext)}
                                        />
                                        <span className="checkmark" />
                                    </label>
                                </div>
                            </div>
                        </div>
                    }
                    )}
                </React.Fragment> : <React.Fragment />
            }
            <div className="title">{Localization.TextFormatter(objTextResource, "TestConfiguration")}</div>
            {arrTestConfigurationData.map(objData => {
                return <div className="col col-1">
                    <div className="col-item">
                        <div className="row-left">
                            <span className="nowrap">{Localization.TextFormatter(objTextResource, objData["vKey"])}</span>
                        </div>
                        <div className="row-right" style={{ width: "70%" }}>
                            <input type="text"
                                className="text-input"
                                style={{ width: "30%" }}
                                value={objData["vValue"] ? objData["vValue"] : ""}
                                onChange={(e) => objContext.ClientSettings_ModuleProcessor.HandleSettingsChange(objData["uXMLConfigurationId"], e.target.value, objContext)}
                            />
                        </div>
                    </div>
                </div>
            }
            )}
            <div className="title">{Localization.TextFormatter(objTextResource, "AdaptiveProperties")}</div>
            {arrAdaptivePropertiesData.map(objData => {
                return <div className="col col-1">
                    <div className="col-item">
                        <div className="row-left">
                            <span className="nowrap">{Localization.TextFormatter(objTextResource, objData["vKey"])}</span>
                        </div>
                        <div className="row-right" style={{ width: "70%" }}>
                            <input type="text"
                                className="text-input"
                                style={{ width: "30%" }}
                                value={objData["vValue"] ? objData["vValue"] : ""}
                                onChange={(e) => objContext.ClientSettings_ModuleProcessor.HandleSettingsChange(objData["uXMLConfigurationId"], e.target.value, objContext)}
                            />
                        </div>
                    </div>
                </div>
            }
            )}
        </div>
    }

    /**
    * @name GetContent
    * @summary Forms the whole jsx required for the module.
    * @returns {object} jsx
    */
    const GetContent = () => {
        let objTextResource = Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/8_Setting/ClientSettings", objContext.props) ?? {};
        return <div className="task-container">
            {GetNavigationBlock(objTextResource)}

            <WrapperComponent
                ComponentName={"FillHeight"}
                id={"FillHeight_" + props.Id}
                Meta={{
                    HeaderIds: ["MasterHeader", "BreadCrumb", "FilterBlock", "OfflineExecution"],
                    FooterIds: [""]
                }}
                className="bgStyle"
                scrollStyle={{ overflow: "auto" }}
                ParentProps={{ ...props }}
            >
                <div id="Common" className="" style={{ display: (state.strDivToShow == "Common" ? "block" : "none") }}>
                    {GetCommonDiv(objTextResource)}
                </div>

                <div id="Intranet" className="" style={{ display: (state.strDivToShow == "Intranet" ? "block" : "none") }}>
                    {GetIntranetDiv(objTextResource)}

                </div>
                <div id="Extranet" className="" style={{ display: (state.strDivToShow == "Extranet" ? "block" : "none") }}>
                    {GetExtranetDiv(objTextResource)}
                </div>
                <div id="ResultOutput" className="" style={{ display: (state.strDivToShow == "ResultOutput" ? "block" : "none") }}>
                    ResultOutput Tab (-NI-)
                </div>
                <div id="Test" className="" style={{ display: (state.strDivToShow == "Test" ? "block" : "none") }}>
                    {GetTestApplicationDiv(objTextResource)}
                </div>
            </WrapperComponent>
        </div>
    }

    return (
        <React.Fragment>{props.isLoadComplete || state.isLoadComplete ?
            <React.Fragment>{GetContent()}</React.Fragment> : <React.Fragment></React.Fragment>}
        </React.Fragment>
    );
}

export default connect(IntranetBase_Hook.MapStoreToProps(ClientSettings_ModuleProcessor.StoreMapList()))(ClientSettings);

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = ClientSettings_ModuleProcessor; 