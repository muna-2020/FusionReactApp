// React related imports.
import React, { useReducer } from 'react';
import { connect } from 'react-redux';

//Base classes.
import * as Base_Hook from '@shared/Framework/BaseClass/Base_Hook';

//Module realted fies.
import ProgressBar from '@root/Framework/Controls/ProgressBar/ProgressBar';
import ProgressBar_Sample_ModuleProcessor from '@shared/SupportApplication/Demo/Modules/Framework/Controls/ProgressBar_Sample/ProgressBar_Sample_ModuleProcessor';
import * as ProgressBar_Sample_Hook from '@shared/SupportApplication/Demo/Modules/Framework/Controls/ProgressBar_Sample/ProgressBar_Sample_Hook';

/**
* @name ProgressBar_Sample
* @param {object} props props
* @summary This component displays the ProgressBar_Sample.
* @returns {object} React.Fragement that encapsulated the bar
*/
const ProgressBar_Sample = props => {

    /**
    * @name [state,dispatch]
    * @summary Define state and dispatch for the reducer to set state.
    * @returns {[]} state and dspatch
    */
    const [state, dispatch] = useReducer(Base_Hook.Reducer, ProgressBar_Sample_Hook.GetInitialState());

    /**
    * @name objContext
    * @summary Groups state.dispatch and module object(s) in objContext.
    * @returns {object} objContext
    */
    let objContext = { state, props, dispatch };

    /**
    * @name useDataLoaded
    * @param {object} objContext context object
    * @summary Makes showAnimation false in store.
    * @returns null
    */
    ProgressBar_Sample_Hook.useDataLoaded(objContext);

    /**
     * @name GetContent
     * @summary required jsx for component.
     * */
    function GetContent() {
        return (
            <div>
                <div>This component displays the sample for progress bar.In this sample displays the progress status, (to this component percentage value is passed).</div>
                <ProgressBar
                    Id="ProgressBar_Sample"
                    Data={props.Data} />
            </div>
        );
    }

    return GetContent();
}

/**
* @name DynamicStyles
* @param {object} props props
* @summary Required for css
* @returns {Array} arrStyles
*/
ProgressBar_Sample.DynamicStyles = props => {
    return [
        props.JConfiguration.IntranetSkinPath + "/Css/Framework/ReactJs/PC/Controls/ProgressBar/ProgressBar.css",
    ];
};


export default connect(ProgressBar_Sample_ModuleProcessor.GetStoreData())(ProgressBar_Sample);