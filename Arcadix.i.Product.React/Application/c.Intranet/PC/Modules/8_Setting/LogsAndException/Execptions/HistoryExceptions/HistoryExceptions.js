// React related imports.
import React, { useReducer } from 'react';
import { connect } from 'react-redux';

//Module related fies...
import * as HistoryExceptions_Hook from '@shared/Application/c.Intranet/Modules/8_Setting/LogsAndException/Exceptions/HistoryExceptions/HistoryExceptions_Hook';
import HistoryExceptions_ModuleProcessor from '@shared/Application/c.Intranet/Modules/8_Setting/LogsAndException/Exceptions/HistoryExceptions/HistoryExceptions_ModuleProcessor';

//Components used...
import PerformanceProfiler from '@shared/Framework/Services/Performance/PerformanceProfiler';

//In-line Image imports...
import ExportImage from '@inlineimage/Common/ReactJs/PC/Icons/Excel_icon.gif?inline';
import DownloadImage from '@inlineimage/Application/c.ProductManagement/ReactJs/PC/Modules/Document/download.svg?inline';

/**
* @name HistoryExceptions
* @param {object} props props
* @summary This component displays the HistoryExceptions data
* @returns {object} React.Fragement that contains HistoryExceptions details.
*/
const HistoryExceptions = props => {

    /**
    * @name [state,dispatch]
    * @summary Define state and dispatch for the reducer to set state.
    * @returns {[]} state and dispatch
    */
    const [state, dispatch] = useReducer(IntranetBase_Hook.Reducer, HistoryExceptions_Hook.GetInitialState(props));

    /**
    * @name objContext
    * @summary Groups state.dispatch and module object(s) in objContext.
    * @returns {object} objContext
    */
    let objContext = { state, props, dispatch, ["ModuleName"]: "HistoryExceptions", ["HistoryExceptions_ModuleProcessor"]: new HistoryExceptions_ModuleProcessor(), ["ImageMeta"]: GetImageMeta() };

    /**
     * @name  Initialize
     * @param {object} objContext context object
     * @summary Initializing API and DynamicStyles
     * @returns null
     */
    objContext.HistoryExceptions_ModuleProcessor.Initialize(objContext, objContext.HistoryExceptions_ModuleProcessor);

    /**
     * @name Initialize
     * @param {object} objContext context object
     * @summary Initialize method call to load the custom hooks.
     * @returns null
     */
    HistoryExceptions_Hook.Initialize(objContext);

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
                    OnChangeEventHandler: (objChangeData, props) => objContext.HistoryExceptions_ModuleProcessor.OnMainClientDropDownChange(objContext, objChangeData),
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
                    OnChangeEventHandler: (objChangeData, props) => objContext.HistoryExceptions_ModuleProcessor.HandleApplicatioTypeDropdownChange("iApplicationTypeId", objChangeData, objContext),
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
        let objTextResource = Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/8_Setting/LogsAndException/Exceptions/HistoryExceptions", objContext.props) ?? {};
        var date = new Date();
        date.setDate(date.getDate() - 5);
        var minDate = date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate();
        var max = objContext.HistoryExceptions_ModuleProcessor.GetMinimunDate();
        return <div className="filter" id="filterHeader">
            <div className="filter-block">
                <span className="filter-label">{Localization.TextFormatter(objTextResource, "To")}</span>
                <div className="date-picker">
                    <WrapperComponent
                        ComponentName={"DatePicker"}
                        id="dtToDate"
                        Data={{
                            SelectedDate: objContext.state.objSearchFilters["dtToDate"],
                            MinDate: new Date(minDate),
                            MaxDate: max
                        }}
                        Events={{
                            HandleDateChange: (strSelectedDate) => objContext.HistoryExceptions_ModuleProcessor.OnDateChange("dtToDate", strSelectedDate, objContext)
                        }}
                        ParentProps={{ ...props }}
                    />
                </div>
            </div>
            <div className="filter-block">
                <span className="filter-label">{Localization.TextFormatter(objTextResource, "Type")}</span>
                <PerformanceProfiler ComponentName="ExceptionTypeDropdown" JConfiguration={JConfiguration}>
                    <WrapperComponent
                        ComponentName={"Dropdown"}
                        Id="ExceptionTypeDropdown"
                        Data={{
                            DropdownData: objContext.HistoryExceptions_ModuleProcessor.GetLogTypeDropDownData(objContext),
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
                            OnChangeEventHandler: (objChangeData, props) => objContext.HistoryExceptions_ModuleProcessor.HandleDropdownChange("strType", objChangeData, objContext),
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
                    onClick={() => objContext.HistoryExceptions_ModuleProcessor.OnSearchClick(objContext)}
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
            <PerformanceProfiler ComponentName="HistoryExceptionsGrid" JConfiguration={JConfiguration}>
                <Grid
                    Id="HistoryExceptionsGrid"
                    Meta={objContext.HistoryExceptions_ModuleProcessor.GetMetaData(objContext)}
                    Data={objContext.HistoryExceptions_ModuleProcessor.GetGridData(objContext)}
                    Resource={objContext.HistoryExceptions_ModuleProcessor.GetResourceData(objContext)}
                    Events={objContext.HistoryExceptions_ModuleProcessor.GetGridEvents(objContext)}
                    CallBacks={{
                        OnBeforeGridRowRender: (objRow) => objContext.HistoryExceptions_ModuleProcessor.GetCallBackforGrid(objRow, objContext)
                    }}
                    //CallBacks={objContext.HistoryExceptions_ModuleProcessor.GetGridCallBacks(objContext)}
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

export default connect(IntranetBase_Hook.MapStoreToProps(HistoryExceptions_ModuleProcessor.StoreMapList()))(HistoryExceptions);

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = HistoryExceptions_ModuleProcessor;