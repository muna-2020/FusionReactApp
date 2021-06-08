//React imports.
import React, { useState, useReducer, useRef } from 'react';
import { connect } from 'react-redux';

//Module specific imports
import * as TeacherDocument_Hook from '@shared/Application/d.Extranet/3_Teacher/Phone/Modules/TeacherDocument/TeacherDocument_Hook';
import TeacherDocument_ModuleProcessor from '@shared/Application/d.Extranet/3_Teacher/Phone/Modules/TeacherDocument/TeacherDocument_ModuleProcessor';

//Controls
import Tree from "@root/Framework/Controls/Tree/Tree";
import DocumentDisplay from '@root/Application/d.Extranet/2_School/Phone/Modules/SchoolDocument/DocumentDisplay/DocumentDisplay';
import ClassDropDown from '@root/Application/d.Extranet/5_Shared/PC/Controls/ClassDropDown/ClassDropDown';

//Inline Images import
import WhiteDeleteImage from '@inlineimage/Application/d.Extranet/3_Teacher/PC/Modules/TeacherDocument/delete_white.svg?inline';
import WhiteCogImage from '@inlineimage/Application/d.Extranet/3_Teacher/PC/Modules/TeacherDocument/cog_white.svg?inline';
import WhitePlusImage from '@inlineimage/Application/d.Extranet/3_Teacher/PC/Modules/TeacherDocument/pluswhite.svg?inline';
import WhiteSharedGroupImage from '@inlineimage/Application/d.Extranet/3_Teacher/PC/Modules/TeacherDocument/shared_group_white.svg?inline';


/**
 * @name TeacherDocument
 * @summary This component displays the SchoolDocument data in tree.
 * @param {any} props
 * @returns {object} React.Fragement that encapsulated the display tree with Folder details. and document details in table.
 */
const TeacherDocument = (props) => {

    /**
    * @name Reduce Initializer.
    * @summary Provides satate and dispatch.
    */
    const [state, dispatch] = useReducer(ExtranetBase_Hook.Reducer, TeacherDocument_Hook.GetInitialState(props));

    /**
     * @name domTreeRef
     * @summary reference of tree component
     * */
    const domTreeRef = useRef(null);

    /**
     * @name objContext
     * @summary Combines state, props, dispatch and module object to one object, and sent as a parameter to funtions in business logic.
     */
    let objContext = { state, props, dispatch, ["ModuleName"]: "TeacherDocument", ["TeacherDocument_ModuleProcessor"]: new TeacherDocument_ModuleProcessor() };

    /**
     * @name  InitializeDataForSSR
     * @param {object} objContext context object
     * @summary Initializing API and DynamicStyles
     * @returns Setting ApplicationState
     */
    objContext.TeacherDocument_ModuleProcessor.Initialize(objContext, objContext.TeacherDocument_ModuleProcessor);

    /**
     * @name HookInitializer.
     * @summary Initializes the all hooks.
     */
    TeacherDocument_Hook.Initialize(objContext);

    /**
     * @name MenuToggler
     * @summary holds the value of wether the menu has to visible or not
     * */
    const [showMenu, SetShowMenu] = useState(false);

    /**
     * @name ShowMenu
     * @summary sets showMenu as true to show menu.
     * @param {any} e
     */
    const ShowMenu = (e) => {
        SetShowMenu(true);
        document.addEventListener("click", CloseMenu);
    }

    /**
     * @name CloseMenu
     * @summary sets showMenu as fasle to hide menu.
     * @param {any} e
     */
    const CloseMenu = (e) => {
        SetShowMenu(false);
        document.removeEventListener("click", CloseMenu);
    }

    const GetTextMessageForDocumentRight = (objTextResource) => {
       
        let strText = "";
        if (state.objSelectedFolder) {
            strText = Localization.TextFormatter(objTextResource, state.blnCurrentSchoolYearPeriod ?"CurrentSchoolYearUploadFileMessage":"NoFileDisplayWarning");
        } else {
            if (state.blnCurrentSchoolYearPeriod) { //if current school year period
                strText = Localization.TextFormatter(objTextResource, 'CurrentSchoolSelectFolderMessage');
            }
            else {
                strText = Localization.TextFormatter(objTextResource, 'OldSchoolYearSelectFolderMessage');
            }
        }

        return <div className="select-folder-message"> <span>{strText}</span></div>;

    };

    /**
     * @name GetOwnerName
     * @param {any} objTextResource
     * @param {any} strSchoolId
     */
    const GetOwnerName = (objTextResource, strSchoolId) => {
        let strReturn = "";
        if (state.objSelectedFolder != undefined) {
            let strOwnerName = Localization.TextFormatter(objTextResource, 'OwnerName');
            let objFolder = state.objSelectedFolder;
            strReturn = objFolder.vFolderName;
            let strUserId = objFolder["uUserId"];
            if (objFolder.cIsSchool != undefined && objFolder.cIsSchool == "Y") {
                let strSchoolName = DataRef(props.Object_Extranet_School_School, "Object_Extranet_School_School;uSchoolId;" + strSchoolId)["Data"][0]["vSchoolName"];
                if (objFolder["uDocumentFolderId"] == '00000000-0000-0000-0000-000000000001') {
                    strReturn = strSchoolName;
                }
                else {
                    strReturn = objFolder["vFolderName"] + " (" + strOwnerName + strUserName + ")";
                }
            } else if (objFolder.cIsTeacher != undefined && objFolder.cIsTeacher == "Y") {
                let strUserName = objContext.TeacherDocument_ModuleProcessor.GetTeacherName(objContext, strUserId, strSchoolId);
                strReturn = objFolder["vFolderName"] + " (" + strOwnerName + strUserName + ")";
            } else if (objFolder.cIsPupil != undefined && objFolder.cIsPupil == "Y") {
                let arrPupil = DataRef(objContext.props.Object_Extranet_Pupil_Pupil, "Object_Extranet_Pupil_Pupil;t_TestDrive_Member_Class_Pupil.uClassId;" + state.objSelectedClass["uClassId"])["Data"];
                let arrFilteredPupil = arrPupil.filter(x => x["uPupilId"] == strUserId);
                let strUserName = "";
                if (arrFilteredPupil.length > 0) {
                    strUserName = arrFilteredPupil[0]["vName"] + " " + arrFilteredPupil[0]["vFirstName"];
                }
                strReturn = objFolder["vFolderName"] + " (" + strOwnerName + strUserName + ")";
            }
        }
        return strReturn;
    }


    /**
     * @name GetContent
     * @summary returns the jsx.
     * @param {any} props
     * @returns {Element}
     */
    const GetContent = (props) => {
        let objTextResource = Object_Framework_Services_TextResource.GetData("/d.Extranet/3_Teacher/Modules/TeacherDocument", props)
        objTextResource = objTextResource ? objTextResource : {};
        let strClassId = state.objSelectedClass ? state.objSelectedClass["uClassId"] : state.strUserPreferenceClassId;
        var arrFolderData = DataRef(props.Extranet_Teacher_TeacherDocumentFolder_Module, "Extranet_Teacher_TeacherDocumentFolder_Module;uClassId;" + strClassId + ";uSchoolYearPeriodId;" + objContext.state.objSchoolYearPeriod.uSchoolYearPeriodId)["Data"];
        let objTreeData = {
            NodeData: objContext.TeacherDocument_ModuleProcessor.ManipulateFolderData(arrFolderData, objTextResource)
        };
        var arrClassData = [];
        if (DataRef(props.Object_Extranet_Teacher_Class, "Object_Extranet_Teacher_Class;t_TestDrive_Member_Class_Teacher.uTeacherId;" + props.ClientUserDetails.UserId + ";t_TestDrive_Member_Class_Teacher.cIsDeleted;N")) {
            arrClassData = DataRef(props.Object_Extranet_Teacher_Class, "Object_Extranet_Teacher_Class;t_TestDrive_Member_Class_Teacher.uTeacherId;" + props.ClientUserDetails.UserId + ";t_TestDrive_Member_Class_Teacher.cIsDeleted;N")["Data"];
        }

        let arrClassDataForDropDown = objContext.TeacherDocument_ModuleProcessor.GetClassDropDownData(objContext,arrClassData, objTextResource);
        //let arrUserPreferenceImages = DataRef(props.Object_Cockpit_UserPreferenceProfileImage, "Object_Cockpit_UserPreferenceProfileImage;" + strClassId)["Data"];
        const arrSchoolYearPeriodData = DataRef(props.Object_Extranet_Teacher_SchoolYearPeriod, "Object_Extranet_Teacher_SchoolYearPeriod;cIsDeleted;N")["Data"];

        let arrDocument = objContext.TeacherDocument_ModuleProcessor.GetFolderDocuments(objContext);
        let strSchoolId = objContext.TeacherDocument_ModuleProcessor.GetSchoolId(objContext.props);
        return (
            <div className="school-document">
                <div className="school-document-title">
                    <span>Dokumente</span>

                    {
                        state.showDocumentListTab ?
                            <button className="back-button"

                                onClick={() => dispatch({ type: 'SET_STATE', payload: { showDocumentListTab: false } })}><img
                                    src={require("../../../../../../../Arcadix.h.Product.Resources/Themes/Default_2020/d.Extranet/Skin2018/Images/Common/Icons/angle_left_dark.svg")}

                                />Back</button>
                            : <React.Fragment />
                    }
                    <img
                        src={require("../../../../../../../Arcadix.h.Product.Resources/Themes/Default_2020/d.Extranet/Skin2018/Images/Common/Icons/exclamation_mark.svg")}

                    />
                </div>
                
                {
                    !state.showDocumentListTab ?
                        <div className="school-document-left-wrapper">
                            <div className="document-left-header">
                                <span>{Localization.TextFormatter(objTextResource, 'Class')} :</span>
                                {arrClassData.length > 0 ?
                                    <div className="content-dropdown">
                                        <PerformanceProfiler ComponentName={"TeacherDocument_ClassDropDown"} JConfiguration={props.JConfiguration} >
                                            <ClassDropDown
                                                id="TeacherDocument_ClassDropDown"
                                                SelectedValue={strClassId}
                                                DisplayColumn="vClassName"
                                                ValueColumn="uClassId"
                                                Data={arrClassDataForDropDown}
                                                UserPreference={state.objUserPreference}
                                                JConfiguration={props.JConfiguration}
                                                ClientUserDetails={props.ClientUserDetails}
                                                OnChangeEventHandler={(objItem, dropdownProps) => { objContext.TeacherDocument_ModuleProcessor.OnChangeClass(objContext, objItem) }}
                                            />
                                        </PerformanceProfiler>
                                    </div>
                                : ''}
                                <span>{Localization.TextFormatter(objTextResource, 'SchoolYearPeriod')} :</span>
                                <div className="content-dropdown">
                                    <PerformanceProfiler ComponentName={"TeacherDocument_SchoolYearPeriod"} JConfiguration={props.JConfiguration} >
                                        <WrapperComponent
                                            ComponentName={"Dropdown"}
                                            Id={"TeacherDocument_SchoolYearPeriod"}
                                            Meta={objContext.TeacherDocument_ModuleProcessor.GetSchoolYearPeriodDropdownMetaData()}
                                            Data={objContext.TeacherDocument_ModuleProcessor.GetSchoolYearPeriodDropdownData(arrSchoolYearPeriodData)}
                                            Resource={objContext.TeacherDocument_ModuleProcessor.GetResourceData()}
                                            Events={objContext.TeacherDocument_ModuleProcessor.GetSchoolYearPeriodDropdownEvents(objContext)}
                                            ParentProps={{ ...props }}
                                        />
                                    </PerformanceProfiler>
                                </div>
                            </div>

                            <div id="document-subheader" className="padding-top-20">
                                <div className="document-left-header">
                                    <button className="button brown-button new-group-button" onClick={() => { objContext.TeacherDocument_ModuleProcessor.OpenFolderPopup(objContext, false, objTextResource) }}>
                                        <img src={WhitePlusImage} />
                                        <span>{Localization.TextFormatter(objTextResource, 'NewFolder')}</span>
                                    </button>
                                </div>
                            </div>
                            <div className="folder-list" id="documentParent" onClick={(event) => { objContext.TeacherDocument_ModuleProcessor.OnClickOutSideTree(objContext, domTreeRef); }}>
                            
                                <WrapperComponent
                                    ComponentName={"FillHeight"}
                                    Id="FillHeightLeftTeacherDocument" Meta={objContext.TeacherDocument_ModuleProcessor.GetFillHeightMetaData()} ParentProps={{ ...props }}>
                                    <Tree
                                        Id="TeacherDocumentTree"
                                        ref={domTreeRef}
                                        Meta={objContext.TeacherDocument_ModuleProcessor.GetTreeMetaData()}
                                        Data={objTreeData}
                                        Events={objContext.TeacherDocument_ModuleProcessor.GetTreeEvents(objContext)}
                                        CallBacks={{
                                            OnBeforeShowNode: (objNode) => { return objContext.TeacherDocument_ModuleProcessor.OnBeforeShowNode(objNode) }
                                        }}
                                        Resource={objContext.TeacherDocument_ModuleProcessor.GetTreeResourceData()} ParentProps={{ ...props }}
                                    />
                                </WrapperComponent>
                            </div>

                        </div>
                    : <React.Fragment />
                }   

                {
                    state.showDocumentListTab ?
                    <div className="school-document-right-wrapper">
                        <div className="document-right-header">
                            <span className="folder-heading">{GetOwnerName(objTextResource, strSchoolId)}</span>
                            <span className="folder-controls">
                                {
                                    !state.blnDefaultFolder ?
                                    <React.Fragment>
                                        <img onClick={() => ShowMenu()} src={WhiteCogImage}  alt="" />
                                        {
                                            showMenu
                                                ? (
                                                    <div className="create-delete-folders">
                                                        <ul className="menu">
                                                            {(!state.blnDefaultFolder || state.blnOwnerOfFolder) ? <li onClick={() => { objContext.TeacherDocument_ModuleProcessor.OpenFolderPopup(objContext, true, objTextResource) }}>{Localization.TextFormatter(objTextResource, 'RenameFolder')} </li> : ''}
                                                            {(!state.blnDefaultFolder || state.blnOwnerOfFolder) ? <li onClick={() => { objContext.TeacherDocument_ModuleProcessor.OpenDeletePopUp(objContext, objTextResource, "Folder") }}>{Localization.TextFormatter(objTextResource, 'Delete')}</li> : ''}
                                                            {!state.blnSharedFolder ? <li onClick={() => { objContext.TeacherDocument_ModuleProcessor.OpenMoveCopyFolderPopup(objContext, objTextResource, true) }}>{Localization.TextFormatter(objTextResource, 'MoveFolder')} </li> : ''}
                                                            <li onClick={() => { objContext.TeacherDocument_ModuleProcessor.OpenMoveCopyFolderPopup(objContext, objTextResource, false) }}>{Localization.TextFormatter(objTextResource, 'CopyFolder')}</li>
                                                        </ul>
                                                    </div>
                                                )
                                                : (
                                                    null
                                                )
                                        }
                                    </React.Fragment>
                                    : ""
                                }
                                <img onClick={() => { objContext.TeacherDocument_ModuleProcessor.OpenAssignUserPopup(objContext, objTextResource) }}
                                    src={WhiteSharedGroupImage} />
                                <img onClick={() => { objContext.TeacherDocument_ModuleProcessor.OpenDeletePopUp(objContext, objTextResource, "Folder") }}
                                    src={WhiteDeleteImage} />                              
                            </span>
                        </div>

                        <div className="table-main">
                        {
                            state.objSelectedFolder && arrDocument && arrDocument.length > 0 ?
                                <table className="school-document-right-table">
                                    <DocumentDisplay
                                        arrDocument={arrDocument}
                                        JConfiguration={props.JConfiguration}
                                        Delete={(objDocument) => { objContext.TeacherDocument_ModuleProcessor.OpenDeletePopUp(objContext, objTextResource, "Document", objDocument) }}
                                        objTextResource={objTextResource}
                                        EditDocument={(objDocument) => { objContext.TeacherDocument_ModuleProcessor.EditDocument(objContext, objDocument) }}
                                    />
                                </table>  
                                :
                                GetTextMessageForDocumentRight(objTextResource)
                        }
                        </div>
                        <div className="school-document-right-footer">
                            {state.objSelectedFolder && (state.blnCurrentSchoolYearPeriod) ?
                                (!state.blnDefaultFolder || state.blnOwnerOfFolder) ?
                                    <div className="footer-btn">
                                        <button onClick={() => { objContext.TeacherDocument_ModuleProcessor.OpenFileUploadPopup(objContext, objTextResource) }}>{Localization.TextFormatter(objTextResource, 'UploadFile')}</button>
                                    </div> : ''
                                : <React.Fragment />
                            }
                        </div>
                    </div>
                    : <React.Fragment/>
                }
                

            </div>
        )
    }
    return props.isLoadComplete || state.isLoadComplete ? GetContent(props) : <div> </div>;
};

/**
 * @name Connector
 * @summary connects component to store.
 */
export default connect(ExtranetBase_Hook.MapStoreToProps(TeacherDocument_ModuleProcessor.StoreMapList()))(TeacherDocument);

// /**
//  * @name ModuleProcessor
//  * @summary Adding the Module_Processsor to export(for Prefetch)
//  */
// export const ModuleProcessor = TeacherDocument_ModuleProcessor; 