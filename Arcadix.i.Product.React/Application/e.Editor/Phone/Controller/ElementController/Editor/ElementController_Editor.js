import loadable from '@loadable/component';

export const objComponents = {
    CMSImage_Editor: function () {
        return loadable(() => import(/* webpackChunkName: "CMSImage_Editor" */ '@root/Application/e.Editor/Phone/Modules/6_CMSElement/StandardElements/CMSImage/CMSImage_Editor/CMSImage_Editor'));
    },
    CMSText_Editor: function () {
        return loadable(() => import(/* webpackChunkName: "CMSText_Editor" */ '@root/Application/e.Editor/Phone/Modules/6_CMSElement/StandardElements/CMSText/CMSText_Editor/CMSText_Editor'));
    },
    CMSCheckBox_Editor: function () {
        return loadable(() => import(/* webpackChunkName: "CMSCheckBox_Editor" */ '@root/Application/e.Editor/Phone/Modules/6_CMSElement/StandardElements/CMSCheckbox/CMSCheckbox_Editor/CMSCheckbox_Editor'));
    },
    CMSRadio_Editor: function () {
        return loadable(() => import(/* webpackChunkName: "CMSRadio_Editor" */ '@root/Application/e.Editor/Phone/Modules/6_CMSElement/StandardElements/CMSRadio/CMSRadio_Editor/CMSRadio_Editor'));
    },
    CMSInput_Editor: function () {
        return loadable(() => import(/* webpackChunkName: "CMSInput_Editor" */ '@root/Application/e.Editor/Phone/Modules/6_CMSElement/StandardElements/CMSInput/CMSInput_Editor/CMSInput_Editor'));
    },
    CMSMultiInput_Editor: function () {
        return loadable(() => import(/* webpackChunkName: "CMSMultiInput_Editor" */ '@root/Application/e.Editor/Phone/Modules/6_CMSElement/StandardElements/CMSMultiInput/CMSMultiInput_Editor/CMSMultiInput_Editor'));
    },
    CMSCheckBoxMatrix_Editor: function () {
        return loadable(() => import(/* webpackChunkName: "CMSCheckBoxMatrix_Editor" */ '@root/Application/e.Editor/Phone/Modules/6_CMSElement/StandardElements/CMSCheckboxMatrix/CMSCheckboxMatrix_Editor/CMSCheckboxMatrix_Editor'));
    },
    CMSRadioMatrix_Editor: function () {
        return loadable(() => import(/* webpackChunkName: "CMSRadioMatrix_Editor" */ '@root/Application/e.Editor/Phone/Modules/6_CMSElement/StandardElements/CMSRadioMatrix/CMSRadioMatrix_Editor/CMSRadioMatrix_Editor'));
    },
    CMSDragDrop_Editor: function () {
        return loadable(() => import(/* webpackChunkName: "CMSDragDrop_Editor" */ '@root/Application/e.Editor/Phone/Modules/6_CMSElement/StandardElements/CMSDragdrop/CMSDragdrop_Editor/CMSDragdrop_Editor'));
    },
    CMSDragDropAssign_Editor: function () {
        return loadable(() => import(/* webpackChunkName: "CMSDragDropAssign_Editor" */ '@root/Application/e.Editor/Phone/Modules/6_CMSElement/StandardElements/CMSDragdropAssign/CMSDragdropAssign_Editor/CMSDragdropAssign_Editor'));
    },
    CMSDragDropSort_Editor: function () {
        return loadable(() => import(/* webpackChunkName: "CMSDragDropSort_Editor" */ '@root/Application/e.Editor/Phone/Modules/6_CMSElement/StandardElements/CMSDragdropSort/CMSDragdropSort_Editor/CMSDragdropSort_Editor'));
    },
    CMSDropDown_Editor: function () {
        return loadable(() => import(/* webpackChunkName: "CMSDropDown_Editor" */ '@root/Application/e.Editor/Phone/Modules/6_CMSElement/StandardElements/CMSDropdown/CMSDropdown_Editor/CMSDropdown_Editor'));
    },
    CMSVideo_Editor: function () {
        return loadable(() => import(/* webpackChunkName: "CMSVideo_Editor" */ '@root/Application/e.Editor/Phone/Modules/6_CMSElement/StandardElements/CMSVideo/CMSVideo_Editor/CMSVideo_Editor'));
    },
    CMSOverlay_Editor: function () {
        return loadable(() => import(/* webpackChunkName: "CMSOverlay_Editor" */ '@root/Application/e.Editor/Phone/Modules/6_CMSElement/StandardElements/CMSOverlay/CMSOverlay_Editor/CMSOverlay_Editor'));
    },
    CMSTextMark_Editor: function () {
        return loadable(() => import(/* webpackChunkName: "CMSTextMark_Editor" */ '@root/Application/e.Editor/Phone/Modules/6_CMSElement/StandardElements/CMSTextMark/CMSTextMark_Editor/CMSTextMark_Editor'));
    },
    //CMSImage_Editor: function () {
    //    return loadable(() => import(/* webpackChunkName: "CMSImage_Editor" */ '@root/Application/e.Editor/Phone/Modules/6_CMSElement/StandardElements/CMSImage/CMSImage_Editor/CMSImage_Editor'));
    //},
    CMSTextArea_Editor: function () {
        return loadable(() => import(/* webpackChunkName: "CMSTextArea_Editor" */ '@root/Application/e.Editor/Phone/Modules/6_CMSElement/StandardElements/CMSTextArea/CMSTextArea_Editor/CMSTextArea_Editor'));
    },
    CMSWiki_Editor: function () {
        return loadable(() => import(/* webpackChunkName: "CMSWiki_Editor" */ '@root/Application/e.Editor/Phone/Modules/6_CMSElement/StandardElements/CMSWiki/CMSWiki_Editor/CMSWiki_Editor'));
    },
    CMSMultiPageElement_Editor: function () {
        return loadable(() => import(/* webpackChunkName: "CMSMultiPageElement_Editor" */ '@root/Application/e.Editor/Phone/Modules/6_CMSElement/StandardElements/CMSMultiPageElement/CMSMultiPageElement_Editor/CMSMultiPageElement_Editor'));
    },
    CMSFormula_Editor: function () {
        return loadable(() => import(/* webpackChunkName: "CMSFormula_Editor" */ '@root/Application/e.Editor/Phone/Modules/6_CMSElement/StandardElements/CMSFormula/CMSFormula_Editor/CMSFormula_Editor'));
    },
    CMSHotspot_Editor: function () {
        return loadable(() => import(/* webpackChunkName: "CMSHotspot_Editor" */ '@root/Application/e.Editor/Phone/Modules/6_CMSElement/StandardElements/CMSHotspot/CMSHotspot_Editor/CMSHotspot_Editor'));
    },
    CMSAudio_Editor: function () {
        return loadable(() => import(/* webpackChunkName: "CMSAudio_Editor" */ '@root/Application/e.Editor/Phone/Modules/6_CMSElement/StandardElements/CMSAudio/CMSAudio_Editor/CMSAudio_Editor'));
    },
    CMSAnimationWrapper_Editor: function () {
        return loadable(() => import(/* webpackChunkName: "CMSAnimationWrapper_Editor" */ '@root/Application/e.Editor/Phone/Modules/6_CMSElement/StandardElements/CMSAnimationWrapper/CMSAnimationWrapper_Editor/CMSAnimationWrapper_Editor'));
    },
    CMSInputFormula_Editor: function () {
        return loadable(() => import(/* webpackChunkName: "CMSInputFormula_Editor" */ '@root/Application/e.Editor/Phone/Modules/6_CMSElement/StandardElements/CMSInputFormula/CMSInputFormula_Editor/CMSInputFormula_Editor'));
    }
    //CMSAnimation_Editor: function () {
    //    return loadable(() => import(/* webpackChunkName: "CMSAnimation_Editor" */ '@root/Application/e.Editor/Phone/Modules/6_CMSElement/StandardElements/CMSAnimation/CMSAnimation_Editor/CMSAnimation_Editor'));
    //},
    //CMSAnimationWrapper_Editor: function () {
    //    return loadable(() => import(/* webpackChunkName: "CMSAnimationWrapper_Editor" */ '@root/Application/e.Editor/Phone/Modules/6_CMSElement/StandardElements/CMSAnimationWrapper/CMSAnimationWrapper_Editor/CMSAnimationWrapper_Editor'));  
    //}
    ,
    CMSSample_Editor: function () {
        return loadable(() => import(/* webpackChunkName: "CMSSample_Editor" */ '@root/Application/e.Editor/Phone/Modules/6_CMSElement/StandardElements/CMSSample/CMSSample_Editor/CMSSample_Editor'));
    },
    CMSSampleTest_Editor: function () {
        return loadable(() => import(/* webpackChunkName: "CMSSampleTest_Editor" */ '@root/Application/e.Editor/Phone/Modules/6_CMSElement/StandardElements/CMSSampleTest/CMSSampleTest_Editor/CMSSampleTest_Editor'));
    },
    CMSLineAssign_Editor: function () {
        return loadable(() => import(/* webpackChunkName: "CMSLineAssign_Editor" */ '@root/Application/e.Editor/Phone/Modules/6_CMSElement/StandardElements/CMSLineAssign/CMSLineAssign_Editor/CMSLineAssign_Editor'));
    },
    CMSTextHighlight_Editor: function () {
        return loadable(() => import(/* webpackChunkName: "CMSTextHighlight_Editor" */ '@root/Application/e.Editor/Phone/Modules/6_CMSElement/StandardElements/CMSTextHighlight/CMSTextHighlight_Editor/CMSTextHighlight_Editor'));
    },
    CMSLinks_Editor: function () {
        return loadable(() => import(/* webpackChunkName: "CMSLinks_Editor" */ '@root/Application/e.Editor/Phone/Modules/6_CMSElement/StandardElements/CMSLink/CMSLink_Editor/CMSLink_Editor'));
    },
    CMSClipArt_Editor: function () {
        return loadable(() => import(/* webpackChunkName: "CMSClipArt_Editor" */ '@root/Application/e.Editor/Phone/Modules/6_CMSElement/StandardElements/CMSClipArt/CMSClipArt_Editor/CMSClipArt_Editor'));
    },
    CMSCrossOutWord_Editor: function () {
        return loadable(() => import(/* webpackChunkName: "CMSCrossOutWord_Editor" */ '@root/Application/e.Editor/Phone/Modules/6_CMSElement/StandardElements/CMSCrossOutWord/CMSCrossOutWord_Editor/CMSCrossOutWord_Editor'));
    },
    CMSPunctuations_Editor: function () {
        return loadable(() => import(/* webpackChunkName: "CMSPunctuations_Editor" */ '@root/Application/e.Editor/Phone/Modules/6_CMSElement/StandardElements/CMSPunctuations/CMSPunctuations_Editor/CMSPunctuations_Editor'));
    },
    CMSMoveableElementHolder_Editor: function () {
        return loadable(() => import(/* webpackChunkName: "CMSMoveableElementHolder_Editor" */ '@root/Application/e.Editor/Phone/Modules/6_CMSElement/StandardElements/CMSMoveableElementHolder/CMSMoveableElementHolder_Editor/CMSMoveableElementHolder_Editor'));
    },
    CMSColorFillInstance_Editor: function () {
        return loadable(() => import(/* webpackChunkName: "CMSColorFillInstance_Editor" */ '@root/Application/e.Editor/Phone/Modules/6_CMSElement/StandardElements/CMSColorFillWrapper/CMSColorFillWrapper_Editor/CMSColorFillWrapper_Editor'));
    },
    CMSTrueFalse_Editor: function () {
        return loadable(() => import(/* webpackChunkName: "CMSTrueFalse_Editor" */ '@root/Application/e.Editor/Phone/Modules/6_CMSElement/StandardElements/CMSTrueFalse/CMSTrueFalse_Editor/CMSTrueFalse_Editor'));
    },
    CMSIFrame_Editor: function () {
        return loadable(() => import(/* webpackChunkName: "CMSIFrame_Editor" */ '@root/Application/e.Editor/Phone/Modules/6_CMSElement/StandardElements/CMSIFrame/CMSIFrame_Editor/CMSIFrame_Editor'));
    },
    CMSGenericDragDrop_Editor: function () {
        return loadable(() => import(/* webpackChunkName: "CMSGenericDragDrop_Editor" */ '@root/Application/e.Editor/Phone/Modules/6_CMSElement/StandardElements/CMSGenericDragDrop/CMSGenericDragDrop_Editor/CMSGenericDragDrop_Editor'));
    },
    CMSPairingElement_Editor: function () {
        return loadable(() => import(/* webpackChunkName: "CMSPairingElement_Editor" */ '@root/Application/e.Editor/Phone/Modules/6_CMSElement/StandardElements/CMSPairingElement/CMSPairingElement_Editor/CMSPairingElement_Editor'));
    },
};

const ElementController = {
    GetComponent: function (strComponentName) {
        return objComponents[`CMS${strComponentName}_Editor`]();
    }
};

export default ElementController;
