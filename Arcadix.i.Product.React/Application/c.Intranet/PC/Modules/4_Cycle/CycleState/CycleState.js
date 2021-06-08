// React related imports.
import React, { useReducer } from 'react';
import { connect } from 'react-redux';

//Module related fies...
import * as CycleState_Hook from '@shared/Application/c.Intranet/Modules/4_Cycle/CycleState/CycleState_Hook';
import CycleState_ModuleProcessor from '@shared/Application/c.Intranet/Modules/4_Cycle/CycleState/CycleState_ModuleProcessor';

//Components used...
import PerformanceProfiler from '@shared/Framework/Services/Performance/PerformanceProfiler';

/**
 * @name CycleState
 * @param {object} props props
 * @summary This component displays the CycleState data with check boxes
 * @returns {object} React.Fragement that encapsulated with CycleState details.
 */
const CycleState = props => {

    /**
     * @name [state,dispatch]
     * @summary Define state and dispatch for the reducer to set state.
     * @returns {[]} state and dispatch
     */
    const [state, dispatch] = useReducer(IntranetBase_Hook.Reducer, CycleState_Hook.GetInitialState(props));

    /**
    * @name objContext
    * @summary Groups state.dispatch and module object(s) in objContext.
    * @returns {object} objContext
    */
    let objContext = { state, props, dispatch, ["ModuleName"]: "CycleState", ["CycleState_ModuleProcessor"]: new CycleState_ModuleProcessor(), ["Object_Framework_Services_TextResource"]: Object_Framework_Services_TextResource };

    /**
     * @name  Initialize
     * @param {object} objContext context object
     * @summary Initializing API and DynamicStyles
     * @returns null
     */
    objContext.CycleState_ModuleProcessor.Initialize(objContext, objContext.CycleState_ModuleProcessor);

    /**
     * @name Initialize
     * @param {object} objContext context object
     * @summary Initialize method call to load the custom hooks.
     * @returns null
     */
    CycleState_Hook.Initialize(objContext);

    /**
     * @name GetCycleDropdown
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
                        OnChangeEventHandler: (objChangeData, props) => objContext.CycleState_ModuleProcessor.OnCycleDropDownChange(objContext, objChangeData),
                    }}
                    ParentProps={{ ...props }}
                />
            </PerformanceProfiler>
        );
    }

    /**
     * @name GetStateRowName
     * @param {object} objItem objItem
     * @summary Forms the State Name in all Rows.
     * @returns {object} jsx, React.Fragment
     */
    const GetStateRowName = (objItem) => {
        let strData;
        if (objItem["cIsDeleted"] === "N") {
            objItem["t_TestDrive_Member_State_Data"]?.forEach(objStateItem => {
                if (objStateItem["iLanguageId"] == parseInt(props.JConfiguration["InterfaceLanguageId"])) {
                    strData = <td className="header-cell">{objStateItem["vStateName"]}</td>;
                }
            });
            return strData;
        }
    }

    /**
     * @name GetStateRowName
     * @param {object} objTestItem objTestItem
     * @param {object} objStateItem objStateItem 
     * @summary Forms the Test Name for selected Cycle in Row Header.
     * @returns {object} jsx, React.Fragment
     */
    const GetTestColumnData = (objTestItem, objStateItem) => {
        let blnChecked = false;
        let arrData = state.arrSelectedData?.filter(objItem => objItem["uTestId"] === objTestItem["uTestId"]);
        if (arrData.length > 0) {
            let arrSubData = arrData[0]["t_TestDrive_Cycle_State"].filter(objItem => objItem["iStateId"] === objStateItem["iStateId"] && objItem["vAction"] !== "Delete"); //which are checked they will be empty string
            if (arrSubData.length > 0) {
                blnChecked = true; //checkbox will be checked
            }
        }
        return (
            <td>
                <label className="checkbox">
                    <input type="checkbox"
                        onChange={() => { objContext.CycleState_ModuleProcessor.ClickHandler(objContext, objStateItem, objTestItem, !blnChecked) }}
                        checked={blnChecked} // if sent !blnChecked means add and  blnChecked means delete
                    />
                    <span className="checkmark"></span>
                </label>
            </td>
        );
    }

    /**
     * @name GetContent
     * @summary Forms the Jsx for whole module.
     * @returns {object} jsx, React.Fragment
     */
    const GetContent = () => {
        let objTextResource = Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/4_Cycle/CycleState", props) ?? {};
        let arrStateData = DataRef(objContext.props.Object_Extranet_State_State)["Data"] ?? [];
        let arrTestData = objContext.state.arrTestData ?? [];
        return (
            <div className="cylestate-container">
                <div className="filter" id="filterHeader">
                    <div className="filter-block">
                        <span className="filter-label" style={{ marginRight: "10px" }}>{Localization.TextFormatter(objTextResource, "Execution:")}</span>
                        {GetCycleDropdown(objTextResource)}
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
                                <td className="header-cell">{Localization.TextFormatter(objTextResource, "ColumnHeader")}</td>
                                {
                                    arrTestData.map(objTestData => {
                                        return (<td>{objTestData["vTestName"]}</td>)
                                    })
                                }
                            </tr>
                            {
                                arrStateData && arrStateData.map((objStateItem) => {
                                    return (
                                        <tr>
                                            {
                                                GetStateRowName(objStateItem)
                                            }
                                            {
                                                arrTestData.length > 0 ? arrTestData.map(objTestItem => {
                                                    return GetTestColumnData(objTestItem, objStateItem)
                                                }) : <React.Fragment />
                                            }
                                        </tr>
                                    )
                                })
                            }
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

export default connect(IntranetBase_Hook.MapStoreToProps(CycleState_ModuleProcessor.StoreMapList()))(CycleState);

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = CycleState_ModuleProcessor;