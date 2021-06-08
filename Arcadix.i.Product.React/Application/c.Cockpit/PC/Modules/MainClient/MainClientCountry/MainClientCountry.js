// React related imports.
import React, { useReducer } from 'react';
import { connect } from 'react-redux';

//Base classes.
import * as CockpitBase_Hook from '@shared/Framework/BaseClass/CockpitBaseClass/CockpitBase_Hook';

//Module related fies.
import * as MainClientCountry_Hook from '@shared/Application/c.Cockpit/Modules/MainClient/MainClientCountry/MainClientCountry_Hook';
import MainClientCountry_ModuleProcessor from '@shared/Application/c.Cockpit/Modules/MainClient/MainClientCountry/MainClientCountry_ModuleProcessor';

//Components used in module.
import PerformanceProfiler from "@shared/Framework/Services/Performance/PerformanceProfiler";

/**
 * @name MainClientCountry
 * @param {object} props props
 * @summary This component displays the MainClientCountry data.
 * @returns {object} React.Fragement that encapsulate with MainClientCountry details.
 */
const MainClientCountry = props => {

    /**
     * @name [state,dispatch]
     * @summary Define state and dispatch for the reducer to set state.
     * @returns {[]} state and dispatch
     */
    const [state, dispatch] = useReducer(CockpitBase_Hook.Reducer, MainClientCountry_Hook.GetInitialState(props));

    /**
     * @name objContext
     * @summary Groups state.dispatch and module object(s) in objContext.
     * @returns {object} objContext
     */
    let objContext = { state, props, dispatch, ["ModuleName"]: "MainClientCountry", ["MainClientCountry_ModuleProcessor"]: new MainClientCountry_ModuleProcessor() };

    /**
     * @name Initialize
     * @param {object} objContext context object
     * @summary Initialize method call in MainClientCountry_Hook, that contains all the custom hooks.
     * @returns null
     */
    MainClientCountry_Hook.Initialize(objContext);

    /**
     * @name  InitializeDataForSSR
     * @param {object} objContext context object
     * @summary Initializing API and DynamicStyles
     * @returns Setting ApplicationState
     */
    objContext.MainClientCountry_ModuleProcessor.Initialize(objContext, objContext.MainClientCountry_ModuleProcessor);


    /**
     * @name GetMainClientDropDown
     * @summary Forms the  jsx required for the dropdown.
     * @returns {object} jsx, React.Fragment
     */
    const GetMainClientDropDown = (objTextResource) => {
        return (
            <PerformanceProfiler ComponentName={"MainClientDropDown"} JConfiguration={props.JConfiguration}>
                <WrapperComponent
                    ComponentName={"Dropdown"}
                    Id="MainClientDropDown"
                    Data={{
                        DropdownData: objContext.props.Object_Cockpit_MainClient_MainClient["Data"],
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
                        OnChangeEventHandler: (objChangeData, props) => objContext.MainClientCountry_ModuleProcessor.OnMainClientDropDownChange(objContext, objChangeData),
                    }}
                    ParentProps={{ ...props }}
                />
            </PerformanceProfiler>
        );
    }



    /**
      * @name GetTable
      * @param filter only the id of the selected object in objSelectedBackgroundId and objSelectedProfileImageId
      */
    function GetTable(objTextResource) {
        const arrApplicationType = DataRef(objContext.props.Object_Cockpit_ApplicationType)["Data"];//innerloop
        const arrMainClientApplicationType = DataRef(objContext.props.Object_Cockpit_MainClient_MainClientApplicationType)["Data"]; //outerloop
        const arrCountry = DataRef(objContext.props.Object_Cockpit_Country)["Data"];

        return (
            <PerformanceProfiler ComponentName={"FillHeightMainClientLanguage"} JConfiguration={props.JConfiguration}>
                <FillHeight
                    id="FillHeightMainClientLanguage"
                    Meta={{
                        HeaderIds: ["Header", "TopHead", "TaskTitle"],
                        FooterIds: ["FooterId"]
                    }}
                    ParentProps={{ ...props }}>
                    <React.Fragment>
                        <table>
                            <tr className="table-header">
                                <td>{Localization.TextFormatter(objTextResource, "Header")}</td>
                                {
                                    arrMainClientApplicationType.map(objMainClientApplicationType => {
                                        return arrApplicationType.map(objApplicationType => {
                                            if (objMainClientApplicationType["iApplicationTypeId"] === objApplicationType["iApplicationTypeId"] && objMainClientApplicationType["iMainClientId"] === objContext.state.strMainClientId) {
                                                return (
                                                    <td className="data-cell ">
                                                        {objApplicationType["vApplicationName"]}
                                                    </td>
                                                );
                                            }
                                        })
                                    })}

                            </tr>
                            {
                                arrCountry.map((objCountry) => {
                                    if (objCountry["cIsDeleted"] == "N") {
                                        return (
                                            <tr className="gridrow">
                                                <td className="data-cell">{objCountry["vCountryCultureInfo"]}</td>

                                                {
                                                    arrMainClientApplicationType.map(objMainClientApplicationType => {
                                                        return arrApplicationType.map(objApplicationType => {
                                                            if (objMainClientApplicationType["iApplicationTypeId"] === objApplicationType["iApplicationTypeId"] && objMainClientApplicationType["iMainClientId"] === objContext.state.strMainClientId) {
                                                                let blnChecked = false;
                                                                objContext.state.arrMainClientCountryData.map(objMainClientCountry => {
                                                                    if (objMainClientApplicationType["iApplicationTypeId"] === objMainClientCountry["iApplicationTypeId"] && objCountry["iCountryId"] === objMainClientCountry["iCountryId"] && objMainClientCountry["cIsDeleted"] === "N") {
                                                                        blnChecked = true;
                                                                    }
                                                                });
                                                                return (
                                                                    <td className="data-cell">
                                                                        <input id={objApplicationType["iApplicationTypeId"] + "_" + objCountry["iCountryId"]}
                                                                            type="checkbox"
                                                                            onChange={() => { objContext.MainClientCountry_ModuleProcessor.CheckBoxClickHandler(objCountry, objApplicationType, objContext) }}
                                                                            checked={blnChecked} />
                                                                    </td>
                                                                );
                                                            }
                                                        }
                                                        )
                                                    }
                                                    )
                                                }

                                            </tr>
                                        );
                                    }

                                }
                                )
                            }

                        </table>
                    </React.Fragment>
                </FillHeight>
            </PerformanceProfiler>
        ); //return loop ends            

    }

    function GetContent() {
        let objTextResource = Object_Framework_Services_TextResource.GetData("/c.Cockpit/Modules/MainClient/MainClientCountry", props);

        return <div>
            <div className="filter" id="filterHeader">
                {props.ClientUserDetails.MainClientId == 0 ? <div className="filter-block">
                    <span className="filter-label" style={{ marginRight: "10px" }}>{objTextResource["SelectMainClient"]}</span>
                    {GetMainClientDropDown(objTextResource)}
                </div> : ""}

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

export default connect(CockpitBase_Hook.MapStoreToProps(MainClientCountry_ModuleProcessor.StoreMapList()))(MainClientCountry);

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = MainClientCountry_ModuleProcessor;