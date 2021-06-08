// React related imports.
import React, { useRef, useReducer, forwardRef } from 'react';
import { connect } from 'react-redux';

//Base classes.
import * as Base_Hook from '@shared/Framework/BaseClass/Base_Hook';

//Components used.
import Node from '@root/Framework/Controls/Tree/Node';

//Component related files.
import * as Tree_Hook from '@shared/Framework/Controls/Tree/Tree/Tree_Hook';
import Tree_CompontProcessor from '@shared/Framework/Controls/Tree/Tree/Tree_CompontProcessor';

//Dragdrop Import
import Dragdrop from '@root/Framework/Controls/Dragdrop/Dragdrop';

//Drag drop Related files
import DragZone from '@root/Framework/Controls/DragDrop/DragZone/DragZone';
import * as UniqueId from "@root/Framework/Services/UniqueId/UniqueId";



/**
* @name Tree
* @param {object} props props
* @summary This component displays the Tree data.
* @returns {object} React.Fragement that encapsulated the Tree.
*/
const Tree = (props, ref) => {

    /**
     * @name [state,dispatch]
     * @summary Define state and dispatch for the reducer to set state.
     * @returns {[]} state and dispatch
     */
    const [state, dispatch] = useReducer(Base_Hook.Reducer, Tree_Hook.GetInitialState(props));

    /**
   * @name refNodes
   * @summary ref object to hold the reference of the Rows created
   */
    let refTree = useRef({});

    /**
    * @name UpdateRef
    * @summary ref object to hold the reference of the Rows created
    */
    const UpdateRef = (refTree) => {
        refTree = refTree;
    }

    /**
   * @name GetRef
   * @summary ref object to hold the reference of the Rows created
   */
    const GetRef = () => {
        return refTree
    }

    /**
    * @name objContext.
    * @summary Groups state.dispatch and module object(s) in objContext.
    * @returns {object} objContext.
    */
    let objContext = { state, props, dispatch, ["ModuleName"]: props.Id, ["Tree_CompontProcessor"]: new Tree_CompontProcessor(), refTree, UpdateRef };

    /**
     * @name  Initialize
     * @param {object} objContext objContext
     * @param {object} ModuleProcessor ModuleProcessor
     * @summary Initializing API and DynamicStyles
     * @returns null
     */
    objContext.Tree_CompontProcessor.Initialize(objContext, objContext.Tree_CompontProcessor);

    /**
    * @name Initialize
    * @param {object} objContext context object
    * @summary Initialize method call in Dropdown_Hook, that contains all the custom hooks.
    * @returns null
    */
    Tree_Hook.Initialize(objContext, ref);

    /**
    * @name AllowDrop
    * @param {*} event
    * @summary to make the html element to allow the drop 
    */
    const AllowDrop = (event) => {
        event.preventDefault();
    }

    /**
    * @name OnDragStart
    * @param {*} event
    * @param {*} strDragNodeId
    * @summary To set the Node Id in the DataTransfer while dragging. 
    */
    const OnDragStart = (event, strDragNodeId) => {
        event.dataTransfer.setData("NodeElementID", strDragNodeId);
        event.stopPropagation();
    }

    /**
    * @name OnDrop
    * @param {*} event
    * @param {*} strDropNodeId
    * @summary To take the Node Id from the DataTransfer and form the Node Data accordingly.
    */
    const OnDrop = (event, strDropNodeId) => {
        event.stopPropagation();
        let strDragNodeId = event.dataTransfer.getData("NodeElementID");
        objContext.Tree_CompontProcessor.HandleDrop(strDragNodeId, strDropNodeId, objContext);
    }

    /**
    * @name OnContextMenuClick
    * @param {*} event
    * @summary To handle Context menu and make the callback for the context Menu.
    */
    const OnContextMenuClick = (event, objNode) => {
        if (props.Events.OnContextMenuClick) {
            event.preventDefault();
            event.stopPropagation();
            let objContextMenuDimensions = {
                clientX: event.clientX,
                clientY: event.clientY
            };
            props.Events.OnContextMenuClick(objContextMenuDimensions, objNode);
        }
    }



    /**
    * @name GetNodes
    * @param {*} arrNodes
    * @param {*} strParentId
    * @param {*} intSpace
    * @summary Loops through the TreeData to form the NestedChildren.
    * @returns {Array} Array that contains the children for the ParentId given and the sub arrays within them that conatain their children and so on.
    */
    const GetNodes = (arrNodes, strParentId, intSpace = props.Meta.LeftPaddingValue ? props.Meta.LeftPaddingValue : 0) => {
        var domNodes = [];
        for (var intNodeIndex in arrNodes) {
            let objNode = arrNodes[intNodeIndex];
            objNode = props.CallBacks.OnBeforeShowNode ? props.CallBacks.OnBeforeShowNode(objNode, intNodeIndex) : objNode;
            if (objNode && objNode[props.Meta.ParentIdField] == strParentId) {
                let blnIsNodeExpanded = objContext.Tree_CompontProcessor.IsExpanded(objNode, objContext) || objNode.expanded;
                var domChildren = [];
                let blnHasChildren = arrNodes.find(objCheckNode => objCheckNode[props.Meta.ParentIdField] == objNode[props.Meta.IdField]);
                if (blnIsNodeExpanded && blnHasChildren || props.Meta.OpenChildNodes) {
                    domChildren = <ul dragdrop_dragareatype="DragArea" className={"sub-folder"}
                    //onDragOver={(ev) => { ev.preventDefault() }}
                    >
                        {GetNodes(arrNodes, objNode[props.Meta.IdField], intSpace + 10)}
                    </ul>
                }
                const refNode = React.createRef();
                refTree.current[objNode[props.Meta.IdField]] = refNode;
                let domNode = <ul id={objNode[props.Meta.IdField]}>
                    <li
                        dragdrop_dragareatype="DragArea"
                        style={{ paddingLeft: props.Meta.LeftPaddingValue ? props.Meta.LeftPaddingValue : 0 + 'px' }}
                        id={objNode[props.Meta.IdField]}
                        //draggable
                        key={objNode[props.Meta.IdField]}
                        //id={objNode[props.Meta.IdField]}
                        //onDragStart={(event) => { OnDragStart(event, objNode[props.Meta.IdField]) }}
                        //onDragOver={AllowDrop}
                        //onDrop={(event) => { OnDrop(event, objNode[props.Meta.IdField]) }}
                        onContextMenu={(event) => { OnContextMenuClick(event, objNode); }}
                    > <Node
                            ref={refNode}
                            Id={objNode[props.Meta.IdField]}
                            Meta={{
                                ...props.Meta,
                                PaddingLength: intSpace,
                                HasChildren: blnHasChildren,
                                IsNodeExpanded: blnIsNodeExpanded,
                                TreeId: props.Id
                            }}
                            Data={{
                                NodeData: objNode,
                                SelectedNode: state.objSelectedNode
                            }}
                            Resource={props.Resource}
                            Events={{
                                OnExpandOrCollapse: () => objContext.Tree_CompontProcessor.OnExpandOrCollapse(objNode, objContext, blnIsNodeExpanded),
                                OnNodeClick: () => objContext.Tree_CompontProcessor.OnSelectNode(objNode, objContext, GetRef()),
                                OnDoubleClick: () => objContext.props.Events && objContext.props.Events.OnDoubleClick ? objContext.props.Events.OnDoubleClick(objNode) : {}
                            }}
                        />
                    </li>


                    {blnHasChildren ? domChildren : <React.Fragment />}
                </ul >
                domNodes.push(domNode);
            }
        }
        return domNodes;
    }

    /**
     * @name GetContent
     * @summary Dropdown JSX formation 
     * @returns {object} JSX for Dropdown
     */
    const GetContent = () => {
        let arrNodeData = [{ [props.Meta.IdField]: props.Meta.RootNodeId }, ...props.Data.NodeData]
        return <div id="Tree_Body" className="tree">
            {props.Meta.AllowDragDrop
                ?
                <DragZone {...objContext.Tree_CompontProcessor.GetDragDropProps(objContext)}>
                    {GetNodes(arrNodeData, props.Meta.RootNodeId)}
                </DragZone>
                :
                GetNodes(arrNodeData, props.Meta.RootNodeId)
            }
        </div>
    }

    return GetContent();

};

//export default Tree;
export default forwardRef(Tree);
//export default connect(Base_Hook.MapStoreToProps(Tree_CompontProcessor.StoreMapList()))(Tree);