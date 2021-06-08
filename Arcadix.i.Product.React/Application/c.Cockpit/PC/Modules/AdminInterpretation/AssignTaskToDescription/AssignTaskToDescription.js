// React related imports.
import React, { useReducer } from 'react';

//Module related fies.
import AssignTaskToDescription_ModuleProcessor from '@shared/Application/c.Cockpit/Modules/AdminInterpretation/AssignTaskToDescription/AssignTaskToDescription_ModuleProcessor';
import * as AssignTaskToDescription_Hook from '@shared/Application/c.Cockpit/Modules/AdminInterpretation/AssignTaskToDescription/AssignTaskToDescription_Hook';

//In-line Image imports...
import ListUpImage from '@inlineimage/Framework/ReactJs/PC/Controls/ToolBar/Icon_Listup.svg?inline';
import ListDownImage from '@inlineimage/Framework/ReactJs/PC/Controls/ToolBar/Icon_Listdown.svg?inline';
import DeleteImage from '@inlineimage/Framework/ReactJs/PC/Controls/ToolBar/Icon_delete.svg?inline';
import ResetImage from '@inlineimage/Framework/ReactJs/PC/Controls/ToolBar/Icon_reset.svg?inline';
import FolderImage from '@inlineimage/Common/ReactJs/PC/Icons/Folder.gif?inline';
import ArrowLeftImage from '@inlineimage/Common/ReactJs/PC/General/ArrowLeft.gif?inline';
import ArrowRightImage from '@inlineimage/Common/ReactJs/PC/General/ArrowRight.gif?inline';
//import TaskImage from '@inlineimage/Application/c.Intranet/ReactJs/PC/Modules/2_Task/Base.svg?inline';

/**
 * @name AssignTaskToDescription
 * @param {object} props props
 * @summary This component is used to Assign Task To Test.
 * @returns {object} React.Fragement that contains the content to be added in popup required for AssignTaskToDescription.
 */
const AssignTaskToDescription = props => {

    /**
     * @name [state,dispatch]
     * @summary Define state and dispatch for the reducer to set state.
     * @returns {[]} state and dispatch
     */
    const [state, dispatch] = useReducer(IntranetBase_Hook.Reducer, AssignTaskToDescription_Hook.GetInitialState());

    /**
     * @name objContext
     * @summary Groups state.dispatch and module object(s) in objContext.
     * @returns {object} objContext
     */
    let objContext = { state, props, dispatch, ["AssignTaskToDescription_ModuleProcessor"]: new AssignTaskToDescription_ModuleProcessor() };
    //let objContext = { state, props, dispatch, ["AssignTaskToDescription_ModuleProcessor"]: new AssignTaskToDescription_ModuleProcessor(),["ImageMeta"]: GetImageMeta() };

    /**
     * @name Initialize
     * @param {object} objContext context object
     * @summary Initialize method call in AddEditTask_Hook, that contains all the custom hooks.
     * @returns null
     */
    AssignTaskToDescription_Hook.Initialize(objContext);


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
                        <WrapperComponent
                            ComponentName={"Image"}
                            Data={{
                                Image: FolderImage
                            }}
                            ParentProps={props.ParentProps}
                        />
                        <span>Description{props.Resource.Text["Tests"]}</span>
                    </span>
                </li>
                <ul className="nested" style={{ display: state.blnHideListData ? "none" : "block" }}>
                    {arrSortedList.map((objListData, intIndex) => {
                        let strIsListDataSelected = state.objSelectedTaskInList && state.objSelectedTaskInList["iPageId"] === objListData["iPageId"] ? "#fdeeb3" : "";
                        return objListData["vAction"] != "Delete"
                            ?
                            <li
                                style={{ "backgroundColor": strIsListDataSelected }}
                                onClick={() => objContext.AssignTaskToDescription_ModuleProcessor.OnSelectListNode(objListData, intIndex, objContext)}
                                onDoubleClick={() => objContext.AssignTaskToDescription_ModuleProcessor.RemoveFromList(objContext, objListData, true)}
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
                                {/*<span>{objListData["TaskProperties"] ? objListData["TaskProperties"]["vPageName"] : objListData["vPageName"]}</span>*/}
                                <span>{objListData["vPageName"] ? objListData["vPageName"]: ""}</span>
                            </li>
                            :
                            <React.Fragment />
                    })}
                </ul>
            </ul>
        </div>;
    }

    /**
     * @name GetContent
     * @summary Forms the whole jsx required for the AssignTaskToDescription popup.
     * @returns {object} jsx, React.Fragment
     */
    function GetContent() {
        let Tree = props.ComponentController.GetFrameworkComponent("Tree");
        let objTreeData = objContext.AssignTaskToDescription_ModuleProcessor.GetTreeData(objContext);
        return <div id="TaskToDescription" className='tree-to-list-wrapper'>
            <div className="tree-to-list">
                <div className="tree-to-list-flex">
                    <div className="left-panel">
                        <div className="single-level-tree">
                            <Tree
                                Id={"Tree_Sample1"}
                                Meta={objTreeData.Meta}
                                Data={objTreeData.Data}
                                Events={objTreeData.Events}
                                CallBacks={objTreeData.CallBacks}
                                Resource={objTreeData.Resource}
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
                                OnClickEventHandler: () => { objContext.AssignTaskToDescription_ModuleProcessor.AddToList(objContext) }
                            }}
                            ParentProps={props.ParentProps}
                        />
                        <WrapperComponent
                            ComponentName={"Image"}
                            Data={{
                                Image: ArrowLeftImage
                            }}
                            Events={{
                                OnClickEventHandler: () => { objContext.AssignTaskToDescription_ModuleProcessor.RemoveFromList(objContext) }
                            }}
                            ParentProps={props.ParentProps}
                        />
                    </div>
                    <div className="right-panel">
                        <h3>Description{props.Resource.Text["ListName"]}</h3>
                        <div className="toolbar">
                            <WrapperComponent
                                ComponentName={"Image"}
                                Data={{
                                    Image: ListUpImage
                                }}
                                Events={{
                                    OnClickEventHandler: () => { objContext.AssignTaskToDescription_ModuleProcessor.OnListUp(objContext) }
                                }}
                                ParentProps={props.ParentProps}
                            />
                            <WrapperComponent
                                ComponentName={"Image"}
                                Data={{
                                    Image: ListDownImage
                                }}
                                Events={{
                                    OnClickEventHandler: () => { objContext.AssignTaskToDescription_ModuleProcessor.OnListDown(objContext) }
                                }}
                                ParentProps={props.ParentProps}
                            />
                            <WrapperComponent
                                ComponentName={"Image"}
                                Data={{
                                    Image: DeleteImage
                                }}
                                Events={{
                                    OnClickEventHandler: () => { objContext.AssignTaskToDescription_ModuleProcessor.RemoveFromList(objContext) }
                                }}
                                ParentProps={props.ParentProps}
                            />
                            <WrapperComponent
                                ComponentName={"Image"}
                                Data={{
                                    Image: ResetImage
                                }}
                                Events={{
                                    OnClickEventHandler: () => { objContext.AssignTaskToDescription_ModuleProcessor.OnListEmpty(objContext) }
                                }}
                                ParentProps={props.ParentProps}
                            />
                        </div>

                        {GetList()}

                        <div className="form-block">
                            <input id="NodeId" type="text" onChange={(e) => { objContext.AssignTaskToDescription_ModuleProcessor.HandleChange(e.target.value, objContext) }} value={state.strTaskId} />
                            <button id="ButtonId" type="button" className="btn" onClick={(e) => { objContext.AssignTaskToDescription_ModuleProcessor.AddTaskById(objContext) }}>Add{props.Resource.Text["Add"]}</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>;
    }

    return props.isLoadComplete || state.isLoadComplete ? GetContent() : <React.Fragment />;

};

///**
// * @name GetImageMeta
// * @summary forms the default images for inline import.
// * */
//const GetImageMeta = () => {
//    return {
//        FolderImage: FolderImage,
//        TaskImage: TaskImage
//    }
//}
export default AssignTaskToDescription;

