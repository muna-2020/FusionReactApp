// React related imports.
import React, { useReducer } from 'react';

//Base classes.
import * as CockpitBase_Hook from '@shared/Framework/BaseClass/CockpitBaseClass/CockpitBase_Hook';

//Module related fies.
import * as AddEditMainClientConfiguration_Hook from '@shared/Application/c.Cockpit/Modules/MainClient/MainClientConfiguration/AddEditMainClientConfiguration/AddEditMainClientConfiguration_Hook';
import AddEditMainClientConfiguration_ModuleProcessor from '@shared/Application/c.Cockpit/Modules/MainClient/MainClientConfiguration/AddEditMainClientConfiguration/AddEditMainClientConfiguration_ModuleProcessor';

/**
 * @name AddEditMainClientConfiguration
 * @param {object} props props
 * @summary This component is used to Add/Edit the MainClientConfiguration data.
 * @returns {object} React.Fragement that contains the content to be added in popup required for add/edit.
 */
const AddEditMainClientConfiguration = props => {

    /**
     * @name [state,dispatch]
     * @summary Define state and dispatch for the reducer to set state.
     * @returns {[]} state and dspatch
     */
    const [state, dispatch] = useReducer(CockpitBase_Hook.Reducer, AddEditMainClientConfiguration_Hook.GetInitialState());

    /**
     * @name objContext
     * @summary Groups state.dispatch and module object(s) in objContext.
     * @returns {object} objContext
     */
    let objContext = { state, props, dispatch, "AddEditMainClientConfiguration_ModuleProcessor": new AddEditMainClientConfiguration_ModuleProcessor() };

    /**
     * @name Initialize
     * @param {object} objContext context object
     * @summary Initialize method call in AddEditMainClientConfiguration_Hook, that contains all the custom hooks.
     * @returns null
     */
    AddEditMainClientConfiguration_Hook.Initialize(objContext);
        
    let objTextResource = props.Resource.Text;

    const GetContent = () => {
        return (
            <React.Fragment>
                <div id="MainClientConfiguration" className="tabcontent subject-management">
                    <div className="title">
                        {Localization.TextFormatter(objTextResource, 'MainClientConfiguration')}
                    </div>

                    <div className="col col-1">
                        <div className="col-item">
                            <div className="row-left">
                                <span>{Localization.TextFormatter(objTextResource, 'MainClientConfigurationName')}</span>
                            </div>
                            <div className="row-right">
                                <input
                                    autoFocus
                                    className="text-input"
                                    onFocus={(e => { objContext.AddEditMainClientConfiguration_ModuleProcessor.ValidateFocus(objContext, 'vMainClientConfigurationName'); })}
                                    id="vMainClientConfigurationName"
                                    type="text"
                                    onChange={(e) => {
                                        objContext.AddEditMainClientConfiguration_ModuleProcessor.HandleChange("vMainClientConfigurationName", e.target.value, objContext);
                                    }}
                                    onKeyDown={(e) => objContext.AddEditMainClientConfiguration_ModuleProcessor.HandleEnterKeyDown(e, objContext.AddEditMainClientConfiguration_ModuleProcessor, objContext)}
                                    value={state.objData["vMainClientConfigurationName"]}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="col col-1">
                        <div className="col-item">
                            <div className="row-left">
                                <span>{Localization.TextFormatter(objTextResource, 'BasePhysicalPath')}</span>
                            </div>
                            <div className="row-right">
                                <input
                                    className="text-input"
                                    onFocus={(e => { objContext.AddEditMainClientConfiguration_ModuleProcessor.ValidateFocus(objContext, 'vBasePhysicalPath'); })}
                                    id="vBasePhysicalPath"
                                    type="text"
                                    onChange={(e) => {
                                        objContext.AddEditMainClientConfiguration_ModuleProcessor.HandleChange("vBasePhysicalPath", e.target.value, objContext);
                                    }}
                                    onKeyDown={(e) => objContext.AddEditMainClientConfiguration_ModuleProcessor.HandleEnterKeyDown(e, objContext.AddEditMainClientConfiguration_ModuleProcessor, objContext)}
                                    value={state.objData["vBasePhysicalPath"]}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="col col-1">
                        <div className="col-item">
                            <div className="row-left">
                                <span>{Localization.TextFormatter(objTextResource, 'PhysicalDataPath')}</span>
                            </div>
                            <div className="row-right">
                                <input
                                    className="text-input"
                                    onFocus={(e => { objContext.AddEditMainClientConfiguration_ModuleProcessor.ValidateFocus(objContext, 'vPhysicalDataPath'); })}
                                    id="vPhysicalDataPath"
                                    type="text"
                                    onChange={(e) => {
                                        objContext.AddEditMainClientConfiguration_ModuleProcessor.HandleChange("vPhysicalDataPath", e.target.value, objContext);
                                    }}
                                    onKeyDown={(e) => objContext.AddEditMainClientConfiguration_ModuleProcessor.HandleEnterKeyDown(e, objContext.AddEditMainClientConfiguration_ModuleProcessor, objContext)}
                                    value={state.objData["vPhysicalDataPath"]}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="col col-1">
                        <div className="col-item">
                            <div className="row-left">
                                <span>{Localization.TextFormatter(objTextResource, 'PhysicalFileStreamingPath')}</span>
                            </div>
                            <div className="row-right">
                                <input
                                    className="text-input"
                                    onFocus={(e => { objContext.AddEditMainClientConfiguration_ModuleProcessor.ValidateFocus(objContext, 'vPhysicalFileStreamingPath'); })}
                                    id="vPhysicalFileStreamingPath"
                                    type="text"
                                    onChange={(e) => {
                                        objContext.AddEditMainClientConfiguration_ModuleProcessor.HandleChange("vPhysicalFileStreamingPath", e.target.value, objContext);
                                    }}
                                    onKeyDown={(e) => objContext.AddEditMainClientConfiguration_ModuleProcessor.HandleEnterKeyDown(e, objContext.AddEditMainClientConfiguration_ModuleProcessor, objContext)}
                                    value={state.objData["vPhysicalFileStreamingPath"]}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="col col-1">
                        <div className="col-item">
                            <div className="row-left">
                                <span>{Localization.TextFormatter(objTextResource, 'ApplicationCachingProvider')}</span>
                            </div>
                            <div className="row-right">
                                <input
                                    className="text-input"
                                    onFocus={(e => { objContext.AddEditMainClientConfiguration_ModuleProcessor.ValidateFocus(objContext, 'vApplicationCachingProvider'); })}
                                    id="vApplicationCachingProvider"
                                    type="text"
                                    onChange={(e) => {
                                        objContext.AddEditMainClientConfiguration_ModuleProcessor.HandleChange("vApplicationCachingProvider", e.target.value, objContext);
                                    }}
                                    onKeyDown={(e) => objContext.AddEditMainClientConfiguration_ModuleProcessor.HandleEnterKeyDown(e, objContext.AddEditMainClientConfiguration_ModuleProcessor, objContext)}
                                    value={state.objData["vApplicationCachingProvider"]}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="col col-1">
                        <div className="col-item">
                            <div className="row-left">
                                <span>{Localization.TextFormatter(objTextResource, 'CryptographyProvider')}</span>
                            </div>
                            <div className="row-right">
                                <input
                                    className="text-input"
                                    onFocus={(e => { objContext.AddEditMainClientConfiguration_ModuleProcessor.ValidateFocus(objContext, 'vCryptographyProvider'); })}
                                    id="vCryptographyProvider"
                                    type="text"
                                    onChange={(e) => {
                                        objContext.AddEditMainClientConfiguration_ModuleProcessor.HandleChange("vCryptographyProvider", e.target.value, objContext);
                                    }}
                                    onKeyDown={(e) => objContext.AddEditMainClientConfiguration_ModuleProcessor.HandleEnterKeyDown(e, objContext.AddEditMainClientConfiguration_ModuleProcessor, objContext)}
                                    value={state.objData["vCryptographyProvider"]}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="col col-1">
                        <div className="col-item">
                            <div className="row-left">
                                <span>{Localization.TextFormatter(objTextResource, 'ApplicationCacheObjectResetInMinutes')}</span>
                            </div>
                            <div className="row-right">
                                <input
                                    className="text-input"
                                    onFocus={(e => { objContext.AddEditMainClientConfiguration_ModuleProcessor.ValidateFocus(objContext, 'iApplicationCacheObjectResetInMinutes'); })}
                                    id="iApplicationCacheObjectResetInMinutes"
                                    type="text"
                                    onChange={(e) => {
                                        objContext.AddEditMainClientConfiguration_ModuleProcessor.HandleChange("iApplicationCacheObjectResetInMinutes", e.target.value, objContext);
                                    }}
                                    onKeyDown={(e) => objContext.AddEditMainClientConfiguration_ModuleProcessor.HandleEnterKeyDown(e, objContext.AddEditMainClientConfiguration_ModuleProcessor, objContext)}
                                    value={state.objData["iApplicationCacheObjectResetInMinutes"]}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="col col-1">
                        <div className="col-item">
                            <div className="row-left">
                                <span>{Localization.TextFormatter(objTextResource, 'ExtranetConnectionString')}</span>
                            </div>
                            <div className="row-right">
                                <input
                                    className="text-input"
                                    onFocus={(e => { objContext.AddEditMainClientConfiguration_ModuleProcessor.ValidateFocus(objContext, 'vExtranetConnectionString'); })}
                                    id="vExtranetConnectionString"
                                    type="text"
                                    onChange={(e) => {
                                        objContext.AddEditMainClientConfiguration_ModuleProcessor.HandleChange("vExtranetConnectionString", e.target.value, objContext);
                                    }}
                                    onKeyDown={(e) => objContext.AddEditMainClientConfiguration_ModuleProcessor.HandleEnterKeyDown(e, objContext.AddEditMainClientConfiguration_ModuleProcessor, objContext)}
                                    value={state.objData["vExtranetConnectionString"]}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="col col-1">
                        <div className="col-item">
                            <div className="row-left">
                                <span>{Localization.TextFormatter(objTextResource, 'IntranetConnectionString')}</span>
                            </div>
                            <div className="row-right">
                                <input
                                    className="text-input"
                                    onFocus={(e => { objContext.AddEditMainClientConfiguration_ModuleProcessor.ValidateFocus(objContext, 'vIntranetConnectionString'); })}
                                    id="vIntranetConnectionString"
                                    type="text"
                                    onChange={(e) => {
                                        objContext.AddEditMainClientConfiguration_ModuleProcessor.HandleChange("vIntranetConnectionString", e.target.value, objContext);
                                    }}
                                    onKeyDown={(e) => objContext.AddEditMainClientConfiguration_ModuleProcessor.HandleEnterKeyDown(e, objContext.AddEditMainClientConfiguration_ModuleProcessor, objContext)}
                                    value={state.objData["vIntranetConnectionString"]}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="col col-1">
                        <div className="col-item">
                            <div className="row-left">
                                <span>{Localization.TextFormatter(objTextResource, 'ExtranetDatabaseName')}</span>
                            </div>
                            <div className="row-right">
                                <input
                                    className="text-input"
                                    onFocus={(e => { objContext.AddEditMainClientConfiguration_ModuleProcessor.ValidateFocus(objContext, 'vExtranetDatabaseName'); })}
                                    id="vExtranetDatabaseName"
                                    type="text"
                                    onChange={(e) => {
                                        objContext.AddEditMainClientConfiguration_ModuleProcessor.HandleChange("vExtranetDatabaseName", e.target.value, objContext);
                                    }}
                                    onKeyDown={(e) => objContext.AddEditMainClientConfiguration_ModuleProcessor.HandleEnterKeyDown(e, objContext.AddEditMainClientConfiguration_ModuleProcessor, objContext)}
                                    value={state.objData["vExtranetDatabaseName"]}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="col col-1">
                        <div className="col-item">
                            <div className="row-left">
                                <span>{Localization.TextFormatter(objTextResource, 'IntranetDatabaseName')}</span>
                            </div>
                            <div className="row-right">
                                <input
                                    className="text-input"
                                    onFocus={(e => { objContext.AddEditMainClientConfiguration_ModuleProcessor.ValidateFocus(objContext, 'vIntranetDatabaseName'); })}
                                    id="vIntranetDatabaseName"
                                    type="text"
                                    onChange={(e) => {
                                        objContext.AddEditMainClientConfiguration_ModuleProcessor.HandleChange("vIntranetDatabaseName", e.target.value, objContext);
                                    }}
                                    onKeyDown={(e) => objContext.AddEditMainClientConfiguration_ModuleProcessor.HandleEnterKeyDown(e, objContext.AddEditMainClientConfiguration_ModuleProcessor, objContext)}
                                    value={state.objData["vIntranetDatabaseName"]}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="col col-1">
                        <div className="col-item">
                            <div className="row-left">
                                <span>{Localization.TextFormatter(objTextResource, 'FrameworkServicesDatabaseName')}</span>
                            </div>
                            <div className="row-right">
                                <input
                                    className="text-input"
                                    onFocus={(e => { objContext.AddEditMainClientConfiguration_ModuleProcessor.ValidateFocus(objContext, 'vFrameworkServicesDatabaseName'); })}
                                    id="vFrameworkServicesDatabaseName"
                                    type="text"
                                    onChange={(e) => {
                                        objContext.AddEditMainClientConfiguration_ModuleProcessor.HandleChange("vFrameworkServicesDatabaseName", e.target.value, objContext);
                                    }}
                                    onKeyDown={(e) => objContext.AddEditMainClientConfiguration_ModuleProcessor.HandleEnterKeyDown(e, objContext.AddEditMainClientConfiguration_ModuleProcessor, objContext)}
                                    value={state.objData["vFrameworkServicesDatabaseName"]}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="col col-1">
                        <div className="col-item">
                            <div className="row-left">
                                <span>{Localization.TextFormatter(objTextResource, 'FileHandlerProvider')}</span>
                            </div>
                            <div className="row-right">
                                <input
                                    className="text-input"
                                    onFocus={(e => { objContext.AddEditMainClientConfiguration_ModuleProcessor.ValidateFocus(objContext, 'vFileHandlerProvider'); })}
                                    id="vFileHandlerProvider"
                                    type="text"
                                    onChange={(e) => {
                                        objContext.AddEditMainClientConfiguration_ModuleProcessor.HandleChange("vFileHandlerProvider", e.target.value, objContext);
                                    }}
                                    onKeyDown={(e) => objContext.AddEditMainClientConfiguration_ModuleProcessor.HandleEnterKeyDown(e, objContext.AddEditMainClientConfiguration_ModuleProcessor, objContext)}
                                    value={state.objData["vFileHandlerProvider"]}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="col col-1">
                        <div className="col-item">
                            <div className="row-left">
                                <span>{Localization.TextFormatter(objTextResource, 'TemplateResourcePath')}</span>
                            </div>
                            <div className="row-right">
                                <input
                                    className="text-input"
                                    onFocus={(e => { objContext.AddEditMainClientConfiguration_ModuleProcessor.ValidateFocus(objContext, 'vTemplateResourcePath'); })}
                                    id="vTemplateResourcePath"
                                    type="text"
                                    onChange={(e) => {
                                        objContext.AddEditMainClientConfiguration_ModuleProcessor.HandleChange("vTemplateResourcePath", e.target.value, objContext);
                                    }}
                                    onKeyDown={(e) => objContext.AddEditMainClientConfiguration_ModuleProcessor.HandleEnterKeyDown(e, objContext.AddEditMainClientConfiguration_ModuleProcessor, objContext)}
                                    value={state.objData["vTemplateResourcePath"]}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="col col-1">
                        <div className="col-item">
                            <div className="row-left">
                                <span>{Localization.TextFormatter(objTextResource, 'ProductManagementDatabaseName')}</span>
                            </div>
                            <div className="row-right">
                                <input
                                    onFocus={(e => { objContext.AddEditMainClientConfiguration_ModuleProcessor.ValidateFocus(objContext, 'vProductManagementDatabaseName'); })}
                                    className="text-input"
                                    id="vProductManagementDatabaseName"
                                    type="text"
                                    onChange={(e) => {
                                        objContext.AddEditMainClientConfiguration_ModuleProcessor.HandleChange("vProductManagementDatabaseName", e.target.value, objContext);
                                    }}
                                    onKeyDown={(e) => objContext.AddEditMainClientConfiguration_ModuleProcessor.HandleEnterKeyDown(e, objContext.AddEditMainClientConfiguration_ModuleProcessor, objContext)}
                                    value={state.objData["vProductManagementDatabaseName"]}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="col col-1">
                        <div className="col-item">
                            <div className="row-left">
                                <span>{Localization.TextFormatter(objTextResource, 'ProductManagementConnectionString')}</span>
                            </div>
                            <div className="row-right">
                                <input
                                    onFocus={(e => { objContext.AddEditMainClientConfiguration_ModuleProcessor.ValidateFocus(objContext, 'vProductManagementConnectionString'); })}
                                    className="text-input"
                                    id="vProductManagementConnectionString"
                                    type="text"
                                    onChange={(e) => {
                                        objContext.AddEditMainClientConfiguration_ModuleProcessor.HandleChange("vProductManagementConnectionString", e.target.value, objContext);
                                    }}
                                    onKeyDown={(e) => objContext.AddEditMainClientConfiguration_ModuleProcessor.HandleEnterKeyDown(e, objContext.AddEditMainClientConfiguration_ModuleProcessor, objContext)}
                                    value={state.objData["vProductManagementConnectionString"]}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div id="ValidationError" />
            </React.Fragment>
        );
    }

    return state.objData ? GetContent() : <React.Fragment />;
};

export default AddEditMainClientConfiguration;
