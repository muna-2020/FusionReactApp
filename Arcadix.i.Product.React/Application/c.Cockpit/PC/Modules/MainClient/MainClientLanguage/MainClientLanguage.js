// React related imports.
import React, { useReducer } from 'react';
import { connect } from 'react-redux';

//Base classes.
import * as CockpitBase_Hook from '@shared/Framework/BaseClass/CockpitBaseClass/CockpitBase_Hook';

//Module related fies.
import * as MainClientLanguage_Hook from '@shared/Application/c.Cockpit/Modules/MainClient/MainClientLanguage/MainClientLanguage_Hook';
import MainClientLanguage_ModuleProcessor from '@shared/Application/c.Cockpit/Modules/MainClient/MainClientLanguage/MainClientLanguage_ModuleProcessor';

//Components used in module.
import PerformanceProfiler from "@shared/Framework/Services/Performance/PerformanceProfiler";


/**
 * @name MainClientLanguage
 * @param {object} props props
 * @summary This component displays the MainClientLanguage data.
 * @returns {object} React.Fragement that encapsulate with MainClientLanguage details.
 */
const MainClientLanguage = props => {

    /**
     * @name [state,dispatch]
     * @summary Define state and dispatch for the reducer to set state.
     * @returns {[]} state and dispatch
     */
    const [state, dispatch] = useReducer(CockpitBase_Hook.Reducer, MainClientLanguage_Hook.GetInitialState(props));

    /**
     * @name objContext
     * @summary Groups state.dispatch and module object(s) in objContext.
     * @returns {object} objContext
     */
    let objContext = { state, props, dispatch, ["ModuleName"]: "MainClientLanguage", ["MainClientLanguage_ModuleProcessor"]: new MainClientLanguage_ModuleProcessor() };

    /**
     * @name  InitializeDataForSSR
     * @param {object} objContext context object
     * @summary Initializing API and DynamicStyles
     * @returns Setting ApplicationState
     */
    objContext.MainClientLanguage_ModuleProcessor.Initialize(objContext, objContext.MainClientLanguage_ModuleProcessor);

    /**
     * @name Initialize
     * @param {object} objContext context object
     * @summary Initialize method call in MainClientLanguage_Hook, that contains all the custom hooks.
     * @returns null
     */
    MainClientLanguage_Hook.Initialize(objContext);

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
                        OnChangeEventHandler: (objChangeData, props) => objContext.MainClientLanguage_ModuleProcessor.OnMainClientDropDownChange(objContext, objChangeData),
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
        const arrApplicationType = DataRef(objContext.props.Object_Cockpit_ApplicationType)["Data"] ?? [];//innerloop
        const arrMainClientApplicationType = DataRef(objContext.props.Object_Cockpit_MainClient_MainClientApplicationType)["Data"] ?? []; //outerloop
        const arrLanguage = DataRef(objContext.props.Object_Cockpit_Language)["Data"]?.filter(objItem => objItem["cIsDeleted"] === "N") ?? [];
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
                                arrLanguage.map((objLanguage) => {
                                    return (
                                        <tr className="gridrow">
                                            <td className="data-cell">{objLanguage["vLanguageIdentifier"]}</td>

                                            {
                                                arrMainClientApplicationType.map(objMainClientApplicationType => {
                                                    return arrApplicationType.map(objApplicationType => {
                                                        if (objMainClientApplicationType["iApplicationTypeId"] === objApplicationType["iApplicationTypeId"] && objMainClientApplicationType["iMainClientId"] === objContext.state.strMainClientId) {
                                                            let blnChecked = false;
                                                            objContext.state.arrMainClientLanguageData.map(objMainClientLanguage => {
                                                                if (objMainClientApplicationType["iApplicationTypeId"] === objMainClientLanguage["iApplicationTypeId"] && objLanguage["iFrameworkLanguageId"] === objMainClientLanguage["iLanguageId"] && objMainClientLanguage["cIsDeleted"] === "N") {
                                                                    blnChecked = true;
                                                                }
                                                            });
                                                            return (
                                                                <td className="data-cell">
                                                                    <input id={objApplicationType["iApplicationTypeId"] + "_" + objLanguage["iFrameworkLanguageId"]}
                                                                        type="checkbox"
                                                                        onChange={() => { objContext.MainClientLanguage_ModuleProcessor.CheckBoxClickHandler(objLanguage, objApplicationType, objContext) }}
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
                                )
                            }

                        </table>
                    </React.Fragment>
                </FillHeight>
            </PerformanceProfiler>
        ); //return loop ends            

    }

    function GetContent() {
        let objTextResource = Object_Framework_Services_TextResource.GetData("/c.Cockpit/Modules/MainClient/MainClientLanguage", props) ?? {};

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
            {props.isLoadComplete || state.isLoadComplete ? GetContent() : <React.Fragment />}
        </div>
    );
}

export default connect(CockpitBase_Hook.MapStoreToProps(MainClientLanguage_ModuleProcessor.StoreMapList()))(MainClientLanguage);

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = MainClientLanguage_ModuleProcessor;