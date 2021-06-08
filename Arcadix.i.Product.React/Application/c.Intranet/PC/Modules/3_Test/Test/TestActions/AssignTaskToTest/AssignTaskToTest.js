// React related imports.
import React, { useReducer } from 'react';

//Module related fies.
import AssignTaskToTest_ModuleProcessor from '@shared/Application/c.Intranet/Modules/3_Test/Test/TestActions/AssignTaskToTest/AssignTaskToTest_ModuleProcessor';
import * as AssignTaskToTest_Hook from '@shared/Application/c.Intranet/Modules/3_Test/Test/TestActions/AssignTaskToTest/AssignTaskToTest_Hook';

//In-line Image imports...
import ListUpImage from '@inlineimage/Framework/ReactJs/PC/Controls/ToolBar/Icon_Listup.svg?inline';
import ListDownImage from '@inlineimage/Framework/ReactJs/PC/Controls/ToolBar/Icon_Listdown.svg?inline';
import DeleteImage from '@inlineimage/Framework/ReactJs/PC/Controls/ToolBar/Icon_delete.svg?inline';
import ResetImage from '@inlineimage/Framework/ReactJs/PC/Controls/ToolBar/Icon_reset.svg?inline';
import FolderImage from '@inlineimage/Common/ReactJs/PC/Icons/Folder.gif?inline';
import SearchImage from '@inlineimage/Framework/ReactJs/PC/Controls/ToolBar/Search.gif?inline';
import ArrowLeftImage from '@inlineimage/Common/ReactJs/PC/General/ArrowLeft.gif?inline';
import ArrowRightImage from '@inlineimage/Common/ReactJs/PC/General/ArrowRight.gif?inline';


/**
 * @name AssignTaskToTest
 * @param {object} props props
 * @summary This component is used to Assign Task To Test.
 * @returns {object} React.Fragement that contains the content to be added in popup required for AssignTaskToTest.
 */
const AssignTaskToTest = props => {

    /**
    * @name [state,dispatch]
    * @summary Define state and dispatch for the reducer to set state.
    * @returns {[]} state and dispatch
    */
    const [state, dispatch] = useReducer(IntranetBase_Hook.Reducer, AssignTaskToTest_Hook.GetInitialState());

    /**
     * @name objContext
     * @summary Groups state.dispatch and module object(s) in objContext.
     * @returns {object} objContext
     */
    let objContext = { state, props, dispatch, ["ModuleName"]: "AssignTaskToTest", ["AssignTaskToTest_ModuleProcessor"]: new AssignTaskToTest_ModuleProcessor() };

    /**
     * @name  Initialize
     * @param {object} objContext objContext
     * @param {object} ModuleProcessor ModuleProcessor
     * @summary Initializing API and DynamicStyles
     * @returns Setting ApplicationState
     */
    objContext.AssignTaskToTest_ModuleProcessor.Initialize(objContext, objContext.AssignTaskToTest_ModuleProcessor);

    /**
      * @name Initialize
      * @param {object} objContext context object
      * @summary Initialize method call in AddEditTask_Hook, that contains all the custom hooks.
      * @returns null
      */
    AssignTaskToTest_Hook.Initialize(objContext);


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
                        <span className="expand-icon" onClick={() => objContext.AssignTaskToTest_ModuleProcessor.ToggleShowListData(objContext)}>{state.blnHideListData ? "+" : "-"}</span>
                        <WrapperComponent
                            ComponentName={"Image"}
                            Data={{
                                Image: FolderImage
                            }}
                            ParentProps={props.ParentProps}
                        />
                        <span>{props.Resource.Text["Tests"]}</span>
                    </span>
                </li>
                <ul className="nested" style={{ display: state.blnHideListData ? "none" : "block" }}>
                    {arrSortedList.map((objListData, intIndex) => {
                        let strIsListDataSelected = state.objSelectedTaskInList && state.objSelectedTaskInList["iPageId"] === objListData["iPageId"] ? "#fdeeb3" : "";
                        return objListData["vAction"] != "Delete"
                            ?
                            <li
                                style={{ "backgroundColor": strIsListDataSelected }}
                                onClick={() => objContext.AssignTaskToTest_ModuleProcessor.OnSelectListNode(objListData, intIndex, objContext)}
                                onDoubleClick={() => objContext.AssignTaskToTest_ModuleProcessor.RemoveFromList(objContext, objListData, true)}
                            //style={objStyle}
                            >
                                <span className="spacer" />
                                <WrapperComponent
                                    ComponentName={"Image"}
                                    Data={{
                                        Image: props.ListItemIconPath
                                    }}
                                    ParentProps={props.ParentProps}
                                />
                                <span>{objListData["TaskProperties"] ? objListData["TaskProperties"]["vPageName"] : objListData["vPageName"]}</span>
                            </li>
                            :
                            <React.Fragment />
                    })}
                </ul>
            </ul>
        </div>
    }

    const GetTaskTypeCheckBoxes = () => {
        return <div className="task-check-box">
            <div className="col-item">
                <div className="row-left">
                    <label className="checkbox">
                        <input type="checkbox"
                            checked={true}
                            name="" id=""
                            onChange={(e) => { }} />
                        <span className="checkmark"></span>
                    </label>
                </div>
                <div className="row-right">
                    <span>{Localization.TextFormatter(props.Resource.Text, "All")}</span>
                </div>
            </div>

            <div className="col-item">
                <div className="row-left">
                    <label className="checkbox">
                        <input type="checkbox"
                            checked={true}
                            name="" id=""
                            onChange={(e) => { }} />
                        <span className="checkmark"></span>
                    </label>
                </div>
                <div className="row-right">
                    <span>{Localization.TextFormatter(props.Resource.Text, "Pause")}</span>
                </div>
            </div>

            <div className="col-item">
                <div className="row-left">
                    <label className="checkbox">
                        <input type="checkbox"
                            checked={true}
                            name="" id=""
                            onChange={(e) => { }} />
                        <span className="checkmark"></span>
                    </label>
                </div>
                <div className="row-right">
                    <span>{Localization.TextFormatter(props.Resource.Text, "List")}</span>
                </div>
            </div>

            <div className="col-item">
                <div className="row-left">
                    <label className="checkbox">
                        <input type="checkbox"
                            checked={true}
                            name="" id=""
                            onChange={(e) => { }} />
                        <span className="checkmark"></span>
                    </label>
                </div>
                <div className="row-right">
                    <span>{Localization.TextFormatter(props.Resource.Text, "Survey")}</span>
                </div>
            </div>

            <div className="col-item">
                <div className="row-left">
                    <label className="checkbox">
                        <input type="checkbox"
                            checked={true}
                            name="" id=""
                            onChange={(e) => { }} />
                        <span className="checkmark"></span>
                    </label>
                </div>
                <div className="row-right">
                    <span>{Localization.TextFormatter(props.Resource.Text, "Test")}</span>
                </div>
            </div>

            <div className="col-item">
                <div className="row-left">
                    <label className="checkbox">
                        <input type="checkbox"
                            checked={true}
                            name="" id=""
                            onChange={(e) => { }} />
                        <span className="checkmark"></span>
                    </label>
                </div>
                <div className="row-right">
                    <span>{Localization.TextFormatter(props.Resource.Text, "Example")}</span>
                </div>
            </div>

            <div className="col-item">
                <div className="row-left">
                    <label className="checkbox">
                        <input type="checkbox"
                            checked={true}
                            name="" id=""
                            onChange={(e) => { }} />
                        <span className="checkmark"></span>
                    </label>
                </div>
                <div className="row-right">
                    <span>{Localization.TextFormatter(props.Resource.Text, "Manual")}</span>
                </div>
            </div>

            <div>
                <WrapperComponent
                    ComponentName={"Image"}
                    Data={{
                        Image: SearchImage
                    }}
                    ParentProps={props.ParentProps}
                /><span>{" (-NI -)"}</span>
            </div>
        </div>
    }

    /**
   * @summary JSX for AssignTaskToTest
   */
    function GetContent() {
        let objTreeData = objContext.AssignTaskToTest_ModuleProcessor.GetTreeData(objContext);
        return <div className='tree-to-list-wrapper'>
            <div className="tree-to-list">
                <div className="tree-to-list-flex">
                    <div className="left-panel">
                        <h3>{props.Resource.Text["TreeName"]}</h3>
                        {GetTaskTypeCheckBoxes()}
                        <div className="single-level-tree">
                            <Tree
                                ComponentName={"Tree"}
                                Id={"Tree_Sample1"}
                                Meta={objTreeData.Meta}
                                Data={objTreeData.Data}
                                Events={objTreeData.Events}
                                CallBacks={objTreeData.CallBacks}
                                Resource={objTreeData.Resource}
                                ParentProps={{ ...props }}
                            />
                        </div>
                    </div>
                    <div className="arrows">
                        <WrapperComponent
                            ComponentName={"Image"}
                            Data={{
                                Image: ArrowRightImage 
                            }}
                            Events={{
                                OnClickEventHandler: () => { objContext.AssignTaskToTest_ModuleProcessor.AddToList(objContext) }
                            }}
                            ParentProps={props.ParentProps}
                        />
                        <WrapperComponent
                            ComponentName={"Image"}
                            Data={{
                                Image: ArrowLeftImage
                            }}
                            Events={{
                                OnClickEventHandler: () => { objContext.AssignTaskToTest_ModuleProcessor.RemoveFromList(objContext) }
                            }}
                            ParentProps={props.ParentProps}
                        />
                    </div>
                    <div className="right-panel">
                        <h3>{props.Resource.Text["ListName"]}</h3>
                        <div className="toolbar">
                            <WrapperComponent
                                ComponentName={"Image"}
                                Data={{
                                    Image: ListUpImage
                                }}
                                Events={{
                                    OnClickEventHandler: () => { objContext.AssignTaskToTest_ModuleProcessor.OnListUp(objContext) }
                                }}
                                ParentProps={props.ParentProps}
                            />
                            <WrapperComponent
                                ComponentName={"Image"}
                                Data={{
                                    Image: ListDownImage
                                }}
                                Events={{
                                    OnClickEventHandler: () => { objContext.AssignTaskToTest_ModuleProcessor.OnListDown(objContext) }
                                }}
                                ParentProps={props.ParentProps}
                            />
                            <WrapperComponent
                                ComponentName={"Image"}
                                Data={{
                                    Image: DeleteImage
                                }}
                                Events={{
                                    OnClickEventHandler: () => { objContext.AssignTaskToTest_ModuleProcessor.RemoveFromList(objContext) }
                                }}
                                ParentProps={props.ParentProps}
                            />
                            <WrapperComponent
                                ComponentName={"Image"}
                                Data={{
                                    Image: ResetImage
                                }}
                                Events={{
                                    OnClickEventHandler: () => { objContext.AssignTaskToTest_ModuleProcessor.OnListEmpty(objContext) }
                                }}
                                ParentProps={props.ParentProps}
                            />
                        </div>

                        {GetList()}

                        <div className="form-block">
                            <input id="NodeId" type="text" onChange={(e) => { objContext.AssignTaskToTest_ModuleProcessor.HandleChange(e.target.value, objContext) }} value={state.strTaskId} />
                            <button id="ButtonId" type="button" className="btn" onClick={(e) => { objContext.AssignTaskToTest_ModuleProcessor.AddTaskById(objContext) }}>{props.Resource.Text["Add"]}</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    }

    return props.isLoadComplete || state.isLoadComplete ? GetContent() : <React.Fragment />;

}

export default AssignTaskToTest;

