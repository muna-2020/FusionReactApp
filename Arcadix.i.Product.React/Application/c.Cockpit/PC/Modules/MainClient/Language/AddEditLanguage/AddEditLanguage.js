// React related imports.
import React, { useReducer } from 'react';

//Base classes.
import * as CockpitBase_Hook from '@shared/Framework/BaseClass/CockpitBaseClass/CockpitBase_Hook';

//Module related fies.
import * as AddEditLanguage_Hook from '@shared/Application/c.Cockpit/Modules/MainClient/Language/AddEditLanguage/AddEditLanguage_Hook';
import AddEditLanguage_ModuleProcessor from '@shared/Application/c.Cockpit/Modules/MainClient/Language/AddEditLanguage/AddEditLanguage_ModuleProcessor';

/**
  * @name AddEditLanguage
  * @param {object} props props
  * @summary This component is used to Add/Edit the Language data.
  * @returns {object} React.Fragement that contains the content to be added in popup required for add/edit.
  */
const AddEditLanguage = props => {
    /**
      * @name [state,dispatch]
      * @summary Define state and dispatch for the reducer to set state.
      * @returns {[]} state and dspatch
      */
    const [state, dispatch] = useReducer(CockpitBase_Hook.Reducer, AddEditLanguage_Hook.GetInitialState());

    /**
      * @name objContext
      * @summary Groups state.dispatch and module object(s) in objContext.
      * @returns {object} objContext
      */
    let objContext = { state, props, dispatch, "AddEditLanguage_ModuleProcessor": new AddEditLanguage_ModuleProcessor() };

    /**
      * @name Initialize
      * @param {object} objContext context object
      * @summary Initialize method call in AddEditLanguage_Hook, that contains all the custom hooks.
      * @returns null
      */
    AddEditLanguage_Hook.Initialize(objContext);
    let objTextResource = props.Resource.Text;
    return (
        <React.Fragment>
            <div id="Language" className="tabcontent subject-management multilanguage-div">
                <div className="title">
                    {Localization.TextFormatter(objTextResource, 'Language')}
                </div>

                <div className="col col-2">
                    <div className="col-item">
                        <div className="row-left">
                            <span>{Localization.TextFormatter(objTextResource, 'LanguageIdentifier')}</span>
                        </div>
                        <div className="row-right">
                            <input
                                autoFocus
                                onFocus={(e => { objContext.AddEditLanguage_ModuleProcessor.ValidateFocus(objContext, 'vLanguageIdentifier'); })}
                                className="text-input"
                                id="vLanguageIdentifier"
                                type="text"
                                onChange={(e) => {
                                    objContext.AddEditLanguage_ModuleProcessor.HandleChange("vLanguageIdentifier", e.target.value, objContext);
                                }}
                                onKeyDown={(e) => objContext.AddEditLanguage_ModuleProcessor.HandleEnterKeyDown(e, objContext.AddEditLanguage_ModuleProcessor, objContext)}
                                value={state.objData["vLanguageIdentifier"]}
                            />
                        </div>
                    </div>
                    <div className="col-item">
                        <div className="row-left">
                            <span>{Localization.TextFormatter(objTextResource, 'LanguageName')}</span>
                        </div>
                        <div className="row-right ">
                            <MultiLanguageInputs
                                Meta={{
                                    ValueColumn: "vLanguageName",
                                    DependingTableName: "t_Framework_Language_Data",
                                    DisplayColumn: "vLanguageName"
                                }}
                                Data={{
                                    DisplayData: state.objData,
                                    MultiLanguageData: props.Data.MultiLanguageData
                                }}
                                Events={{
                                    OnChange: (e, objLanguage) => {
                                        objContext.AddEditLanguage_ModuleProcessor.HandleChange("t_Framework_Language_Data.vLanguageName", e.target.value, objContext, objLanguage["iLanguageId"]);
                                    },
                                    OnKeyDown: (e) => {
                                        objContext.AddEditLanguage_ModuleProcessor.HandleEnterKeyDown(e, objContext.AddEditLanguage_ModuleProcessor, objContext)
                                    }
                                }}
                                ParentProps={{ ...props }}
                            />
                        </div>
                    </div>
                </div>

                <div className="col col-2">
                    <div className="col-item">
                        <div className="row-left">
                            <span>{Localization.TextFormatter(objTextResource, 'LanguageCultureInfo')}</span>
                        </div>
                        <div className="row-right">
                            <input
                                onFocus={(e => { objContext.AddEditLanguage_ModuleProcessor.ValidateFocus(objContext, 'vLanguageCultureInfo'); })}
                                id="vLanguageCultureInfo"
                                className="text-input"
                                type="text"
                                onChange={(e) => {
                                    objContext.AddEditLanguage_ModuleProcessor.HandleChange("vLanguageCultureInfo", e.target.value, objContext);
                                }}
                                onKeyDown={(e) => objContext.AddEditLanguage_ModuleProcessor.HandleEnterKeyDown(e, objContext.AddEditLanguage_ModuleProcessor, objContext)}
                                value={state.objData["vLanguageCultureInfo"]}
                            />
                        </div>
                    </div>
                    <div className="col-item">
                        <div className="row-left">
                            <span>{Localization.TextFormatter(objTextResource, 'IsActive')}</span>
                        </div>
                        <div className="row-right">
                            <label className="checkbox">
                                <input
                                    onFocus={(e => { objContext.AddEditLanguage_ModuleProcessor.ValidateFocus(objContext, 'cIsActive'); })}
                                    id="cIsActive" type="checkbox" name=""
                                    className="text-input"
                                    checked={state.objData["cIsActive"] && state.objData["cIsActive"].toUpperCase() === "Y" ? true : false}
                                    onChange={(e) => {
                                        objContext.AddEditLanguage_ModuleProcessor.HandleChange("cIsActive", e.target.checked ? "Y" : "N", objContext);
                                    }}
                                />
                                <span className="checkmark" />
                            </label>
                        </div>
                    </div>
                </div>

                <div className="col col-2">
                    <div className="col-item">
                        <div className="row-left">
                            <span>{Localization.TextFormatter(objTextResource, 'DefaultLanguageCountryInfo')}</span>
                        </div>
                        <div className="row-right">
                            <input
                                onFocus={(e => { objContext.AddEditLanguage_ModuleProcessor.ValidateFocus(objContext, 'vDefaultLanguageCountryInfo'); })}
                                id="vDefaultLanguageCountryInfo"
                                type="text"
                                className="text-input"
                                onChange={(e) => {
                                    objContext.AddEditLanguage_ModuleProcessor.HandleChange("vDefaultLanguageCountryInfo", e.target.value, objContext);
                                }}
                                onKeyDown={(e) => objContext.AddEditLanguage_ModuleProcessor.HandleEnterKeyDown(e, objContext.AddEditLanguage_ModuleProcessor, objContext)}
                                value={state.objData["vDefaultLanguageCountryInfo"]}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div id="ValidationError" />
        </React.Fragment>
    );
};

export default AddEditLanguage;
