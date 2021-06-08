//react imports
import React, { useState, useRef } from "react";

//Inline Images import
import ExclamationMarkImage from '@inlineimage/Application/d.Extranet/5_Shared/PC/exclamation_mark.svg?inline';
import SelectAllImage from '@inlineimage/Application/d.Extranet/5_Shared/PC/selectAll.svg?inline';

/**
 * @name ShareFolderPopup
 * @summary this popup shows the pupil to share the folder.
 * @param {any} props
 * @returns {Element}
 */
const ShareFolderPopup = props => {
    const markAllRef = useRef(null);
    const [arrUserData, setUserData] = useState(GetModifiedUsers(props.Data.arrPupilData));
    const [blnReadOnly, setReadOnly] = useState(props.Data.objSelectedFolder.cIsReadOnly == "Y" ? true : false);
    const [blnDisplayValidationMessage, setValidationMessage] = useState(false);

    let objTextResource = props.Resource.Text;

    return (
        <div className="share-folder-wrapper-class">

            <div className="share-message">
                <div class="share-folder-top">
                    <span className="share-header" id="ShareTitle">{Localization.TextFormatter(objTextResource, 'ShareFolderPopUpHeader')}</span>
                    <div className="readOnly-check">
                        <span>{Localization.TextFormatter(objTextResource, 'ReadOnlyText')}</span>
                        <div className="check-list">
                            <input type="checkbox" id="readOnly" value="readOnly" checked={blnReadOnly} onClick={() => setReadOnly(!blnReadOnly)} />
                            <label className="checkmark" for="readOnly"></label>
                        </div>
                    </div>
                </div>
                <ul className="add-participant">
                    <li>
                        <div className="participant-name-icons">
                            <img src={SelectAllImage} alt="" />
                            <span className="participants-name">{Localization.TextFormatter(objTextResource, 'SelectAllResourceText')}</span>
                        </div>
                        <div className="check-list">
                            <input type="checkbox" value="markAll" ref={markAllRef} id="markAll" onClick={MarkAll} />
                            <label className="checkmark" for="markAll" />
                        </div>
                    </li>
                    {arrUserData ? GetUserElements() : ''}
                </ul>

            </div>

            <div class="footer-block">
                <button className="footerclose-button button" onClick={e => Popup.ClosePopup(props.Id)}> {Localization.TextFormatter(objTextResource, 'Close')} </button>
                {
                    blnDisplayValidationMessage ?
                        <div className="error-msg">
                            <img src={ExclamationMarkImage} alt="" />
                            <span>{Localization.TextFormatter(objTextResource, 'ShareFolderPopupUserValidationForReadOnly')}</span>
                        </div>
                        : <React.Fragment />
                }

                <button className="button yellow-button" onClick={() => { OnClickAssign() }}>{Localization.TextFormatter(objTextResource, 'Assign')}</button>
            </div>
        </div>
    );

    /**
     * @name GetModifiedUsers
     * @summary makes the isSelected will true already shared.
     * @param {any} arrData
     * @returns {Array}
     */
    function GetModifiedUsers(arrData) {
        var arrModifiedUserData = arrData.map(u => {
            if (props.Data.arrSelectedList.find(s => s["uUserId"] == u["uPupilId"]))
                return { ...u, isSelected: true }
            else
                return { ...u, isSelected: false }
        });
        return arrModifiedUserData;
    }

    /**
     * @name GetUserElements
     * @summary forms the elements of user with their profile image.
     * @returns {Element}
     * */
    function GetUserElements() {
        let arrPupilWithImage = arrUserData.map(p => {
            return {
                ...p,
                vImagePath: props.Data.arrUserPreferenceImages.find(pImg => pImg["uPupilId"] == p["uPupilId"])["vImagePath"]
            }
        })
        const arrUserElements = arrPupilWithImage.map((u) =>
            <li key={u.uPupilId}>
                <div className="participant-name-icons">
                    <img src={props.JConfiguration.WebDataPath + u["vImagePath"]} alt="" />
                    <span className="participants-name">{u.vFirstName}</span>
                </div>
                <div className="check-list">
                    <input type="checkbox" id={u.uPupilId} name={u.uPupilId} checked={u.isSelected} value={u.uPupilId} onChange={OnClickCheckBox} />
                    <label className="checkmark" for={u.uPupilId} />
                </div>
            </li>
        )
        return arrUserElements;
    }

    /**
     * @name OnClickCheckBox
     * @summary to update the state.
     * @param {any} event
     */
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
        if (arrUsers.length>0) {
            setValidationMessage(false);
        }
    }

    /**
     * @name OnClickAssign
     * @summary calls the parent component's assign method and closes the popup.
     * */
    function OnClickAssign() {
        let arrFilteredUsers = arrUserData.filter(u => u.isSelected);
        let blnAssignUserstoFolder = true;
        if (blnReadOnly && arrFilteredUsers.length == 0) {
            blnAssignUserstoFolder = false;
        } if (blnAssignUserstoFolder) {
            props.Data.OnClickAssign(arrFilteredUsers, blnReadOnly);
            Popup.ClosePopup(props.Id);
        } else {
            setValidationMessage(true);
        }        
    }

    /**
     * @name MarkAll
     * @summary to check or uncheck all.
     * @param {any} event
     */
    function MarkAll(event) {
        let arrUsers = arrUserData.map(u => {
            return { ...u, isSelected: event.target.checked }
        });
        if (event.target.checked) {
            setValidationMessage(false);
        }
        setUserData(arrUsers)
    }
};

/**
 * @name DynamicStyles
 * @summary styles required for the popup.
 * @returns {Array}
 */
ShareFolderPopup.DynamicStyles = () => {
    return [
        JConfiguration.ExtranetSkinPath +
        "/Css/Application/3_Teacher/ReactJs/PC/TeacherDocument/TeacherDocumentPopup/ShareFolderPopup.css"
    ];

};

export default ShareFolderPopup;
