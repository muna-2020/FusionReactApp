//string formatter.
import * as StringFormatter from '@shared/Framework/Services/DataFormatter/StringFormatter/StringFormatter';

/**
 * @name GetInitialState
 * @param {object} props props from parent
 * @summary Initialize the component's local state.
 * @returns {object} Returns the local state of the component.
 */
export const GetInitialState = (props) => {
    return {
        "ElementJson": {
            ...props.ElementJson,
            "vElementJson": {
                ...props.ElementJson.vElementJson,
                "html": StringFormatter.RestoreStringForXML(props.ElementJson.vElementJson.html),
                "Values": props.ElementJson.vElementJson.Values.map(objValue => {
                    return {
                        ...objValue,
                        "mathMl": StringFormatter.RestoreStringForXML(objValue.mathMl)
                    }
                })
            }
        },
        "PageId": props.PageId,
        "ComponentKey": props.ComponentKey
    };
};
