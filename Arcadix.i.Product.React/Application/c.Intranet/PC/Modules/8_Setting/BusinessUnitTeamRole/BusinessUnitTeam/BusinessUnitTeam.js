//React related imports.
import React, { useReducer } from 'react';
import { connect } from 'react-redux';


//Module related fies.
import * as BusinessUnitTeam_Hook from '@shared/Application/c.Intranet/Modules/8_Setting/BusinessUnitTeamRole/BusinessUnitTeam/BusinessUnitTeam_Hook';
import * as BusinessUnitTeam_MetaData from '@shared/Application/c.Intranet/Modules/8_Setting/BusinessUnitTeamRole/BusinessUnitTeam/BusinessUnitTeam_MetaData';
import BusinessUnitTeam_ModuleProcessor from '@shared/Application/c.Intranet/Modules/8_Setting/BusinessUnitTeamRole/BusinessUnitTeam/BusinessUnitTeam_ModuleProcessor';
import PerformanceProfiler from "@shared/Framework/Services/Performance/PerformanceProfiler";

/**
* @name BusinessUnitTeam
* @param {object} props props
* @summary This component displays the BusinessUnitTeam data in grid.
* @returns {object} React.Fragement that encapsulated the display grid with BusinessUnitTeam details.
*/
const BusinessUnitTeam = props => {

    /**
    * @name [state,dispatch]
    * @summary Define state and dispatch for the reducer to set state.
    * @returns {[]} state and dispatch
    */
    const [state, dispatch] = useReducer(IntranetBase_Hook.Reducer, BusinessUnitTeam_Hook.GetInitialState(props));

    /**
    * @name objContext
    * @summary Groups state.dispatch and module object(s) in objContext.
    * @returns {object} objContext
    */
    let objContext = { state, props, dispatch, ["ModuleName"]: "BusinessUnitTeam", ["BusinessUnitTeam_ModuleProcessor"]: new BusinessUnitTeam_ModuleProcessor() };

    /**
    * @name Initialize
    * @param {object} objContext context object
    * @summary Initialize method call in BusinessUnitTeam_Hook, that contains all the custom hooks.
    * @returns null
    */
    BusinessUnitTeam_Hook.Initialize(objContext);


    /**
* @name  InitializeDataForSSR
* @param {object} objContext context object
* @summary Initializing API and DynamicStyles
* @returns Setting ApplicationState
*/
    objContext.BusinessUnitTeam_ModuleProcessor.Initialize(objContext, objContext.BusinessUnitTeam_ModuleProcessor);


    /**
   * @name GetBusinessUnitDropDown
   * @summary Forms the  jsx required for the dropdown.
   * @returns {object} jsx, React.Fragment
   */
    const GetBusinessUnitDropDown = (objTextResource) => {
        return (
            <PerformanceProfiler ComponentName={"BusinessUnitDropDown"} JConfiguration={props.JConfiguration}>
                <WrapperComponent
                    ComponentName={"Dropdown"}
                    Id="BusinessUnitDropDown"
                    Data={{
                        DropdownData: DataRef(objContext.props.Object_Cockpit_BusinessUnit, "Object_Cockpit_BusinessUnit;cIsForProductManagement;" + (JConfiguration.ApplicationTypeName == "ProductManagement" ? "Y" : "N"))?.["Data"] ?? [],
                        SelectedValue: state.strBusinessUnitId ? state.strBusinessUnitId : -1
                    }}
                    Meta={{
                        ValueColumn: "uBusinessUnitId",
                        DisplayColumn: "vBusinessUnitName",
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
                        OnChangeEventHandler: (objChangeData, props) => objContext.BusinessUnitTeam_ModuleProcessor.OnBusinessUnitDropDownChange(objContext, objChangeData),
                        CheckDeletedDropDownData: objContext.BusinessUnitTeam_ModuleProcessor.CreateItemEventHandler
                    }}
                    ParentProps={{ ...props }}
                />
            </PerformanceProfiler>
        );
    }

    /**
     * JSX for subject
     */
    function GetContent() {
        var objTextResource = Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/8_Setting/BusinessUnitTeamRole/BusinessUnitTeam", objContext.props);
        objTextResource = objTextResource ? objTextResource : {};
        return (
            <div className="subject-container">
                <div className="filter" id="filterHeader">
                    <div className="filter-block">
                        <span style={{ marginRight: "10px" }}>{Localization.TextFormatter(objTextResource, "BusinessUnit")}</span>
                        {GetBusinessUnitDropDown(objTextResource)}
                    </div>
                </div>
                <div>
                    <PerformanceProfiler ComponentName={"BusinessUnitTeamGrid"} JConfiguration={props.JConfiguration}>
                        <Grid
                            Id='BusinessUnitTeamGrid'
                            Meta={{ ...BusinessUnitTeam_MetaData.GetMetaData(), Filter: { "cIsDeleted": "N", "uBusinessUnitId": state.strBusinessUnitId } }}
                            Resource={{ Text: objTextResource, SkinPath: props.JConfiguration.IntranetSkinPath }}
                            Data={objContext.BusinessUnitTeam_ModuleProcessor.GetGridData(objContext)}
                            CallBacks={{
                                OnBeforeGridRowRender: (objRow) => objContext.BusinessUnitTeam_ModuleProcessor.GetCallBackforGrid(objRow, objContext)
                            }}
                            ParentProps={{ ...props }}
                        />
                    </PerformanceProfiler>
                </div>
            </div>
        );
    }

    return (
        <React.Fragment>{props.isLoadComplete || state.isLoadComplete ?
            <React.Fragment>{GetContent()}</React.Fragment> : <React.Fragment />}
        </React.Fragment>
    );
}


export default connect(IntranetBase_Hook.MapStoreToProps(BusinessUnitTeam_ModuleProcessor.StoreMapList()))(BusinessUnitTeam);

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = BusinessUnitTeam_ModuleProcessor; 