//React related imports
import { useEffect} from 'react';

//Application state reducer of store.
import ApplicationState from '@shared/Framework/DataService/ApplicationState/ApplicationState';

/**
 * @name useOnLoginUpdate
 * @summary Hook used to update Login Status.
 */
export function useOnApplicationRefresh() {
    useEffect(() => {
        if (typeof UserLoggedIn !== "undefined" && (UserLoggedIn === "true" || UserLoggedIn === true))
            ApplicationState.SetProperty('LoggedIn', { 'IsLoggedIn': true });
        else
            ApplicationState.SetProperty('LoggedIn', { 'IsLoggedIn': false });
        if (typeof ClientUserDetails !== "undefined")
            ApplicationState.SetProperty('ClientUserDetails', ClientUserDetails);   
    }, []);
}

