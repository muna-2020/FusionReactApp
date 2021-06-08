// React related imports.
import React, { useReducer } from 'react';
import { connect } from 'react-redux';

//Module related fies.
import * as Time_Hook from '@shared/Application/c.Intranet/Modules/3_Test/Test/TestActions/TestTaskProperties/Time/Time_Hook';
import * as Time_MetaData from '@shared/Application/c.Intranet/Modules/3_Test/Test/TestActions/TestTaskProperties/Time/Time_MetaData';
import Time_ModuleProcessor from '@shared/Application/c.Intranet/Modules/3_Test/Test/TestActions/TestTaskProperties/Time/Time_ModuleProcessor';

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
    const [state, dispatch] = useReducer(IntranetBase_Hook.Reducer, Time_Hook.GetInitialState());

    /**
    * @name objContext
    * @summary Groups state.dispatch and module object(s) in objContext.
    * @returns {object} objContext
    */
    let objContext = { state, props, dispatch, ["Time_ModuleProcessor"]: new Time_ModuleProcessor(), ["Object_Framework_Services_TextResource"]: Object_Framework_Services_TextResource, ["ImageMeta"]: GetImageMeta() };

    /**
     * @name  InitializeDataForSSR
     * @param {object} objContext context object
     * @summary Initializing API and DynamicStyles
     * @returns Setting ApplicationState
     */
    objContext.Time_ModuleProcessor.Initialize(objContext, objContext.Time_ModuleProcessor);

    /**
    * @name Initialize
    * @param {object} objContext context object
    * @summary Initialize method call in Time_Hook, that contains all the custom hooks.
    * @returns null
    */
    Time_Hook.Initialize(objContext);

    /**
    * @name GetContent
    * @summary Forms the whole jsx required for the module.
    * @returns {object} jsx, React.Fragment
    */
    function GetContent() {
        let Grid = props.ComponentController.GetFrameworkComponent("Grid");
        var objTextResource = objContext.Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/3_Test/TestTaskProperties", objContext.props);
        return (
            <div className="subject-container">
                <div>
                    <Grid
                        Id='TimeGrid'
                        Meta={{ ...Time_MetaData.GetMetaData() }}
                        Resource={{ Text: objTextResource, SkinPath: props.JConfiguration.IntranetSkinPath }}
                        Data={objContext.Time_ModuleProcessor.GetGridData(objContext)}
                        CallBacks={{
                            OnBeforeGridRowRender: (objRow) => objContext.Time_ModuleProcessor.GetCallBackforGrid(objRow, objContext),
                            OnBeforeRowSelect: (objRow) => objContext.Time_ModuleProcessor.GetCallBackforGrid(objRow, objContext)
                        }}
                        ParentProps={{ ...props }}
                    />
                </div>
            </div>
        )
    }

    return (
        <React.Fragment>{props.isLoadComplete || state.isLoadComplete ?
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

export default connect(IntranetBase_Hook.MapStoreToProps(Time_ModuleProcessor.StoreMapList()))(Index);
