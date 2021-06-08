// React related imports.
import React, { useReducer } from 'react';
import { connect } from 'react-redux';

//Module related fies.
import * as Index_Hook from '@shared/Application/c.Intranet/Modules/3_Test/Test/TestActions/TestTaskProperties/Index/Index_Hook';
import * as Index_MetaData from '@shared/Application/c.Intranet/Modules/3_Test/Test/TestActions/TestTaskProperties/Index/Index_MetaData';
import Index_ModuleProcessor from '@shared/Application/c.Intranet/Modules/3_Test/Test/TestActions/TestTaskProperties/Index/Index_ModuleProcessor';
//import Grid from '../../../../../../../../../Framework/Blocks/Grid/Grid';

//In-line Images import
import MoveUpImage from '@inlineimage/Framework/ReactJs/PC/Controls/ToolBar/MoveUp_Large.gif?inline';
import MoveDownImage from '@inlineimage/Framework/ReactJs/PC/Controls/ToolBar/MoveDown_Large.gif?inline';
import EditImage from '@inlineimage/Framework/ReactJs/PC/Controls/ToolBar/Edit_Large.svg?inline';

/**
* @name Index
* @param {object} props props
* @summary This component displays the Index data in grid.
* @returns {object} React.Fragement that encapsulated the display grid with Index details.
*/

const Index = props => {

    /**
    * @name [state,dispatch]
    * @summary Define state and dispatch for the reducer to set state.
    * @returns {[]} state and dispatch
    */
    const [state, dispatch] = useReducer(IntranetBase_Hook.Reducer, Index_Hook.GetInitialState());

    /**
    * @name objContext
    * @summary Groups state.dispatch and module object(s) in objContext.
    * @returns {object} objContext
    */
    let objContext = { state, props, dispatch, ["Index_ModuleProcessor"]: new Index_ModuleProcessor(), ["Object_Framework_Services_TextResource"]: Object_Framework_Services_TextResource, ["ImageMeta"]: GetImageMeta() };

    /**
     * @name  InitializeDataForSSR
     * @param {object} objContext context object
     * @summary Initializing API and DynamicStyles
     * @returns Setting ApplicationState
     */
    objContext.Index_ModuleProcessor.Initialize(objContext, objContext.Index_ModuleProcessor); 

    /**
    * @name Initialize
    * @param {object} objContext context object
    * @summary Initialize method call in Index_Hook, that contains all the custom hooks.
    * @returns null
    */
    Index_Hook.Initialize(objContext);

    /**
    * @name GetContent
    * @summary Forms the whole jsx required for the module.
    * @returns {object} jsx, React.Fragment
    */
    function GetContent() {
        var objTextResource = objContext.Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/3_Test/TestTaskProperties", objContext.props);
        return (
            <div className="subject-container">
                <div>
                    <Grid
                        Id='IndexGrid'
                        Meta={{ ...Index_MetaData.GetMetaData() }}
                        Resource={{ Text: objTextResource, SkinPath: props.JConfiguration.IntranetSkinPath }}
                        Data={objContext.Index_ModuleProcessor.GetGridData(objContext)}
                        CallBacks={{
                            OnBeforeGridRowRender: (objRow) => objContext.Index_ModuleProcessor.GetCallBackforGrid(objRow, objContext),
                            OnBeforeRowSelect: (objRow) => objContext.Index_ModuleProcessor.GetCallBackforGrid(objRow, objContext),
                        }}
                        ParentProps={{ ...props }}
                    />
                </div>
            </div>
        )
    }

    return (
        <React.Fragment>{props.arrtasktotestData && state.isLoadComplete ?
            <React.Fragment>{GetContent()}</React.Fragment> : <React.Fragment></React.Fragment>}
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

export default connect(IntranetBase_Hook.MapStoreToProps(Index_ModuleProcessor.StoreMapList()))(Index);
