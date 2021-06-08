//React related imports.
import React, { useReducer } from 'react';

//Module related files.
import * as Hierarchy_Hook from '@shared/Application/c.Intranet/Modules/3_Test/Test/TestActions/TestTaskProperties/Hierarchy/Hierarchy_Hook';
import * as Hierarchy_MetaData from '@shared/Application/c.Intranet/Modules/3_Test/Test/TestActions/TestTaskProperties/Hierarchy/Hierarchy_MetaData';
import Hierarchy_ModuleProcessor from '@shared/Application/c.Intranet/Modules/3_Test/Test/TestActions/TestTaskProperties/Hierarchy/Hierarchy_ModuleProcessor';

//In-line Images import
import MoveUpImage from '@inlineimage/Framework/ReactJs/PC/Controls/ToolBar/MoveUp_Large.gif?inline';
import MoveDownImage from '@inlineimage/Framework/ReactJs/PC/Controls/ToolBar/MoveDown_Large.gif?inline';
import EditImage from '@inlineimage/Framework/ReactJs/PC/Controls/ToolBar/Edit_Large.svg?inline';

/**
* @name Hierarchy.
* @param {object} props props.
* @summary This component is used to Add/Edit the TestTaskProperty.
* @returns {object} React.Fragement that contains the content to be added in popup required for add/edit.
*/
const Hierarchy = props => {

    /**
   * @name [state,dispatch]
   * @summary Define state and dispatch for the reducer to set state.
   * @returns {[]} state and dispatch
   */
    const [state, dispatch] = useReducer(IntranetBase_Hook.Reducer, Hierarchy_Hook.GetInitialState());


    /**
    * @name objContext
    * @summary Groups state.dispatch and module object(s) in objContext.
    * @returns {object} objContext
    */
    let objContext = { state, props, dispatch, "Hierarchy_ModuleProcessor": new Hierarchy_ModuleProcessor(), ["Object_Framework_Services_TextResource"]: Object_Framework_Services_TextResource, ["ImageMeta"]: GetImageMeta() };

    /**
     * @name  InitializeDataForSSR
     * @param {object} objContext context object
     * @summary Initializing API and DynamicStyles
     * @returns Setting ApplicationState
     */
    objContext.Hierarchy_ModuleProcessor.Initialize(objContext, objContext.Hierarchy_ModuleProcessor); 
    
    /**
     * @name Initialize
     * @param {object} objContext context object
     * @summary Initialize method call in AddEditTask_Hook, that contains all the custom hooks.
     * @returns null
     */
    Hierarchy_Hook.Initialize(objContext);

    /**
     * JSX for subject
     */
    function GetContent() {
        var objTextResource = objContext.Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/3_Test/TestTaskProperties", objContext.props);
        return (
            <div className="subject-container">
                <Grid
                    Id='HierarchyGrid'
                    Meta={{ ...Hierarchy_MetaData.GetMetaData() }}
                    Resource={{ Text: objTextResource, SkinPath: props.JConfiguration.IntranetSkinPath }}
                    Data={objContext.Hierarchy_ModuleProcessor.GetGridData(objContext)}
                    CallBacks={{
                        OnBeforeGridRowRender: (objRow) => objContext.Hierarchy_ModuleProcessor.GetCallBackforGrid(objRow, objContext),
                        OnBeforeRowSelect: (objRow) => objContext.Hierarchy_ModuleProcessor.GetCallBackforGrid(objRow, objContext),
                    }}
                    ParentProps={{ ...props }}
                />
            </div>
        );
    }

    return (
        <React.Fragment>{props.arrtasktotestData && state.isLoadComplete ?
            <React.Fragment>{GetContent()}</React.Fragment> : <React.Fragment />}
        </React.Fragment>
    );

}

/**
 * @name GetImageMeta
 * @summary forms the default images for inline import.
 * */
const GetImageMeta = () => {
    return {
        MoveUpImage: MoveUpImage,
        MoveDownImage: MoveDownImage,
        EditImage: EditImage
    }
}

export default Hierarchy;