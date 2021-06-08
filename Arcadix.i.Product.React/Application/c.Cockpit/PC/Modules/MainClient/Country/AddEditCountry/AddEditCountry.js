// React related imports.
import React, { useReducer } from 'react';

//Base classes.
import * as CockpitBase_Hook from '@shared/Framework/BaseClass/CockpitBaseClass/CockpitBase_Hook';

//Module related fies.
import * as AddEditCountry_Hook from '@shared/Application/c.Cockpit/Modules/MainClient/Country/AddEditCountry/AddEditCountry_Hook';
import AddEditCountry_ModuleProcessor from '@shared/Application/c.Cockpit/Modules/MainClient/Country/AddEditCountry/AddEditCountry_ModuleProcessor';

/**
 * @name AddEditCountry
 * @param {object} props props
 * @summary This component is used to Add/Edit the Country data.
 * @returns {object} React.Fragement that contains the content to be added in popup required for add/edit.
 */
const AddEditCountry = props => {

    /**
     * @name [state,dispatch]
     * @summary Define state and dispatch for the reducer to set state.
     * @returns {[]} state and dispatch
     */
    const [state, dispatch] = useReducer(CockpitBase_Hook.Reducer, AddEditCountry_Hook.GetInitialState());

    /**
     * @name objContext
     * @summary Groups state.dispatch and module object(s) in objContext.
     * @returns {object} objContext
     */
    let objContext = { state, props, dispatch, "AddEditCountry_ModuleProcessor": new AddEditCountry_ModuleProcessor() };

    /**
     * @name Initialize
     * @param {object} objContext context object
     * @summary Initialize method call in AddEditCountry_Hook, that contains all the custom hooks.
     * @returns null
     */
    AddEditCountry_Hook.Initialize(objContext);
    let objTextResource = props.Resource.Text;
    return (
        <React.Fragment>
            <div id="Country" className="tabcontent subject-management multilanguage-div" style={{ display: (state.strDivToShow == "Country" ? "block" : "none") }}>
                <div className="title">
                    {Localization.TextFormatter(objTextResource, 'Country')}
                </div>

                <div className="col col-2">
                    <div className="col-item">
                        <div className="row-left">
                            <span>{Localization.TextFormatter(objTextResource, 'CountryName')}</span>
                        </div>
                        <div className="row-right">
                            <MultiLanguageInputs
                                autoFocus
                                Meta={{
                                    ValueColumn: "vCountryName",
                                    DependingTableName: "t_Framework_Country_Data",
                                    DisplayColumn: "vCountryName"
                                }}
                                Data={{
                                    DisplayData: state.objData,
                                    MultiLanguageData: props.Data.MultiLanguageData,
                                }}
                                Events={{
                                    OnChange: (e, objCountry) => {
                                        objContext.AddEditCountry_ModuleProcessor.HandleChange("t_Framework_Country_Data.vCountryName", e.target.value, objContext, objCountry["iLanguageId"]);
                                    },
                                    OnKeyDown: (e) => {
                                        objContext.AddEditCountry_ModuleProcessor.HandleEnterKeyDown(e, objContext.AddEditCountry_ModuleProcessor, objContext)
                                    }
                                }}
                                ParentProps={{...props}}
                            />
                        </div>
                    </div>

                </div>

                <div className="col col-2">
                    <div className="col-item">
                        <div className="row-left">
                            <span>{Localization.TextFormatter(objTextResource, 'CountryCultureInfo')}</span>
                        </div>
                        <div className="row-right">
                            <input
                                onFocus={(e => { objContext.AddEditCountry_ModuleProcessor.ValidateFocus(objContext, 'vCountryCultureInfo'); })}
                                className="text-input"
                                id="vCountryCultureInfo"
                                type="text"
                                onChange={(e) => {
                                    objContext.AddEditCountry_ModuleProcessor.HandleChange("vCountryCultureInfo", e.target.value, objContext);
                                }}
                                onKeyDown={(e) => objContext.AddEditCountry_ModuleProcessor.HandleEnterKeyDown(e, objContext.AddEditCountry_ModuleProcessor, objContext)}
                                value={state.objData["vCountryCultureInfo"]}
                            />
                        </div>
                    </div>
                </div>

                <div className="col col-2">
                    <div className="col-item">
                        <div className="row-left">
                            <span>{Localization.TextFormatter(objTextResource, 'Currency')}</span>
                        </div>
                        <div className="row-right">
                            <input
                                onFocus={(e => { objContext.AddEditCountry_ModuleProcessor.ValidateFocus(objContext, 'vCurrency'); })}
                                className={"text-input"}
                                id="vCurrency"
                                type="text"
                                onChange={(e) => {
                                    objContext.AddEditCountry_ModuleProcessor.HandleChange("vCurrency", e.target.value, objContext);
                                }}
                                onKeyDown={(e) => objContext.AddEditCountry_ModuleProcessor.HandleEnterKeyDown(e, objContext.AddEditCountry_ModuleProcessor, objContext)}
                                value={state.objData["vCurrency"]}
                            />
                        </div>
                    </div>
                </div>
            </div>


            <div id="ValidationError" />
        </React.Fragment>
    );
};

export default AddEditCountry;