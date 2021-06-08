// React related imports.
import React, { useReducer } from 'react';
import { connect } from 'react-redux';

//Components used in module.
import PerformanceProfiler from "@shared/Framework/Services/Performance/PerformanceProfiler";

//Module related fies.
import * as CycleSchoolYear_Hook from '@shared/Application/c.Intranet/Modules/4_Cycle/CycleSchoolYear/CycleSchoolYear_Hook';
import CycleSchoolYear_ModuleProcessor from '@shared/Application/c.Intranet/Modules/4_Cycle/CycleSchoolYear/CycleSchoolYear_ModuleProcessor';

/**
 * * @name CycleSchoolYear
* @param {object} props props
* @summary This component displays the CycleSchoolYear  data in grid.
* @returns {object} React.Fragement that encapsulated the display grid with CycleSchoolYear  details.
*/
const CycleSchoolYear = props => {

    /**
    * @name [state,dispatch]
    * @summary Define state and dispatch for the reducer to set state.
    * @returns {[]} state and dispatch
    */
    const [state, dispatch] = useReducer(IntranetBase_Hook.Reducer, CycleSchoolYear_Hook.GetInitialState(props));

    /**
    * @name objContext
    * @summary Groups state.dispatch and module object(s) in objContext.
    * @returns {object} objContext
    */
    let objContext = { state, props, dispatch, ["ModuleName"]: "CycleSchoolYear", ["CycleSchoolYear_ModuleProcessor"]: new CycleSchoolYear_ModuleProcessor() };

    /**
    * @name Initialize
    * @param {object} objContext context object
    * @summary Initialize method call in CycleSchoolYear_Hook, that contains all the custom hooks.
    * @returns null
    */
    CycleSchoolYear_Hook.Initialize(objContext);

    /**
     * @name  InitializeDataForSSR
     * @param {object} objContext context object
     * @summary Initializing API and DynamicStyles
     * @returns Setting ApplicationState
     */
    objContext.CycleSchoolYear_ModuleProcessor.Initialize(objContext, objContext.CycleSchoolYear_ModuleProcessor);

    /**
     * @name GetCycleDropDown
     * @summary Forms the  jsx required for the dropdown.
     * @returns {object} jsx, React.Fragment
     */
    const GetCycleDropDown = (objTextResource) => {
        return (
            <PerformanceProfiler ComponentName={"CycleDropDown"} JConfiguration={props.JConfiguration}>
                <WrapperComponent
                    ComponentName={"Dropdown"}
                    Id="CycleDropDown"
                    Data={{
                        DropdownData: DataRef(objContext.props.Object_Intranet_Cycle_Cycle)["Data"] ?? [],
                        SelectedValue: objContext.state.strCycleId ? objContext.state.strCycleId : "00000000-0000-0000-0000-000000000000"
                    }}
                    Meta={{
                        ValueColumn: "uCycleId",
                        DisplayColumn: "vCycleName",
                        DefaultOptionValue: "00000000-0000-0000-0000-000000000000",
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
                            return objNode["cIsDeleted"] == "N" && objNode["iCycleTypeId"] != 3 ? true : false
                        }
                    }}
                    Events={{
                        OnChangeEventHandler: (objChangeData, props) => objContext.CycleSchoolYear_ModuleProcessor.OnCycleDropDownChange(objContext, objChangeData)
                    }}
                    ParentProps={{ ...props }}
                />
            </PerformanceProfiler>
        );
    }

    /**
     * @name GetCycleSchoolYearHeader
     * @summary Forms the  jsx required for the CycleSchoolYearHeader.
     * @returns {object} jsx, React.Fragment
     */
    function GetCycleSchoolYearHeader(objTextResource) {
        let domTestHeaderRow = [];
        {
            objContext.state.arrTestData?.map((objTestData, intTestDataIndex) => {
                domTestHeaderRow = [...domTestHeaderRow, <td>
                    <input
                        name="check"
                        type="checkbox"
                        onChange={(e) => {
                            objContext.CycleSchoolYear_ModuleProcessor.OnHeaderCheckBoxClick(e, objContext, objTestData)
                        }}
                    />
                    <span className="header-cell" style={{ marginLeft: "10px" }}>{objTestData["vTestName"]}</span>
                </td>]

            })
        }

        return <tr >
            <td className="header-cell">
                <span>{Localization.TextFormatter(objTextResource, "SchoolYear")}</span>
            </td>
            {domTestHeaderRow}
        </tr>
    }

    /**
     * @name GetCycleSchoolYearRows
     * @summary Forms the  jsx required for the CycleSchoolYearRows.
     * @returns {object} jsx, React.Fragment
     */
    function GetCycleSchoolYearRows(objTextResource) {
        let arrSchoolYear = DataRef(objContext.props.Object_Extranet_Teacher_SchoolYear)["Data"]?.filter(objSchoolYearData => objSchoolYearData["cIsDeleted"].toUpperCase() === "N");
        let strInterfaceLanguageId = objContext.props.JConfiguration.InterfaceLanguageId.toString();

        return arrSchoolYear?.map((objSchoolYear, intSchoolYearIndex) => {
            let strSchoolYearName = objSchoolYear["t_TestDrive_Member_Class_SchoolYear_Data"].find(objColumnData => objColumnData["iLanguageId"].toString() === strInterfaceLanguageId) != undefined ? objSchoolYear["t_TestDrive_Member_Class_SchoolYear_Data"].find(objColumnData => objColumnData["iLanguageId"].toString() === strInterfaceLanguageId)["vSchoolYearName"] : "";
            let TestCheckBox = [];
            objContext.state.arrTestData.map((objTestData, intTestIndex) => {
                let blnIsCheckBoxChecked = false;
                let arrData = state.arrSelectedData.filter(objItem => objItem["uTestId"] === objTestData["uTestId"]);
                if (arrData.length > 0) {
                    let arrSubData = arrData[0]["t_TestDrive_Cycle_SchoolYear"].filter(objItem => objItem["iSchoolYearId"] === objSchoolYear["iSchoolYearId"] && objItem["vAction"] !== "Delete"); //&& objItem["vAction"] !== "Delete" which are checked they will be empty string
                    if (arrSubData.length > 0) {
                        blnIsCheckBoxChecked = true; //checkbox will be checked
                    }
                }
                TestCheckBox = [...TestCheckBox, <td>
                    <input id="cIsActive"
                        name="check"
                        type="checkbox"
                        checked={blnIsCheckBoxChecked}
                        onChange={() => { objContext.CycleSchoolYear_ModuleProcessor.ClickHandler(objContext, objSchoolYear, objTestData, !blnIsCheckBoxChecked) }}
                    />
                </td>];

            })
            return <tr className="gridrow">
                <td>
                    <span>{strSchoolYearName}</span>
                </td>
                {TestCheckBox}
            </tr>
        })
    }

    /**
    * @name GetContent
    * @summary Forms the  jsx required for the dropdown.
    * @returns {object} jsx, React.Fragment
    */
    function GetContent() {
        var objTextResource = Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/4_Cycle/CycleSchoolYear", objContext.props) ?? {};
        return (
            <React.Fragment>
                <div className="subject-container">
                    <div className="filter" id="filterHeader">
                        <div className="filter-block">
                            <span className="filter-label">{Localization.TextFormatter(objTextResource, "Execution")}</span>
                            {GetCycleDropDown(objTextResource)}
                        </div>
                    </div>
                    <div className="display-grid">
                        <PerformanceProfiler ComponentName={"CysleSchoolYearDisplay"} JConfiguration={props.JConfiguration}>
                            <FillHeight
                                Id="CysleSchoolYearDisplay"
                                Meta={{
                                    HeaderIds: ["MasterHeader", "TopHead", "TaskTitle", "BreadCrumb", "OfflineExecution", "filterHeader"],
                                    FooterIds: ["FooterId"]
                                }}
                                className="bgStyle"
                                scrollStyle={{ overflow: "auto" }}
                                ParentProps={{ ...props }}>
                                <table className="cycle-state-grid-table">
                                    {GetCycleSchoolYearHeader(objTextResource)}
                                    {GetCycleSchoolYearRows(objTextResource)}
                                </table>
                            </FillHeight>
                        </PerformanceProfiler>
                    </div>
                </div>
            </React.Fragment>
        );
    }

    return (
        <React.Fragment>{props.isLoadComplete || state.isLoadComplete ?
            <React.Fragment>{GetContent()}</React.Fragment> : <React.Fragment />}
        </React.Fragment>
    );
}

export default connect(IntranetBase_Hook.MapStoreToProps(CycleSchoolYear_ModuleProcessor.StoreMapList()))(CycleSchoolYear);

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = CycleSchoolYear_ModuleProcessor; 