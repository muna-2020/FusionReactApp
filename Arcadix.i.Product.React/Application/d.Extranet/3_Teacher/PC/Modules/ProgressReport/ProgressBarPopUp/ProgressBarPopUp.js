import React from 'react';
import { connect } from 'react-redux';

//Module related files.
import * as ProgressBarPopUp_Hook from '@shared/Application/d.Extranet/3_Teacher/PC/Modules/ProgressReport/ProgressBarPopUp/ProgressBarPopUp_Hook';
import ProgressBarPopUp_ModuleProcessor from '@shared/Application/d.Extranet/3_Teacher/PC/Modules/ProgressReport/ProgressBarPopUp/ProgressBarPopUp_ModuleProcessor';


function mapStateToProps(state) {
    return {
        showPopup: state.ApplicationState.showPopUp,
        closePopup: state.ApplicationState.closePopUp
    };
}

const ProgressBarPopUp = (props) => {

    /**
     * @name objContext
     * @summary Groups state, dispatch, module processor, TextResource object in objContext.
     * @returns {object} objContext
     */
    let objContext = { ["ProgressBarPopUp_ModuleProcessor"]: new ProgressBarPopUp_ModuleProcessor() };

    /**
    * @name Initialize
    * @param {object} objContext context object
    * @summary Initialize method call in ProgressBarPopUp_Hook, that contains all the custom hooks.
    * @returns null
    */
    ProgressBarPopUp_Hook.Initialize(objContext);

    return (
        <div className="createpdfpoup-wrapper">
            <div className="createpdfpoup-message">
                <div className="createpdfpoup-header">
                    <span>Heading</span>
                </div>
                <div>
                    <span>Process results as a table.</span>
                </div>
            </div>
            <div className="close-button">
                <span className="button brown-button" onClick={e => props.closePopUp(props.objModal)}>Cancel</span>
                <span className="button brown-button" onClick={() => { props.passedEvents.OnClickProceed(); props.closePopUp(props.objModal); }}>Proceed</span>
            </div>
        </div>
    );
};

export default connect(mapStateToProps)(ProgressBarPopUp);;


/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = ProgressBarPopUp_ModuleProcessor; 