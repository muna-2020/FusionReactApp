export const components = {
    // example: {
    //     LoadComponent: function () {

    //         return require('@root/Application/d.Extranet/2_School/PC/Modules/Example/Example').default;
    //     }
    // },
    login: {
        LoadComponent: function () {
            return require("@root/Application/d.Extranet/4_Pupil/PC/LoginAndMaster/Login/Login")
                .default;
        }
    },
    pupil: {
        LoadComponent: function () {
            return require("@root/Application/d.Extranet/4_Pupil/PC/LoginAndMaster/Master/Master")
                .default;
        }
    },
    pupil_designtemplate: {
        LoadComponent: function () {
            return require("@root/Application/d.Extranet/4_Pupil/PC/LoginAndMaster/Master/Master")
                .default;
        }
    },
    home: {
        LoadComponent: function () {
            return require("@root/Application/d.Extranet/4_Pupil/PC/LoginAndMaster/Home/Home")
                .default;
        }
    },
    home_designtemplate: {
        LoadComponent: function () {
            return require("@root/Application/d.Extranet/4_Pupil/PC/LoginAndMaster/Home/Home")
                .default;
        }
    },
    pupilprofile: {
        LoadComponent: function () {
            return require('@root/Application/d.Extranet/4_Pupil/PC/Modules/PupilProfile/PupilProfile').default;
        }
    },
    pupilprofile_designtemplate: {
        LoadComponent: function () {
            return require('@root/Application/d.Extranet/4_Pupil/PC/Modules/PupilProfile/PupilProfile_DesignTemplate').default;
        }
    },
    worktest: {
        LoadComponent: function () {
            return require("@root/Application/d.Extranet/4_Pupil/PC/Modules/WorkTest/WorkTest")
                .default;
        }
    },
    worktest_designtemplate: {
        LoadComponent: function () {
            return require("@root/Application/d.Extranet/4_Pupil/PC/Modules/WorkTest/WorkTest_DesignTemplate")
                .default;
        }
    },
    summary_popup: {
        LoadComponent: function () {
            return require("@root/Application/d.Extranet/4_Pupil/PC/Modules/WorkTest/WorkTestPopUp/ProgressReport/ProgressReport_SummaryPopup")
                .default;
        }
    },
    summary_popup_designtemplate: {
        LoadComponent: function () {
            return require("@root/Application/d.Extranet/4_Pupil/PC/Modules/WorkTest/WorkTestPopUp/ProgressReport/ProgressReport_SummaryPopup_DesignTemplate")
                .default;
        }
    },
    learningjournal: {
        LoadComponent: function () {
            return require("@root/Application/d.Extranet/4_Pupil/PC/Modules/PupilToPlan/PupilToPlan")
                .default;
        }
    },
    learningjournal_designtemplate: {
        LoadComponent: function () {
            return require("@root/Application/d.Extranet/4_Pupil/PC/Modules/PupilToPlan/PupilToPlan_DesignTemplate")
                .default;
        }
    },
    pupiltoplan_popup: {
        LoadComponent: function () {
            return require("@root/Application/d.Extranet/4_Pupil/PC/Modules/PupilToPlan/PupilToPlan_PopUp/PupilToPlan_PopUp")
                .default;
        }
    },
    pupiltoplan_popup_designtemplate: {
        LoadComponent: function () {
            return require('@root/Application/d.Extranet/4_Pupil/PC/Modules/PupilToPlan/PupilToPlan_PopUp/PupilToPlan_PopUp_DesignTemplate').default;
        }
    },
    pupiltask_popup: {
        LoadComponent: function () {
            return require("@root/Application/d.Extranet/4_Pupil/PC/Modules/PupilToPlan/PupilTaskPage/PupilTaskPage")
                .default;
        }
    },
    pupiltask_popup_designtemplate: {
        LoadComponent: function () {
            return require("@root/Application/d.Extranet/4_Pupil/PC/Modules/PupilToPlan/PupilTaskPage/PupilTaskPage_DesignTemplate")
                .default;
        }
    },
    learningjournallist: {
        LoadComponent: function () {
            return require("@root/Application/d.Extranet/4_Pupil/PC/Modules/PupilThink/PupilThink")
                .default;
        }
    },
    learningjournallist_designtemplate: {
        LoadComponent: function () {
            return require("@root/Application/d.Extranet/4_Pupil/PC/Modules/PupilThink/PupilThink_DesignTemplate")
                .default;
        }
    },
    news: {
        LoadComponent: function () {
            return require("@root/Application/d.Extranet/4_Pupil/PC/Modules/PupilNews/PupilNews")
                .default;
        }
    },
    news_designtemplate: {
        LoadComponent: function () {
            return require("@root/Application/d.Extranet/4_Pupil/PC/Modules/PupilNews/PupilNews_DesignTemplate")
                .default;
        }
    },
    pupiladdcontactpopup: {
        LoadComponent: function () {
            return require("@root/Application/d.Extranet/4_Pupil/PC/Modules/PupilNews/PupilNewsPopUp/PupilAddContactPopup/PupilAddContactPopup").default;
        }
    },
    pupiladdcontactpopup_designtemplate: {
        LoadComponent: function () {
            return require('@root/Application/d.Extranet/4_Pupil/PC/Modules/PupilNews/PupilNewsPopUp/PupilAddContactPopup/PupilAddContactPopup_DesignTemplate').default;
        }
    },
    sharenewspopup: {
        LoadComponent: function () {
            return require('@root/Application/d.Extranet/4_Pupil/PC/Modules/PupilNews/PupilNewsPopUp/PupilShareNewsPopup/PupilShareNewsPopup').default;
        }
    },

    sharenewspopup_designtemplate: {
        LoadComponent: function () {
            return require('@root/Application/d.Extranet/4_Pupil/PC/Modules/PupilNews/PupilNewsPopUp/PupilShareNewsPopup/PupilShareNewsPopup_DesignTemplate').default;
        }
    },
    document: {
        LoadComponent: function () {
            return require("@root/Application/d.Extranet/4_Pupil/PC/Modules/PupilDocument/PupilDocument")
                .default;
        }
    },
    document_designtemplate: {
        LoadComponent: function () {
            return require("@root/Application/d.Extranet/4_Pupil/PC/Modules/PupilDocument/PupilDocument_DesignTemplate")
                .default;
        }
    },
    createnewfolderpopup: {
        LoadComponent: function () {
            return require("@root/Application/d.Extranet/4_Pupil/PC/Modules/PupilDocument/PupilDocumentPopUp/PupilCreateFolderPopUp/PupilCreateFolderPopUp")
                .default;
        }
    },

    createnewfolderpopup_designtemplate: {
        LoadComponent: function () {
            return require('@root/Application/d.Extranet/4_Pupil/PC/Modules/PupilDocument/PupilDocumentPopUp/CreateFolderPopUp/CreateFolderPopUp_DesignTemplate').default;
        }
    },
    pupiluploadfilepopup: {
        LoadComponent: function () {
            return require("@root/Application/d.Extranet/4_Pupil/PC/Modules/PupilDocument/PupilDocumentPopUp/UploadFilePopup/UploadFilePopup")
                .default;
        }
    },
    uploadfilepopup_designtemplate: {
        LoadComponent: function () {
            return require('@root/Application/d.Extranet/4_Pupil/PC/Modules/PupilDocument/PupilDocumentPopUp/UploadFilePopup/UploadFilePopup_DesignTemplate').default;
        }
    },
    deletefolderpopup: {
        LoadComponent: function () {
            return require("@root/Application/d.Extranet/4_Pupil/PC/Modules/PupilDocument/PupilDocumentPopUp/DeleteFolderPopup/DeleteFolderPopup").default;
        }
    },
    deletefolderpopup_designtemplate: {
        LoadComponent: function () {
            return require("@root/Application/d.Extranet/4_Pupil/PC/Modules/PupilDocument/PupilDocumentPopUp/DeleteFolderPopup/DeleteFolderPopup_DesignTemplate").default;
        }
    },
    sharefolderpopup: {
        LoadComponent: function () {
            return require("@root/Application/d.Extranet/4_Pupil/PC/Modules/PupilDocument/PupilDocumentPopUp/ShareFolderPopup/ShareFolderPopup").default;

        }
    },
    sharefolderpopup_designtemplate: {
        LoadComponent: function () {
            return require('@root/Application/d.Extranet/4_Pupil/PC/Modules/PupilDocument/PupilDocumentPopUp/ShareFolderPopup/ShareFolderPopup_DesignTemplate').default;


        }
    },
    copyfolderpopup: {
        LoadComponent: function () {
            return require("@root/Application/d.Extranet/4_Pupil/PC/Modules/PupilDocument/PupilDocumentPopUp/CopyFolderPopUp/CopyFolderPopUp").default;
        }
    },
    copyingfolderpopup_designtemplate: {
        LoadComponent: function () {
            return require('@root/Application/d.Extranet/4_Pupil/PC/Modules/PupilDocument/PupilDocumentPopUp/CopyFolderPopUp/CopyingFolderPopUp_DesignTemplate').default;
        }
    },
    pupildocumenterrorpopup: {
        LoadComponent: function () {
            return require('@root/Application/d.Extranet/4_Pupil/PC/Modules/PupilDocument/PupilDocumentPopUp/ErrorPopup/ErrorPopup').default;
        }
    },
    errorpopup_designtemplate: {
        LoadComponent: function () {
            return require('@root/Application/d.Extranet/4_Pupil/PC/Modules/PupilDocument/PupilDocumentPopUp/ErrorPopup/ErrorPopup_DesignTemplate').default;
        }
    },
    errormessagedeletedefaultimage: {
        LoadComponent: function () {
            return require("@root/Application/d.Extranet/4_Pupil/PC/Modules/PupilProfile/PupilProfilePopUp/DeleteErrorPopUp/DeleteErrorPopUp").default;
        }
    },
    errorprogressreportpopup_designtempalte: {
        LoadComponent: function () {
            return require("@root/Application/d.Extranet/4_Pupil/PC/Modules/WorkTest/WorkTestPopUp/ErrorPopUp/ErrorPopUp_DesignTemplate").default;
        }
    },
    errorprogressreportpopup: {
        LoadComponent: function () {
            return require("@root/Application/d.Extranet/4_Pupil/PC/Modules/WorkTest/WorkTestPopUp/ErrorPopUp/ErrorPopUp").default;
        }
    },
    createnewtaskpopup_designtempalte: {
        LoadComponent: function () {
            return require("@root/Application/d.Extranet/4_Pupil/PC/Modules/WorkTest/WorkTestPopUp/CreateNewExercisePopUp/CreateNewExercisePopUp_DesignTemplate").default;
        }
    },
    createnewtaskpopup: {
        LoadComponent: function () {
            return require("@root/Application/d.Extranet/4_Pupil/PC/Modules/WorkTest/WorkTestPopUp/CreateNewExercisePopUp/CreateNewExercisePopUp").default;
        }
    },
    testpopup: {
        LoadComponent: function () {
            return require("@root/Application/d.Extranet/4_Pupil/PC/Modules/WorkTest/WorkTestPopUp/TestPopUp/TestPopUp").default;
        }
    },
    taskimagepopup: {
        LoadComponent: function () {
            return require("@root/Application/d.Extranet/4_Pupil/PC/Modules/WorkTest/WorkTestPopUp/TaskImagePopUp/TaskImagePopUp").default;
        }
    },
    test: {
        LoadComponent: function () {
            return require("@root/Application/d.Extranet/4_Pupil/PC/Modules/PupilTest/PupilTest").default;
        }
    },
    test_designtempalte: {
        LoadComponent: function () {
            return require("@root/Application/d.Extranet/4_Pupil/PC/Modules/PupilTest/PupilTest_DesignTemplate").default;
        }
    },
    practicetestdisplay: {
        LoadComponent: function () {
            return require('@root/Application/d.Extranet/3_Teacher/PC/Modules/PracticeTestDisplay/PracticeTestDisplay').default;
        }
    },
    resetresultspopup: {
        LoadComponent: function () {
            return require('@root/Application/d.Extranet/4_Pupil/PC/Modules/PracticeTest/ResetResultsPopUp/ResetResultsPopUp').default;
        }
    },
    resetresultspopup_designtempalte: {
        LoadComponent: function () {
            return require('@root/Application/d.Extranet/4_Pupil/PC/Modules/PracticeTest/ResetResultsPopUp/ResetResultsPopUp_DesignTemplate').default;
        }
    },

    practicetestpopup: {
        LoadComponent: function () {
            return require('@root/Application/d.Extranet/4_Pupil/PC/Modules/PracticeTest/PracticeTestPopUp/PracticeTestPopUp').default;
        }
    },

    practicetest: {
        LoadComponent: function () {
            return require('@root/Application/d.Extranet/4_Pupil/PC/Modules/PracticeTest/PracticeTest').default;
        }
    },

};

const ComponentController = {
    getComponent: function (strComponentName) {
        console.log("string", strComponentName.toLowerCase().split('?')[0]);
        if (components[strComponentName.toLowerCase().split('?')[0]] !== null) {
            return components[strComponentName.toLowerCase().split('?')[0]].LoadComponent();
        } else {
            console.log("notfound");
            return undefined;
        }
    }
};

export default ComponentController;
