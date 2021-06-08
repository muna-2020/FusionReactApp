// React related imports.
import React, { useReducer } from 'react';
import { connect } from 'react-redux';

//Base classes.
import * as Base_Hook from '@shared/Framework/BaseClass/Base_Hook';

//Module realted fies.
import AutoCompleteDropdown from '@root/Framework/Controls/Dropdowns/AutoCompleteDropdown/AutoCompleteDropdown';
import AutoCompleteDropdown_Sample_ModuleProcessor from '@shared/SupportApplication/Demo/Modules/Framework/Controls/Dropdowns/AutoCompleteDropdown_Sample/AutoCompleteDropdown_Sample/AutoCompleteDropdown_Sample_ModuleProcessor';
import * as AutoCompleteDropdown_Sample_Hook from '@shared/SupportApplication/Demo/Modules/Framework/Controls/Dropdowns/AutoCompleteDropdown_Sample/AutoCompleteDropdown_Sample/AutoCompleteDropdown_Sample_Hook';

/**
* @name AutoCompleteDropdown_Sample
* @param {object} props props
* @summary This component displays the AutoCompleteDropdown_Sample.
* @returns {object} React.Fragement that encapsulated the display grid with AutoCompleteDropdown_Sample.
*/
const AutoCompleteDropdown_Sample = props => {

    /**
    * @name [state,dispatch]
    * @summary Define state and dispatch for the reducer to set state.
    * @returns {[]} state and dspatch
    */
    const [state, dispatch] = useReducer(Base_Hook.Reducer, AutoCompleteDropdown_Sample_Hook.GetInitialState());

    /**
    * @name objContext
    * @summary Groups state.dispatch and module object(s) in objContext.
    * @returns {object} objContext
    */
    let objContext = { state, props, dispatch, ["AutoCompleteDropdown_Sample_ModuleProcessor"]: new AutoCompleteDropdown_Sample_ModuleProcessor() };

    /**
    * @name useDataLoaded
    * @param {object} objContext context object
    * @summary Makes showAnimation false in store.
    * @returns null
    */
    AutoCompleteDropdown_Sample_Hook.useDataLoaded(objContext);

    /**
    * @name Events
    * @summary holds the method references required for the control.
    * */
    let Events = {
        OnChangeEventHandler: (props) => { }
    }

    /**
     * @name GetContent
     * @summary required jsx for component.
     * */
    function GetContent() {
        return (
            <div className="auto-complete">
                <div>This component displays the sample for simple Autocomplete.In this sample, simple data is passed.</div>
                <AutoCompleteDropdown
                    Id="AutoCompleteDropdown_Sample"
                    Meta={props.Meta}
                    Data={props.Data}
                    Resource={props.Resource}
                    Events={Events}
                />
            </div>
        );
    }

    return GetContent();
}

/**
* @name AutoCompleteDropdown_Sample
* @param {object} props props
* @summary Required for css
* @returns {Array} arrStyles
*/
AutoCompleteDropdown_Sample.DynamicStyles = props => {
    return [
        props.JConfiguration.ExtranetSkinPath + "/Css/Framework/ReactJs/PC/Controls/DropDowns/AutoComplete/AutoComplete.css"
    ];
};

export default connect(AutoCompleteDropdown_Sample_ModuleProcessor.GetStoreData())(AutoCompleteDropdown_Sample);