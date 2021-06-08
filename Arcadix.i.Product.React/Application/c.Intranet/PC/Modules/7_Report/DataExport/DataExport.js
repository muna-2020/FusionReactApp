// React related imports.
import React, { useReducer } from 'react';
import { connect } from 'react-redux';

//Helper classes.
import PerformanceProfiler from "@shared/Framework/Services/Performance/PerformanceProfiler";

//Module related fies.
import * as DataExport_Hook from '@shared/Application/c.Intranet/Modules/7_Report/DataExport/DataExport_Hook';
import DataExport_ModuleProcessor from '@shared/Application/c.Intranet/Modules/7_Report/DataExport/DataExport_ModuleProcessor';

//In-line Image imports...
import ExportOnlineImage from '@inlineimage/Common/ReactJs/PC/JNavigation/ExportOnlineTest.svg?inline';

/**
 * * @name DataExport
 * @param {object} props props
 * @summary This component Export the DataExport.
 * @returns {object} React.Fragement that encapsulated the display grid with DataExport  details.
 */
const DataExport = props => {

    /**
     * @name [state,dispatch]
     * @summary Define state and dispatch for the reducer to set state.
     * @returns {[]} state and dispatch
     */
    const [state, dispatch] = useReducer(IntranetBase_Hook.Reducer, DataExport_Hook.GetInitialState(props));

    /**
     * @name objContext
     * @summary Groups state.dispatch and module object(s) in objContext.
     * @returns {object} objContext
     */
    let objContext = { state, props, dispatch, ["ModuleName"]: "DataExport", ["DataExport_ModuleProcessor"]: new DataExport_ModuleProcessor(), ["ImageMeta"]: GetImageMeta() };

    /**
     * @name  InitializeDataForSSR
     * @param {object} objContext context object
     * @summary Initializing API and DynamicStyles
     * @returns Setting ApplicationState
     */
    objContext.DataExport_ModuleProcessor.Initialize(objContext, objContext.DataExport_ModuleProcessor);

    /**
     * @name Initialize
     * @param {object} objContext context object
     * @summary Initialize method call in DataExport_Hook, that contains all the custom hooks.
     * @returns null
     */
    DataExport_Hook.Initialize(objContext);

    /**
     * @name GetCycleType
     * @param {object} objContext context object
     * @summary return jsx for CycleType
     * @returns null
     */
    function GetCycleType(objTextResource) {
        return (
            <div class="radio-row-block">
                {
                    objTextResource["Cycle_Type"] ? objTextResource["Cycle_Type"].map((objCycleType) => {
                        return (
                            <div className="radio-buttons-list">
                                <div className="data-cell">
                                    <label className="radio">
                                        <input id={"iCycleTypeId"}
                                            type="radio"
                                            onChange={() => { objContext.DataExport_ModuleProcessor.CycleTypeClickHandler(objCycleType, objContext, "iCycleTypeId") }}
                                            checked={objCycleType["iCycleTypeId"] == objContext.state.objSearchFilters["iCycleTypeId"]} />
                                        <span className="checkmark" />
                                    </label>
                                    <span>{objCycleType["vCycleTypeName"]}</span>
                                </div>
                            </div>
                        )
                    }):""
                }

            </div>
        )
    }



    /**
     * @name GetCycleDropDown
     * @summary Forms the  jsx required for the dropdown.
     * @returns {object} jsx, React.Fragment
     */
    const GetCycleDropDown = (objTextResource) => {
        return (
            <div className="intranet-dropdown">
                <PerformanceProfiler ComponentName={"CycleDropDown"} JConfiguration={props.JConfiguration}>
                    <WrapperComponent
                        ComponentName={"Dropdown"}
                        Id="CycleDropDown"
                        Data={{
                            DropdownData: DataRef(objContext.props.Object_Intranet_Cycle_Cycle)["Data"] ?? [],
                            SelectedValue: objContext.state.objSearchFilters["uCycleId"] != undefined ? objContext.state.objSearchFilters["uCycleId"] : -1
                        }}
                        Meta={{
                            DependingTableName: "t_TestDrive_Cycle",
                            ValueColumn: "uCycleId",
                            DisplayColumn: "vCycleName",
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
                                return objNode["cIsDeleted"] == "N" && objNode["iCycleTypeId"] == state.objSearchFilters["iCycleTypeId"] ? true : false
                            }
                        }}
                        Events={{
                            OnChangeEventHandler: (objChangeData, props) => objContext.DataExport_ModuleProcessor.OnCycleDropDownChange(objContext, objChangeData, props),
                            CheckDeletedDropDownData: objContext.DataExport_ModuleProcessor.CreateItemEventHandler
                        }}
                        ParentProps={{ ...props }}
                    />
                </PerformanceProfiler>
            </div>
        );
    }


    /**
     * @name GetCycleNumberOfRepetitionsDropDown
     * @summary Forms the  jsx required for the dropdown.
     * @returns {object} jsx, React.Fragment
     */
    const GetCycleNumberOfRepetitionsDropDown = (objTextResource) => {
        return (
            <PerformanceProfiler ComponentName={"StateDropDown"} JConfiguration={props.JConfiguration}>
                <WrapperComponent
                    ComponentName={"Dropdown"}
                    Id="StateDropDown"
                    Data={{
                        DropdownData: objContext.state.arrCycleNumberOfRepetitions,
                        SelectedValue: objContext.state.objSearchFilters["iCycleNumberOfRepetitions"] != undefined ? objContext.state.objSearchFilters["iCycleNumberOfRepetitions"] : -1
                    }}
                    Meta={{
                        ValueColumn: "iCycleNumberOfRepetitions",
                        DisplayColumn: "vCycleNumberOfRepetitionsValue",
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
                        OnChangeEventHandler: (objChangeData, props) => objContext.DataExport_ModuleProcessor.OnCycleNumberOfRepetitionsDropDownChange(objContext, objChangeData, props),
                        CheckDeletedDropDownData: objContext.DataExport_ModuleProcessor.CreateItemEventHandler
                    }}
                    ParentProps={{ ...props }}
                />
            </PerformanceProfiler>
        );
    }

    /**
     * @name GetState
     * @param {object} objContext context object
     * @summary return jsx for CycleType
     * @returns null
     */
    function GetState(objTextResource) {
        return (
            <div class="checkbox-row-flex">
                {
                    objContext.props.Object_Extranet_State_State?objContext.props.Object_Extranet_State_State["Object_Extranet_State_State;cIsDeleted;N"] ? objContext.props.Object_Extranet_State_State["Object_Extranet_State_State;cIsDeleted;N"]["Data"] ? objContext.props.Object_Extranet_State_State["Object_Extranet_State_State;cIsDeleted;N"]["Data"].map((objStateData) => {
                        return (
                            <div class="checkbox-row-block">
                                <div className="data-cell">
                                    <label className="checkbox">
                                        <input id={"CycleType"}
                                            type="checkbox"
                                            onChange={() => { objContext.DataExport_ModuleProcessor.stateClickHandler(objStateData, objContext) }}
                                            checked={objStateData["iStateId"] == objContext.state.objSearchFilters["iStateId"]} />
                                        <span className="checkmark" />
                                    </label>
                                </div>
                                <span>{
                                    objStateData["t_TestDrive_Member_State_Data"].map((objStateData) => {
                                        return objStateData["iLanguageId"] == objContext.props.JConfiguration.InterfaceLanguageId ? objStateData["vStateName"] : ""
                                    })
                                }</span>
                            </div>
                        )
                    }):"":"":""
                }

            </div>
        )
    }


    /**
     * @name GetCycleType
     * @param {object} objContext context object
     * @summary return jsx for CycleType
     * @returns null
     */
    function GetTestforCycle(objTextResource) {
        return (
            <div class="checkbox-row-flex">

                {
                    state.arrTestData.map((objTestAssignToCycle) => {
                        return (
                            <div className="checkbox-row-flex">
                                <div class="checkbox-row-block">
                                    <span className="data-cell">
                                        <label className="checkbox">
                                            <input id={"uTestId"}
                                                type="checkbox"
                                                onChange={() => { objContext.DataExport_ModuleProcessor.CycleTypeClickHandler(objTestAssignToCycle, objContext, "uTestId") }}
                                                checked={objTestAssignToCycle["uTestId"] == objContext.state.objSearchFilters["uTestId"]} />
                                            <span className="checkmark" />
                                        </label>
                                    </span>
                                    <span>{objTestAssignToCycle["vTestName"]}</span>
                                </div>
                            </div>
                        )
                    })
                }

            </div >
        )
    }



    /**
     * @name GetContent
     * @summary return JSX for the page.
     * @returns {object} jsx, React.Fragment
     */
    function GetContent() {
        var objTextResource = Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/7_Report/DataExport", objContext.props) ?? {};
        return (
            <div className="data-export">
                <FillHeight
                    id={"FillHeight_" + props.Id}
                    Meta={{
                        HeaderIds: ["MasterHeader", "BreadCrumb", "OfflineExecution"],
                        FooterIds: [""]
                    }}
                    className="bgStyle"
                    scrollStyle={{ overflow: "auto" }}
                    ParentProps={{ ...props }}
                >
                    <div className="radio-buttons-flex">
                        <div className="radio-buttons-block">
                            <span>{Localization.TextFormatter(objTextResource, "Cycle Type")}</span>
                            {GetCycleType(objTextResource)}
                        </div>

                    </div>

                    <div className="dropdown-flex-block">
                        <span>{Localization.TextFormatter(objTextResource, "Durchführung")}</span>
                        {GetCycleDropDown(objTextResource)}
                    </div>

                    <div className="dropdown-flex-block">
                        <span>{Localization.TextFormatter(objTextResource, "Testdurchgang")}</span>
                        <div className="intranet-dropdown"> {GetCycleNumberOfRepetitionsDropDown(objTextResource)}</div>
                    </div>


                    <div className="cbox-container">
                        <span>{Localization.TextFormatter(objTextResource, "OrganizationalUnit")}</span>
                        {GetState(objTextResource)}
                    </div>


                    <div className="dropdown-flex-block test-dropdowns">
                        <span>{Localization.TextFormatter(objTextResource, "Test")}</span>
                        {GetTestforCycle(objTextResource)}
                    </div>

                    <div className="dropdown-flex-block">
                        <span>{Localization.TextFormatter(objTextResource, "Vom")}</span>
                        <div className="filter-block">
                            <span className="filter-label">{Localization.TextFormatter(objTextResource, "From")}</span>
                            <div className="date-picker">
                                <WrapperComponent
                                    ComponentName={"DatePicker"}
                                    id="dtFromDate"
                                    Data={{
                                        SelectedDate: objContext.state.objSearchFilters["dtFromDate"]
                                    }}
                                    Events={{
                                        HandleDateChange: (strSelectedDate) => objContext.DataExport_ModuleProcessor.OnDateChange("dtFromDate", strSelectedDate, objContext)
                                    }}
                                    ParentProps={{ ...props }}
                                />
                            </div>
                        </div>


                    </div>
                    <div className="dropdown-flex-block">
                        <span>{Localization.TextFormatter(objTextResource, "Bis")}</span>
                        <div className="date-picker">
                            <WrapperComponent
                                ComponentName={"DatePicker"}
                                id="dtFromDate"
                                Data={{
                                    SelectedDate: objContext.state.objSearchFilters["dtToDate"]
                                }}
                                Events={{
                                    HandleDateChange: (strSelectedDate) => objContext.DataExport_ModuleProcessor.OnDateChange("dtToDate", strSelectedDate, objContext)
                                }}
                                ParentProps={{ ...props }}
                            />
                        </div>
                    </div>
                </FillHeight>
            </div >
        );
    }

    return (
        <React.Fragment>{props.isLoadComplete || state.isLoadComplete ?
            <React.Fragment>{GetContent()}</React.Fragment> : <React.Fragment />}
        </React.Fragment>
    );
}

/**
 * @name GetImageMeta
 * @summary forms the default images for inline import.
 * */
const GetImageMeta = () => {
    return {
        ExportOnlineImage: ExportOnlineImage
    }
}

export default connect(IntranetBase_Hook.MapStoreToProps(DataExport_ModuleProcessor.StoreMapList()))(DataExport);

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = DataExport_ModuleProcessor; 
