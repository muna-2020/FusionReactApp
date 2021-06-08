//Base classes.
import Base_ModuleProcessor from '@shared/Framework/BaseClass/Base_ModuleProcessor';

/**
* @name AutoCompleteDropdown_ComponentProcessor
* @summary Class for AutoCompleteDropdown.
*/
class AutoCompleteDropdown_ComponentProcessor extends Base_ModuleProcessor {

    /**
     * @name GetSuggestions
     * @summary returns the suggestions based on search value.
     * @param {any} objContext
     * @param {any} value
     */
    GetSuggestions(objContext, value) {
        const inputValue = value.trim().toLowerCase();
        if (inputValue.length === 0) {
            return []
        } else {
            if (objContext.props.Meta.IsLanguageDependent == 'Y') {
                return objContext.props.Data.SuggestionData.filter(objItem => {
                    console.log(objItem[objContext.props.Meta.DependingTableName][0][objContext.props.Meta.DisplayColumn]);
                    return objItem[objContext.props.Meta.DependingTableName][0][objContext.props.Meta.DisplayColumn].toLowerCase().slice(0, inputValue.length) === inputValue
                }
                ).map(objItem => {
                    return {
                        [objContext.props.Meta.DisplayColumn]: objItem[objContext.props.Meta.DependingTableName][0][objContext.props.Meta.DisplayColumn],
                        [objContext.props.Meta.ValueColumn]: objItem[objContext.props.Meta.ValueColumn],
                    }
                })
            } else {
                return objContext.props.Data.SuggestionData.filter(objItem =>
                    objItem[objContext.props.Meta.DisplayColumn] && objItem[objContext.props.Meta.DisplayColumn].toLowerCase().slice(0, inputValue.length) === inputValue
                );
            }
        }
    }

    /**
     * @name GetSuggestionValue
     * @summary When suggestion is clicked, Autosuggest needs to populate the input. Based on the clicked suggestion. Teach Autosuggest how to calculate the input value for every given suggestion.
     * @param {any} objContext
     * @param {any} suggestion
     */
    GetSuggestionValue(objContext, suggestion) {
        return suggestion[objContext.props.Meta.DisplayColumn]; //(places the text on input when keys 'up' and 'down' is clicked)
    }

    /**
     * @name ClickHandler
     * @summary Calls the parent component method when suggestion is clicked.
     * @param {any} objContext
     * @param {any} objSuggestion
     */
    ClickHandler(objContext, objSuggestion) {
        if (objContext.props.Meta.IsLanguageDependent == 'Y') {
            let objReturn = objContext.props.Data.SuggestionData.find(objItem => objItem[objContext.props.Meta.ValueColumn] == objSuggestion[objContext.props.Meta.ValueColumn])
            objContext.props.Events.OnChangeEventHandler(objReturn);
        }
        else
            objContext.props.Events.OnChangeEventHandler(objSuggestion);
    }

    /**
     * @name OnSuggestionsFetchRequested
     * @summary Autosuggest will call this function every time you need to update suggestions. You already implemented this logic above, so just use it.
     * @summary out suggestion list will get updated everytime
     * @param {any} objContext
     * @param {any} param1
     */
    OnSuggestionsFetchRequested(objContext, { value }) {
        let arrSuggestion = this.GetSuggestions(objContext, value);
        objContext.dispatch({ type: 'SET_STATE', payload: { arrSuggestion: arrSuggestion } })
    };

    /**
     * @name OnSuggestionsClearRequested
     * @summary Autosuggest will call this function every time you need to clear suggestions.
     * @param {any} objContext
     */
    OnSuggestionsClearRequested(objContext) {
        objContext.dispatch({ type: 'SET_STATE', payload: { arrSuggestion: [] } })
    };

    /**
     * @name OnChange
     * @summary updates the new search value to state.
     * @param {any} objContext
     * @param {any} newValue
     */
    OnChange(objContext, newValue) {
        objContext.dispatch({ type: 'SET_STATE', payload: { strValue: newValue } });
    };

    /**
     * @name OnBlur
     * @summary populates the suggestions
     * @param {any} objContext
     * @param {any} newValue
     */
    OnBlur(objContext, newValue) {
        objContext.dispatch({ type: 'SET_STATE', payload: { strValue: newValue } });
    };
}

export default AutoCompleteDropdown_ComponentProcessor;