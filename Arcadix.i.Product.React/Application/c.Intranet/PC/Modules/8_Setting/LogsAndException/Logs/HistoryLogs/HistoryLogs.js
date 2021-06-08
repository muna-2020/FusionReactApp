// React related imports.
import React, { useReducer } from 'react';
import { connect } from 'react-redux';

//Module related fies...
import * as HistoryLogs_Hook from '@shared/Application/c.Intranet/Modules/8_Setting/LogsAndException/Logs/HistoryLogs/HistoryLogs_Hook';
import HistoryLogs_ModuleProcessor from '@shared/Application/c.Intranet/Modules/8_Setting/LogsAndException/Logs/HistoryLogs/HistoryLogs_ModuleProcessor';

//Components used...
import PerformanceProfiler from '@shared/Framework/Services/Performance/PerformanceProfiler';

//In-line Image imports...
import ExportImage from '@inlineimage/Common/ReactJs/PC/Icons/Excel_icon.gif?inline';
import DownloadImage from '@inlineimage/Application/c.ProductManagement/ReactJs/PC/Modules/Document/download.svg?inline';

/**
* @name HistoryLogs
* @param {object} props props
* @summary This component displays the HistoryLogs data
* @returns {object} React.Fragement that contains HistoryLogs details.
*/
const HistoryLogs = props => {

    /**
     * @name [state,dispatch]
     * @summary Define state and dispatch for the reducer to set state.
     * @returns {[]} state and dispatch
     */
    const [state, dispatch] = useReducer(IntranetBase_Hook.Reducer, HistoryLogs_Hook.GetInitialState(props));

    /**
     * @name objContext
     * @summary Groups state.dispatch and module object(s) in objContext.
     * @returns {object} objContext
     */
    let objContext = { state, props, dispatch, ["ModuleName"]: "HistoryLogs", ["HistoryLogs_ModuleProcessor"]: new HistoryLogs_ModuleProcessor(), ["ImageMeta"]: GetImageMeta() };

    /**
     * @name  Initialize
     * @param {object} objContext context object
     * @summary Initializing API and DynamicStyles
     * @returns null
     */
    objContext.HistoryLogs_ModuleProcessor.Initialize(objContext, objContext.HistoryLogs_ModuleProcessor);

    /**
     * @name Initialize
     * @param {object} objContext context object
     * @summary Initialize method call to load the custom hooks.
     * @returns null
     */
    HistoryLogs_Hook.Initialize(objContext);

    /**
    * @name GetMainClientDropDown
     * @summary Forms the jsx required for the dropdown.
     * @returns {object} jsx, React.Fragment
    */
    const GetMainClientDropDown = (objTextResource) => {
        return (
            <WrapperComponent
                ComponentName={"Dropdown"}
                Id="iMainClientId"
                Data={{
                    DropdownData: DataRef(objContext.props.Object_Cockpit_MainClient_MainClient)["Data"] ?? [],
                    SelectedValue: state.strMainClientId != -1 ? state.strMainClientId : -1
                }}
                Meta={{
                    IsLanguageDependent: "N",
                    ValueColumn: "iMainClientId",
                    DisplayColumn: "vMainClientIdentifier",
                    DefaultOptionValue: - 1,
                    ShowDefaultOption: "true"
                }}
                Resource={{
                    Text: {
                        DefaultOptionText: "PleaseChoose"
                    },
                    JConfiguration: props.JConfiguration,
                    SkinPath: props.JConfiguration.CockpitSkinPath
                }}
                Callbacks={{
                    CheckDeletedDropDownData: (objNode) => {
                        return objNode["cIsDeleted"] == "N" ? true : false
                    }
                }}
                Events={{
                    OnChangeEventHandler: (objChangeData, props) => objContext.HistoryLogs_ModuleProcessor.OnMainClientDropDownChange(objContext, objChangeData),
                }}
                ParentProps={{ ...props }}
            />
        );
    }

    /**
* @name GetMainClientDropDown
* @summary Forms the  jsx required for the dropdown.
* @returns {object} jsx, React.Fragment
*/
    const GetApplicationTypeDropDown = (objTextResource) => {
        return (
            <WrapperComponent
                ComponentName={"Dropdown"}
                Id="iApplicationTypeId"
                Data={{
                    DropdownData: objContext.state.arrApplicationTypeData,//DataRef(objContext.props.Object_Cockpit_ApplicationType)["Data"] ?? [],
                    SelectedValue: objContext.state.objSearchFilters.iApplicationTypeId
                }}
                Meta={{
                    IsLanguageDependent: "N",
                    ValueColumn: "iApplicationTypeId",
                    //ValueColumn: "vApplicationName",
                    DisplayColumn: "vApplicationName",
                    DefaultOptionValue: - 1,
                    ShowDefaultOption: "true"
                }}
                Resource={{
                    Text: {
                        DefaultOptionText: "All Application",//Localization.TextFormatter(objTextResource, "PleaseChoose")
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
                    OnChangeEventHandler: (objChangeData, props) => objContext.HistoryLogs_ModuleProcessor.HandleApplicatioTypeDropdownChange("iApplicationTypeId", objChangeData, objContext),
                }}
                ParentProps={{ ...props }}
            />
        );
    }


    /**
     * @name  GetFilterBlock
     * @summary Forms Jsx for Filter block
     * @returns {object} jsx
     */
    const GetFilterBlock = () => {
        let objTextResource = Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/8_Setting/LogsAndException/Logs/HistoryLogs", objContext.props) ?? {};
        var date = new Date();
        date.setDate(date.getDate() - 5);
        var minDate = date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate();
        var max = objContext.HistoryLogs_ModuleProcessor.GetMinimunDate();
        return <div className="filter" id="filterHeader">
            <div className="filter-block">
                <span className="filter-label">{Localization.TextFormatter(objTextResource, "To")}</span>
                <div className="date-picker">
                    <WrapperComponent
                        ComponentName={"DatePicker"}
                        id="dtToDate"
                        Data={{
                            SelectedDate: objContext.state.objSearchFilters["dtToDate"],
                            //MinDate: new Date(minDate),
                            //MaxDate: new Date("2021/05/01")
                            MinDate: new Date(minDate),
                            MaxDate: max//new Date()
                        }}
                        Events={{
                            HandleDateChange: (strSelectedDate) => objContext.HistoryLogs_ModuleProcessor.OnDateChange("dtToDate", strSelectedDate, objContext)
                        }}
                        ParentProps={{ ...props }}
                    />
                </div>
            </div>
            <div className="filter-block">
                <span className="filter-label">{Localization.TextFormatter(objTextResource, "Type")}</span>
                <PerformanceProfiler ComponentName="LogTypeDropdown" JConfiguration={JConfiguration}>
                    <WrapperComponent
                        ComponentName={"Dropdown"}
                        Id="LogTypeDropdown"
                        Data={{
                            DropdownData: objContext.HistoryLogs_ModuleProcessor.GetLogTypeDropDownData(objContext),
                            SelectedValue: objContext.state.objSearchFilters.strType
                        }}
                        Meta={{
                            ValueColumn: "OptionValue",
                            DisplayColumn: "OptionText"
                        }}
                        Resource={{
                            Text: {
                                // DefaultOptionText: Localization.TextFormatter(objTextResource, "PleaseChoose")
                            },
                            JConfiguration: props.JConfiguration,
                            SkinPath: props.JConfiguration.IntranetSkinPath
                        }}
                        Events={{
                            OnChangeEventHandler: (objChangeData, props) => objContext.HistoryLogs_ModuleProcessor.HandleDropdownChange("strType", objChangeData, objContext),
                        }}
                        ParentProps={{ ...props }}
                    />
                </PerformanceProfiler>
            </div>
            {props.ClientUserDetails.MainClientId == 0 ? <div className="filter-block">
                <span className="filter-label" style={{ marginRight: "10px" }}>{"SelectMainClient"}</span>
                {GetMainClientDropDown(objTextResource)}
            </div> : ""}
            <div className="filter-block">
                <span className="filter-label">{"ApplicationType"}</span>
                {GetApplicationTypeDropDown(objTextResource)}
            </div>
            <div className="filter-block">
                <button className="btn"
                    onClick={() => objContext.HistoryLogs_ModuleProcessor.OnSearchClick(objContext)}
                >{Localization.TextFormatter(objTextResource, "Search")}
                </button>
            </div>

        </div>
    }


    /**
     * @name GetContent
     * @summary Forms the whole jsx required for the module.
     * @returns {object} jsx
     */
    const GetContent = () => {
        return <div className="subject-container">
            {GetFilterBlock()}
            <PerformanceProfiler ComponentName="HistoryLogsGrid" JConfiguration={JConfiguration}>
                <Grid
                    Id="HistoryLogsGrid"
                    Meta={objContext.HistoryLogs_ModuleProcessor.GetMetaData(objContext)}
                    Data={objContext.HistoryLogs_ModuleProcessor.GetGridData(objContext)}
                    Resource={objContext.HistoryLogs_ModuleProcessor.GetResourceData(objContext)}
                    Events={objContext.HistoryLogs_ModuleProcessor.GetGridEvents(objContext)}
                    CallBacks={{
                        OnBeforeGridRowRender: (objRow) => objContext.HistoryLogs_ModuleProcessor.GetCallBackforGrid(objRow, objContext)
                    }}
                   // CallBacks={objContext.HistoryLogs_ModuleProcessor.GetGridCallBacks(objContext)}
                    ParentProps={{ ...props }}
                />
            </PerformanceProfiler>
        </div>;
    }

    return (
        <React.Fragment>{props.isLoadComplete || state.isLoadComplete ?
            <React.Fragment>{GetContent()}</React.Fragment> : <React.Fragment></React.Fragment>}
        </React.Fragment>
    );
}

/**
 * @name GetImageMeta
 * @summary forms the default images for inline import.
 * */
const GetImageMeta = () => {
    return {
        ExportImage: ExportImage,
        DownloadImage: DownloadImage
    }
}

export default connect(IntranetBase_Hook.MapStoreToProps(HistoryLogs_ModuleProcessor.StoreMapList()))(HistoryLogs);

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = HistoryLogs_ModuleProcessor;