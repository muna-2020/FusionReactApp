//React related imports
import React, {useEffect} from 'react';

const Sample = (props) => {

    useEffect(()=>{
        ApplicationState.SetProperty("blnShowAnimation",false);
    },[])

    return <div>Sample</div>
}

export default Sample;