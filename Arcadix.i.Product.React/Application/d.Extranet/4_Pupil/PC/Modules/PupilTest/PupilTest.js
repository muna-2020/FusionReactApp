
import { connect } from 'react-redux';
import React, { useState, useEffect, useReducer, useLayoutEffect, useMutationEffect } from 'react';
import * as PupilTestBusinessLogic from '@shared/Application/d.Extranet/4_Pupil/PC/Modules/PupilTest/PupilTestBusinessLogic';


const PupilTest = (props) => {
    /**
     * @summary Provides satate and dispatch.
     */
    const [state, dispatch] = useReducer(PupilTestBusinessLogic.Reducer, PupilTestBusinessLogic.GetInitialState());

    /**
     * @summary Combines state, props and dispatch to one object, and sent as a parameter to funtions in business logic.
     */
    let objContext = { state, props, dispatch };

    /**
     * @summary Custom hook that makes the request for the data.
     */
    PupilTestBusinessLogic.useDataLoader(objContext);

    /**
     * @summary Custom hook that Checks if the data is loaded to props.
     */
    PupilTestBusinessLogic.useDataLoaded(objContext);

    function GetContent(props) {
        let objData = DataRef(props.pupiltest)["Data"][0];
        return (
            <div className="pupil-test-wrapper">
                <div className="pupil-test-logo">
                    <img src={props.JConfiguration.ExtranetSkinPath + "/Images/Common/Icons/logo.svg"} alt="" />
                </div>
                {/*<button className="button orange-button" onClick={e => props.closePopUp(props.objModal)}> {Localization.TextFormatter(objTextResource, 'Abbrechen') } </button> */}
                <button className="button orange-button" onClick={e => props.closePopUp(props.objModal)}> Abbrechen </button>
                <div className="pupil-test-headertext">
                    <span>{objData.DisplayMessage}</span>
                </div>
                {
                    objData.ShowButton == "Y" ? <a href="javascript:"><button className="button pupil-test-button" onClick={() => { window.open(objData.TestUrl, '_blank'); return false; }}>{objData.ButtonText}</button></a> : ''
                }
            </div>
        );
    }

    return (
        <div>
            {
                props.isLoadComplete || state.isLoadComplete ? GetContent(props) : <div></div>
            }
        </div>
    );
}

PupilTest.DynamicStyles = (props) => {
    var arrStyles = [
        props.JConfiguration.ExtranetSkinPath + "/Css/Application/4_Pupil/ReactJs/PC/Modules/PupilTest/PupilTest.css"

    ];
    return arrStyles;
};

export default connect(PupilTestBusinessLogic.mapStateToProps)(PupilTest);

