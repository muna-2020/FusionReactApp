import loadable from '@loadable/component';

//Base ComponentController imports.
import BaseComponentController from "@shared/Framework/BaseClass/Base_ComponentController";

export const objComponents = {
    CMSImage_TestApplication: function () {
        return loadable(() => import(/* webpackChunkName: "CMSImage_TestApplication" */ '@root/Application/e.Editor/PC/Modules/6_CMSElement/StandardElements/CMSImage/CMSImage_TestApplication/CMSImage_TestApplication'));
    },
    CMSText_TestApplication: function () {
        return loadable(() => import(/* webpackChunkName: "CMSText_TestApplication" */ '@root/Application/e.Editor/PC/Modules/6_CMSElement/StandardElements/CMSText/CMSText_TestApplication/CMSText_TestApplication'));
    },
    CMSCheckBox_TestApplication: function () {
        return loadable(() => import(/* webpackChunkName: "CMSCheckBox_TestApplication" */ '@root/Application/e.Editor/PC/Modules/6_CMSElement/StandardElements/CMSCheckbox/CMSCheckbox_TestApplication/CMSCheckbox_TestApplication'));
    },
    CMSRadio_TestApplication: function () {
        return loadable(() => import(/* webpackChunkName: "CMSRadio_TestApplication" */ '@root/Application/e.Editor/PC/Modules/6_CMSElement/StandardElements/CMSRadio/CMSRadio_TestApplication/CMSRadio_TestApplication'));
    },
    CMSInput_TestApplication: function () {
        return loadable(() => import(/* webpackChunkName: "CMSInput_TestApplication" */ '@root/Application/e.Editor/PC/Modules/6_CMSElement/StandardElements/CMSInput/CMSInput_TestApplication/CMSInput_TestApplication'));
    },
    CMSMultiInput_TestApplication: function () {
        return loadable(() => import(/* webpackChunkName: "CMSMultiInput_TestApplication" */ '@root/Application/e.Editor/PC/Modules/6_CMSElement/StandardElements/CMSMultiInput/CMSMultiInput_TestApplication/CMSMultiInput_TestApplication'));
    },
    CMSCheckBoxMatrix_TestApplication: function () {
        return loadable(() => import(/* webpackChunkName: "CMSCheckBoxMatrix_TestApplication" */ '@root/Application/e.Editor/PC/Modules/6_CMSElement/StandardElements/CMSCheckboxMatrix/CMSCheckboxMatrix_TestApplication/CMSCheckboxMatrix_TestApplication'));
    },
    CMSRadioMatrix_TestApplication: function () {
        return loadable(() => import(/* webpackChunkName: "CMSRadioMatrix_TestApplication" */ '@root/Application/e.Editor/PC/Modules/6_CMSElement/StandardElements/CMSRadioMatrix/CMSRadioMatrix_TestApplication/CMSRadioMatrix_TestApplication'));
    },
    CMSDragDrop_TestApplication: function () {
        return loadable(() => import(/* webpackChunkName: "CMSDragDrop_TestApplication" */ '@root/Application/e.Editor/PC/Modules/6_CMSElement/StandardElements/CMSDragdrop/CMSDragdrop_TestApplication/CMSDragdrop_TestApplication'));
    },
    CMSDragDropAssign_TestApplication: function () {
        return loadable(() => import(/* webpackChunkName: "CMSDragDropAssign_TestApplication" */ '@root/Application/e.Editor/PC/Modules/6_CMSElement/StandardElements/CMSDragdropAssign/CMSDragdropAssign_TestApplication/CMSDragdropAssign_TestApplication'));
    },
    CMSDragDropSort_TestApplication: function () {
        return loadable(() => import(/* webpackChunkName: "CMSDragDropSort_TestApplication" */ '@root/Application/e.Editor/PC/Modules/6_CMSElement/StandardElements/CMSDragdropSort/CMSDragdropSort_TestApplication/CMSDragdropSort_TestApplication'));
    },
    CMSDropDown_TestApplication: function () {
        return loadable(() => import(/* webpackChunkName: "CMSDropDown_TestApplication" */ '@root/Application/e.Editor/PC/Modules/6_CMSElement/StandardElements/CMSDropdown/CMSDropdown_TestApplication/CMSDropdown_TestApplication'));
    },
    CMSVideo_TestApplication: function () {
        return loadable(() => import(/* webpackChunkName: "CMSVideo_TestApplication" */ '@root/Application/e.Editor/PC/Modules/6_CMSElement/StandardElements/CMSVideo/CMSVideo_TestApplication/CMSVideo_TestApplication'));
    },
    CMSOverlay_TestApplication: function () {
        return loadable(() => import(/* webpackChunkName: "CMSOverlay_TestApplication" */ '@root/Application/e.Editor/PC/Modules/6_CMSElement/StandardElements/CMSOverlay/CMSOverlay_TestApplication/CMSOverlay_TestApplication'));
    },
    CMSTextMark_TestApplication: function () {
        return loadable(() => import(/* webpackChunkName: "CMSTextMark_TestApplication" */ '@root/Application/e.Editor/PC/Modules/6_CMSElement/StandardElements/CMSTextMark/CMSTextMark_TestApplication/CMSTextMark_TestApplication'));
    },
    CMSHotspot_TestApplication: function () {
        return loadable(() => import(/* webpackChunkName: "CMSHotspot_TestApplication" */ '@root/Application/e.Editor/PC/Modules/6_CMSElement/StandardElements/CMSHotspot/CMSHotspot_TestApplication/CMSHotspot_TestApplication'));
    },
    CMSWiki_TestApplication: function () {
        return loadable(() => import(/* webpackChunkName: "CMSWiki_TestApplication" */ '@root/Application/e.Editor/PC/Modules/6_CMSElement/StandardElements/CMSWiki/CMSWiki_TestApplication/CMSWiki_TestApplication'));
    },
    CMSMultiPageElement_TestApplication: function () {
        return loadable(() => import(/* webpackChunkName: "CMSMultiPageElement_TestApplication" */ '@root/Application/e.Editor/PC/Modules/6_CMSElement/StandardElements/CMSMultiPageElement/CMSMultiPageElement_TestApplication/CMSMultiPageElement_TestApplication'));
    },
    CMSTextArea_TestApplication: function () {
        return loadable(() => import(/* webpackChunkName: "CMSTextArea_TestApplication" */ '@root/Application/e.Editor/PC/Modules/6_CMSElement/StandardElements/CMSTextArea/CMSTextArea_TestApplication/CMSTextArea_TestApplication'));
    },
    CMSAudio_TestApplication: function () {
        return loadable(() => import(/* webpackChunkName: "CMSAudio_TestApplication" */ '@root/Application/e.Editor/PC/Modules/6_CMSElement/StandardElements/CMSAudio/CMSAudio_TestApplication/CMSAudio_TestApplication'));
    },
    CMSFormula_TestApplication: function () {
        return loadable(() => import(/* webpackChunkName: "CMSFormula_TestApplication" */ '@root/Application/e.Editor/PC/Modules/6_CMSElement/StandardElements/CMSFormula/CMSFormula_TestApplication/CMSFormula_TestApplication'));
    },
    //CMSAnimation_TestApplication: function () {
    //    return loadable(() => import(/* webpackChunkName: "CMSAnimation_TestApplication" */ '@root/Application/e.Editor/PC/Modules/6_CMSElement/StandardElements/CMSAnimation/CMSAnimation_TestApplication/CMSAnimation_TestApplication'));
    //},
    //CMSAnimationWrapper_TestApplication: function () {
    //    return loadable(() => import(/* webpackChunkName: "CMSAnimationWrapper_TestApplication" */ '@root/Application/e.Editor/PC/Modules/6_CMSElement/StandardElements/CMSAnimationWrapper/CMSAnimationWrapper_TestApplication/CMSAnimationWrapper_TestApplication'));
    //}
    CMSAnimationWrapper_TestApplication: function () {
        return loadable(() => import(/* webpackChunkName: "CMSAnimationWrapper_TestApplication" */ '@root/Application/e.Editor/PC/Modules/6_CMSElement/StandardElements/CMSAnimationWrapper/CMSAnimationWrapper_TestApplication/CMSAnimationWrapper_TestApplication'));
    },
    CMSInputFormula_TestApplication: function () {
        return loadable(() => import(/* webpackChunkName: "CMSInputFormula_TestApplication" */ '@root/Application/e.Editor/PC/Modules/6_CMSElement/StandardElements/CMSInputFormula/CMSInputFormula_TestApplication/CMSInputFormula_TestApplication'));
    },
    CMSSample_TestApplication: function () {
        return loadable(() => import(/* webpackChunkName: "CMSSample_TestApplication" */ '@root/Application/e.Editor/PC/Modules/6_CMSElement/StandardElements/CMSSample/CMSSample_TestApplication/CMSSample_TestApplication'));
    },
    CMSSampleTest_TestApplication: function () {
        return loadable(() => import(/* webpackChunkName: "CMSSampleTest_TestApplication" */ '@root/Application/e.Editor/PC/Modules/6_CMSElement/StandardElements/CMSSampleTest/CMSSampleTest_TestApplication/CMSSampleTest_TestApplication'));
    },
    CMSLineAssign_TestApplication: function () {
        return loadable(() => import(/* webpackChunkName: "CMSLineAssign_TestApplication" */ '@root/Application/e.Editor/PC/Modules/6_CMSElement/StandardElements/CMSLineAssign/CMSLineAssign_TestApplication/CMSLineAssign_TestApplication'));
    },
    CMSTextHighlight_TestApplication: function () {
        return loadable(() => import(/* webpackChunkName: "CMSTextHighlight_TestApplication" */ '@root/Application/e.Editor/PC/Modules/6_CMSElement/StandardElements/CMSTextHighlight/CMSTextHighlight_TestApplication/CMSTextHighlight_TestApplication'));
    },
    CMSLinks_TestApplication: function () {
        return loadable(() => import(/* webpackChunkName: "CMSLinks_TestApplication" */ '@root/Application/e.Editor/PC/Modules/6_CMSElement/StandardElements/CMSLink/CMSLink_TestApplication/CMSLink_TestApplication'));
    },
    CMSClipArt_TestApplication: function () {
        return loadable(() => import(/* webpackChunkName: "CMSClipArt_TestApplication" */ '@root/Application/e.Editor/PC/Modules/6_CMSElement/StandardElements/CMSClipArt/CMSClipArt_TestApplication/CMSClipArt_TestApplication'));
    },
    CMSCrossOutWord_TestApplication: function () {
        return loadable(() => import(/* webpackChunkName: "CMSCrossOutWord_TestApplication" */ '@root/Application/e.Editor/PC/Modules/6_CMSElement/StandardElements/CMSCrossOutWord/CMSCrossOutWord_TestApplication/CMSCrossOutWord_TestApplication'));
    },
    CMSPunctuations_TestApplication: function () {
        return loadable(() => import(/* webpackChunkName: "CMSPunctuations_TestApplication" */ '@root/Application/e.Editor/PC/Modules/6_CMSElement/StandardElements/CMSPunctuations/CMSPunctuations_TestApplication/CMSPunctuations_TestApplication'));
    },
    CMSMoveableElementHolder_TestApplication: function () {
        return loadable(() => import(/* webpackChunkName: "CMSMoveableElementHolder_TestApplication" */ '@root/Application/e.Editor/PC/Modules/6_CMSElement/StandardElements/CMSMoveableElementHolder/CMSMoveableElementHolder_TestApplication/CMSMoveableElementHolder_TestApplication'));
    },
    CMSColorFillInstance_TestApplication: function () {
        return loadable(() => import(/* webpackChunkName: "CMSColorFillInstance_TestApplication" */ '@root/Application/e.Editor/PC/Modules/6_CMSElement/StandardElements/CMSColorFillWrapper/CMSColorFillWrapper_TestApplication/CMSColorFillWrapper_TestApplication'));
    },
    CMSTrueFalse_TestApplication: function () {
        return loadable(() => import(/* webpackChunkName: "CMSTrueFalse_TestApplication" */ '@root/Application/e.Editor/PC/Modules/6_CMSElement/StandardElements/CMSTrueFalse/CMSTrueFalse_TestApplication/CMSTrueFalse_TestApplication'));
    },
    CMSIFrame_TestApplication: function () {
        return loadable(() => import(/* webpackChunkName: "CMSIFrame_TestApplication" */ '@root/Application/e.Editor/PC/Modules/6_CMSElement/StandardElements/CMSIFrame/CMSIFrame_TestApplication/CMSIFrame_TestApplication'));
    },
    CMSGenericDragDrop_TestApplication: function () {
        return loadable(() => import(/* webpackChunkName: "CMSGenericDragDrop_TestApplication" */ '@root/Application/e.Editor/PC/Modules/6_CMSElement/StandardElements/CMSGenericDragDrop/CMSGenericDragDrop_TestApplication/CMSGenericDragDrop_TestApplication'));
    },
    CMSPairingElement_TestApplication: function () {
        return loadable(() => import(/* webpackChunkName: "CMSPairingElement_TestApplication" */ '@root/Application/e.Editor/PC/Modules/6_CMSElement/StandardElements/CMSPairingElement/CMSPairingElement_TestApplication/CMSPairingElement_TestApplication'));
    },
    CMSMapElement_TestApplication: function () {
        return loadable(() => import(/* webpackChunkName: "CMSMapElement_TestApplication" */ '@root/Application/e.Editor/PC/Modules/6_CMSElement/StandardElements/CMSMapElement/CMSMapElement_TestApplication/CMSMapElement_TestApplication'));
    },
    CMSAudioRecorder_TestApplication: function () {
        return loadable(() => import(/* webpackChunkName: "CMSAudioRecorder_TestApplication" */ '@root/Application/e.Editor/PC/Modules/6_CMSElement/StandardElements/CMSAudioRecorder/CMSAudioRecorder_TestApplication/CMSAudioRecorder_TestApplication'));
    }
};

const ElementController = {
    GetComponent_Old: function (strComponentName) {
        if (typeof objComponents[`CMS${strComponentName}_TestApplication`] !== "undefined") {
            let LoadedComponent = objComponents[`CMS${strComponentName}_TestApplication`]();
            LoadedComponent.load().then((objComponent) => {
                if (objComponent.default.DynamicStyles) {
                    var ComponentStyleArray = objComponent.default.DynamicStyles({ JConfiguration });
                    ComponentStyleArray.forEach(Style => {
                        if (!document.getElementById(Style)) {
                            var objStyle = document.createElement('link');
                            objStyle.id = Style;
                            objStyle.setAttribute("rel", "stylesheet");
                            objStyle.setAttribute("href", Style);
                            objStyle.setAttribute('type', 'text/css');
                            document.head.appendChild(objStyle);
                        }
                    });
                }
            });
            return LoadedComponent;
        }
        else {
            console.error("Component '" + `CMS${strComponentName}_TestApplication` + "' not found");
            return null;
        }
    },
    GetComponent: function (strComponentName) {
        return BaseComponentController.GetComponent(`CMS${strComponentName}_TestApplication`, objComponents);
    },
    CheckComponent: function (strComponentName) {
        return objComponents[`CMS${strComponentName}_TestApplication`];
    },
};

export default ElementController;
