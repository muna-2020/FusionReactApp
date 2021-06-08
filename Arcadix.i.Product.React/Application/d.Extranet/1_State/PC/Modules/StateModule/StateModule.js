import React , { useEffect } from "react";

//Application state reducer of store.
import ApplicationState from '@shared/Framework/DataService/ApplicationState/ApplicationState';



const StateModule = (props) => {

    useEffect(() => {
        ApplicationState.SetProperty("blnShowAnimation", false);
    }, []);

    return (
        <div>
           this is state module.
        </div>
    );
}
export default StateModule;