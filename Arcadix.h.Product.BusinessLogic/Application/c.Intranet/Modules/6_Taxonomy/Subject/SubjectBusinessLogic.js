import { useEffect, useLayoutEffect } from 'react';
import ArcadixFetchAndCacheData, { DataRef } from '@shared/Framework/DataService/ArcadixFetchAndCacheData/ArcadixFetchAndCacheData';
import ApplicationState from '@shared/Framework/DataService/ApplicationState/ApplicationState';

export function useSetTaskRibbonData(objContext) {
    useEffect(() => {
        if (objContext.state.isLoadComplete && objContext.props.blnSetTaskPopupRibbon) {
            ApplicationState.SetProperty("PopupRibbonData", { "addedittask": GetSubjectToolData(objContext) });
        }
    }, [objContext.state.isLoadComplete, objContext.props.blnSetTaskPopupRibbon]);
}

/**
* @param {*} objContext objContext
* @summary Call AddEditPopup for Editing subject
*/
function EditPopup(objContext) {
    let arrHeaderData = GetAddEditMetaData();
    let arrSubjectData = DataRef(objContext.props.subject)["Data"];
    let objTextResource = DataRef(objContext.props.textresource, "textresource;id;" + objContext.props.JConfiguration.LanguageCultureInfo + "/c.intranet/modules/6_taxonomy/Subject").Data["0"].Subject;
    let arrMainClientlanguageData = DataRef(objContext.props.mainclientlanguage)["Data"].filter((objMainClientlanguageData) => objMainClientlanguageData["iApplicationTypeId"] === 2 && objMainClientlanguageData["cIsDeleted"] === "N");
    let arrLanguageData = DataRef(objContext.props.language)["Data"].filter(objLanguageData => objLanguageData["cIsActive"] === "Y");
    let arrSelectedRows = ApplicationState.GetProperty("SelectedRows");
    let iParentSubjectName = "";
    if (objContext.state.intSubjectDropdownSelectedValue !== null && arrSelectedRows && arrSelectedRows.length > 0) {
        arrSubjectData.map((objSubjectData) => {
            if (objSubjectData["iSubjectId"] === arrSelectedRows[0]["iParentSubjectId"]) {
                objSubjectData["t_TestDrive_Subject_Data"].map((objTableColumn) => {
                    if (objTableColumn["iLanguageId"].toString() === objContext.props.JConfiguration.InterfaceLanguageId.toString()) {
                        iParentSubjectName = objTableColumn["vSubjectName"];
                    }
                });
            }
        });

        objContext.props.showPopup({
            MaxHeight: "662px",
            MaxWidth: "950px",
            popUpMinHeight: "662px",
            popUpMinWidth: "950px",
            showHeader: false,
            popUpName: 'masteraddedit',
            passedEvents: {
                objTextResource: {},
                ClientUserDetails: objContext.props.ClientUserDetails
            },
            popupClassName: "master-add-edit",
            Data: {
                ModuleName: "addeditsubject",
                arrHeaderData,
                objTextResource,
                arrSubjectData,
                intParentSubjectId: objContext.state.intSubjectDropdownSelectedValue,
                strParentSubjectName: iParentSubjectName,
                JConfiguration: objContext.props.JConfiguration,
                MainClientLanguageData: arrMainClientlanguageData,
                ClientUserDetails: objContext.props.ClientUserDetails,
                LanguageData: arrLanguageData,
                blnIsEdit: true,
                blnIsAdd: false
            }
        });
    } else {
        ErrorPopup(objContext);
    }
}

/**
* @param {*} objContext objContext
* @summary Call Confirmation popup for Deleting subject
*/
function DeletePopup(objContext) {
    let objTextResource = DataRef(objContext.props.textresource, "textresource;id;" + objContext.props.JConfiguration.LanguageCultureInfo + "/c.intranet/modules/6_taxonomy/Subject").Data["0"].Subject;
    let arrSelectedRows = ApplicationState.GetProperty("SelectedRows");

    if (objContext.state.intSubjectDropdownSelectedValue !== null && arrSelectedRows && arrSelectedRows.length > 0) {
        objContext.props.showPopup({
            MaxHeight: "222px",
            MaxWidth: "390px",
            popUpMinHeight: "222px",
            popUpMinWidth: "390px",
            popUpName: 'confirmationpopup',
            showHeader: true,
            passedEvents: {},
            headerTitle: '',
            popupClassName: 'delete-popup-parent',
            Data: {
                HeaderText: objTextResource["DeletePopupHeaderText"],
                SubheaderText: objTextResource["DeletePopupSubheaderText"],
                ConfirmationText: objTextResource["DeletePopupWarningText"],
                ConfirmButtonText: objTextResource["DeletePopupConfirmButtonText"],
                OkText: objTextResource["OK"],
                OnConfirmationClick: (objModal) => DeleteSubject(arrSelectedRows, objModal, objContext)
            }
        });
    } else {
        ErrorPopup(objContext);
    }
}

/**
* @param {*} arrSelectedRows arrSelectedRows
* @param {*} objModal objModal
* @param {*} objContext objContext
* @summary Deletes subject and close popup on sccess
*/
const DeleteSubject = (arrSelectedRows, objModal, objContext) => {
    let arrDeleteRow = [];
    arrSelectedRows.map(objSelectedRows => {
        arrDeleteRow = [...arrDeleteRow, { ...objSelectedRows, cIsDeleted: "Y" }];
    });

    let arrParams = [
        {
            URL: "API/Object/Intranet/Taxonomy/Subject",
            Params: { vDeleteData: arrDeleteRow },
            MethodType: "Delete",
            "UseFullName": true
        }
    ];

    let objArcadixFetchAndCacheData = new ArcadixFetchAndCacheData();
    objArcadixFetchAndCacheData.Execute(arrParams, function (objReturn, blnIsNew) {
        if (blnIsNew) {
            ApplicationState.SetProperty("SelectedRows", []);
            objContext.props.closePopup(objModal);
        }
    });
};

/**
* @param {*} objContext objContext
* @summary Call AddEditPopup for Adding subject
*/
function AddPopup(objContext) {
    let arrHeaderData = GetAddEditMetaData();
    let arrSubjectData = DataRef(objContext.props.subject)["Data"];
    let objTextResource = DataRef(objContext.props.textresource, "textresource;id;" + objContext.props.JConfiguration.LanguageCultureInfo + "/c.intranet/modules/6_taxonomy/Subject").Data["0"].Subject;
    let arrMainClientlanguageData = DataRef(objContext.props.mainclientlanguage)["Data"].filter((objMainClientlanguageData) => objMainClientlanguageData["iApplicationTypeId"] === 2 && objMainClientlanguageData["cIsDeleted"] === "N");
    let arrLanguageData = DataRef(objContext.props.language)["Data"].filter(objLanguageData => objLanguageData["cIsActive"] === "Y");

    objContext.props.showPopup({
        MaxHeight: "662px",
        MaxWidth: "950px",
        popUpMinHeight: "662px",
        popUpMinWidth: "950px",
        showHeader: false,
        popUpName: 'masteraddedit', //name of the component to be displayed inside the popup. must be present in ComponentController
        passedEvents: {
            objTextResource: {},
            ClientUserDetails: objContext.props.ClientUserDetails
        },
        popupClassName: "master-add-edit",
        Data: {
            //ModuleName: "addeditsubject",
            //arrHeaderData,
            //objTextResource,
            //arrSubjectData,
            //intParentSubjectId: objContext.state.intSubjectDropdownSelectedValue,
            //JConfiguration: objContext.props.JConfiguration,
            //MainClientLanguageData: arrMainClientlanguageData,
            //ClientUserDetails: objContext.props.ClientUserDetails,
            //LanguageData: arrLanguageData,
            blnIsEdit: false,
            blnIsAdd: true
        }
    });
}

/**
* @param {*} objContext objContext
* @summary Call Error Popup
*/
function ErrorPopup(objContext) {
    let objTextResource = DataRef(objContext.props.textresource, "textresource;id;" + objContext.props.JConfiguration.LanguageCultureInfo + "/c.intranet/modules/6_taxonomy/Subject").Data["0"].Subject;

    objContext.props.showPopup({
        MaxHeight: "137px",
        MaxWidth: "400px",
        popUpMinHeight: "137px",
        popUpMinWidth: "400px",
        popUpName: 'errorpopup',
        showHeader: true,
        passedEvents: {},
        headerTitle: '',
        popupClassName: 'error-popup-parent',
        Data: {
            ErrorText: objTextResource["EditPopupErrorText"],
            OkText: objTextResource["OK"]
        }
    });
}


export const useOnSubjectUpdate = (objContext) => {
    useEffect(() => {
        if (objContext.state.isLoadComplete) {
            let arrSubjectData = [];
            DataRef(objContext.props.subject)["Data"].map((objSubjectData) => {
                if (objSubjectData["iParentSubjectId"] === objContext.state.intSubjectDropdownSelectedValue) {
                    arrSubjectData = [...arrSubjectData, objSubjectData];
                }
                if (objContext.state.intSubjectDropdownSelectedValue === -2) {
                    if (objSubjectData["iParentSubjectId"] === 0) {
                        arrSubjectData = [...arrSubjectData, objSubjectData];
                    }
                }
            });
            objContext.dispatch({ type: "SET_STATE_VALUES", payload: { "arrSubjectData": arrSubjectData } });
        }

    }, [objContext.props.subject]);
};
