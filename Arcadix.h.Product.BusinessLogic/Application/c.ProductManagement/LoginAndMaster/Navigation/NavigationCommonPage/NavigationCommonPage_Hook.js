// React related impoprts.
import { useEffect } from 'react';

/**
 * @name useSetAnimation
 * @param {any} objContext
 * @summary To set the Folder Id to 0 for the First time, to load root folder data for Task and test
 * */
export function useSetAnimation(objContext) {
    useEffect(() => {
        ApplicationState.SetProperty("blnShowAnimation", false);
    }, [objContext.props.ActiveSubNavigationId, objContext.props.ActiveMainNavigationId]);
}



