import React, { useEffect } from 'react';
import SimpleTree from '@root/Framework/Controls/SimpleTree/SimpleTree';

const NodeData = [
            { id: 1, pid: 'root', icon: "folder_brown.png", name: 'Discover Music', expanded: true  },
            { id: 2, pid: 1, icon: "folder_brown.png", name: 'Live Music' },
            { id: 3, pid: 1, icon: "folder_brown.png", name: 'Live Concert' },
            { id: 4, pid: 'root', icon: "folder_brown.png", name: 'Singles', expanded: true },
            { id: 5, pid: 'root', icon: "folder_brown.png", name: 'Rising Artists' },
            { id: 6, pid: 'root', icon: "folder_brown.png", name: 'Live Music' },
            { id: 7, pid: 4, icon: "folder_brown.png", name: 'Sales and Events' },
            { id: 8, pid: 4, icon: "folder_brown.png", name: '100 Albums - $5 Each' },
            { id: 9, pid: 4, icon: "folder_brown.png", name: 'Hip-Hop and R&B Sale' },
            { id: 10, pid: 4, icon: "folder_brown.png", name: 'CD Deals' },
            { id: 11, pid: 10, icon: "folder_brown.png", name: 'amazon' },
            { id: 12, pid: 10, icon: "folder_brown.png", name: 'Songs' },
            { id: 13, pid: 10, icon: "folder_brown.png", name: 'Bestselling Albums' },
            { id: 14, pid: 10, icon: "folder_brown.png", name: 'New Releases' },
            { id: 15, pid: 10, icon: "folder_brown.png", name: 'Bestselling Songs' },
            { id: 16, pid: 15, icon: "folder_brown.png", name: 'MP3 Albums' },
            { id: 17, pid: 16, icon: "folder_brown.png", name: 'Rock' },
            { id: 18, pid: 16, icon: "folder_brown.png", name: 'Gospel' },
            { id: 19, pid: 16, icon: "folder_brown.png", name: 'Latin Music' },
            { id: 20, pid: 16, icon: "folder_brown.png", name: 'Jazz' },
            { id: 21, pid: 20, icon: "folder_brown.png", name: 'More in Music' },
            { id: 22, pid: 21, icon: "folder_brown.png", name: 'Music Trade-In' },
            { id: 23, pid: 21, icon: "folder_brown.png", name: 'Redeem a Gift Card' },
            { id: 24, pid: 21, icon: "folder_brown.png", name: 'Band T-Shirts' },
            { id: 25, pid: 6, icon: "folder_brown.png", name: 'Fiction Book Lists' },
            { id: 26, pid: 5, icon: "folder_brown.png", name: 'To Kill a Mockingbird' },
            { id: 27, pid: 25, icon: "folder_brown.png", name: 'Pride and Prejudice' },
            { id: 28, pid: 25, icon: "folder_brown.png", name: 'Harry Potter' },
            { id: 29, pid: 25, icon: "folder_brown.png", name: 'The Hobbit' }
        ];  

const OnSelectNode = (objSelectedNode, arrNewNodes) => {              
       console.log("objSelectedNode ", objSelectedNode);
       console.log("arrNewNodes ", arrNewNodes);
}

const OnDragAndDrop = (arrDraggedNodes) => {
    console.log("arrDraggedNodes ", arrDraggedNodes);
} 

const OnExpandOrCollapse = (arrNewNodes, SelectedParent) => {      
    console.log("arrNewNodes ", arrNewNodes);  
    console.log("SelectedParent ", SelectedParent);  
}

const SimpleTree_Sample = props => {
    useEffect(() => {
        ApplicationState.SetProperty("blnShowAnimation", false);
    });

    const NodeFields = { Id: 'id', ParentId: 'pid', Text: 'name', Root: 'root', IconPath: props.JConfiguration.ExtranetSkinPath + '/Images/Common/Icons/' };

    var jsx = (
        <SimpleTree
            NodeFields={NodeFields}
            NodeData={NodeData}
            OnSelectNode={OnSelectNode}
            OnDragAndDrop={OnDragAndDrop}
            OnExpandOrCollapse={OnExpandOrCollapse}
            JConfiguration={props.JConfiguration}
        />
    );
    return jsx;
};

export default SimpleTree_Sample;
