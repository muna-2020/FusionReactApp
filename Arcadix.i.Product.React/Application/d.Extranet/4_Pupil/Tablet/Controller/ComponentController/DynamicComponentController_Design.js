import React from 'react';
import Loadable from 'react-loadable';

const loading = () => <div></div>;

const login_designtemplate = Loadable({
    loader: () => import('@root/Application/d.Extranet/4_Pupil/PC/LoginAndMaster/Login/Login'),
    loading,
    modules: ['login_designtemplate']
});


const pupil_designtemplate = Loadable({
    loader: () => import('@root/Application/d.Extranet/4_Pupil/PC/LoginAndMaster/Master/Master'),
    loading,
    modules: ['pupil_designtemplate']
});


const home_designtemplate = Loadable({
    loader: () => import('@root/Application/d.Extranet/4_Pupil/PC/LoginAndMaster/Home/Home'),
    loading,
    modules: ['home_designtemplate']
});

const pupilprofile_designtemplate = Loadable({
    loader: () => import('@root/Application/d.Extranet/4_Pupil/PC/Modules/PupilProfile/PupilProfile_DesignTemplate'),
    loading,
    modules: ['pupilprofile_designtemplate']
});

const worktest_designtemplate = Loadable({
    loader: () => import('@root/Application/d.Extranet/4_Pupil/PC/Modules/WorkTest/WorkTest_DesignTemplate'),
    loading,
    modules: ['worktest_designtemplate']
});

const summary_popup_designtemplate = Loadable({
    loader: () => import('@root/Application/d.Extranet/4_Pupil/PC/Modules/WorkTest/WorkTestPopUp/ProgressReport/ProgressReport_SummaryPopup_DesignTemplate'),
    loading,
    modules: ['summary_popup_designtemplate']
});

const learningjournal_designtemplate = Loadable({
    loader: () => import('@root/Application/d.Extranet/4_Pupil/PC/Modules/PupilToPlan/PupilToPlan_DesignTemplate'),
    loading,
    modules: ['learningjournal_designtemplate']
});

const pupiltoplan_popup = Loadable({
    loader: () => import('@root/Application/d.Extranet/4_Pupil/PC/Modules/PupilToPlan/PupilToPlan_PopUp/PupilToPlan_PopUp_DesignTemplate'),
    loading,
    modules: ['pupiltoplan_popup']
});

const pupiltoplan_popup_designtemplate = Loadable({
    loader: () => import('@root/Application/d.Extranet/4_Pupil/PC/Modules/PupilToPlan/PupilToPlan_PopUp/PupilToPlan_PopUp_DesignTemplate'),
    loading,
    modules: ['pupiltoplan_popup_designtemplate']
});

const pupiltask_popup = Loadable({
    loader: () => import('@root/Application/d.Extranet/4_Pupil/PC/Modules/PupilToPlan/PupilTaskPage/PupilTaskPage_DesignTemplate'),
    loading,
    modules: ['pupiltask_popup']
});

const pupiltask_popup_designtemplate = Loadable({
    loader: () => import('@root/Application/d.Extranet/4_Pupil/PC/Modules/PupilToPlan/PupilTaskPage/PupilTaskPage_DesignTemplate'),
    loading,
    modules: ['pupiltask_popup_designtemplate']
});

const learningjournallist_designtemplate = Loadable({
    loader: () => import('@root/Application/d.Extranet/4_Pupil/PC/Modules/PupilThink/PupilThink_DesignTemplate'),
    loading,
    modules: ['learningjournallist_designtemplate']
});

const news_designtemplate = Loadable({
    loader: () => import('@root/Application/d.Extranet/4_Pupil/PC/Modules/PupilNews/PupilNews_DesignTemplate'),
    loading,
    modules: ['news_designtemplate']
});

const pupiladdcontactpopup_designtemplate = Loadable({
    loader: () => import('@root/Application/d.Extranet/4_Pupil/PC/Modules/PupilNews/PupilNewsPopUp/PupilAddContactPopup/PupilAddContactPopup_DesignTemplate'),
    loading,
    modules: ['pupiladdcontactpopup_designtemplate']
});

const sharenewspopup_designtemplate = Loadable({
    loader: () => import('@root/Application/d.Extranet/4_Pupil/PC/Modules/PupilNews/PupilNewsPopUp/PupilShareNewsPopup/PupilShareNewsPopup_DesignTemplate'),
    loading,
    modules: ['sharenewspopup_designtemplate']
});

const document_designtemplate = Loadable({
    loader: () => import('@root/Application/d.Extranet/4_Pupil/PC/Modules/PupilDocument/PupilDocument_DesignTemplate'),
    loading,
    modules: ['document_designtemplate']
});

const createnewfolderpopup_designtemplate = Loadable({
    loader: () => import('@root/Application/d.Extranet/4_Pupil/PC/Modules/PupilDocument/PupilDocumentPopUp/CreateFolderPopUp/CreateFolderPopUp_DesignTemplate'),
    loading,
    modules: ['createnewfolderpopup_designtemplate']
});

const uploadfilepopup_designtemplate = Loadable({
    loader: () => import('@root/Application/d.Extranet/4_Pupil/PC/Modules/PupilDocument/PupilDocumentPopUp/UploadFilePopup/UploadFilePopup_DesignTemplate'),
    loading,
    modules: ['uploadfilepopup_designtemplate']
});

const deletefolderpopup_designtemplate = Loadable({
    loader: () => import('@root/Application/d.Extranet/4_Pupil/PC/Modules/PupilDocument/PupilDocumentPopUp/DeleteFolderPopup/DeleteFolderPopup_DesignTemplate'),
    loading,
    modules: ['deletefolderpopup_designtemplate']
});

const sharefolderpopup_designtemplate = Loadable({
    loader: () => import('@root/Application/d.Extranet/4_Pupil/PC/Modules/PupilDocument/PupilDocumentPopUp/ShareFolderPopup/ShareFolderPopup_DesignTemplate'),
    loading,
    modules: ['sharefolderpopup_designtemplate']
});

const copyingfolderpopup_designtemplate = Loadable({
    loader: () => import('@root/Application/d.Extranet/4_Pupil/PC/Modules/PupilDocument/PupilDocumentPopUp/CopyFolderPopUp/CopyingFolderPopUp_DesignTemplate'),
    loading,
    modules: ['copyingfolderpopup_designtemplate']
});

const errorpopup = Loadable({
    loader: () => import('@root/Application/d.Extranet/4_Pupil/PC/Modules/PupilDocument/PupilDocumentPopUp/ErrorPopup/ErrorPopup_DesignTemplate'),
    loading,
    modules: ['errorpopup']
});

const errorpopup_designtemplate = Loadable({
    loader: () => import('@root/Application/d.Extranet/4_Pupil/PC/Modules/PupilDocument/PupilDocumentPopUp/ErrorPopup/ErrorPopup_DesignTemplate'),
    loading,
    modules: ['errorpopup_designtemplate']
});

const errorprogressreportpopup_designtempalte = Loadable({
    loader: () => import('@root/Application/d.Extranet/4_Pupil/PC/Modules/WorkTest/WorkTestPopUp/ErrorPopUp/ErrorPopUp_DesignTemplate'),
    loading,
    modules: ['errorprogressreportpopup_designtempalte']
});

const createnewtaskpopup_designtempalte = Loadable({
    loader: () => import('@root/Application/d.Extranet/4_Pupil/PC/Modules/WorkTest/WorkTestPopUp/CreateNewExercisePopUp/CreateNewExercisePopUp_DesignTemplate'),
    loading,
    modules: ['createnewtaskpopup_designtempalte']
});

const test_designtempalte = Loadable({
    loader: () => import('@root/Application/d.Extranet/4_Pupil/PC/Modules/PupilTest/PupilTest_DesignTemplate'),
    loading,
    modules: ['test_designtempalte']
});
const resetresultspopup_designtempalte = Loadable({
    loader: () => import('@root/Application/d.Extranet/4_Pupil/PC/Modules/PracticeTest/ResetResultsPopUp/ResetResultsPopUp_DesignTemplate'),
    loading,
    modules: ['resetresultspopup_designtempalte']
});



export const components = {
    login_designtemplate: {
        LoadComponent: function () {
            return login_designtemplate;
        }
    },
    pupil_designtemplate: {
        LoadComponent: function () {
            return pupil_designtemplate;
        }
    },
    home_designtemplate: {
        LoadComponent: function () {
            return home_designtemplate;
        }
    },
    pupilprofile_designtemplate: {
        LoadComponent: function () {
            return pupilprofile_designtemplate;
        }
    },
    worktest_designtemplate: {
        LoadComponent: function () {
            return worktest_designtemplate;
        }
    },
    summary_popup_designtemplate: {
        LoadComponent: function () {
            return summary_popup_designtemplate;
        }
    },
    learningjournal_designtemplate: {
        LoadComponent: function () {
            return learningjournal_designtemplate;
        }
    },
    pupiltoplan_popup_designtemplate: {
        LoadComponent: function () {
            return pupiltoplan_popup_designtemplate;
        }
    },
    pupiltask_popup_designtemplate: {
        LoadComponent: function () {
            return pupiltask_popup_designtemplate;
        }
    },
    learningjournallist_designtemplate: {
        LoadComponent: function () {
            return learningjournallist_designtemplate;
        }
    },
    news_designtemplate: {
        LoadComponent: function () {
            return news_designtemplate;
        }
    },
    pupiladdcontactpopup_designtemplate: {
        LoadComponent: function () {
            return pupiladdcontactpopup_designtemplate;
        }
    },
    document_designtemplate: {
        LoadComponent: function () {
            return document_designtemplate;
        }
    },
    createnewfolderpopup_designtemplate: {
        LoadComponent: function () {
            return createnewfolderpopup_designtemplate;
        }
    },
    uploadfilepopup_designtemplate: {
        LoadComponent: function () {
            return uploadfilepopup_designtemplate;
        }
    },
    deletefolderpopup_designtemplate: {
        LoadComponent: function () {
            return deletefolderpopup_designtemplate;
        }
    },
    sharefolderpopup_designtemplate: {
        LoadComponent: function () {
            return sharefolderpopup_designtemplate;
        }
    },
    copyingfolderpopup_designtemplate: {
        LoadComponent: function () {
            return copyingfolderpopup_designtemplate;
        }
    },
    errorpopup_designtemplate: {
        LoadComponent: function () {
            return errorpopup_designtemplate;
        }
    },
    sharenewspopup_designtemplate: {
        LoadComponent: function () {
            return sharenewspopup_designtemplate;
        }
    },
}


const ComponentController_Design = {
    getComponent: function (strComponentName) {
        debugger;
        var strDesignTemplate = GetQueryStringValue('IsDesignMode');
        Logger.Log("strDesignTemplate", strDesignTemplate);
        var fullComponentName = strComponentName.split('?')[0];
        if (strDesignTemplate == "true" && components[fullComponentName.toLowerCase()] != null) {
            return components[fullComponentName.toLowerCase()].LoadComponent();
        }
        else {
            Logger.Log("notfound");
            return undefined;
        }
    }
}

export default ComponentController_Design;