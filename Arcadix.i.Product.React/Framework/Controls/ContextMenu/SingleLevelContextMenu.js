// React related imports.
import React, { useRef, useLayoutEffect, useReducer } from "react";

//Base classes.
import * as Base_Hook from '@shared/Framework/BaseClass/Base_Hook';

//Component Specific import
import * as SingleLevelContextMenu_Hook from '@shared/Framework/Controls/ContextMenu/SingleLevelContextMenu_Hook.js';

/**
* @name SingleLevelContextMenu
* @param {object} props props
* @summary This component displays the SingleLevelContextMenu.
* @returns {object} React.Fragement that encapsulated the SingleLevelContextMenu.
*/
const SingleLevelContextMenu = (props) => {

    //Holds the reference the main div => Full Context menu => Full Component
    const refMainDiv = useRef(null);

     /**
     * @name [state,dispatch]
     * @summary Define state and dispatch for the reducer to set state.
     * @returns {[]} state and dispatch
     */
    const [state, dispatch] = useReducer(Base_Hook.Reducer, SingleLevelContextMenu_Hook.GetInitialState(props));

     /**
     * @name useLayoutEffect
     * @summary To set the dimensions before the rendering happens.
     */
    useLayoutEffect(() => {
        HandleContextMenu(); 
        return () => {};
    },[]);

    /**
    * @name HandleContextMenu
    * @summary Based on the objContent from the HOC(from the mouse point, window dimensions and other stuffs), to allign the Context menu.
    * @returns {object} React.Fragement that encapsulated the Tree.
    */
    const HandleContextMenu = () =>{
        var ClientObj = props.Data.SingleLevelContextMenuDetails;
        var righAligned, bottomAligned;
        if (!ClientObj.isRoot) {
            var right = ClientObj.boundingClient.right;
            var left = ClientObj.boundingClient.left;
            var top = ClientObj.boundingClient.top;
            var bottom = ClientObj.boundingClient.bottom;
            var screenW = window.innerWidth;
            var screenH = window.innerHeight;
            var ElWidth = refMainDiv.current.offsetWidth;
            var ElHeight = refMainDiv.current.offsetHeight;
            var clickY = ClientObj.clientY;

            var dispRight, dispLeft
            if (props.Data.SingleLevelContextMenuDetails.righAligned) {
                dispRight = (screenW - right) > ElWidth;
                dispLeft = !dispRight;
                righAligned = dispRight;
            }
            else {
                dispLeft = left > ElWidth;
                dispRight = !dispLeft;
                righAligned = dispRight;
            }

            var dispBottom, dispTop
            if (props.Data.SingleLevelContextMenuDetails.bottomAligned) {
                dispBottom = (screenH - clickY) > ElHeight;
                dispTop = !dispBottom;
                bottomAligned = dispBottom;
            }
            else {
                dispTop = top > ElHeight
                dispBottom = !dispTop
                bottomAligned = dispBottom;
            }

            if (dispRight) {
                refMainDiv.current.style.left = `${right}px`;
            }

            if (dispLeft) {
                refMainDiv.current.style.left = `${left - ElWidth}px`;
            }

            if (dispBottom) {
                refMainDiv.current.style.top = `${clickY}px`;
            }

            if (dispTop) {
                refMainDiv.current.style.top = `${clickY - ElHeight}px`;
            }

        }
        else {
            if (ClientObj === undefined) {
                ClientObj = {};
                ClientObj.clientX = ClientObj.clickX ? ClientObj.clickX : 0;
                ClientObj.clientY = ClientObj.clickY ? ClientObj.clickY : 0;
            }

            console.log('clientObj', ClientObj);

            var clickX = ClientObj.clientX;
            var clickY = ClientObj.clientY;
            var screenW = window.innerWidth;
            var screenH = window.innerHeight;
            var rootW = refMainDiv.current.offsetWidth;
            var rootH = refMainDiv.current.offsetHeight;

            var right = (screenW - clickX) > rootW;
            righAligned = right;
            var left = !right;
            var top = (screenH - clickY) > rootH;
            var bottom = !top;
            bottomAligned = top;
            console.log('left =', left);
            console.log('right =', right);

            if (right) {
                refMainDiv.current.style.left = `${clickX}px`;
            }

            if (left) {
                refMainDiv.current.style.left = `${clickX - rootW}px`;
            }

            if (top) {
                refMainDiv.current.style.top = `${clickY}px`;
            }

            if (bottom) {
                refMainDiv.current.style.top = `${clickY - rootH}px`;
            }
        }
        dispatch({ type: "SET_STATE", payload: { "blnRighAligned": righAligned } });
        dispatch({ type: "SET_STATE", payload: { "blnBottomAligned": bottomAligned } });
    };

    /**
     * @name OnMouseOverEvent
     * @param {*} event 
     * @param {*} objItem 
     * @summary Takes the event details and calls props.addContextMenu to add sub levels.
     */
    const OnMouseOverEvent = (event, objItem) => {
        //Dimensions of the main div
        var objDimensions = {
            right: refMainDiv.current.offsetLeft + refMainDiv.current.offsetWidth,
            left: refMainDiv.current.offsetLeft,
            top: refMainDiv.current.offsetTop,
            bottom: refMainDiv.current.offsetTop + refMainDiv.current.offsetHeight,
            righAligned: state.blnRighAligned,
            bottomAligned: state.blnBottomAligned
        }
        var objLevel = {
            level: props.Data.SingleLevelContextMenuDetails.level
        }
        props.CallBacks.AddContextMenu(event, objItem, objDimensions, objLevel);
    }

    const { contentList } = props.Data.SingleLevelContextMenuDetails;  

    return (
        <ul ref={refMainDiv} className="contextMenu">
            {
                contentList.map((objItem) => {
                    let objDisableStyle = { opacity: "0.7" };
                    return (
                        <li className="contextMenu-option" style={objItem.Disabled ? objDisableStyle : {}}
                            onMouseOver={(event) => OnMouseOverEvent(event, objItem)}
                            onMouseDown={() => { if (objItem.Event && !objItem.Disabled) objItem.Event(props.Data.NodeId);  }}
                        >
                            {objItem.Image ? <img src={props.ParentProps.JConfiguration.IntranetSkinPath + "/Images/Common/JContextMenu/CMS/ContextMenu/" + objItem.Image} /> : <React.Fragment />}
                            <span>{objItem.Text}</span>
                            {props.Data.IsSubLevelsPresent(objItem.Id) ? <img src={props.ParentProps.JConfiguration.IntranetSkinPath + "/Images/Common/JContextMenu/Arrow.gif"} className="has-children" /> : <React.Fragment />}
                        </li>
                    )
                })
            }
        </ul>
    )
}

export default SingleLevelContextMenu;