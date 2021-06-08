import React, { useReducer } from 'react';
import * as EditorBase_Hook from '@shared/Framework/BaseClass/EditorBaseClass/EditorBase_Hook';

import * as CMSSampleTest_Editor_Hooks from '@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSSampleTest/CMSSampleTest_Editor/CMSSampleTest_Editor_Hooks';


const CMSSampleTest_Editor = (props) => {

    let [state, dispatch] = useReducer(EditorBase_Hook.Reducer, CMSSampleTest_Editor_Hooks.GetInitialState(props));

    let objContext = { props, state,  dispatch };

    CMSSampleTest_Editor_Hooks.Initialize(objContext);

    const GetContent = () => {
        return (
            <div key="CMSST02">Sample test in Editor view.</div>
        );
    }

    return GetContent();
}

export default CMSSampleTest_Editor;