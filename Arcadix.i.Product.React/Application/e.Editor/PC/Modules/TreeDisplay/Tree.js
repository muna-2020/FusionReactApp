import React, { useEffect } from 'react';
//import '@root/Framework/Controls/TreeDisplay/Tree.css';
import TreeNode from '@root/Application/e.Editor/PC/Modules/TreeDisplay/TreeNode';

//Application State classes
import EditorState from "@shared/Framework/DataService/EditorState/EditorState";

const Tree = (props) => {

    /**
     * @name useEffect.
     * @summary To load styles.
     */
    useEffect(() => {
        let strStyle = props.JConfiguration.EditorSkinPath + "/Css/Framework/Controls/TreeDisplay/TreeDisplay.css";
        if (document && !document.getElementById(strStyle)) {
            var objStyle = document.createElement('link');
            objStyle.id = strStyle;
            objStyle.setAttribute("rel", "stylesheet");
            objStyle.setAttribute("href", strStyle);
            objStyle.setAttribute('type', 'text/css');
            document.head.appendChild(objStyle);
        }
    }, []);



    return (<div className="folder-tre all">
        <ul>
            {
                props.NodeData ? props.NodeData.map(TNode => {
                    return (<TreeNode key={TNode.Id} JConfiguration={props.JConfiguration} {...props} Node={TNode} />);
                }) : ""
            }
        </ul>
    </div>);
}

export default Tree;