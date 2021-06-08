import React, { useReducer } from 'react';

const TreeNode = props => {

    const reducer = (state, action) => {
        switch (action.type.toUpperCase()) {
            case "CHANGE": return {
                ...state,
                expand: !state.expand
            }
        }
    }

    const [state, dispatch] = useReducer(reducer, { ...props.Node }); //, expand: props.Node.PId === -1 && props.Node.Id === 0 ? true : false });
    const OpenClose = () => {
        if (state.Type.includes("Folder")) {
            dispatch({ type: "CHANGE" });
        }
        else {
            props.NodeClick(state);
        }
    }
    return (
        <li>
            <span className={state.Children.length > 0 ? ("caret " + (state.expand ? "caret-down" : "")) : ""} onClick={OpenClose}>
            <img src={props.JConfiguration.IntranetSkinPath + "/Images/Common/Download/" + state.Icon} alt="" />{state.Name}</span>
            <ul className={state.expand ? "shownode" : "hidenode"} style={{"marginLeft": "10px"}}>
                        {
                            state.Children.map(Child => {
                                return (
                                    <TreeNode key={Child.Id} {...props} Node={Child} />
                                )
                            })
                        }
                    </ul>
        </li>
    );
}

export default TreeNode;