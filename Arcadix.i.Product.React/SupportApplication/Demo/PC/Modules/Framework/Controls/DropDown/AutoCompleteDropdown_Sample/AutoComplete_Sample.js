// React related imports.
import React, { useReducer } from 'react';
import { connect } from 'react-redux';

//Base classes.
import * as Base_Hook from '@shared/Framework/BaseClass/Base_Hook';

//Module realted fies.
import AutoComplete from '@root/Framework/Controls/Dropdowns/AutoComplete/AutoComplete';
import AutoComplete_Sample_ModuleProcessor from '@shared/SupportApplication/Demo/Modules/Framework/Controls/Dropdowns/AutoComplete_Sample/AutoComplete_Sample_ModuleProcessor';
import * as AutoComplete_Sample_Hook from '@shared/SupportApplication/Demo/Modules/Framework/Controls/Dropdowns/AutoComplete_Sample/AutoComplete_Sample_Hook';

/**
* @name AutoComplete_Sample
* @param {object} props props
* @summary This component displays the AutoComplete_Sample.
* @returns {object} React.Fragement that encapsulated the display grid with AutoComplete_Sample.
*/
const AutoComplete_Sample = props => {

    /**
   * @name [state,dispatch]
   * @summary Define state and dispatch for the reducer to set state.
   * @returns {[]} state and dspatch
   */
    const [state, dispatch] = useReducer(Base_Hook.Reducer, AutoComplete_Sample_Hook.GetInitialState());

    /**
    * @name objContext
    * @summary Groups state.dispatch and module object(s) in objContext.
    * @returns {object} objContext
    */
    let objContext = { state, props, dispatch, ["AutoComplete_Sample_ModuleProcessor"]: new AutoComplete_Sample_ModuleProcessor() };

    /**
    * @name useDataLoaded
    * @param {object} objContext context object
    * @summary Makes showAnimation false in store.
    * @returns null
    */
    AutoComplete_Sample_Hook.useDataLoaded(objContext);

    let Events = {
        OnChangeEventHandler: (props) => { console.log("testing event is firing...........", props) }
    }

    return (
        <AutoComplete
            Meta={props.Meta}
            Data={props.Data}
            Events={Events}
        />
    );
}

export default connect(AutoComplete_Sample_ModuleProcessor.GetStoreData())(AutoComplete_Sample);