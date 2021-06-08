import React, { useEffect } from "react";
//Application state reducer of store.
import ApplicationState from '@shared/Framework/DataService/ApplicationState/ApplicationState';

const EmptyComponent = (props) => {
    useEffect(() => {
        ApplicationState.SetProperty("blnShowAnimation", false);
    }, []);
    return (
        <React.Fragment>
            Not Yet Implemented
        </React.Fragment>
    );
};
export default EmptyComponent;