﻿import React, { useEffect } from 'react';
import ApplicationState from '@shared/Framework/DataService/ApplicationState/ApplicationState';

const Sample = (props) => {
    useEffect(() => {
        ApplicationState.SetProperty("blnShowAnimation", false);
    });
    return (
        <div>
            In step 1 the tenplate is created
            <ul>
                <li>Item1</li>
                <li>Item2</li>
                <li>Item3</li>
              </ul>
         </div>
        )

}

export default Sample;