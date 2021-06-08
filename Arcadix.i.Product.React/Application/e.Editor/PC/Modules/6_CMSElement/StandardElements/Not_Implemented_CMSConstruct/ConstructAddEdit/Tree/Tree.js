import React,{useEffect} from 'react';
import '@root/Application/e.Editor/PC/Modules/6_CMSElement/CMSImage/ImageAddEdit/Tree/Tree.css';
import TreeNode from '@root/Application/e.Editor/PC/Modules/6_CMSElement/CMSImage/ImageAddEdit/Tree/TreeNode';


 const Tree =(props) =>{
    useEffect(()=>{
        console.log("tree entered");
    },[])

  
    return (<div className="folder-tre all">
    <ul>
        {
          props.NodeData?  props.NodeData.map(TNode=>{
                return (<TreeNode JConfiguration={props.JConfiguration} onClick={props.NodeClick} Node={TNode}/>);
            }):""
        }
    </ul>
    </div>);
}

export default Tree;