//React Related Imports
import React, { useEffect } from 'react';

/**
 * @name useDataLoaded
 * @summary UseEffect for Animation
 * */
export function useDataLoaded() {
    useEffect(() => {
        ApplicationState.SetProperty("blnShowAnimation", false);
    }, [])
};

