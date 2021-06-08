// React related imports.
import React, { useReducer } from 'react';
import { connect } from 'react-redux';

//Base classes.
import * as Base_Hook from '@shared/Framework/BaseClass/Base_Hook';

//Module realted fies.
import MultiSelectDropDown from '@root/Framework/Controls/Dropdowns/MultiSelectDropDown/MultiSelectDropDown';
import MultiSelectDropDown_Sample_ModuleProcessor from '@shared/SupportApplication/Demo/Modules/Framework/Controls/Dropdowns/MultiSelectDropDown_Sample/MultiSelectDropDown_Sample_ModuleProcessor';
import * as MultiSelectDropDown_Sample_Hook from '@shared/SupportApplication/Demo/Modules/Framework/Controls/Dropdowns/MultiSelectDropDown_Sample/MultiSelectDropDown_Sample_Hook';

/**
* @name MultiSelectDropDown_Sample
* @param {object} props props
* @summary This component displays the MultiSelectDropDown_Sample.
* @returns {object} React.Fragement that encapsulated the MultiSelectDropDown_Sample.
*/
const MultiSelectDropDown_Sample = props => {

    /**
    * @name [state,dispatch]
    * @summary Define state and dispatch for the reducer to set state.
    * @returns {[]} state and dspatch
   */
    const [state, dispatch] = useReducer(Base_Hook.Reducer, MultiSelectDropDown_Sample_Hook.GetInitialState());

    /**
     * @name objContext
     * @summary Groups state.dispatch and module object(s) in objContext.
     * @returns {object} objContext
    */
    let objContext = { state, props, dispatch, ["MultiSelectDropDown_Sample_ModuleProcessor"]: new MultiSelectDropDown_Sample_ModuleProcessor() };

    /**
     * @name Initialize
     * @param {object} objContext context object
     * @summary Makes showAnimation false in store.
     * @returns null
     */
    MultiSelectDropDown_Sample_Hook.Initalize(objContext);

    return (
        <React.Fragment>
            <MultiSelectDropDown
                Meta={props.Meta}
                Data={props.Data}
                Resource={props.Resource}
                Events={objContext.MultiSelectDropDown_Sample_ModuleProcessor.GetEvents()}
                CallBacks={objContext.MultiSelectDropDown_Sample_ModuleProcessor.GetCallbacks()}
                ParentProps={{ ...props }}
            />
        </React.Fragment>
    );
};

export default connect(MultiSelectDropDown_Sample_ModuleProcessor.GetStoreData())(MultiSelectDropDown_Sample);