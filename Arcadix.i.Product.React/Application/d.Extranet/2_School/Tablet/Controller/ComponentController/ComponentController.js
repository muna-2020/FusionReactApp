// import React from 'react';
// import universal, { UniversalProps } from 'react-universal-component';
//import TestDriveDataService from '@root/Framework/DataService/TestDriveDataService';
//const UniversalComponent = universal<{ Componentcontroller: any }>(props => import(`../../../Application/Extranet/${props.page}`)) //syntax for importing universally
export const components = {
    // example: {
    //     LoadComponent: function () {

    //         return require('@root/Application/d.Extranet/2_School/PC/Modules/Example/Example').default;
    //     }
    // },
    login: {
        LoadComponent: function () {
            return require('@root/Application/d.Extranet/2_School/Tablet/LoginAndMaster/Login/Login').default;
        }
    },
    school: {
        LoadComponent: function () {
            return require('@root/Application/d.Extranet/2_School/Tablet/LoginAndMaster/Master/Master').default;
        }
    },
    school_designtemplate: {
        LoadComponent: function () {
            return require('@root/Application/d.Extranet/2_School/Tablet/LoginAndMaster/Master/Master').default;
        }
    },
    teacher: {
        LoadComponent: function () {
            return require('@root/Application/d.Extranet/2_School/PC/Modules/Teacher/Teacher').default;
        }
    },
    teacher_designtemplate: {
        LoadComponent: function () {
            return require('@root/Application/d.Extranet/2_School/PC/Modules/Teacher/Teacher_DesignTemplate').default;
        }
    },
    errorpupilpopup: {
        LoadComponent: function () {
            return require('@root/Application/d.Extranet/2_School/PC/Modules/ClassAndPupil/Pupil/ErrorPupilPopUp/ErrorPupilPopUp').default;
        }
    },
    errorpupilpopup_designtemplate: {
        LoadComponent: function () {
            return require('@root/Application/d.Extranet/2_School/PC/Modules/ClassAndPupil/Pupil/ErrorPupilPopUp/ErrorPupilPopUp_DesignTemplate').default;
        }
    },

    movepupilpopup: {
        LoadComponent: function () {
            return require('@root/Application/d.Extranet/2_School/PC/Modules/ClassAndPupil/Pupil/MovePupilPopUp/MovePupilPopUp').default;
        }
    },
    movepupilpopup_designtemplate: {
        LoadComponent: function () {
            return require('@root/Application/d.Extranet/2_School/PC/Modules/ClassAndPupil/Pupil/MovePupilPopUp/MovePupilPopUp_DesignTemplate').default;
        }
    },


    import_data: {
        LoadComponent: function () {
            return require('@root/Application/d.Extranet/2_School/PC/Modules/Teacher/ImportData').default;
        }
    },
    import_data_designtemplate: {
        LoadComponent: function () {
            return require('@root/Application/d.Extranet/2_School/PC/Modules/Teacher/ImportData_DesignTemplate').default;
        }
    },
    teacherlogins: {
        LoadComponent: function () {
            return require('@root/Application/d.Extranet/2_School/PC/Modules/TeacherLogin/TeacherLogin').default;
        }
    },
    teacherlogins_designtemplate: {
        LoadComponent: function () {
            return require('@root/Application/d.Extranet/2_School/PC/Modules/TeacherLogin/TeacherLogin_DesignTemplate').default;
        }
    },
    error_popup: {
        LoadComponent: function () {
            return require('@root/Application/d.Extranet/2_School/PC/Modules/TeacherLogin/ErrorPopUp').default;
        }
    },
    error_popup_designtemplate: {
        LoadComponent: function () {
            return require('@root/Application/d.Extranet/2_School/PC/Modules/TeacherLogin/ErrorPopUp_DesignTemplate').default;
        }
    },
    progressbarpopup: {
        LoadComponent: function () {
            return require('@root/Application/d.Extranet/2_School/PC/Modules/TeacherLogin/ProgressBarPopUp').default;
        }
    },
    progressbarpopup_designtemplate: {
        LoadComponent: function () {
            return require('@root/Application/d.Extranet/2_School/PC/Modules/TeacherLogin/ProgressBarPopUp_DesignTemplate').default;
        }
    },
    classandpupil: {
        LoadComponent: function () {
            return require('@root/Application/d.Extranet/2_School/PC/Modules/ClassAndPupil/ClassAndPupil').default;
        }
    },
    classandpupil_designtemplate: {
        LoadComponent: function () {
            return require('@root/Application/d.Extranet/2_School/PC/Modules/ClassAndPupil/ClassAndPupil_DesignTemplate').default;
        }
    },
    import_pupil_popup: {
        LoadComponent: function () {
            return require('@root/Application/d.Extranet/2_School/PC/Modules/ClassAndPupil/Class/ImportPupilPopUp/ImportPupilPopUp').default;
        }
    },
    import_pupil_popup_designtemplate: {
        LoadComponent: function () {
            return require('@root/Application/d.Extranet/2_School/PC/Modules/ClassAndPupil/Class/ImportPupilPopUp/ImportPupilPopUp_DesignTemplate').default;
        }
    },
    timetablesettings: {
        LoadComponent: function () {
            return require('@root/Application/d.Extranet/2_School/PC/Modules/TimeTableSettings/TimeTableSettings').default;
        }
    },
    timetablesettings_designtemplate: {
        LoadComponent: function () {
            return require('@root/Application/d.Extranet/2_School/PC/Modules/TimeTableSettings/TimeTableSettings_DesignTemplate').default;
        }
    },
    contact: {
        LoadComponent: function () {
            return require('@root/Application/d.Extranet/5_SharedModule/PC/Contact/Contact').default;
        }
    },
    contact_designtemplate: {
        LoadComponent: function () {
            return require('@root/Application/d.Extranet/5_SharedModule/PC/Contact/Contact_Designtemplate').default;
        }
    },
    notes: {
        LoadComponent: function () {
            return require('@root/Application/d.Extranet/2_School/PC/Modules/Notes/Notes').default;
        }
    },
    notes_designtemplate: {
        LoadComponent: function () {
            return require('@root/Application/d.Extranet/2_School/PC/Modules/Notes/Notes_Designtemplate').default;
        }
    },
    datacomparison: {
        LoadComponent: function () {
            return require('@root/Application/d.Extranet/2_School/PC/Modules/DataComparison/DataComparison').default;
        }
    },
    datacomparison_designtemplate: {
        LoadComponent: function () {
            return require('@root/Application/d.Extranet/2_School/PC/Modules/DataComparison/DataComparison_DesignTemplate').default;
        }
    },
    datacomparisonpopup: {
        LoadComponent: function () {
            return require('@root/Application/d.Extranet/2_School/PC/Modules/DataComparison/DataComparisonPopup').default;
        }
    },
    datacomparisonpopup_designtemplate: {
        LoadComponent: function () {
            return require('@root/Application/d.Extranet/2_School/PC/Modules/DataComparison/DataComparisonPopup_DesignTemplate').default;
        }
    },
    progresscomparisonpopup: {
        LoadComponent: function () {
            return require('@root/Application/d.Extranet/2_School/PC/Modules/DataComparison/ProgressComparisonPopUp').default;
        }
    },
    progresscomparisonpopup_designtemplate: {
        LoadComponent: function () {
            return require('@root/Application/d.Extranet/2_School/PC/Modules/DataComparison/ProgressComparisonPopUp_DesignTemplate').default;
        }
    },
    schoolprofile: {
        LoadComponent: function () {
            return require('@root/Application/d.Extranet/2_School/PC/Modules/SchoolProfile/SchoolProfile').default;
        }
    },
    schoolprofile_designtemplate: {
        LoadComponent: function () {
            return require('@root/Application/d.Extranet/2_School/PC/Modules/SchoolProfile/SchoolProfile_DesignTemplate').default;
        }
    },
    schoolnews: {
        LoadComponent: function () {
            return require('@root/Application/d.Extranet/2_School/PC/Modules/SchoolNews/SchoolNews').default;
        }
    },
    schoolnews_designtemplate: {
        LoadComponent: function () {
            return require('@root/Application/d.Extranet/2_School/PC/Modules/SchoolNews/SchoolNews_DesignTemplate').default;
        }
    },
    schooldocument: {
        LoadComponent: function () {
            return require('@root/Application/d.Extranet/2_School/PC/Modules/SchoolDocument/SchoolDocument').default;
        }
    },
    schooldocument_designtemplate: {
        LoadComponent: function () {
            return require('@root/Application/d.Extranet/2_School/PC/Modules/SchoolDocument/SchoolDocument_DesignTemplate').default;
        }
    },
    schooladdfolderpopup: {
        LoadComponent: function () {
            return require('@root/Application/d.Extranet/2_School/PC/Modules/SchoolDocument/SchoolDocumentPopUp/CreateFolderPopUp/CreateFolderPopUp').default;
        }
    },
    schoolfileuploadpopup: {
        LoadComponent: function () {
            return require('@root/Application/d.Extranet/2_School/PC/Modules/SchoolDocument/SchoolDocumentPopUp/UploadFilePopUp/UploadFilePopUp/SchoolFileUploadPopUp').default;
        }
    },
    progressbar: {
        LoadComponent: function () {
            return require('@root/Framework/Controls/ProgressBar/ProgressBar').default;
        }
    },
    schooladdcontactpopup: {
        LoadComponent: function () {
            return require('@root/Application/d.Extranet/2_School/PC/Modules/SchoolNews/SchoolAddContactPopup/SchoolAddContactPopup_DesignTemplate').default;
        }
    },
    schooladdcontactpopup_designtemplate: {
        LoadComponent: function () {
            return require('@root/Application/d.Extranet/2_School/PC/Modules/SchoolNews/SchoolAddContactPopup/SchoolAddContactPopup_DesignTemplate').default;
        }
    },
    createnewfolderpopup: {
        LoadComponent: function () {
            return require("@root/Application/d.Extranet/2_School/PC/Modules/SchoolDocument/SchoolDocumentPopUp/CreateFolderPopUp/CreateFolderPopUp_DesignTemplate")
                .default;
        }
    },
    createnewfolderpopup_designtemplate: {
        LoadComponent: function () {
            return require('@root/Application/d.Extranet/2_School/PC/Modules/SchoolDocument/SchoolDocumentPopUp/CreateFolderPopUp/CreateFolderPopUp_DesignTemplate').default;
        }
    },
    schoolfileuploadpopup: {
        LoadComponent: function () {
            return require("@root/Application/d.Extranet/2_School/PC/Modules/SchoolDocument/SchoolDocumentPopUp/UploadFilePopup/UploadFilePopup")
                .default;
        }
    },
    uploadfilepopup_designtemplate: {
        LoadComponent: function () {
            return require('@root/Application/d.Extranet/2_School/PC/Modules/SchoolDocument/SchoolDocumentPopUp/UploadFilePopup/UploadFilePopup_DesignTemplate').default;
        }
    },
    schooldeletefolderpopup: {
        LoadComponent: function () {
            return require("@root/Application/d.Extranet/2_School/PC/Modules/SchoolDocument/SchoolDocumentPopUp/DeleteFolderPopup/DeleteFolderPopup").default;
        }
    },
    deletefolderpopup_designtemplate: {
        LoadComponent: function () {
            return require("@root/Application/d.Extranet/2_School/PC/Modules/SchoolDocument/SchoolDocumentPopUp/DeleteFolderPopup/DeleteFolderPopup_DesignTemplate").default;
        }
    },
    sharefolderpopup: {
        LoadComponent: function () {
            return require("@root/Application/d.Extranet/2_School/PC/Modules/SchoolDocument/SchoolDocumentPopUp/ShareFolderPopup/ShareFolderPopup_DesignTemplate").default;

        }
    },
    sharefolderpopup_designtemplate: {
        LoadComponent: function () {
            return require('@root/Application/d.Extranet/2_School/PC/Modules/SchoolDocument/SchoolDocumentPopUp/ShareFolderPopup/ShareFolderPopup_DesignTemplate').default;
        }
    },
    schoolcopyfolderpopup: {
        LoadComponent: function () {
            return require("@root/Application/d.Extranet/2_School/PC/Modules/SchoolDocument/SchoolDocumentPopUp/CopyFolderPopUp/CopyFolderPopUp").default;
        }
    },
    copyingfolderpopup_designtemplate: {
        LoadComponent: function () {
            return require('@root/Application/d.Extranet/2_School/PC/Modules/SchoolDocument/SchoolDocumentPopUp/CopyingFolderPopUp/CopyingFolderPopUp_DesignTemplate').default;
        }
    }
    
}



const ComponentController = {
    getComponent: function (strComponentName) {
        console.log("string", strComponentName.toLowerCase());
        if (components[strComponentName.toLowerCase()] !== null) {
            return components[strComponentName.toLowerCase()].LoadComponent();
        }
        else {
            console.log("notfound");
            return undefined;
        }
    }
};

export default ComponentController;






