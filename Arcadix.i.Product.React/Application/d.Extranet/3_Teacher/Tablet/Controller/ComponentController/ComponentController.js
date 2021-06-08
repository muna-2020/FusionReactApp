
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
    teacher: {
        LoadComponent: function () {
            return require('@root/Application/d.Extranet/2_School/Tablet/LoginAndMaster/Master/Master').default;
        }
    },
    teacher_designtemplate: {
        LoadComponent: function () {
            return require('@root/Application/d.Extranet/2_School/Tablet/LoginAndMaster/Master/Master').default;
        }
    },
    teacherstartpage: {
        LoadComponent: function () {
            return require('@root/Application/d.Extranet/3_Teacher/PC/Modules/TeacherStartPage/TeacherStartPage').default;
        }
    },
    teacherstartpage_designtemplate: {
        LoadComponent: function () {
            return require('@root/Application/d.Extranet/3_Teacher/PC/Modules/TeacherStartPage/TeacherStartPage_DesignTemplate').default;
        }
    },
    teacherprofile: {
        LoadComponent: function () {
            return require('@root/Application/d.Extranet/3_Teacher/PC/Modules/TeacherProfile/TeacherProfile').default;
        }
    },
    teacherprofile_designtemplate: {
        LoadComponent: function () {
            return require('@root/Application/d.Extranet/3_Teacher/PC/Modules/TeacherProfile/TeacherProfile_DesignTemplate').default;
        }
    },

    pupillogins: {
        LoadComponent: function () {
            return require('@root/Application/d.Extranet/3_Teacher/PC/Modules/PupilLogin/PupilLogin').default;
        }
    },
    pupillogins_designtemplate: {
        LoadComponent: function () {
            return require('@root/Application/d.Extranet/3_Teacher/PC/Modules/PupilLogin/PupilLogin_DesignTemplate').default;
        }
    },
    notes: {
        LoadComponent: function () {
            return require('@root/Application/d.Extranet/3_Teacher/PC/Modules/Notes/Notes').default;
        }
    },
    notes_designtemplate: {
        LoadComponent: function () {
            return require('@root/Application/d.Extranet/3_Teacher/PC/Modules/Notes/Notes_DesignTemplate').default;
        }
    },

    testlogins: {
        LoadComponent: function () {
            return require('@root/Application/d.Extranet/3_Teacher/PC/Modules/TestLogins/TestLogins').default;
        }
    },
    testlogins_designtemplate: {
        LoadComponent: function () {
            return require('@root/Application/d.Extranet/3_Teacher/PC/Modules/TestLogins/TestLogins_DesignTemplate').default;
        }
    },
    testresults: {
        LoadComponent: function () {
            return require('@root/Application/d.Extranet/3_Teacher/PC/Modules/TestResults/TestResults').default;
        }
    },
    testresults_designtemplate: {
        LoadComponent: function () {
            return require('@root/Application/d.Extranet/3_Teacher/PC/Modules/TestResults/TestResults_DesignTemplate').default;
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

    highstaketestlogins: {
        LoadComponent: function () {
            return require('@root/Application/d.Extranet/3_Teacher/PC/Modules/HighStakeTestLogins/HighStakeTestLogins').default;
        }
    },
    highstaketestlogins_designtemplate: {
        LoadComponent: function () {
            return require('@root/Application/d.Extranet/3_Teacher/PC/Modules/HighStakeTestLogins/HighStakeTestLogins_DesignTemplate').default;
        }
    },
    testresultshighstake: {
        LoadComponent: function () {
            return require('@root/Application/d.Extranet/3_Teacher/PC/Modules/HighStakeTestResults/HighStakeTestResults').default;
        }
    },
    testresultshighstake_designtemplate: {
        LoadComponent: function () {
            return require('@root/Application/d.Extranet/3_Teacher/PC/Modules/HighStakeTestResults/HighStakeTestResults_DesignTemplate').default;
        }
    },


    learnjournal: {
        LoadComponent: function () {
            return require('@root/Application/d.Extranet/3_Teacher/PC/Modules/LearningJournal/LearningJournal').default;
        }
    },
    learnjournal_designtemplate: {
        LoadComponent: function () {
            return require('@root/Application/d.Extranet/3_Teacher/PC/Modules/LearningJournal/LearningJournal_DesignTemplate').default;
        }
    },
    learningjournalarchive: {
        LoadComponent: function () {
            return require('@root/Application/d.Extranet/3_Teacher/PC/Modules/LearningJournalArchive/LearningJournalArchive').default;
        }
    },
    learningjournalarchive_designtemplate: {
        LoadComponent: function () {
            return require('@root/Application/d.Extranet/3_Teacher/PC/Modules/LearningJournalArchive/LearningJournalArchive_DesignTemplate').default;
        }
    },
    teacherlearningtestsystem: {
        LoadComponent: function () {
            return require('@root/Application/d.Extranet/3_Teacher/PC/Modules/LearningTestSystem/LearningTestSystem').default;
        }
    },
    teacherlearningtestsystem_designtemplate: {
        LoadComponent: function () {
            return require('@root/Application/d.Extranet/3_Teacher/PC/Modules/LearningTestSystem/LearningTestSystem_DesignTemplate').default;
        }
    },
    teacherlearningtestmanual: {
        LoadComponent: function () {
            return require('@root/Application/d.Extranet/3_Teacher/PC/Modules/LearningTestTeacher/LearningTestTeacher').default;
        }
    },
    teacherlearningtestmanual_designtemplate: {
        LoadComponent: function () {
            return require('@root/Application/d.Extranet/3_Teacher/PC/Modules/LearningTestTeacher/LearningTestTeacher_DesignTemplate').default;
        }
    },
    classandpupil: {
        LoadComponent: function () {
            return require('@root/Application/d.Extranet/3_Teacher/PC/Modules/ClassAndPupil/ClassAndPupil').default;
        }
    },
    classandpupil_designtemplate: {
        LoadComponent: function () {
            return require('@root/Application/d.Extranet/3_Teacher/PC/Modules/ClassAndPupil/ClassAndPupil_DesignTemplate').default;
        }
    },
    contact: {
        LoadComponent: function () {
            return require('@root/Application/d.Extranet/3_Teacher/PC/Modules/Contact/Contact').default;
        }
    },
    contact_designtemplate: {
        LoadComponent: function () {
            return require('@root/Application/d.Extranet/3_Teacher/PC/Modules/Contact/Contact_Designtemplate').default;
        }
    },
    notes: {
        LoadComponent: function () {
            return require('@root/Application/d.Extranet/3_Teacher/PC/Modules/Notes/Notes').default;
        }
    },
    notes_designtemplate: {
        LoadComponent: function () {
            return require('@root/Application/d.Extranet/3_Teacher/PC/Modules/Notes/Notes_Designtemplate').default;
        }
    },
    teachernews: {
        LoadComponent: function () {
            return require('@root/Application/d.Extranet/3_Teacher/PC/Modules/TeacherNews/TeacherNews').default;
        }
    },
    teachernews_designtemplate: {
        LoadComponent: function () {
            return require('@root/Application/d.Extranet/3_Teacher/PC/Modules/TeacherNews/TeacherNews_DesignTemplate').default;
        }
    },
    teacherdocument: {
        LoadComponent: function () {
            return require('@root/Application/d.Extranet/3_Teacher/PC/Modules/TeacherDocument/TeacherDocument').default;
        }
    },
    teacherdocument_designtemplate: {
        LoadComponent: function () {
            return require('@root/Application/d.Extranet/3_Teacher/PC/Modules/TeacherDocument/TeacherDocument_DesignTemplate').default;
        }
    },

    interpretation: {
        LoadComponent: function () {
            return require('@root/Application/d.Extranet/3_Teacher/PC/Modules/Interpretation/Interpretation').default;
        }
    },
    interpretation_designtemplate: {
        LoadComponent: function () {
            return require('@root/Application/d.Extranet/3_Teacher/PC/Modules/Interpretation/Interpretation_DesignTemplate').default;
        }
    },
    admininterpretation: {
        LoadComponent: function () {
            return require('@root/Application/d.Extranet/3_Teacher/PC/Modules/InterpretationAdmin/InterpretationAdmin').default;
        }
    },
    admininterpretation_designtemplate: {
        LoadComponent: function () {
            return require('@root/Application/d.Extranet/3_Teacher/PC/Modules/InterpretationAdmin/InterpretationAdmin_DesignTemplate').default;
        }
    },


    timetableschedule: {
        LoadComponent: function () {
            return require('@root/Application/d.Extranet/3_Teacher/PC/Modules/TimeTableSchedule/TimeTableSchedule').default;
        }
    },

    timetableschedule_designtemplate: {
        LoadComponent: function () {
            return require('@root/Application/d.Extranet/3_Teacher/PC/Modules/TimeTableSchedule/TimeTableSchedule_DesignTemplate').default;
        }
    },
    teacheraddfolderpopup: {
        LoadComponent: function () {
            return require('@root/Application/d.Extranet/3_Teacher/PC/Modules/TeacherDocument/TeacherAddFolderPopUp').default;
        }
    },

    teacherassignuserpopup: {
        LoadComponent: function () {
            return require('@root/Application/d.Extranet/3_Teacher/PC/Modules/TeacherDocument/TeacherAssignUserPopUp').default;
        }
    },
    teacherfileuploadpopup: {
        LoadComponent: function () {
            return require('@root/Application/d.Extranet/3_Teacher/PC/Modules/TeacherDocument/TeacherFileUploadPopUp').default;
        }
    },
    addcontactpopup: {
        LoadComponent: function () {
            return require('@root/Application/d.Extranet/3_Teacher/PC/Modules/TeacherNews/TeacherAddContactPopup/AddContactPopup_DesignTemplate').default;
        }
    },
    addcontactpopup_designtemplate: {
        LoadComponent: function () {
            return require('@root/Application/d.Extranet/3_Teacher/PC/Modules/TeacherNews/TeacherAddContactPopup/AddContactPopup_DesignTemplate').default;
        }
    },
    createnewfolderpopup: {
        LoadComponent: function () {
            return require("@root/Application/d.Extranet/3_Teacher/PC/Modules/TeacherDocument/TeacherDocumentPopUp/CreateFolderPopUp/CreateFolderPopUp_DesignTemplate")
                .default;
        }
    },
    createnewfolderpopup_designtemplate: {
        LoadComponent: function () {
            return require('@root/Application/d.Extranet/3_Teacher/PC/Modules/TeacherDocument/TeacherDocumentPopUp/CreateFolderPopUp/CreateFolderPopUp_DesignTemplate').default;
        }
    },
    uploadfilepopup: {
        LoadComponent: function () {
            return require("@root/Application/d.Extranet/3_Teacher/PC/Modules/TeacherDocument/TeacherDocumentPopUp/UploadFilePopup/UploadFilePopup_DesignTemplate")
                .default;
        }
    },
    uploadfilepopup_designtemplate: {
        LoadComponent: function () {
            return require('@root/Application/d.Extranet/3_Teacher/PC/Modules/TeacherDocument/TeacherDocumentPopUp/UploadFilePopup/UploadFilePopup_DesignTemplate').default;
        }
    },
    deletefolderpopup: {
        LoadComponent: function () {
            return require("@root/Application/d.Extranet/3_Teacher/PC/Modules/TeacherDocument/TeacherDocumentPopUp/DeleteFolderPopup/DeleteFolderPopup_DesignTemplate").default;
        }
    },
    deletefolderpopup_designtemplate: {
        LoadComponent: function () {
            return require("@root/Application/d.Extranet/3_Teacher/PC/Modules/TeacherDocument/TeacherDocumentPopUp/DeleteFolderPopup/DeleteFolderPopup_DesignTemplate").default;
        }
    },
    sharefolderpopup: {
        LoadComponent: function () {
            return require("@root/Application/d.Extranet/3_Teacher/PC/Modules/TeacherDocument/TeacherDocumentPopUp/ShareFolderPopup/ShareFolderPopup_DesignTemplate").default;

        }
    },
    sharefolderpopup_designtemplate: {
        LoadComponent: function () {
            return require('@root/Application/d.Extranet/3_Teacher/PC/Modules/TeacherDocument/TeacherDocumentPopUp/ShareFolderPopup/ShareFolderPopup_DesignTemplate').default;
        }
    },
    copyingfolderpopup: {
        LoadComponent: function () {
            return require("@root/Application/d.Extranet/3_Teacher/PC/Modules/TeacherDocument/TeacherDocumentPopUp/CopyingFolderPopUp/CopyingFolderPopUp_DesignTemplate").default;
        }
    },
    copyingfolderpopup_designtemplate: {
        LoadComponent: function () {
            return require('@root/Application/d.Extranet/3_Teacher/PC/Modules/TeacherDocument/TeacherDocumentPopUp/CopyingFolderPopUp/CopyingFolderPopUp_DesignTemplate').default;
        }
    },



    subjectexpert: {
        LoadComponent: function () {
            return require("@root/Application/d.Extranet/3_Teacher/PC/Modules/CoTeacherAndSubjectExpert/CoTeacherAndSubjectExpert").default;
        }
    },
    subjectexpert_designtemplate: {
        LoadComponent: function () {
            return require('@root/Application/d.Extranet/3_Teacher/PC/Modules/CoTeacherAndSubjectExpert/CoTeacherAndSubjectExpert_DesignTemplate').default;
        }
    },

    activetestpopup: {
        LoadComponent: function () {
            return require("@root/Application/d.Extranet/3_Teacher/PC/Modules/TestLogins/TestLoginsPopups/ActivateTestPopup/ActivateTestPopup").default;
        }
    },
    activetestpopup_designtemplate: {
        LoadComponent: function () {
            return require('@root/Application/d.Extranet/3_Teacher/PC/Modules/TestLogins/TestLoginsPopups/ActivateTestPopup/ActivateTestPopup_DesignTemplate').default;
        }
    },

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






