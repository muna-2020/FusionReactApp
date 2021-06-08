//React imports 
import { useEffect } from 'react';

//common functionalities.
import { GetUniqueId } from "@root/Framework/Services/UniqueId/UniqueId";

/**
* @name GetInitialState
* @summary Initializes the state
* @returns {object} initial state object
*/
export function GetInitialState(props) {
    return {
        arrSuggestion: [],
        strValue: '',
        strDropDownUID: GetUniqueId()
    };
}

/**
 * @name Initialize
 * @summary Initializing the hooks.
 * @param {any} objContext
 */
export function Initialize(objContext) {
    useDeafaultSelector(objContext);
}

/**
 * @name useDeafaultSelector
 * @summary sets the pre selected value.
 * @param {any} objContext
 */
export function useDeafaultSelector(objContext) {
    useEffect(() => {
        let strSelectedValue = '';
        if (objContext.props.Data.SelectedValue) {
            let objSelectedSuggestion = objContext.props.Data.SuggestionData.find(objSuggestion => objSuggestion[objContext.props.Meta.ValueColumn] == objContext.props.Data.SelectedValue)
            if (objContext.props.Meta.IsLanguageDependent == 'Y') {
                strSelectedValue = objSelectedSuggestion[objContext.props.Meta.DependingTableName][0][objContext.props.Meta.DisplayColumn];
            } else {
                strSelectedValue = objSelectedSuggestion[objContext.props.Meta.DisplayColumn];
            }
            objContext.dispatch({ type: 'SET_STATE', payload: { strValue: strSelectedValue } })

        }
    }, [objContext.props.Data.SelectedValue]);
}