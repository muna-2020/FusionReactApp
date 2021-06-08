import React, { useReducer } from 'react';
import * as BusinessLogic from '@shared/Application/e.Editor/Modules/6_CMSElement/CMSImage/TreeNodeBusinessLogic';
import '@root/Application/e.Editor/PC/Modules/6_CMSElement/CMSImage/ImageAddEdit/Tree/Tree.css';

const TreeNode = props => {
    const [state, dispatch] = useReducer(BusinessLogic.reducer, { ...props.Node, expand: false });
    const OpenClose = () => {
        if (state.Type === "Image_Folder") {
            dispatch({ type: "CHANGE" });
        }
        else {
            props.onClick(state);
        }
    }
    return (<li>
        <span className={state.Children.length > 0 ? ("caret " + (state.expand ? "caret-down" : "")) : ""} onClick={OpenClose} > <img src={props.JConfiguration.EditorSkinPath + "/Images/" + state.Icon} alt="" />{state.Name}</span>
        <ul className={"nested " + (state.expand ? "active" : "")}>
            {
                state.Children.map(Child => {
                    return (<TreeNode {...props} Node={Child} />)
                })
            }
        </ul>
    </li>)
}

export default TreeNode;