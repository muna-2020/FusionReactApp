// React related impoprts.
import React, { useReducer } from 'react';
import { connect } from "react-redux";

//Base classes.
import * as Base_Hook from '@shared/Framework/BaseClass/Base_Hook';

//Module Related files
import * as Animation_Sample_WithoutImage_Hook from '@shared/SupportApplication/Demo/Modules/Framework/Controls/Animation_Sample/Animation_Sample_WithoutImage/Animation_Sample_WithoutImage_Hook';
import Animation_Sample_WithoutImage_ModuleProcessor from '@shared/SupportApplication/Demo/Modules/Framework/Controls/Animation_Sample/Animation_Sample_WithoutImage/Animation_Sample_WithoutImage_ModuleProcessor';
import Animation from '@root/Framework/Controls/Animation/Animation';

/**
 * @name [state,dispatch]
 * @summary Animiation sample for Animation Loading.
 * @returns {[]} state and dispatch
 */
const Animation_Sample_WithoutImage = props => {

    /**
     * @name [state,dispatch]
     * @summary Define state and dispatch for the reducer to set state.
     * @returns {[]} state and dspatch
     */
    const [state, dispatch] = useReducer(Base_Hook.Reducer, Animation_Sample_WithoutImage_Hook.GetInitialState());

    /**
     * @name objContext
     * @summary Groups state.dispatch and module object(s) in objContext.
     * @returns {object} objContext
     */
    let objContext = { state, props, dispatch, ["Animation_Sample_WithoutImage_ModuleProcessor"]: new Animation_Sample_WithoutImage_ModuleProcessor() };

    /**
     * @name useDataLoaded
     * @param {object} objContext context object
     * @summary Makes showAnimation false in store.
     * @returns null
     */
    Animation_Sample_WithoutImage_Hook.useDataLoaded();

    /**
     * @name StartToggleAnimation
     * @summary setting time interval for toggleAnimation
     */
    const StartToggleAnimation = () => setInterval(objContext.Animation_Sample_WithoutImage_ModuleProcessor.MyTimer(objContext),1000);

    return <React.Fragment> <Animation JConfiguration={props.JConfiguration}
        Resource={{ "ImagePath": props.JConfiguration.IntranetSkinPath + '/Images/Common/JNavigation/Preloader_Module.gif' }}
        Meta={{ "ShowAnimationImage": false }}
        Id="SampleAnimationId" />
        <p>This Component will not show animation on button Click but make Screen blur.</p>
        <button onClick={StartToggleAnimation}>Start Toggle Animation</button>
    </React.Fragment>

};

export default connect(Base_Hook.MapStoreToProps([{ StoreKey: "ApplicationState", DataKey: "blnShowAnimation" }]))(Animation_Sample_WithoutImage);