// React related imports.
import React, { useReducer } from 'react';
import { connect } from 'react-redux';

//Base classes.
import * as Base_Hook from '@shared/Framework/BaseClass/Base_Hook';

//Module realted fies.
import AutoCompleteDropDown from '@root/Framework/Controls/Dropdowns/AutoCompleteDropdown/AutoCompleteDropdown';
import AutoCompleteDropdown_ModuleProcessor from '@shared/Application/c.ProductManagement/Modules/4_Example/Framework/Controls/Dropdowns/AutoCompleteDropdown/AutoCompleteDropdown/AutoCompleteDropdown_ModuleProcessor';
import * as AutoCompleteDropdown_Hook from '@shared/Application/c.ProductManagement/Modules/4_Example/Framework/Controls/Dropdowns/AutoCompleteDropdown/AutoCompleteDropdown/AutoCompleteDropdown_Hook';

/**
* @name AutoCompleteDropdown
* @param {object} props props
* @summary This component displays the AutoCompleteDropdown.
* @returns {object} React.Fragement that encapsulated the display grid with AutoCompleteDropdown.
*/
const AutoCompleteDropdown = props => {

    /**
    * @name [state,dispatch]
    * @summary Define state and dispatch for the reducer to set state.
    * @returns {[]} state and dspatch
    */
    const [state, dispatch] = useReducer(Base_Hook.Reducer, AutoCompleteDropdown_Hook.GetInitialState());

    /**
    * @name objContext
    * @summary Groups state.dispatch and module object(s) in objContext.
    * @returns {object} objContext
    */
    let objContext = { state, props, dispatch, ["AutoCompleteDropdown_ModuleProcessor"]: new AutoCompleteDropdown_ModuleProcessor() };

    /**
    * @name useDataLoaded
    * @param {object} objContext context object
    * @summary Makes showAnimation false in store.
    * @returns null
    */
    AutoCompleteDropdown_Hook.useDataLoaded(objContext);

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
                <AutoCompleteDropDown
                    Id="AutoCompleteDropdown"
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
* @name AutoCompleteDropdown
* @param {object} props props
* @summary Required for css
* @returns {Array} arrStyles
*/
AutoCompleteDropdown.DynamicStyles = props => {
    return [
        props.JConfiguration.ExtranetSkinPath + "/Css/Framework/ReactJs/PC/Controls/DropDowns/AutoComplete/AutoComplete.css"
    ];
};

export default connect(AutoCompleteDropdown_ModuleProcessor.GetStoreData())(AutoCompleteDropdown);