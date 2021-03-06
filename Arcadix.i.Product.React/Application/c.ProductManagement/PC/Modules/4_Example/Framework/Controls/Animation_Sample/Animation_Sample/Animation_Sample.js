//React related impoprts.
import React,{ useReducer} from 'react';

//Base classes
import * as Base_Hook from '@shared/Framework/BaseClass/Base_Hook';

//Module Related files
import * as Animation_Sample_Hook from '@shared/Application/c.ProductManagement/Modules/4_Example/Framework/Controls/Animation_Sample/Animation_Sample/Animation_Sample_Hook';
import Animation_Sample_ModuleProcessor from '@shared/Application/c.ProductManagement/Modules/4_Example/Framework/Controls/Animation_Sample/Animation_Sample/Animation_Sample_ModuleProcessor';
import Animation from '@root/Framework/Controls/Animation/Animation';

/**
 * @name [state,dispatch]
 * @summary Animiation sample for Loading Animation
 * @returns {[]} state and dspatch
 */
const Animation_Sample = props => {

    /**
     * @name [state,dispatch]
     * @summary Define state and dispatch for the reducer to set state.
     * @returns {[]} state and dspatch
     */
    const [state, dispatch] = useReducer(Base_Hook.Reducer, Animation_Sample_Hook.GetInitialState());

    /**
     * @name objContext
     * @summary Groups state.dispatch and module object(s) in objContext.
     * @returns {object} objContext
     */
    let objContext = { state, props, dispatch, ["Animation_Sample_ModuleProcessor"]: new Animation_Sample_ModuleProcessor() };

    /**
     * @name useDataLoaded
     * @param {object} objContext context object
     * @summary Makes showAnimation false in store.
     * @returns null
     */
    Animation_Sample_Hook.useDataLoaded();

    /**
     * @name StartToggleAnimation
     * @summary setting time interval for toggleAnimation
     */
    const StartToggleAnimation = () => setInterval(objContext.Animation_Sample_ModuleProcessor.MyTimer(objContext), 1000);

    return <React.Fragment> <Animation 
        Resource={{"ImagePath": props.JConfiguration.IntranetSkinPath + '/Images/Common/JNavigation/Preloader_Module.gif'}}
        Meta={{ "ShowAnimationImage": true }}
        Id="SampleAnimationId" />
        <p>This Component is for showing animation on button Click.</p>
       <button onClick={StartToggleAnimation}>Start Toggle Animation</button>
    </React.Fragment> 

};

export default Animation_Sample;