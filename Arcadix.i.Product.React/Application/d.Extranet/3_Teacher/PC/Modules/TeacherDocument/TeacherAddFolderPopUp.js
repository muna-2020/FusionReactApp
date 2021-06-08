import React, { useState, useRef } from 'react';


const TeacherAddFolderPopUp = (props) => {
    const [folderName, setFolderName] = useState(props.passedEvents.strFolderName);
    const objTextInputRef = useRef();
    return (
        <div>
            <span>Folder Name</span>
            <input type="text" ref={objTextInputRef} value={folderName} onChange={(e) => { setFolderName(e.target.value) }} />
            <div>
                <button onClick={OnClickSave}> Save</button>
            </div>
        </div>
    );



   useEffect(() => {
      
        objTextInputRef.current.focus();

    });

    function OnClickSave() {       
        props.passedEvents.ClickSave(folderName);
        props.closePopUp(props.objModal);
    }
};


export default TeacherAddFolderPopUp;