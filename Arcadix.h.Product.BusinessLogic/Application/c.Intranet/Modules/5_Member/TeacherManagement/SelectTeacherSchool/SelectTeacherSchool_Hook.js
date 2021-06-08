// React related imports.
import { useEffect, useLayoutEffect, useRef } from 'react';

/**
* @name GetInitialState
* @summary Initializes the state
* @returns {object} initial state object
*/
export function GetInitialState(props) {
    return {        
        arrSelectedSchools: []
    };
}