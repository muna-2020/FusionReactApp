// React related imports.
import React, { useReducer } from 'react';
import { connect } from 'react-redux';

//Base classes.
import * as CockpitBase_Hook from '@shared/Framework/BaseClass/CockpitBaseClass/CockpitBase_Hook';

//Module related fies.
import * as Preload_Hook from '@shared/Application/c.Cockpit/Modules/SoftwareEngineerSupport/Preload/Preload_Hook';
import Preload_ModuleProcessor from "@shared/Application/c.Cockpit/Modules/SoftwareEngineerSupport/Preload/Preload_ModuleProcessor";

/**
 * @name Preload
 * @param {object} props props
 * @summary This component displays the Preload data in grid.
 * @returns {object} React.Fragement that encapsulated the display grid with Preload details.
 */
const Preload = props => {

    /**
     * @name [state,dispatch]
     * @summary Define state and dispatch for the reducer to set state.
     * @returns {[]} state and dispatch
     */
    const [state, dispatch] = useReducer(CockpitBase_Hook.Reducer, Preload_Hook.GetInitialState(props));

    /**
     * @name objContext
     * @summary Groups state.dispatch and module object(s) in objContext.
     * @returns {object} objContext
     */
    let objContext = { state, props, dispatch, ["ModuleName"]: "Preload", ["Preload_ModuleProcessor"]: new Preload_ModuleProcessor() };

    /**
     * @name  InitializeDataForSSR
     * @param {object} objContext context object
     * @summary Initializing API and DynamicStyles
     * @returns Setting ApplicationState
     */
    objContext.Preload_ModuleProcessor.Initialize(objContext, objContext.Preload_ModuleProcessor);

    /**
     * @name Initialize
     * @param {object} objContext context object
     * @summary Initialize method call in Preload_Hook, that contains all the custom hooks.
     * @returns null
     */
    Preload_Hook.Initialize(objContext);

    /**  
     * @name GetContent
     * @summary Get the content to display
     * @return {JSX} Jsx
     */
    function GetContent() {
        var objTextResource = Object_Framework_Services_TextResource.GetData("/c.Cockpit/Modules/SoftwareEngineerSupport/Preload", props) ?? {};
        let arrMainClient = DataRef(objContext.state.arrMainClientData) ?? [];
            return (
                            <div className="preload-parent-div">
                                <FillHeight
                                    ParentProps={{ ...props }}
                                    id="Preload" Meta={{ HeaderIds: ["MasterHeader", "BreadCrumb"], FooterIds: ["OfflineExecution"] }} className="bgStyle" scrollStyle={{ overflow: "auto" }}> {/*additional padding is used to exclude the final height */}

                                    <div className="preload-header">
                                        <div className="flex__item">
                                            <span>{"Server"}</span>
                                            <div className="intranet-dropdown">
                                                <WrapperComponent
                                                    ComponentName={"Dropdown"}
                                                    Id="FolderTypeDropdown"
                                                    Data={{
                                                        DropdownData: objContext.Preload_ModuleProcessor.GetElasticConnectionDropDownData(objContext) ?? [],
                                                        SelectedValue: objContext.state.strElasticConnectionServerId ? objContext.state.strElasticConnectionServerId : 0
                                                    }}
                                                    Meta={{
                                                        ValueColumn: "OptionId",
                                                        DisplayColumn: "OptionText"
                                                    }}
                                                    Resource={{
                                                        Text: {
                                                            // DefaultOptionText: Localization.TextFormatter(objTextResource, "PleaseChoose")
                                                        },
                                                        JConfiguration: JConfiguration,
                                                        SkinPath: JConfiguration.IntranetSkinPath
                                                    }}
                                                    Events={{
                                                        OnChangeEventHandler: (objChangeData, props) => objContext.Preload_ModuleProcessor.HandleElasticConnectionDropDownDataChange(objContext, objChangeData)
                                                    }}
                                                    ParentProps={props}
                                                />
                                            </div>
                                        </div>
                                        <div className="flex__item">
                                            <span>{state.objColumnParams?.MainClient}</span>
                                            <div className="intranet-dropdown">
                                                <WrapperComponent
                                                    ComponentName={"Dropdown"}
                                                    Id={"MainClient_DropDown"}
                                                    Data={{
                                                        DropdownData: arrMainClient ?? [],
                                                        SelectedValue: objContext.state.selectedMainClient ? objContext.state.selectedMainClient["iMainClientId"] : - 1
                                                    }}
                                                    Meta={{
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
                                                        SkinPath: props.JConfiguration.IntranetSkinPath
                                                    }}
                                                    Events={{
                                                        OnChangeEventHandler: (objItems, dropDownProps) => objContext.Preload_ModuleProcessor.OnChangeMainClientEventHandler(objContext, objItems)
                                                    }}
                                                    ParentProps={{ ...props }}

                                                />
                                            </div>
                                        </div>
                                    </div>
                                {
                                    state.arrPreloadData?.length > 0 ?
                                        <table cellPadding="15" cellSpacing="15" className="preload-table">
                                        {
                                            props.Data == undefined ?
                                                <tbody>
                                                    <tr>
                                                        <td>
                                                            <input type="checkbox" value="markAll" id="markAll" disabled={state.isPreloadComeplete} checked={state.blnIsAllSelected} onClick={(event) => { objContext.Preload_ModuleProcessor.MarkAll(objContext, event.target.checked) }} />
                                                            <span className="checkmark" />
                                                        </td>
                                                        <td>
                                                            {state.objColumnParams?.Objects}
                                                        </td>
                                                        <td>
                                                            {state.objColumnParams?.Filters}
                                                        </td>
                                                    <td>
                                                        {state.objColumnParams?.SearchQuery}
                                                    </td>
                                                    </tr>
                                                    {GetPreloadElements()}
                                                </tbody> :
                                                props.Data.cIsForCockpit == "Y" ?
                                                    <tbody></tbody> : <tbody>
                                                        <tr>
                                                            <td>
                                                                <input type="checkbox" value="markAll" id="markAll" disabled={state.isPreloadComeplete} checked={state.blnIsAllSelected} onClick={(event) => { objContext.Preload_ModuleProcessor.MarkAll(objContext, event.target.checked) }} />
                                                                <span className="checkmark" />
                                                            </td>
                                                            <td>
                                                                {state.objColumnParams?.Objects}
                                                            </td>
                                                            <td>
                                                                {state.objColumnParams?.Filters}
                                                            </td>
                                                        </tr>
                                                        {GetPreloadElements()}
                                                    </tbody>

                                        }
                                        </table>
                                        :
                                        <div className="no-data-display"><span>{objTextResource["noDataMessage"]}</span></div>
                                }
                                </FillHeight>
                            </div>                           
            )
    }


    /**
     * @name GetAdditionalFilters
     * @param {object} objEntity object
     * @summary Get Modified Entity to display
     * @returns {JSX} Modified Entities Jsx
     */
    function GetAdditionalFilters(objEntity) {
        //--------------------------------------------------------------------Commented Out for now---------------------------------------------------------
        //if (objEntity == "TextResource") {
        //    const checkbox = state.arrLanguageCultureInfo?.map(objLangaue => {
        //        return (
        //            <React.Fragment>
        //                {objLangaue.vLanguageCultureInfo}&nbsp;
        //                <input type="checkbox" id="languageCultureInfoCheckBox" checked={objLangaue.isChecked}
        //                    value={objLangaue.vLanguageCultureInfo} onClick={() => { objContext.Preload_ModuleProcessor.OnClickLanguageCheckBox(objContext, event) }} />
        //                    &nbsp;
        //            </React.Fragment>
        //        );
        //    })
        //    return checkbox;
        //}
    }

    /**
     * @name GetPreloadElements
     * @summary Get all the preload elements to be displayed
     * @returns Formed Objects table Jsx
     */
    function GetPreloadElements() {
        let CurrentModuleName = "";
        let jsxEntityView = [];
        state.arrPreloadData?.map((objEntity) => {
            if (CurrentModuleName != objEntity.Object.split("_")[1]) {
                CurrentModuleName = objEntity.Object.split("_")[1];
                jsxEntityView = [jsxEntityView,
                    (
                        <tr>
                            <td colSpan="4">
                                <strong>{objEntity.Object.split("_")[1]}</strong>
                            </td>
                        </tr>
                    )];
            }
            jsxEntityView = [...jsxEntityView, (
                <React.Fragment >
                    <tr>
                        <td>
                            <label className="check-container">
                                <input type="checkbox" name={objEntity.Object} disabled={state.isPreloadComeplete} checked={objEntity.isSelected} value={objEntity.Object} onChange={() => objContext.Preload_ModuleProcessor.OnClickCheckBox(objContext, event)} />
                                <span className="checkmark" />
                            </label>
                        </td>
                        <td>
                            <span>{objEntity.Object}</span>
                        </td>
                        <td>
                            {
                                objEntity.ForeignKeyName != undefined ?
                                    <input type="text" id={objEntity.Object} disabled={state.isPreloadComeplete} name={objEntity.ForeignKeyName} value={objEntity.ForeignKeyFilter?.[objEntity.ForeignKeyName] ?? ""} placeholder={objEntity.ForeignKeyName} onChange={() => objContext.Preload_ModuleProcessor.OnClickTextBox(objContext, event, "ForeignKeyFilter")} />
                                    : ""
                            }
                        </td>
                        {
                            //<td>
                            //    {GetAdditionalFilters(objEntity.Object)}
                            //</td>
                        }
                        <td>
                            {
                                objEntity.SearchQueryKeys && <input type="text" id={objEntity.Object} disabled={state.isPreloadComeplete} name={objEntity.SearchQueryKeys} placeholder={objEntity.SearchQueryKeys} onChange={() => objContext.Preload_ModuleProcessor.OnClickTextBox(objContext, event, "SearchQueryKeys")} />
                            }
                        </td>
                    </tr>
                </React.Fragment>
            )];
        }
        );
        return jsxEntityView;
    }

    /**
     * @summary returns JSX
     */
    return (
        <React.Fragment>
            {props.isLoadComplete || state.isLoadComplete ? <React.Fragment>{GetContent()}</React.Fragment> : <React.Fragment />}
        </React.Fragment>
    );
}

export default connect(CockpitBase_Hook.MapStoreToProps(Preload_ModuleProcessor.StoreMapList()))(Preload);

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = Preload_ModuleProcessor;