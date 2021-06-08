
// React related imports.
import React, { useReducer } from 'react';

//Module related fies.
import TestNavigation_ModuleProcessor from '@shared/Application/c.Intranet/Modules/3_Test/Test/TestActions/TestNavigation/TestNavigation_ModuleProcessor';
import * as TestNavigation_Hook from '@shared/Application/c.Intranet/Modules/3_Test/Test/TestActions/TestNavigation/TestNavigation_Hook';

//In-line Image imports...
import ListUpImage from '@inlineimage/Framework/ReactJs/PC/Controls/ToolBar/Icon_Listup.svg?inline';
import ListDownImage from '@inlineimage/Framework/ReactJs/PC/Controls/ToolBar/Icon_Listdown.svg?inline';
import AddImage from '@inlineimage/Framework/ReactJs/PC/Controls/ToolBar/Icon_New.svg?inline';
import EditImage from '@inlineimage/Framework/ReactJs/PC/Controls/ToolBar/Icon_Edit.svg?inline';
import DeleteImage from '@inlineimage/Framework/ReactJs/PC/Controls/ToolBar/Icon_delete.svg?inline';
import ResetImage from '@inlineimage/Framework/ReactJs/PC/Controls/ToolBar/Icon_reset.svg?inline';
import ArrowLeftImage from '@inlineimage/Common/ReactJs/PC/General/ArrowLeft.gif?inline';
//import FolderImage from '@inlineimage/Common/ReactJs/PC/Icons/Folder.gif?inline';

/**
 * @name TestNavigation
 * @param {object} props props
 * @summary This component is used to Assign Task To Test.
 * @returns {object} React.Fragement that contains the content to be added in popup required for TestNavigation.
 */
const TestNavigation = props => {

    /**
    * @name [state,dispatch]
    * @summary Define state and dispatch for the reducer to set state.
    * @returns {[]} state and dispatch
    */
    const [state, dispatch] = useReducer(IntranetBase_Hook.Reducer, TestNavigation_Hook.GetInitialState());

    /**
     * @name objContext
     * @summary Groups state.dispatch and module object(s) in objContext.
     * @returns {object} objContext
     */
    let objContext = { state, props, dispatch, ["ModuleName"]: "TestNavigation", ["TestNavigation_ModuleProcessor"]: new TestNavigation_ModuleProcessor() };

    /**
     * @name  Initialize
     * @param {object} objContext objContext
     * @param {object} ModuleProcessor ModuleProcessor
     * @summary Initializing API and DynamicStyles
     * @returns Setting ApplicationState
     */
    objContext.TestNavigation_ModuleProcessor.Initialize(objContext, objContext.TestNavigation_ModuleProcessor);

    /**
      * @name Initialize
      * @param {object} objContext context object
      * @summary Initialize method call in AddEditTask_Hook, that contains all the custom hooks.
      * @returns null
      */
    TestNavigation_Hook.Initialize(objContext);


    /**
      * @name GetList
      * @summary Forms the JSX for the list.
      * @returns {object} div
      */
    function GetList() {
        let arrSortedList = state.arrTaskListData;
        return <div className="single-level-tree">
            <ul>
                <li>
                    <span>
                        <span className="expand-icon" onClick={() => TreeToListBusinessLogic.ToggleShowListData(objContext)}>{state.blnHideListData ? "+" : "-"}</span>

                        <img src={props.JConfiguration.IntranetSkinPath + "/Images/Common/Icons/Folder.gif"} />
                        <span>{"MainNavigation"}</span>
                    </span>
                </li>
                <ul className="nested" style={{ display: state.blnHideListData ? "none" : "block" }}>
                    {arrSortedList.map((objListData, intIndex) => {
                        let strIsListDataSelected = state.objSelectedTaskInList && state.objSelectedTaskInList["uTestNavigationId"] === objListData["uTestNavigationId"] ? "#fdeeb3" : "";
                        let objNavigationData = objListData["t_TestDrive_Test_Navigation_Data"].find(obj => obj["iLanguageId"] = JConfiguration.InterfaceLanguageId);
                        let strNavigationName = objNavigationData ? objNavigationData["vNavigationName"] : "";
                        return objListData["vAction"] != "Delete"
                            ?
                            <li
                                style={{ "backgroundColor": strIsListDataSelected }}
                                onClick={() => objContext.TestNavigation_ModuleProcessor.OnSelectListNode(objListData, intIndex, objContext)}
                                onDoubleClick={() => objContext.TestNavigation_ModuleProcessor.RemoveFromList(objContext, objListData, true)}
                            //style={objStyle}
                            >
                                <span className="spacer" />

                                <img src={props.ListItemIconPath} />
                                <span>{strNavigationName}</span>
                            </li>
                            :
                            <React.Fragment />
                    })}
                </ul>
            </ul>
        </div>
    }


    /**
   * @summary JSX for TestNavigation
   */
    function GetContent() {
        let objTreeData = objContext.TestNavigation_ModuleProcessor.GetTreeData(objContext);
        let objNavigationTreeData = objContext.TestNavigation_ModuleProcessor.GetNavigationTreeData(objContext);
        return <div className='tree-to-list-wrapper'>
            <div className="tree-to-list">
                <div className="tree-to-list-flex">

                    <div className="right-panel">
                        {/*<h3>{props.Resource.Text["ListName"]}</h3>*/}
                        <h3>{"TaskNavigations"}</h3>
                        <div className="toolbar">
                            <WrapperComponent
                                ComponentName={"Image"}
                                Data={{
                                    Image: ListUpImage
                                }}
                                Events={{
                                    OnClickEventHandler: () => { objContext.TestNavigation_ModuleProcessor.OnListUp(objContext) }
                                }}
                                ParentProps={props.ParentProps}
                            />
                            <WrapperComponent
                                ComponentName={"Image"}
                                Data={{
                                    Image: ListDownImage
                                }}
                                Events={{
                                    OnClickEventHandler: () => { objContext.TestNavigation_ModuleProcessor.OnListDown(objContext) }
                                }}
                                ParentProps={props.ParentProps}
                            />
                            <WrapperComponent
                                ComponentName={"Image"}
                                Data={{
                                    Image: AddImage
                                }}
                                Events={{
                                    OnClickEventHandler: () => { objContext.TestNavigation_ModuleProcessor.OpenAddEditNavigationPopup(objContext) }
                                }}
                                ParentProps={props.ParentProps}
                            />
                            <WrapperComponent
                                ComponentName={"Image"}
                                Data={{
                                    Image: EditImage
                                }}
                                Events={{
                                    OnClickEventHandler: () => { objContext.TestNavigation_ModuleProcessor.OpenAddEditNavigationPopup(objContext, true) }
                                }}
                                ParentProps={props.ParentProps}
                            />
                            <WrapperComponent
                                ComponentName={"Image"}
                                Data={{
                                    Image: DeleteImage
                                }}
                                Events={{
                                    OnClickEventHandler: () => { objContext.TestNavigation_ModuleProcessor.RemoveFromList(objContext) }
                                }}
                                ParentProps={props.ParentProps}
                            />
                            <WrapperComponent
                                ComponentName={"Image"}
                                Data={{
                                    Image: ResetImage
                                }}
                                Events={{
                                    OnClickEventHandler: () => { objContext.TestNavigation_ModuleProcessor.OnListEmpty(objContext) }
                                }}
                                ParentProps={props.ParentProps}
                            />
                        </div>

                        {/*{GetList()}*/}
                        <div className="single-level-tree">
                            <Tree
                                ComponentName={"Tree"}
                                Id={"Tree_TestNavigation_Navigation"}
                                Meta={objNavigationTreeData.Meta}
                                Data={objNavigationTreeData.Data}
                                Events={objNavigationTreeData.Events}
                                CallBacks={objNavigationTreeData.CallBacks}
                                Resource={objNavigationTreeData.Resource}
                                ParentProps={{ ...props }}
                            />
                        </div>
                    </div>
                    <div className="arrows">
                        <WrapperComponent
                            ComponentName={"Image"}
                            Data={{
                                Image: ArrowLeftImage
                            }}
                            Events={{
                                OnClickEventHandler: () => { objContext.TestNavigation_ModuleProcessor.RemoveFromList(objContext) }
                            }}
                            ParentProps={props.ParentProps}
                        />
                    </div>
                    <div className="left-panel">
                        <h3>{props.Resource.Text["TreeName"]}</h3>
                        <div className="single-level-tree">
                            <Tree
                                ComponentName={"Tree"}
                                Id={"Tree_TestNavigation_Tasks"}
                                Meta={objTreeData.Meta}
                                Data={objTreeData.Data}
                                Events={objTreeData.Events}
                                CallBacks={objTreeData.CallBacks}
                                Resource={objTreeData.Resource}
                                ParentProps={{ ...props }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    }

    return props.isLoadComplete || state.isLoadComplete ? GetContent() : <React.Fragment />;

}

export default TestNavigation;