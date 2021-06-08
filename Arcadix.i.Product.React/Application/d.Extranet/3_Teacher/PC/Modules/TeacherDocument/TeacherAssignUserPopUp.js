import React, { useState, useRef } from 'react';


const TeacherAssignUserPopUp = (props) => {
    const markAllRef = useRef(null)

    const [arrUserData, setUserData] = useState(GetModifiedUsers(props.passedEvents.arrPupilData));
 
    return (
        <div>
            <input type="checkbox" value="markAll" id="markAll" onClick={MarkAll} ref={markAllRef}/>

            {arrUserData ? GetUserElements() : ''}
            <button className="button yellow-button" onClick={OnClickAssign}> Assign</button>
        </div>
    );

    function GetModifiedUsers(arrData) {
        var arrModifiedUserData = arrData.map(u =>
        {
            if (props.passedEvents.arrSelectedList.find(s => s["uUserId"] == u["uPupilId"]))
                return { ...u, isSelected: true }
            else
                return { ...u, isSelected: false }
        });
        
        return arrModifiedUserData;
    }

    function GetUserElements() {
        const arrUserElements = arrUserData.map((u) =>
            <li key={u.uPupilId}>
                <span>{u.vFirstName}</span>
                <label>
                    <input type="checkbox" name={u.uPupilId} checked={u.isSelected} value={u.uPupilId} onChange={OnClickCheckBox} />
                    <span className="checkmark" />
                </label>
            </li >

        )
      //  CheckAllSelected();
        return arrUserElements;
    }

    function OnClickCheckBox(event) {
        let arrUsers = arrUserData.map(u => {
            if (event.target.value == u.uPupilId)
                return {
                    ...u,
                    isSelected: event.target.checked
                }
            else
                return {
                    ...u
                }
        });
        let unChecked = arrUsers.find(x => x.isSelected == false);
        var markAllElement = markAllRef.current; //document.getElementById("markAll");
        if (unChecked == undefined) {
            markAllElement.checked = true;
        }
        if (unChecked != undefined) {
            markAllElement.checked = false;
        }
        setUserData(arrUsers);
    }

    function OnClickAssign() {
        props.passedEvents.OnClickAssign(arrUserData.filter(u => u.isSelected));
        props.closePopUp(props.objModal);
    }

    function MarkAll(event) {
        let arrUsers = arrUserData.map(u => {
            return { ...u, isSelected: event.target.checked }
        });

        setUserData(arrUsers)
    }

    function CheckAllSelected() {
        if (arrUserData.find(u => u["isSelected"] == false) == undefined) {
            var markAllElement = markAllRef.current; //document.getElementById("markAll");
            markAllElement.checked = true;
        }
    }

};


export default TeacherAssignUserPopUp;