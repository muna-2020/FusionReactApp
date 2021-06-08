import React, { useEffect } from 'react';

const EmptyComponent = (props) => {
    useEffect(() => {
        ApplicationState.SetProperty("blnShowAnimation", false);
        ApplicationState.SetProperty("OfficeRibbonData", []);    
    }, []);        
    return <div>To be Implemented...</div>
}

EmptyComponent.InitialDataParams = (props) => {
    return [];
}

export default EmptyComponent;