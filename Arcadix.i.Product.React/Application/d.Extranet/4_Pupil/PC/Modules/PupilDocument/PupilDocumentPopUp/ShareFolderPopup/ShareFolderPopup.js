//React imports
import React, { useState, useRef } from "react";

//Inline Images import
import imgSelectAll from '@inlineimage/Application/d.Extranet/4_Pupil/PC/Modules/PupilDocument/PupilDocumentPopUp/ShareFolderPopup/selectAll.svg?inline';

/**
 * @name ShareFolderPopup
 * @summary popup for assign folders.
 * @param {any} props
 * @returns {Element}
 */
const ShareFolderPopup = props => {

    const [arrUserData, SetUserData] = useState(GetModifiedUsers(props.Data.arrUserData));

    let objTextResource = props.Resource.Text;

    const markAllRef = useRef(null)

    return (
        <div className="share-folder-wrapper-class">
            <div className="share-message">
                <div className="share-header">
                    <span className="share-header-title" id="ShareTitle">{Localization.TextFormatter(objTextResource, 'ShareFolderPopUpHeader')}</span>
                    <div className="header-checkbox">
                        <span className="header-checkbox-title">nur lesen</span>
                        <div className="header-checkbox-control">
                            <input type="checkbox" id="justRead" />
                            <label for="justRead" />
                        </div>
                    </div>
                </div>
                <ul className="add-participant">
                    <li>
                        <div className="participant-name-icons">
                            <img src={imgSelectAll} alt="" />
                            <span className="participants-name">{Localization.TextFormatter(objTextResource, 'SelectAllResourceText')}</span>
                        </div>
                        <div className="check-list">
                            <input type="checkbox" value="markAll" id="markAll" ref={markAllRef} onClick={MarkAll} />
                            <label className="checkmark" for="markAll" />
                        </div>
                    </li>
                    {arrUserData ? GetUserElements() : ''}
                </ul>
            </div>

            <div class="footer-block">
                <button className="button orange-button" onClick={e => Popup.ClosePopup(props.Id)}> {Localization.TextFormatter(objTextResource, 'Close')} </button>
                <button className="button orange-button" onClick={() => { OnClickAssign() }}>{Localization.TextFormatter(objTextResource, 'Save')}</button>
            </div>
        </div>
    );

    /**
     * @name GetModifiedUsers
     * @summary returns already selected users as true
     * @param {any} arrData
     * @returns {Array}
     */
    function GetModifiedUsers(arrData) {
        let arrFiletredUserData = arrData.filter(u => u["uPupilId"] != props.Data.strUserId)
        let arrModifiedUserData = arrFiletredUserData.map(u => {
            if (props.Data.arrSelectedList.find(s => s["uUserId"] == (u["uPupilId"] || u["uTeacherId"])))
                return { ...u, isSelected: true }
            else
                return { ...u, isSelected: false }
        });
        return arrModifiedUserData;
    }

    /**
     * @name GetUserElements
     * @summary returns the user Elements.
     * @returns {Array}
     * */
    function GetUserElements() {
        //let arrPupilWithImage = arrUserData.map(objUserData => {
        //    return {
        //        ...objUserData,
        //        vImagePath: props.Data.arrUserPreferenceImages.find(objImg => objImg["uPupilId"] == objUserData["uPupilId"])["vImagePath"]
        //    }
        //})
        const arrUserElements = arrUserData.map((objUser) =>
            <li key={objUser.uPupilId}>
                <div className="participant-name-icons">
                    <img src={objUser["vImagePath"]} alt="" />
                    <span className="participants-name">{objUser.vFirstName}</span>
                </div>
                <div className="check-list">
                    <input type="checkbox" id={objUser.uPupilId || objUser.uTeacherId} value={objUser.uPupilId || objUser.uTeacherId} checked={objUser.isSelected} onChange={OnClickCheckBox} />
                    <label className="checkmark" for={objUser.uPupilId || objUser.uTeacherId} />
                </div>
            </li>
        )
        return arrUserElements;
    }

    /**
     * @name OnClickCheckBox
     * @summary Updates the state checkbox selected or not.
     * @param {any} event
     */
    function OnClickCheckBox(event) {
        let arrUsers = arrUserData.map(objUserData => {
            if (event.target.value == (objUserData.uPupilId || objUserData.uTeacherId))
                return {
                    ...objUserData,
                    isSelected: event.target.checked
                }
            else
                return {
                    ...objUserData
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
        SetUserData(arrUsers);
    }

    /**
     * @name OnClickAssign
     * @summary Calls the parent Assign method and closes the popup.
     * */
    function OnClickAssign() {
        props.Events.OnClickAssign(arrUserData.filter(u => u.isSelected));
        Popup.ClosePopup(props.Id);
    }

    /**
     * @name MarkAll
     * @summary Select or Deselect all checkbox
     * @param {any} event
     */
    function MarkAll(event) {
        let arrUsers = arrUserData.map(objUserData => {
            return { ...objUserData, isSelected: event.target.checked }
        });
        SetUserData(arrUsers)
    }
};

/**
 * @name DynamicStyles
 * @summary styles required for the popup.
 * @param {any} props
 * @returns {Array}
 */
ShareFolderPopup.DynamicStyles = props => {
    return [props.JConfiguration.ExtranetSkinPath + "/Css/Application/4_Pupil/ReactJs/PC/Modules/PupilDocument/PupilDocumentPopUp/ShareFolderPopup.css"];
};

export default ShareFolderPopup;
