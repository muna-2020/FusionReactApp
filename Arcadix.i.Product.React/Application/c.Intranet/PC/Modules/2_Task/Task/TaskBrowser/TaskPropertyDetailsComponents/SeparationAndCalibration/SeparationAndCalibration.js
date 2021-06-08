//React related imports...
import React, { useReducer } from "react";
import { connect } from 'react-redux';

//Base classes...
import * as IntranetBase_Hook from '@shared/Framework/BaseClass/IntranetBaseClass/IntranetBase_Hook';

//Module related files...
import * as SeparationAndCalibration_Hook from '@shared/Application/c.Intranet/Modules/2_Task/Task/TaskBrowser/TaskPropertyDetailsComponents/SeparationAndCalibration/SeparationAndCalibration_Hook';
import SeparationAndCalibration_ModuleProcessor from '@shared/Application/c.Intranet/Modules/2_Task/Task/TaskBrowser/TaskPropertyDetailsComponents/SeparationAndCalibration/SeparationAndCalibration_ModuleProcessor';

/**
 * @name SeparationAndCalibration
 * @param {object} props props
 * @summary This component is used for SeparationAndCalibration in TaskPropertyDetails.
 * @returns {object} React.Fragement that contains the content to be added in TaskPropertyDetails.
 */
const SeparationAndCalibration = props => {

    /**
     * @name [state,dispatch]
     * @summary Define state and dispatch for the reducer to set state.
     * @returns {[]} state and dispatch
     */
    const [state, dispatch] = useReducer(IntranetBase_Hook.Reducer, SeparationAndCalibration_Hook.GetInitialState(props));

    /**
     * @name objContext
     * @summary Groups state.dispatch and module object(s) in objContext.
     * @returns {object} objContext
     */
    let objContext = { state, props, dispatch, ["ModuleName"]: "SeparationAndCalibration", ["SeparationAndCalibration_ModuleProcessor"]: new SeparationAndCalibration_ModuleProcessor() };

    /**
     * @name Initialize
     * @param {object} objContext context object
     * @summary Initialize method call to load the custom hooks.
     * @returns null
     */
    SeparationAndCalibration_Hook.Initialize(objContext);

        /**
    * @name  InitializeSSR
    * @param {object} objContext context object
    * @summary Initializing API and DynamicStyles
    * @returns Setting ApplicationState
    */
    objContext.SeparationAndCalibration_ModuleProcessor.Initialize(objContext, objContext.SeparationAndCalibration_ModuleProcessor);

    let objTextResource = props.Resource.Text;

    /**
     * @name GetSeparationAndCalibrationDetails
     * @summary Forms the whole jsx required for each SeparationAndCalibrationDetails.
     * @returns {object} jsx, React.Fragment
     */
    const GetSeparationAndCalibrationDetails = (objSeparationAndCalibration) => {
        return <React.Fragment>
                <h3>{Localization.TextFormatter(objTextResource, 'FeaturesAdaptive') + "(" + objSeparationAndCalibration.GroupName +")" + ":"}</h3>
            {objSeparationAndCalibration["NotAssigned"] ?
                <table>
                    <tr>{Localization.TextFormatter(objTextResource, 'NotAssigned')}</tr>
                </table>
                :
                <React.Fragment>
                    <table>
                        <tr><td>{Localization.TextFormatter(objTextResource, 'AdaptiveStatus')}</td><td>{objSeparationAndCalibration.InputStatusName}</td></tr>
                        <tr><td>{Localization.TextFormatter(objTextResource, 'IsSeparated')}</td><td>{objSeparationAndCalibration.cIsSeparated == "Y" ? Localization.TextFormatter(objTextResource, "Yes") : Localization.TextFormatter(objTextResource, "No")}</td></tr>
                        <tr><td>{Localization.TextFormatter(objTextResource, 'Discrimination')}</td><td>{objSeparationAndCalibration.dDiscrimination ? objSeparationAndCalibration.dDiscrimination : "-" }</td></tr>
                        <tr><td>{Localization.TextFormatter(objTextResource, 'Calibrated')}</td><td>{objSeparationAndCalibration.cIsCalibrationComplete == "Y" ? Localization.TextFormatter(objTextResource, "Yes") : Localization.TextFormatter(objTextResource, "No")}</td></tr>
                        <tr><td>{Localization.TextFormatter(objTextResource, 'CalibratedDifficulty')}</td><td>{objSeparationAndCalibration.dCalibratedDifficulty ? objSeparationAndCalibration.dCalibratedDifficulty : "-"}</td></tr>
                    </table>

                    <h3>Separation/Calibration Data</h3>
                    <table>
                        <tr><td style={{ color: "red" }}>Yet to be Implemented</td></tr>
                    </table>
                </React.Fragment>
                }
                
        </React.Fragment>
    }

    /**
     * @name GetContent
     * @summary Forms the whole jsx required for the component.
     * @returns {object} jsx, React.Fragment
     */
    const GetContent = () => {
        let arrSeparationAndCalibrationTaskDetails = objContext.SeparationAndCalibration_ModuleProcessor.SeparationAndCalibrationTaskDetails(props.SelectedRow, objContext);
        return <React.Fragment>
            {arrSeparationAndCalibrationTaskDetails.length > 0 ? arrSeparationAndCalibrationTaskDetails.map(objData => { return GetSeparationAndCalibrationDetails(objData) }) : <div/>}
        </React.Fragment>
    }
    
    return props.isLoadComplete || state.isLoadComplete ? GetContent() : <React.Fragment/>
};

export default connect(IntranetBase_Hook.MapStoreToProps(SeparationAndCalibration_ModuleProcessor.StoreMapList()))(SeparationAndCalibration);