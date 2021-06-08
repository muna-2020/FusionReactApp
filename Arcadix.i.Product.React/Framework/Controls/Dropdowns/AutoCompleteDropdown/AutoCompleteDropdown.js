//React related imports.
import React, { useReducer } from 'react';

//Base classes.
import * as Base_Hook from '@shared/Framework/BaseClass/Base_Hook';
import * as AutoCompleteDropdown_Hook from '@shared/Framework/Controls/Dropdowns/AutoCompleteDropdown/AutoCompleteDropdown_Hook';
import AutoCompleteDropdown_ComponentProcessor from '@shared/Framework/Controls/Dropdowns/AutoCompleteDropdown/AutoCompleteDropdown_ComponentProcessor';

//Components used in module.
import AutoSuggest from 'react-autosuggest';

/**
 * @name AutoCompleteDropdown
 * @summary displays the auto complete text box.
 * @param {any} props
 */
const AutoCompleteDropdown = (props) => {

    /**
    * @name [state,dispatch]
    * @summary Define state and dispatch for the reducer to set state.
    * @returns {[]} state and dispatch
    */
    const [state, dispatch] = useReducer(Base_Hook.Reducer, AutoCompleteDropdown_Hook.GetInitialState(props));

    /**
    * @name objContext
    * @summary Groups state.dispatch and module object(s) in objContext.
    * @returns {object} objContext
    */
    let objContext = { state, props, dispatch, ["ModuleName"]: props.Id, ["AutoCompleteDropdown_ComponentProcessor"]: new AutoCompleteDropdown_ComponentProcessor() };

    /**
     * @name  Initialize
     * @param {object} objContext objContext
     * @param {object} ModuleProcessor ModuleProcessor
     * @summary Initializing API and DynamicStyles
     * @returns null
     */
    objContext.AutoCompleteDropdown_ComponentProcessor.Initialize(objContext, objContext.AutoCompleteDropdown_ComponentProcessor);

    /**
     * @name AutoCompleteDropdown_Hook
     * @summary Initializing the events
     * */
    AutoCompleteDropdown_Hook.Initialize(objContext);

    /**
     * @name RenderSuggestion
     * @summary Renders suggestion values based on Display Column. 
     * @param {any} objSuggestion
     */
    const RenderSuggestion = objSuggestion => (
        <div onClick={() => { objContext.AutoCompleteDropdown_ComponentProcessor.ClickHandler(objContext, objSuggestion); }} >
            {objSuggestion[props.Meta.DisplayColumn]}
        </div>
    );
       
    /**
     * @name GetContent
     * @summary returns the Jsx of auto suggest box.
     * @returns {Element}
     * */
    function GetContent() {
        var inputProps = {};
        if (props.Events.OnChangeEventHandler) {
            inputProps = {
                placeholder: props.Resource ? props.Resource.Text.WaterMarkText : '',
                value: state.strValue,
                onChange: (event, { newValue }) => { objContext.AutoCompleteDropdown_ComponentProcessor.OnChange(objContext,newValue) }
            };
        }
        else {
            inputProps = {
                placeholder: props.Resource ? props.Resource.Text.WaterMarkText : '',
                value: state.strValue,
                onBlur: (event, { newValue }) => { objContext.AutoCompleteDropdown_ComponentProcessor.OnBlur(objContext,newValue) }
            };
        }

        return (
            <AutoSuggest
                id={props.Id + "_AutoComplete"}
                suggestions={state.arrSuggestion}
                onSuggestionsFetchRequested={(event) => { objContext.AutoCompleteDropdown_ComponentProcessor.OnSuggestionsFetchRequested(objContext, event) }}
                onSuggestionsClearRequested={(event) => { objContext.AutoCompleteDropdown_ComponentProcessor.OnSuggestionsClearRequested(objContext, event) }}
                getSuggestionValue={(event) => { return objContext.AutoCompleteDropdown_ComponentProcessor.GetSuggestionValue(objContext, event) }}
                renderSuggestion={RenderSuggestion}
                inputProps={inputProps} />
        )
    }
    return GetContent();
}

export default AutoCompleteDropdown;