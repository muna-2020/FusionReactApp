// React related imports.
import React, { useReducer } from 'react';
import { connect } from 'react-redux';

//Base classes.
import * as Base_Hook from '@shared/Framework/BaseClass/Base_Hook';

//Module realted fies.
import AutoCompleteDropdown from '@root/Framework/Controls/Dropdowns/AutoCompleteDropdown/AutoCompleteDropdown';
import AutoCompleteDropdown_MultiLanguage_ModuleProcessor from '@shared/Application/c.ProductManagement/Modules/4_Example/Framework/Controls/Dropdowns/AutoCompleteDropdown/AutoCompleteDropdown_MultiLanguage/AutoCompleteDropdown_MultiLanguage_ModuleProcessor';
import * as AutoCompleteDropdown_MultiLanguage_Hook from '@shared/Application/c.ProductManagement/Modules/4_Example/Framework/Controls/Dropdowns/AutoCompleteDropdown/AutoCompleteDropdown_MultiLanguage/AutoCompleteDropdown_MultiLanguage_Hook';

/**
* @name  AutoCompleteDropdown_MultiLanguage
* @param {object} props props
* @summary This component displays the  AutoCompleteDropdown_MultiLanguage.
* @returns {object} React.Fragement that encapsulated the display grid with  AutoCompleteDropdown_MultiLanguage.
*/
const AutoCompleteDropdown_MultiLanguage = props => {

    /**
    * @name [state,dispatch]
    * @summary Define state and dispatch for the reducer to set state.
    * @returns {[]} state and dspatch
    */
    const [state, dispatch] = useReducer(Base_Hook.Reducer, AutoCompleteDropdown_MultiLanguage_Hook.GetInitialState());

    /**
    * @name objContext
    * @summary Groups state.dispatch and module object(s) in objContext.
    * @returns {object} objContext
    */
    let objContext = { state, props, dispatch, ["AutoCompleteDropdown_MultiLanguage_ModuleProcessor"]: new AutoCompleteDropdown_MultiLanguage_ModuleProcessor() };

    /**
    * @name useDataLoaded
    * @param {object} objContext context object
    * @summary Makes showAnimation false in store.
    * @returns null
    */
    AutoCompleteDropdown_MultiLanguage_Hook.useDataLoaded(objContext);

    /**
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
                <div>This component displays the sample for a dropdown showing multilanguage options.In this sample, multilanguage data is passed.</div>
                <AutoCompleteDropdown
                    Id="AutoCompleteDropdown_MultiLanguage"
                    Meta={props.Meta}
                    Data={props.Data}
                    Resource={props.Resource}
                    Events={Events}
                />
            </div>
        )
    }

    return GetContent();
}

/**
* @name  AutoCompleteDropdown_MultiLanguage
* @param {object} props props
* @summary Required for css
* @returns {Array} arrStyles
*/
AutoCompleteDropdown_MultiLanguage.DynamicStyles = props => {
    return [
        props.JConfiguration.ExtranetSkinPath + "/Css/Framework/ReactJs/PC/Controls/DropDowns/AutoComplete/AutoComplete.css"
    ];
};

export default connect(AutoCompleteDropdown_MultiLanguage_ModuleProcessor.GetStoreData())(AutoCompleteDropdown_MultiLanguage);