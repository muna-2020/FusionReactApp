// React related imports.
import React, { useReducer } from 'react';
import { connect } from 'react-redux';

//Module related fies...
import * as CycleSchool_Hook from '@shared/Application/c.Intranet/Modules/4_Cycle/CycleSchool/CycleSchool_Hook';
import CycleSchool_ModuleProcessor from '@shared/Application/c.Intranet/Modules/4_Cycle/CycleSchool/CycleSchool_ModuleProcessor';

//Components used...
import PerformanceProfiler from '@shared/Framework/Services/Performance/PerformanceProfiler';

//In-line Image imports...
import CancelImage from '@inlineimage/Framework/ReactJs/PC/Controls/ToolBar/Cancel_Large.svg?inline';

/**
 * @name CycleSchool
 * @param {object} props props
 * @summary This component displays the CycleSchool data with check boxes
 * @returns {object} React.Fragement that encapsulated with CycleSchool details.
 */
const CycleSchool = props => {

    /**
     * @name [state,dispatch]
     * @summary Define state and dispatch for the reducer to set state.
     * @returns {[]} state and dispatch
     */
    const [state, dispatch] = useReducer(IntranetBase_Hook.Reducer, CycleSchool_Hook.GetInitialState(props));

    /**
     * @name objContext
     * @summary Groups state.dispatch and module object(s) in objContext.
     * @returns {object} objContext
     */
    let objContext = { state, props, dispatch, ["ModuleName"]: "CycleSchool", ["CycleSchool_ModuleProcessor"]: new CycleSchool_ModuleProcessor(), ["ImageMeta"]: GetImageMeta() };

    /**
     * @name  Initialize
     * @param {object} objContext context object
     * @summary Initializing API and DynamicStyles
     * @returns null
     */
    objContext.CycleSchool_ModuleProcessor.Initialize(objContext, objContext.CycleSchool_ModuleProcessor);

    /**
     * @name Initialize
     * @param {object} objContext context object
     * @summary Initialize method call to load the custom hooks.
     * @returns null
     */
    CycleSchool_Hook.Initialize(objContext);

    /**
     * @name GetCycleDropDown
     * @param {object} objTextResource objTextResource
     * @summary Forms the  jsx required for the dropdown.
     * @returns {object} jsx, React.Fragment
     */
    const GetCycleDropDown = (objTextResource) => {
        return (
            <PerformanceProfiler ComponentName="CycleDropdown" JConfiguration={JConfiguration}>
                <WrapperComponent
                    ComponentName={"Dropdown"}
                    Id="CycleDropdown"
                    Data={{
                        DropdownData: DataRef(objContext.props.Object_Intranet_Cycle_Cycle)["Data"] ?? [],
                        SelectedValue: state.strCycleId ? state.strCycleId : -1
                    }}
                    Meta={{
                        IsLanguageDependent: "N",
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
                        SkinPath: props.JConfiguration.CockpitSkinPath
                    }}
                    Callbacks={{
                        CheckDeletedDropDownData: (objNode) => {
                            return objNode["cIsDeleted"] == "N" && objNode["iCycleTypeId"] != 3 ? true : false
                        }
                    }}
                    Events={{
                        OnChangeEventHandler: (objChangeData, props) => objContext.CycleSchool_ModuleProcessor.OnDropDownChange("cycle", objChangeData, objContext),
                    }}
                    ParentProps={{ ...props }}
                />
            </PerformanceProfiler>
        );
    }

    /**
     * @name GetStateDropDown
     *  @param {object} objTextResource objTextResource
     * @summary Forms the  jsx required for the dropdown.
     * @returns {object} jsx, React.Fragment
     */
    const GetStateDropDown = (objTextResource) => {
        return (
            <PerformanceProfiler ComponentName="StateDropdown" JConfiguration={JConfiguration}>
                <WrapperComponent
                    ComponentName={"Dropdown"}
                    Id="StateDropdown"
                    Data={{
                        DropdownData: DataRef(objContext.props.Object_Extranet_State_State)["Data"] ?? [],
                        SelectedValue: objContext.state.objSelectedState["iStateId"] ? objContext.state.objSelectedState["iStateId"] : -1
                    }}
                    Meta={{
                        DependingTableName: "t_TestDrive_Member_State_Data",
                        IsLanguageDependent: "Y",
                        ValueColumn: "iStateId",
                        DisplayColumn: "vStateName",
                        DefaultOptionValue: - 1,
                        ShowDefaultOption: "true"
                    }}
                    Resource={{
                        Text: {
                            DefaultOptionText: Localization.TextFormatter(objTextResource, "PleaseChoose")
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
                        OnChangeEventHandler: (objChangeData, props) => objContext.CycleSchool_ModuleProcessor.OnDropDownChange("state", objChangeData, objContext),
                    }}
                    ParentProps={{ ...props }}
                />
            </PerformanceProfiler>
        );
    }

    /**
     * @name GetTestColumnData
     *  @param {object} objTestItem objTestItem
     * @summary Forms the  jsx required check boxes in Test columns.
     * @returns {object} jsx, React.Fragment
     */
    const GetTestColumnData = (objTestItem) => {
        let blnChecked = false;
        let objTestData = state.arrSelectedData?.find(objItem => objItem["uTestId"] === objTestItem["uTestId"]);
        if (objTestData) {
            let objCycleSchoolData = objTestData["t_TestDrive_Cycle_School"]?.find(objItem => objItem["uSchoolId"] === objContext.state.objSelectedSchool["uSchoolId"] && objItem["vAction"] !== "Delete"); //which are checked they will be empty string
            if (objCycleSchoolData) {
                blnChecked = true; //checkbox will be checked
            }
        }
        return (
            <td>
                <label className="checkbox">
                    <input type="checkbox"
                        onChange={() => { objContext.CycleSchool_ModuleProcessor.ClickHandler(objContext, objTestItem, !blnChecked) }}
                        checked={blnChecked} // if sent !blnChecked means add and  blnChecked means delete
                    />
                    <span className="checkmark"></span>
                </label>
            </td>
        );
    }

    /**
     * @name GetContent
     * @summary Forms the  jsx required for whole module.
     * @returns {object} jsx, React.Fragment
     */
    const GetContent = () => {
        let objTextResource = Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/4_Cycle/CycleSchool", props) ?? {};
        let arrTestData = objContext.state.arrTestData ?? [];
        return (
            <div className="cylestate-container">
                <div className="filter" id="filterHeader">
                    <div className="filter-block">
                        <span className="filter-label" style={{ marginRight: "10px" }}>{Localization.TextFormatter(objTextResource, "Cycle")}</span>
                        {GetCycleDropDown(objTextResource)}

                        <span className="filter-label" style={{ marginRight: "10px" }}>{Localization.TextFormatter(objTextResource, "State")}</span>
                        {GetStateDropDown(objTextResource)}

                        <span className="filter-label" style={{ marginRight: "10px" }}>(-Filter-NI-)</span>
                    </div>
                </div>

                <div className="cycle-state-grid">
                    <FillHeight
                        Meta={{
                            HeaderIds: ["MasterHeader", "TopHead", "TaskTitle", "BreadCrumb", "OfflineExecution", "filterHeader"],
                            FooterIds: ["FooterId"]
                        }}
                        className="bgStyle"
                        scrollStyle={{ overflow: "auto" }}
                        ParentProps={{ ...props }}>
                        <table className="cycle-state-grid-table">
                            <tr>
                                <td className="header-cell">{Localization.TextFormatter(objTextResource, "State")}</td>
                                <td className="header-cell">{Localization.TextFormatter(objTextResource, "School")}</td>
                                {
                                    arrTestData.map(objTestData => {
                                        return (<td>{objTestData["vTestName"]}</td>)
                                    })
                                }
                            </tr>
                            {objContext.state.blnSchoolSelected ?
                                <tr>
                                    <td className="header-cell">{objContext.CycleSchool_ModuleProcessor.GetSelectedStateName(objContext)}</td>
                                    <td className="header-cell">{objContext.state.objSelectedSchool["vSchoolName"]}</td>
                                    {
                                        arrTestData.length > 0 ? arrTestData.map(objTestItem => {
                                            return GetTestColumnData(objTestItem)
                                        }) : <React.Fragment />
                                    }
                                </tr>
                                : <React.Fragment />}
                        </table>
                    </FillHeight>
                </div>
            </div>
        );
    }

    return (
        <React.Fragment>{props.isLoadComplete || state.isLoadComplete ?
            <React.Fragment>{GetContent()}</React.Fragment> : <React.Fragment />}
        </React.Fragment>
    );
};

/**
 * @name GetImageMeta
 * @summary forms the default images for in-line import.
 * */
const GetImageMeta = () => {
    return {       
        CancelImage: CancelImage
    }
}

export default connect(IntranetBase_Hook.MapStoreToProps(CycleSchool_ModuleProcessor.StoreMapList()))(CycleSchool);

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = CycleSchool_ModuleProcessor; 