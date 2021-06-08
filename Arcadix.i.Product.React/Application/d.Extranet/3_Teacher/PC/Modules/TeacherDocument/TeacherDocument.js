//React imports.
import React, { useState, useReducer, useRef } from 'react';
import { connect } from 'react-redux';

//Module specific imports
import * as TeacherDocument_Hook from '@shared/Application/d.Extranet/3_Teacher/PC/Modules/TeacherDocument/TeacherDocument_Hook';
import TeacherDocument_ModuleProcessor from '@shared/Application/d.Extranet/3_Teacher/PC/Modules/TeacherDocument/TeacherDocument_ModuleProcessor';

//Controls
import Tree from "@root/Framework/Controls/Tree/Tree";
import DocumentDisplay from '@root/Application/d.Extranet/2_School/PC/Modules/SchoolDocument/DocumentDisplay/DocumentDisplay';
import ClassDropDown from '@root/Application/d.Extranet/5_Shared/PC/Controls/ClassDropDown/ClassDropDown';
import { GetStateIdBasedOnSchool } from '@shared/Object/d.Extranet/2_School/School/School';

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
                let iStateId = GetStateIdBasedOnSchool(props.ClientUserDetails.TeacherDetails.t_TestDrive_Member_Teacher_School[0].uSchoolId);
                let arrPupil = DataRef(objContext.props.Object_Extranet_Pupil_Pupil, "Object_Extranet_Pupil_Pupil;t_TestDrive_Member_Class_Pupil.uClassId;" + state.objSelectedClass["uClassId"] + ";iStateId;" + iStateId)["Data"];
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
            <div id="SchoolDocument" className="light-brown-bg">
                <div className="padding-20" id="document-mainheader">
                    <div className="top-head">
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
                </div>
                <div className="document-flex">
                    <div className="document-left">
                        <div id="document-subheader" className="padding-top-20">
                            <div className="document-left-header">
                                <button className="button brown-button new-group-button" onClick={() => { objContext.TeacherDocument_ModuleProcessor.OpenFolderPopup(objContext, false, objTextResource) }}>
                                    <img src={WhitePlusImage} />
                                    <span>{Localization.TextFormatter(objTextResource, 'NewFolder')}</span>
                                </button>
                            </div>
                        </div>

                        <div className="folder-list" id="documentParent" onClick={(event) => { objContext.TeacherDocument_ModuleProcessor.OnClickOutSideTree(objContext, domTreeRef); }}>
                            {/*
                            <Tree NodeFields={objNodeFields} NodeData={arrAllFolderData} RemoveANode={() => { }} OnExpandOrCollapse={() => { }} OnSelectNode={(objFolder) => { objContext.TeacherDocument_ModuleProcessor.OnSelectFolder(objContext, objFolder) }} SetDragTargetData={() => { }} SetDragSourceData={() => { }} />
                            */}
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
                    <div className="document-right">
                        <div id="documentRightHeader" className="padding-top-20">
                            <div className="document-right-header">
                                <span className="folder-heading">{GetOwnerName(objTextResource, strSchoolId)} </span>
                                <div className="folder-controls">
                                    {
                                        !state.blnDefaultFolder ?
                                            <React.Fragment>
                                                <img onClick={() => ShowMenu()} src={WhiteCogImage} />
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
                                                {
                                                    state.blnParentFolder ?
                                                        <img onClick={() => { objContext.TeacherDocument_ModuleProcessor.OpenAssignUserPopup(objContext, objTextResource) }}
                                                            src={WhiteSharedGroupImage} /> : ''
                                                }
                                                <img onClick={() => { objContext.TeacherDocument_ModuleProcessor.OpenAssignUserPopup(objContext, objTextResource) }}
                                                    src={WhiteSharedGroupImage} />
                                                <img onClick={() => { objContext.TeacherDocument_ModuleProcessor.OpenDeletePopUp(objContext, objTextResource, "Folder") }}
                                                    src={WhiteDeleteImage} />
                                            </React.Fragment> : ''
                                    }
                                </div>
                            </div>
                        </div>

                        <div className="files-list">
                            <WrapperComponent
                                ComponentName={"FillHeight"}
                                Id="TeacherDocumentFillHeight"
                                Meta={objContext.TeacherDocument_ModuleProcessor.GetFillHeightMetaData()}
                                ParentProps={{ ...props }}>
                                {
                                    state.objSelectedFolder && arrDocument && arrDocument.length > 0 ?
                                        <table>
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
                            </WrapperComponent>

                            <div className="bottom-button" id="BottomFooter">
                                {state.objSelectedFolder && (state.blnCurrentSchoolYearPeriod) ?
                                    (!state.blnDefaultFolder || state.blnOwnerOfFolder) ? <button className="button brown-button" onClick={() => { objContext.TeacherDocument_ModuleProcessor.OpenFileUploadPopup(objContext, objTextResource) }}>{Localization.TextFormatter(objTextResource, 'UploadFile')}</button> : ''
                                    : <React.Fragment />
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className="wrap padding-bottom-20" id="bottomSpacing" />
            </div>
        )
    }
    return (
        <div>
            {props.isLoadComplete || state.isLoadComplete ? GetContent(props) : <div> </div>}
        </div>
    );
};

/**
 * @name Connector
 * @summary connects component to store.
 */
export default connect(ExtranetBase_Hook.MapStoreToProps(TeacherDocument_ModuleProcessor.StoreMapList()))(TeacherDocument);

/**
 * @name ModuleProcessor
 * @summary Adding the Module_Processsor to export(for Prefetch)
 */
export const ModuleProcessor = TeacherDocument_ModuleProcessor; 