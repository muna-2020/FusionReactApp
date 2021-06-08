// React related imports.
import React, { useReducer } from 'react';
import { connect } from 'react-redux';

//Base classes.
import * as Base_Hook from '@shared/Framework/BaseClass/Base_Hook';

//Module realted fies.
import AutoComplete from '@root/Framework/Controls/Dropdowns/AutoComplete/AutoComplete';
import AutoComplete_ModuleProcessor from '@shared/Application/c.ProductManagement/Modules/4_Example/Framework/Controls/Dropdowns/AutoComplete/AutoComplete_ModuleProcessor';
import * as AutoComplete_Hook from '@shared/Application/c.ProductManagement/Modules/4_Example/Framework/Controls/Dropdowns/AutoComplete/AutoComplete_Hook';

/**
* @name AutoComplete
* @param {object} props props
* @summary This component displays the AutoComplete.
* @returns {object} React.Fragement that encapsulated the display grid with AutoComplete.
*/
const AutoComplete = props => {

    /**
   * @name [state,dispatch]
   * @summary Define state and dispatch for the reducer to set state.
   * @returns {[]} state and dspatch
   */
    const [state, dispatch] = useReducer(Base_Hook.Reducer, AutoComplete_Hook.GetInitialState());

    /**
    * @name objContext
    * @summary Groups state.dispatch and module object(s) in objContext.
    * @returns {object} objContext
    */
    let objContext = { state, props, dispatch, ["AutoComplete_ModuleProcessor"]: new AutoComplete_ModuleProcessor() };

    /**
    * @name useDataLoaded
    * @param {object} objContext context object
    * @summary Makes showAnimation false in store.
    * @returns null
    */
    AutoComplete_Hook.useDataLoaded(objContext);

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

export default connect(AutoComplete_ModuleProcessor.GetStoreData())(AutoComplete);