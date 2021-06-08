//React Related Imports
import React, { useEffect } from 'react';
import ApplicationState from '@shared/Framework/DataService/ApplicationState/ApplicationState';

/**
 * @name useDataLoaded
 * @summary UseEffect for Animation
 * */
export function useDataLoaded() {
    useEffect(() => {
        ApplicationState.SetProperty("blnShowAnimation", false);
    }, [])
};

