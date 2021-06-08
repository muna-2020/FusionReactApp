//React imports.
import React, { useReducer } from "react";
import { connect } from "react-redux";

//Module specific imports.
import MoveResults_ModuleProcessor from '@shared/Application/d.Extranet/3_Teacher/PC/Modules/TestResults/MoveResults/MoveResults_ModuleProcessor'
import * as MoveResults_Hook from '@shared/Application/d.Extranet/3_Teacher/PC/Modules/TestResults/MoveResults/MoveResults_Hook';

//controls.
import AutoCompleteDropdown from '@root/Framework/Controls/Dropdowns/AutoCompleteDropdown/AutoCompleteDropdown';

//Inline Images import
import CloseImage from '@inlineimage/Application/d.Extranet/5_Shared/PC/close.svg?inline';

const MoveResults = props => {

    /**
    * @name Reduce Initializer.
    * @summary Provides satate and dispatch.
    */
    const [state, dispatch] = useReducer(ExtranetBase_Hook.Reducer, MoveResults_Hook.GetInitialState());

    /**
     * @name objContext
     * @summary Combines state, props, dispatch and module object to one object, and sent as a parameter to funtions in business logic.
     */
    let objContext = { state, props, dispatch, ["MoveResults_ModuleProcessor"]: new MoveResults_ModuleProcessor() };

    /**
     * @name HookInitializer.
     * @summary Initializes the all hooks.
     */
    MoveResults_Hook.Initialize(objContext);

    /**
    * @name  Initialize
    * @param {object} props Props
    * @param {object} ModuleProcessor Props
    * @summary Initializing  DynamicStyles and DataForSSR
    * @returns Setting ApplicationState
    */
    objContext.MoveResults_ModuleProcessor.Initialize(objContext, objContext.MoveResults_ModuleProcessor);

    /**
     * @name GetContent
     * @summary returns the JSX for component.
     * */
    let GetContent = () => {

        //let { objTextResource, strCycleId, objTestResult } = props.Data;
        let objTextResource = props.Resource.Text;
        let strCycleId = props.Data.strCycleId;
        let objTestResult = props.Data.objTestResult;
        return (
            <div className="move-results-popup">
                <div className="move-results-popup-container">
                    <div className="mover-results-head">
                        <h3>{Localization.TextFormatter(objTextResource, 'MoveResults')}</h3>
                        <span
                            className="close"
                            onClick={e => Popup.ClosePopup(props.Id)}
                        >
                            {Localization.TextFormatter(objTextResource, 'Shutdown')}
                            <img src={CloseImage} />
                        </span>
                    </div>
                    <p>
                        {Localization.TextFormatter(objTextResource, 'InstructionMessage')}
                    </p>

                    <div className="move-results-flex">
                        <div className="move-results">
                            <div className="input-block">
                                <span>{Localization.TextFormatter(objTextResource, 'Execution')}:</span>
                                <AutoCompleteDropdown
                                    Id="Execution"
                                    Data={objContext.MoveResults_ModuleProcessor.GetCycleAutoCompleteData(objContext)}
                                    Meta={objContext.MoveResults_ModuleProcessor.GetCycleAutoCompleteMeta(objContext)}
                                    Events={{ OnChangeEventHandler: (objItem) => { objContext.MoveResults_ModuleProcessor.OnChangeCycleAutoSuggest(objContext, objItem) } }}
                                />

                            </div>
                            <div className="input-block">
                                <span>{Localization.TextFormatter(objTextResource, 'School')}:</span>
                                <AutoCompleteDropdown
                                    Id="School"
                                    Data={objContext.MoveResults_ModuleProcessor.GetSchoolAutoCompleteData(objContext)}
                                    Meta={objContext.MoveResults_ModuleProcessor.GetSchoolAutoCompleteMeta(objContext)}
                                    Events={{ OnChangeEventHandler: (objItem) => { objContext.MoveResults_ModuleProcessor.OnChangeSchoolAutoSuggest(objContext, objItem) } }}
                                />
                            </div>
                            <div className="input-block">
                                <span>{Localization.TextFormatter(objTextResource, 'ClassLabel')}</span>
                                <AutoCompleteDropdown
                                    Id="Class"
                                    Data={objContext.MoveResults_ModuleProcessor.GetClassAutoCompleteData(objContext)}
                                    Meta={objContext.MoveResults_ModuleProcessor.GetClassAutoCompleteMeta(objContext)}
                                    Events={{ OnChangeEventHandler: (objItem) => { objContext.MoveResults_ModuleProcessor.OnChangeClassAutoSuggest(objContext, objItem) } }}
                                />
                            </div>
                        </div>
                        <div className="move-results">
                            <div className="input-block">
                                <span>{Localization.TextFormatter(objTextResource, 'OrganizationalUnit')}:</span>
                                <AutoCompleteDropdown
                                    Id="OrganizationalUnit"
                                    Data={objContext.MoveResults_ModuleProcessor.GetStateAutoCompleteData(objContext)}
                                    Meta={objContext.MoveResults_ModuleProcessor.GetStateAutoCompleteMeta(objContext)}
                                    Events={{ OnChangeEventHandler: (objItem) => { objContext.MoveResults_ModuleProcessor.OnChangeStateAutoSuggest(objContext, objItem) } }}
                                />
                            </div>
                            <div className="input-block">
                                <span>{Localization.TextFormatter(objTextResource, 'Teacher')}:</span>
                                <AutoCompleteDropdown
                                    Id="Teacher"
                                    Data={objContext.MoveResults_ModuleProcessor.GetTeacherAutoCompleteData(objContext)}
                                    Meta={objContext.MoveResults_ModuleProcessor.GetTeacherAutoCompleteMeta(objContext)}
                                    Events={{ OnChangeEventHandler: (objItem) => { objContext.MoveResults_ModuleProcessor.OnChangeTeacherAutoSuggest(objContext, objItem) } }}
                                />
                            </div>
                            <div className="input-block">
                                <span>{Localization.TextFormatter(objTextResource, 'Learners')}:</span>
                                <AutoCompleteDropdown
                                    Id="Learners"
                                    Data={objContext.MoveResults_ModuleProcessor.GetPupilAutoCompleteData(objContext)}
                                    Meta={objContext.MoveResults_ModuleProcessor.GetPupilAutoCompleteMeta(objContext)}
                                    Events={{ OnChangeEventHandler: (objItem) => { objContext.MoveResults_ModuleProcessor.OnChangePupilAutoSuggest(objContext, objItem) } }}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="move-popup-footer">
                        <button className="button blue-button" onClick={() => { objContext.MoveResults_ModuleProcessor.MoveResults(objContext, objTestResult) }}>{Localization.TextFormatter(objTextResource, 'MoveResults')}</button>
                    </div>
                </div>
            </div>
        );
    }

    return state.isLoadComplete ? GetContent() : ''
};


/**
 * @name Connector
 * @summary connects component to store.
 */
export default connect(ExtranetBase_Hook.MapStoreToProps(MoveResults_ModuleProcessor.StoreMapList()))(MoveResults);

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = MoveResults_ModuleProcessor; 