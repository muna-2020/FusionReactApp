// React related imports.
import React, { useReducer } from 'react';
import { connect } from 'react-redux';

//Module related fies...
import * as CycleClass_Hook from '@shared/Application/c.Intranet/Modules/4_Cycle/CycleClass/CycleClass_Hook';
import CycleClass_ModuleProcessor from '@shared/Application/c.Intranet/Modules/4_Cycle/CycleClass/CycleClass_ModuleProcessor';

//Components used...
import PerformanceProfiler from '@shared/Framework/Services/Performance/PerformanceProfiler';

//In-line Image imports...
import CancelImage from '@inlineimage/Framework/ReactJs/PC/Controls/ToolBar/Cancel_Large.svg?inline';

/**
 * @name CycleClass
 * @param {object} props props
 * @summary This component displays the CycleClass data with check boxes
 * @returns {object} React.Fragement that encapsulated with CycleClass details.
 */
const CycleClass = props => {

    /**
     * @name [state,dispatch]
     * @summary Define state and dispatch for the reducer to set state.
     * @returns {[]} state and dispatch
     */
    const [state, dispatch] = useReducer(IntranetBase_Hook.Reducer, CycleClass_Hook.GetInitialState(props));

    /**
     * @name objContext
     * @summary Groups state.dispatch and module object(s) in objContext.
     * @returns {object} objContext
     */
    let objContext = { state, props, dispatch, ["ModuleName"]: "CycleClass", ["CycleClass_ModuleProcessor"]: new CycleClass_ModuleProcessor(), ["ImageMeta"]: GetImageMeta() };

    /**
     * @name  Initialize
     * @param {object} objContext context object
     * @summary Initializing API and DynamicStyles
     * @returns null
     */
    objContext.CycleClass_ModuleProcessor.Initialize(objContext, objContext.CycleClass_ModuleProcessor);

    /**
     * @name Initialize
     * @param {object} objContext context object
     * @summary Initialize method call to load the custom hooks.
     * @returns null
     */
    CycleClass_Hook.Initialize(objContext);

    /**
     * @name GetCycleDropdown
     * @param {object} objTextResource objTextResource
     * @summary Forms the  jsx required for the dropdown.
     * @returns {object} jsx, React.Fragment
     */
    const GetCycleDropdown = (objTextResource) => {
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
                        OnChangeEventHandler: (objChangeData, props) => objContext.CycleClass_ModuleProcessor.OnDropDownChange("cycle", objChangeData, objContext),
                    }}
                    ParentProps={{ ...props }}
                />
            </PerformanceProfiler>
        );
    }

    /**
     * @name GetStateDropdown
     * @param {object} objTextResource objTextResource
     * @summary Forms the  jsx required for the dropdown.
     * @returns {object} jsx, React.Fragment
     */
    const GetStateDropdown = (objTextResource) => {
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
                        OnChangeEventHandler: (objChangeData, props) => objContext.CycleClass_ModuleProcessor.OnDropDownChange("state", objChangeData, objContext),
                    }}
                    ParentProps={{ ...props }}
                />
            </PerformanceProfiler>
        );
    }

    /**
     * @name GetSchoolDropdown
     * @param {object} objTextResource objTextResource
     * @summary Forms the  jsx required for the dropdown.
     * @returns {object} jsx, React.Fragment
     */
    const GetSchoolDropdown = (objTextResource) => {
        return (
            <PerformanceProfiler ComponentName="SchoolDropdown" JConfiguration={JConfiguration}>
                <WrapperComponent
                    ComponentName={"Dropdown"}
                    Id="SchoolDropdown"
                    Data={{
                        DropdownData: objContext.state.arrSchoolData ?? [],
                        SelectedValue: objContext.state.objSelectedSchool["uSchoolId"] ? objContext.state.objSelectedSchool["uSchoolId"] : -1
                    }}
                    Meta={{
                        ValueColumn: "uSchoolId",
                        DisplayColumn: "vSchoolName",
                        DefaultOptionValue: - 1,
                        ShowDefaultOption: "true"
                    }}
                    Resource={{
                        Text: {
                            DefaultOptionText: Localization.TextFormatter(objTextResource, "DefaultChooseSchool")
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
                        OnChangeEventHandler: (objChangeData, props) => objContext.CycleClass_ModuleProcessor.OnDropDownChange("school", objChangeData, objContext)
                    }}
                    ParentProps={{ ...props }}
                />
            </PerformanceProfiler>
        );
    }

    /**
     * @name GetTestColumnData
     * @param {object} objTestItem objTestItem
     * @summary Forms the  jsx with check boxes for all Assigned Tests.
     * @returns {object} jsx, React.Fragment
     */
    const GetTestColumnData = (objTestItem) => {
        let blnChecked = false;
        let objTestData = state.arrSelectedData?.find(objItem => objItem["uTestId"] === objTestItem["uTestId"]);
        if (objTestData) {
            let objCycleClassData = objTestData["t_TestDrive_Cycle_Class"]?.find(objItem => objItem["uClassId"] === objContext.state.objSelectedClass["uClassId"] && objItem["vAction"] !== "Delete"); //which are checked they will be empty string
            if (objCycleClassData) {
                blnChecked = true; //checkbox will be checked
            }
        }
        return (
            <td>
                <label className="checkbox">
                    <input type="checkbox"
                        onChange={() => { objContext.CycleClass_ModuleProcessor.ClickHandler(objContext, objTestItem, !blnChecked) }}
                        checked={blnChecked} // if sent !blnChecked means add and  blnChecked means delete
                    />
                    <span className="checkmark"></span>
                </label>
            </td>
        );
    }

    /**
     * @name GetContent
     * @summary Forms the  jsx for whole module
     * @returns {object} jsx, React.Fragment
     */
    const GetContent = () => {
        let objTextResource = Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/4_Cycle/CycleClass", props) ?? {};
        let arrTestData = objContext.state.arrTestData ?? [];

        return (
            <div className="cylestate-container">
                <div className="filter" id="filterHeader">
                    <div className="filter-block">
                        <span className="filter-label" style={{ marginRight: "10px" }}>{Localization.TextFormatter(objTextResource, "Cycle")}</span>
                        {GetCycleDropdown(objTextResource)}

                        <span className="filter-label" style={{ marginRight: "10px" }}>{Localization.TextFormatter(objTextResource, "State")}</span>
                        {GetStateDropdown(objTextResource)}

                        <span className="filter-label" style={{ marginRight: "10px" }}>{Localization.TextFormatter(objTextResource, "School")}</span>
                        {GetSchoolDropdown(objTextResource)}

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
                                <td className="header-cell">{Localization.TextFormatter(objTextResource, "Teacher")}</td>
                                <td className="header-cell">{Localization.TextFormatter(objTextResource, "Class")}</td>
                                {
                                    arrTestData.map(objTestData => {
                                        return (<td>{objTestData["vTestName"]}</td>)
                                    })
                                }
                            </tr>
                            {objContext.state.blnSchoolSelected ?
                                <tr>
                                    <td className="header-cell">{objContext.CycleClass_ModuleProcessor.GetSelectedStateName(objContext)}</td>
                                    <td className="header-cell">{objContext.state.objSelectedSchool["vSchoolName"]}</td>
                                    <td className="header-cell">{objContext.state.objSelectedTeacher["vName"]}</td>
                                    <td className="header-cell">{objContext.state.objSelectedClass["vClassName"]}</td>
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

export default connect(IntranetBase_Hook.MapStoreToProps(CycleClass_ModuleProcessor.StoreMapList()))(CycleClass);

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = CycleClass_ModuleProcessor; 