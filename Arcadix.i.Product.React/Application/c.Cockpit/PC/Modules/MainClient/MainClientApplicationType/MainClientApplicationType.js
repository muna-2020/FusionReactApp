// React related imports.
import React, { useReducer } from 'react';
import { connect } from 'react-redux';

//Base classes.
import * as CockpitBase_Hook from '@shared/Framework/BaseClass/CockpitBaseClass/CockpitBase_Hook';

//Module related fies.
import * as MainClientApplicationType_Hook from '@shared/Application/c.Cockpit/Modules/MainClient/MainClientApplicationType/MainClientApplicationType_Hook';
import MainClientApplicationType_ModuleProcessor from '@shared/Application/c.Cockpit/Modules/MainClient/MainClientApplicationType/MainClientApplicationType_ModuleProcessor';

/**
 * @name MainClientApplicationType
 * @param {object} props props
 * @summary This component displays the MainClientApplicationType data.
 * @returns {object} React.Fragement that encapsulate with MainClientApplicationType details.
 */
const MainClientApplicationType = props => {

    /**
     * @name [state,dispatch]
     * @summary Define state and dispatch for the reducer to set state.
     * @returns {[]} state and dispatch
     */
    const [state, dispatch] = useReducer(CockpitBase_Hook.Reducer, MainClientApplicationType_Hook.GetInitialState(props));

    /**
     * @name objContext
     * @summary Groups state.dispatch and module object(s) in objContext.
     * @returns {object} objContext
     */
    let objContext = { state, props, dispatch, ["ModuleName"]: "MainClientApplicationType", ["MainClientApplicationType_ModuleProcessor"]: new MainClientApplicationType_ModuleProcessor() };

    /**
     * @name  Initialize
     * @param {object} objContext context object
     * @summary Initializing API and DynamicStyles
     * @returns null
     */
    objContext.MainClientApplicationType_ModuleProcessor.Initialize(objContext, objContext.MainClientApplicationType_ModuleProcessor);

    /**
     * @name Initialize
     * @param {object} objContext context object
     * @summary Initialize method call in MainClientApplicationType_Hook, that contains all the custom hooks.
     * @returns null
     */
    MainClientApplicationType_Hook.Initialize(objContext);

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
                    OnChangeEventHandler: (objChangeData, props) => objContext.MainClientApplicationType_ModuleProcessor.OnMainClientDropDownChange(objContext, objChangeData),
                }}
                ParentProps={{ ...props }}
            />
        );
    }

    /**
     * @name GetTable
      * @summary Forms the jsx for table.
      * @returns {object} jsx, React.Fragment
     */
    function GetTable(objTextResource) {

        const arrApplicationType = DataRef(objContext.props.Object_Cockpit_ApplicationType)["Data"] ?? [];//inner loop

        return (
            <React.Fragment>
                <table>
                    <tr className="table-header">
                        <th align="left">{objTextResource["ApplicationTypeName"]}</th>
                        <th></th>
                    </tr>
                    {
                        arrApplicationType.map((objApplicationType) => {
                            if (objApplicationType["cIsDeleted"] == 'N') {
                                let blnChecked = false;
                                objContext.state.arrMainClientApplicationTypeData?.map(objMainClientApplicationType => {

                                    if (objApplicationType["iApplicationTypeId"] == objMainClientApplicationType["iApplicationTypeId"] && objMainClientApplicationType["cIsDeleted"] !== "Y") {
                                        blnChecked = true;
                                    }
                                });
                                return (
                                    <tr className="gridrow">
                                        <td className="data-cell">{objApplicationType["vApplicationName"]}</td>
                                        <td className="data-cell">
                                            <input id={objApplicationType["iApplicationTypeId"]}
                                                type="checkbox"
                                                onChange={() => { objContext.MainClientApplicationType_ModuleProcessor.CheckBoxClickHandler(objApplicationType, objContext) }}
                                                checked={blnChecked} />
                                        </td>
                                        
                                    </tr>
                                );
                            }
                            
                        }
                        )
                    }

                </table>
            </React.Fragment>
        ); //return loop ends            

    }
    
    /**
     * @name GetContent
      * @summary Forms the jsx for whole module.
      * @returns {object} jsx, React.Fragment
     */
    function GetContent() {
        let objTextResource = Object_Framework_Services_TextResource.GetData("/c.Cockpit/Modules/MainClient/MainClientApplicationType", props) ?? {};

        return <div>
            <div className="filter" id="filterHeader">
                <div className="filter-block">
                    <span className="filter-label" style={{ marginRight: "10px" }}>{objTextResource["SelectMainClient"]}</span>
                    {GetMainClientDropDown(objTextResource)}
                </div>
            </div>
            <div>
                {objContext.state.strMainClientId != -1 ? GetTable(objTextResource) : <React.Fragment />}
            </div>
        </div>

    }
    return (
        <div className="main-client-wrapper">
            {state.isLoadComplete ? GetContent() : <React.Fragment />}
        </div>
    );
}

export default connect(CockpitBase_Hook.MapStoreToProps(MainClientApplicationType_ModuleProcessor.StoreMapList()))(MainClientApplicationType);

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = MainClientApplicationType_ModuleProcessor;