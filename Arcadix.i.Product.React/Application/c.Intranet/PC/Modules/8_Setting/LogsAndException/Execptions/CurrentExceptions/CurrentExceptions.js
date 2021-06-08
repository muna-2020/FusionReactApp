// React related imports.
import React, { useReducer } from 'react';
import { connect } from 'react-redux';

//Module related fies...
import * as CurrentExceptions_Hook from '@shared/Application/c.Intranet/Modules/8_Setting/LogsAndException/Exceptions/CurrentExceptions/CurrentExceptions_Hook';
import CurrentExceptions_ModuleProcessor from '@shared/Application/c.Intranet/Modules/8_Setting/LogsAndException/Exceptions/CurrentExceptions/CurrentExceptions_ModuleProcessor';

//Components used...
import PerformanceProfiler from '@shared/Framework/Services/Performance/PerformanceProfiler';

//In-line Image imports...
import ExportImage from '@inlineimage/Common/ReactJs/PC/Icons/Excel_icon.gif?inline';

/**
* @name CurrentExceptions
* @param {object} props props
* @summary This component displays the CurrentExceptions data
* @returns {object} React.Fragement that contains CurrentExceptions details.
*/
const CurrentExceptions = props => {

    /**
    * @name [state,dispatch]
    * @summary Define state and dispatch for the reducer to set state.
    * @returns {[]} state and dispatch
    */
    const [state, dispatch] = useReducer(IntranetBase_Hook.Reducer, CurrentExceptions_Hook.GetInitialState(props));

    /**
    * @name objContext
    * @summary Groups state.dispatch and module object(s) in objContext.
    * @returns {object} objContext
    */
    let objContext = { state, props, dispatch, ["ModuleName"]: "CurrentExceptions", ["CurrentExceptions_ModuleProcessor"]: new CurrentExceptions_ModuleProcessor(), ["ImageMeta"]: GetImageMeta() };

    /**
     * @name  Initialize
     * @param {object} objContext context object
     * @summary Initializing API and DynamicStyles
     * @returns null
     */
    objContext.CurrentExceptions_ModuleProcessor.Initialize(objContext, objContext.CurrentExceptions_ModuleProcessor);

    /**
     * @name Initialize
     * @param {object} objContext context object
     * @summary Initialize method call to load the custom hooks.
     * @returns null
     */
    CurrentExceptions_Hook.Initialize(objContext);

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
                    OnChangeEventHandler: (objChangeData, props) => objContext.CurrentExceptions_ModuleProcessor.OnMainClientDropDownChange(objContext, objChangeData),
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
                        DefaultOptionText: "AllApplication",//Localization.TextFormatter(objTextResource, "PleaseChoose")
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
                    OnChangeEventHandler: (objChangeData, props) => objContext.CurrentExceptions_ModuleProcessor.HandleApplicatioTypeDropdownChange("iApplicationTypeId", objChangeData, objContext),
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
        let objTextResource = Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/8_Setting/LogsAndException/Exceptions/CurrentExceptions", objContext.props) ?? {};
        return <div className="filter" id="filterHeader">
            <div className="filter-block">
                <span className="filter-label">{Localization.TextFormatter(objTextResource, "Type")}</span>
                <PerformanceProfiler ComponentName="ExceptionTypeDropdown" JConfiguration={JConfiguration}>
                    <WrapperComponent
                        ComponentName={"Dropdown"}
                        Id="ExceptionTypeDropdown"
                        Data={{
                            DropdownData: objContext.CurrentExceptions_ModuleProcessor.GetLogTypeDropDownData(objContext),
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
                            OnChangeEventHandler: (objChangeData, props) => objContext.CurrentExceptions_ModuleProcessor.HandleDropdownChange("strType", objChangeData, objContext),
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
                    onClick={() => objContext.CurrentExceptions_ModuleProcessor.OnSearchClick(objContext)}
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
            <PerformanceProfiler ComponentName="CurrentExceptionsGrid" JConfiguration={JConfiguration}>
                <Grid
                    Id="CurrentExceptionsGrid"
                    Meta={objContext.CurrentExceptions_ModuleProcessor.GetMetaData(objContext)}
                    Data={objContext.CurrentExceptions_ModuleProcessor.GetGridData(objContext)}
                    Resource={objContext.CurrentExceptions_ModuleProcessor.GetResourceData(objContext)}
                    Events={objContext.CurrentExceptions_ModuleProcessor.GetGridEvents(objContext)}
                    CallBacks={objContext.CurrentExceptions_ModuleProcessor.GetGridCallBacks(objContext)}
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
        ExportImage: ExportImage
    }
}

export default connect(IntranetBase_Hook.MapStoreToProps(CurrentExceptions_ModuleProcessor.StoreMapList()))(CurrentExceptions);

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = CurrentExceptions_ModuleProcessor;