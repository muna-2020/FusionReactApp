import loadable from '@loadable/component';

//Element Component Controller.
import ElementComponentController from "@root/Application/e.Editor/Phone/Controller/ElementController/Editor/ElementController_Editor";

export const objComponents = {
    EditorFrame: function () {
        return loadable(() => import(/* webpackChunkName: "EditorFrame" */ '@root/Application/e.Editor/Phone/Modules/1_EditorFrame/EditorFrame'));
    },
    OfficeRibbon: function () {
        return loadable(() => import(/* webpackChunkName: "EditorFrame" */ '@root/Application/e.Editor/Phone/Modules/2_OfficeRibbon/OfficeRibbon'));
    },
    EditorWorkArea: function () {
        return loadable(() => import(/* webpackChunkName: "EditorWorkArea" */ '@root/Application/e.Editor/Phone/Modules/3_EditorWorkArea/EditorWorkArea'));
    },
    CMSPageContent_Editor: function () {
        return loadable(() => import(/* webpackChunkName: "CMSPageContent_Editor" */ '@root/Application/e.Editor/Phone/Modules/4_CMSPageContent/CMSPageContent_Editor/CMSPageContent_Editor'));
    },
    CMSPageContent_TestApplication: function () {
        return loadable(() => import(/* webpackChunkName: "CMSPageContent_TestApplication" */ '@root/Application/e.Editor/Phone/Modules/4_CMSPageContent/CMSPageContent_TestApplication/CMSPageContent_TestApplication'));
    },
    CMSContainer_Editor: function () {
        return loadable(() => import(/* webpackChunkName: "CMSContainer_Editor" */ '@root/Application/e.Editor/Phone/Modules/5_CMSContainer/CMSContainer_Editor/CMSContainer_Editor'));
    },
    CMSContainer_TestApplication: function () {
        return loadable(() => import(/* webpackChunkName: "CMSContainer_TestApplication" */ '@root/Application/e.Editor/Phone/Modules/5_CMSContainer/CMSContainer_TestApplication/CMSContainer_TestApplication'));
    },
    TaskPreviewWrapper: function () {
        return loadable(() => import(/* webpackChunkName: "TaskPreview" */ '@root/Application/e.Editor/Phone/Modules/1_EditorFrame/TaskPreviewWrapper/TaskPreviewWrapper'));
    },
    CMSLinkAddEdit: function () {
        return loadable(() => import(/* webpackChunkName: "CMSLinkAddEdit" */ '@root/Application/e.Editor/Phone/Modules/2_OfficeRibbon/2_InsertTab/CMSLinkAddEdit/CMSLinkAddEdit'));
    },
    ClipboardPopup: function () {
        return loadable(() => import(/* webpackChunkName: "ClipboardInserPopup" */ '@root/Application/e.Editor/Phone/Modules/2_OfficeRibbon/1_StartTab/ClipboardPopup/ClipboardPopup'));
    },
    ClipartPopup: function () {
        return loadable(() => import(/* webpackChunkName: "ClipboardInserPopup" */ '@root/Application/e.Editor/Phone/Modules/2_OfficeRibbon/2_InsertTab/ClipartPopup/ClipartPopup'));
    },
    DropdownSidebar: function () {
        return loadable(() => import(/* webpackChunkName: "DropdownSidebar" */ '@root/Application/e.Editor/Phone/Modules/6_CMSElement/StandardElements/CMSDropdown/CMSDropdown_Editor/DropdownSidebar/DropdownSidebar'));
    },
    SearchReplaceSidebar: function () {
        return loadable(() => import(/* webpackChunkName: "SearchReplaceSidebar" */ '@root/Application/e.Editor/Phone/Modules/2_OfficeRibbon/1_StartTab/SearchReplaceSidebar/SearchReplaceSidebar'));
    },
    SearchPopup: function () {
        return loadable(() => import(/* webpackChunkName: "SearchPopup" */ '@root/Application/e.Editor/Phone/Modules/2_OfficeRibbon/1_StartTab/SearchReplaceSidebar/SearchPopup/SearchPopup'));
    },
    OverlaySidebar: function () {
        return loadable(() => import(/* webpackChunkName: "OverlaySidebar" */ '@root/Application/e.Editor/Phone/Modules/6_CMSElement/StandardElements/CMSOverlay/CMSOverlay_Editor/OverlaySidebar/OverlaySidebar'));
    },
    InputSidebar: function () {
        return loadable(() => import(/* webpackChunkName: "InputSidebar" */ '@root/Application/e.Editor/Phone/Modules/6_CMSElement/StandardElements/CMSInput/CMSInput_Editor/InputSidebar/InputSidebar'));
    },
    MultiInputSidebar: function () {
        return loadable(() => import(/* webpackChunkName: "MultiInputSidebar" */ '@root/Application/e.Editor/Phone/Modules/6_CMSElement/StandardElements/CMSMultiInput/CMSMultiInput_Editor/MultiInputSidebar/MultiInputSidebar'));
    },
    TablePropertiesSidebar: function () {
        return loadable(() => import(/* webpackChunkName: "TablePropertiesSidebar" */ '@root/Application/e.Editor/Phone/Modules/2_OfficeRibbon/3_TablesTab/TablePropertiesSidebar/TablePropertiesSidebar'));
    },
    MailPopup: function () {
        return loadable(() => import(/* webpackChunkName: "MailPopup" */ '@root/Application/e.Editor/Phone/Modules/2_OfficeRibbon/2_InsertTab/MailPopup/MailPopup'));
    },
    ContainerTemplateSelection: function () {
        return loadable(() => import(/* webpackChunkName: "ContainerTemplateSelection" */ '@root/Application/e.Editor/Phone/Modules/5_CMSContainer/CMSContainer_Editor/ContainerTemplateSelection/ContainerTemplateSelection'));
    },
    WikiSidebar: function () {
        return loadable(() => import(/* webpackChunkName: "WikiSidebar" */ '@root/Application/e.Editor/Phone/Modules/6_CMSElement/StandardElements/CMSWiki/CMSWiki_Editor/WikiSidebar/WikiSidebar'));
    },
    WikiInfoPopup: function () {
        return loadable(() => import(/* webpackChunkName: "WikiInfoPopup" */ '@root/Application/e.Editor/Phone/Modules/6_CMSElement/StandardElements/CMSWiki/CMSWiki_TestApplication/WikiInfoPopup/WikiInfoPopup'));
    },
    AdditionalInformationSidebar: function () {
        return loadable(() => import(/* webpackChunkName: "AdditionalInformationSidebar" */ '@root/Application/e.Editor/Phone/Modules/4_CMSPageContent/CMSPageContent_Editor/AdditionalInformation/AdditionalInformationSidebar/AdditionalInformationSidebar'));
    },
    TextAreaSideBar: function () {
        return loadable(() => import(/* webpackChunkName: "TextAreaSideBar" */ '@root/Application/e.Editor/Phone/Modules/6_CMSElement/StandardElements/CMSTextArea/TextAreaSideBar/TextAreaSideBar'));
    },
    ImageProperties: function () {
        return loadable(() => import(/* webpackChunkName: "ImageProperties" */ '@root/Application/e.Editor/Phone/Modules/6_CMSElement/StandardElements/CMSImage/CMSImage_Editor/ImageProperties/ImageProperties'));
    },
    CheckboxSidebar: function () {
        return loadable(() => import(/* webpackChunkName: "CheckboxSidebar" */ '@root/Application/e.Editor/Phone/Modules/6_CMSElement/StandardElements/CMSCheckbox/CMSCheckbox_Editor/CheckboxSidebar/CheckboxSidebar'));
    },
    MultiMediaPopup: function () {
        return loadable(() => import(/* webpackChunkName: "MultiMediaPopup" */ '@root/Application/e.Editor/Phone/Modules/8_MultiMediaPopup/MultiMediaPopup'));
    },
    MultiMediaManagement_FolderAddEdit: function () {
        return loadable(() => import(/* webpackChunkName: "MultiMediaManagement_FolderAddEdit" */ '@root/Application/e.Editor/Phone/Modules/8_MultiMediaPopup/MultiMediaManagement/MultiMediaManagement_Folder/MultiMediaManagement_FolderAddEdit/MultiMediaManagement_FolderAddEdit'));
    },
    MultiMediaManagement_ElementAddEdit: function () {
        return loadable(() => import(/* webpackChunkName: "MultiMediaManagement_ElementAddEdit" */ '@root/Application/e.Editor/Phone/Modules/8_MultiMediaPopup/MultiMediaManagement/MultiMediaManagement_Element/MultiMediaManagement_ElementAddEdit/MultiMediaManagement_ElementAddEdit'));
    },
    ImageAddEdit: function () {
        return loadable(() => import(/* webpackChunkName: "ImageAddEdit" */ '@root/Application/e.Editor/Phone/Modules/6_CMSElement/StandardElements/CMSImage/CMSImage_Editor/CMSImageAddEdit/ImageAddEdit/ImageAddEdit'));
    },
    ImageManagement_ImageDetails: function () {
        return loadable(() => import(/* webpackChunkName: "ImageManagement_ImageDetails" */ '@root/Application/e.Editor/Phone/Modules/6_CMSElement/StandardElements/CMSImage/CMSImage_Editor/CMSImageAddEdit/ImageManagement_ImageDetails/ImageManagement_ImageDetails'));
    },
    ImagePopupDescription: function () {
        return loadable(() => import(/* webpackChunkName: "ImagePopupDescription" */ '@root/Application/e.Editor/Phone/Modules/6_CMSElement/StandardElements/CMSImage/CMSImage_Editor/CMSImageAddEdit/ImagePopupDescription/ImagePopupDescription'));
    },
    ImageSavePopup: function () {
        return loadable(() => import(/* webpackChunkName: "ImageSavePopup" */ '@root/Application/e.Editor/Phone/Modules/6_CMSElement/StandardElements/CMSImage/CMSImage_Editor/CMSImageSavePopup/CMSImageSavePopup'));
    },
    AudioAddEdit: function () {
        return loadable(() => import(/* webpackChunkName: "AudioAddEdit" */ '@root/Application/e.Editor/Phone/Modules/6_CMSElement/StandardElements/CMSAudio/CMSAudio_Editor/CMSAudioAddEdit/AudioAddEdit/AudioAddEdit'));
    },
    AudioManagement_AudioDetails: function () {
        return loadable(() => import(/* webpackChunkName: "AudioManagement_AudioDetails" */ '@root/Application/e.Editor/Phone/Modules/6_CMSElement/StandardElements/CMSAudio/CMSAudio_Editor/CMSAudioAddEdit/AudioManagement_AudioDetails/AudioManagement_AudioDetails'));
    },
    AudioPopupDescription: function () {
        return loadable(() => import(/* webpackChunkName: "AudioPopupDescription" */ '@root/Application/e.Editor/Phone/Modules/6_CMSElement/StandardElements/CMSAudio/CMSAudio_Editor/CMSAudioAddEdit/AudioPopupDescription/AudioPopupDescription'));
    },
    VideoAddEdit: function () {
        return loadable(() => import(/* webpackChunkName: "VideoAddEdit" */ '@root/Application/e.Editor/Phone/Modules/6_CMSElement/StandardElements/CMSVideo/CMSVideo_Editor/CMSVideoAddEdit/VideoAddEdit/VideoAddEdit'));
    },
    VideoManagement_VideoDetails: function () {
        return loadable(() => import(/* webpackChunkName: "VideoManagement_VideoDetails" */ '@root/Application/e.Editor/Phone/Modules/6_CMSElement/StandardElements/CMSVideo/CMSVideo_Editor/CMSVideoAddEdit/VideoManagement_VideoDetails/VideoManagement_VideoDetails'));
    },
    VideoPopupDescription: function () {
        return loadable(() => import(/* webpackChunkName: "VideoPopupDescription" */ '@root/Application/e.Editor/Phone/Modules/6_CMSElement/StandardElements/CMSVideo/CMSVideo_Editor/CMSVideoAddEdit/VideoPopupDescription/VideoPopupDescription'));
    },
    AnimationAddEdit: function () {
        return loadable(() => import(/* webpackChunkName: "AnimationAddEdit" */ '@root/Application/e.Editor/Phone/Modules/6_CMSElement/StandardElements/CMSAnimation/CMSAnimation_Editor/CMSAnimationAddEdit/AnimationAddEdit/AnimationAddEdit'));
    },
    AnimationManagement_AnimationDetails: function () {
        return loadable(() => import(/* webpackChunkName: "AnimationManagement_AnimationDetails" */ '@root/Application/e.Editor/Phone/Modules/6_CMSElement/StandardElements/CMSAnimation/CMSAnimation_Editor/CMSAnimationAddEdit/AnimationManagement_AnimationDetails/AnimationManagement_AnimationDetails'));
    },
    AnimationPopupDescription: function () {
        return loadable(() => import(/* webpackChunkName: "AnimationPopupDescription" */ '@root/Application/e.Editor/Phone/Modules/6_CMSElement/StandardElements/CMSAnimation/CMSAnimation_Editor/CMSAnimationAddEdit/AnimationPopupDescription/AnimationPopupDescription'));
    },
    AnimationWrapperSidebar: function () {
        return loadable(() => import(/* webpackChunkName: "AnimationWrapperSidebar" */ '@root/Application/e.Editor/Phone/Modules/6_CMSElement/StandardElements/CMSAnimationWrapper/CMSAnimationWrapper_Editor/AnimationWrapperSidebar/AnimationWrapperSidebar'));
    },
    AnimationImagePreviewPopup: function () {
        return loadable(() => import(/* webpackChunkName: "AnimationImagePreviewPopup" */ '@root/Application/e.Editor/Phone/Modules/6_CMSElement/StandardElements/CMSAnimationWrapper/CMSAnimationWrapper_Editor/AnimationWrapperSidebar/AnimationImagePreviewPopup/AnimationImagePreviewPopup'));
    },
    InteractionTypeSidebar: function () {
        return loadable(() => import(/* webpackChunkName: "InteractionTypeSidebar" */ '@root/Application/e.Editor/Phone/Modules/2_OfficeRibbon/4_InteractionElementsTab/InteractionTypeSidebar/InteractionTypeSidebar'));
    },
    SourceViewPopup: function () {
        return loadable(() => import(/* webpackChunkName: "SourceViewPopup" */ '@root/Application/e.Editor/Phone/Modules/1_EditorFrame/TopLeft/SourceViewPopup/SourceViewPopup'));
    },
    Toolbar: function () {
        return loadable(() => import(/* webpackChunkName: "Toolbar" */ '@root/Application/e.Editor/Phone/Modules/7_Text/Toolbar/Toolbar'));
    },
    PointOverrideSidebar: function () {
        return loadable(() => import(/* webpackChunkName: "PointOverrideSidebar" */ '@root/Application/e.Editor/Phone/Modules/4_CMSPageContent/CMSPageContent_Editor/PointOverrideSidebar/PointOverrideSidebar'));
    },
    PointOverrideTooltip: function () {
        return loadable(() => import(/* webpackChunkName: "PointOverrideTooltip" */ '@root/Application/e.Editor/Phone/Modules/4_CMSPageContent/CMSPageContent_Editor/PointOverrideSidebar/PointOverrideTooltip/PointOverrideTooltip'));
    },
    RadioPointOverrideSidebar: function () {
        return loadable(() => import(/* webpackChunkName: "RadioPointOverrideSidebar" */ "@root/Application/e.Editor/Phone/Modules/6_CMSElement/StandardElements/CMSRadio/CMSRadio_Editor/RadioPointOverrideSidebar/RadioPointOverrideSidebar"));
    },
    LinkPopupDescription: function () {
        return loadable(() => import(/* webpackChunkName: "LinkPopupDescription" */ '@root/Application/e.Editor/Phone/Modules/6_CMSElement/StandardElements/CMSLink/CMSLink_Editor/CMSLinkAddEdit/LinkPopupDescription/LinkPopupDescription'));
    },
    DocumentAddEdit: function () {
        return loadable(() => import(/* webpackChunkName: "DocumentAddEdit" */ '@root/Application/e.Editor/Phone/Modules/6_CMSElement/StandardElements/CMSDocument/CMSDocument_Editor/CMSDocumentAddEdit/DocumentAddEdit/DocumentAddEdit'));
    },
    DocumentManagement_DocumentDetails: function () {
        return loadable(() => import(/* webpackChunkName: "DocumentManagement_DocumentDetails" */ '@root/Application/e.Editor/Phone/Modules/6_CMSElement/StandardElements/CMSDocument/CMSDocument_Editor/CMSDocumentAddEdit/DocumentManagement_DocumentDetails/DocumentManagement_DocumentDetails'));
    },
    DocumentPopupDescription: function () {
        return loadable(() => import(/* webpackChunkName: "DocumentPopupDescription" */ '@root/Application/e.Editor/Phone/Modules/6_CMSElement/StandardElements/CMSDocument/CMSDocument_Editor/CMSDocumentAddEdit/DocumentPopupDescription/DocumentPopupDescription'));
    },
    AuditPopup: function () {
        return loadable(() => import(/* webpackChunkName: "AuditPopup" */ '@root/Application/e.Editor/Phone/Modules/1_EditorFrame/TopLeft/AuditPopup/AuditPopup'));
    },
    Calculator: function () {
        return loadable(() => import(/* webpackChunkName: "Calculator" */ '@root/Framework/Controls/Calculator/Calculator'));
    },
    Scientific: function () {
        return loadable(() => import(/* webpackChunkName: "Scientific" */ '@root/Framework/Controls/Calculator/Layout/Scientific/Scientific'));
    },
    Standard: function () {
        return loadable(() => import(/* webpackChunkName: "Standard" */ '@root/Framework/Controls/Calculator/Layout/Standard/Standard'));
    },
    CMSHtmlImage: function () {
        return loadable(() => import(/* webpackChunkName: "CMSHtmlImage" */ '@root/Application/e.Editor/Phone/Modules/6_CMSElement/StandardElements/CMSHtmlImage/CMSHtmlImage/CMSHtmlImage'));
    },
    LinkInfoPopup: function () {
        return loadable(() => import(/* webpackChunkName: "LinkInfoPopup" */ '@root/Application/e.Editor/Phone/Modules/6_CMSElement/StandardElements/CMSLink/CMSLink_TestApplication/LinkInfoPopup/LinkInfoPopup'));
    },
    UseCaseDocumentManagement_UseCaseDocumentDetails: function () {
        return loadable(() => import(/* webpackChunkName: "UseCaseDocumentManagement_UseCaseDocumentDetails" */ '@root/Application/c.ProductManagement/PC/Modules/5_Document/EditorLinkDocumentDetails/EditorLinkDocumentDetails'));
    },
    UseCaseExampleManagement_UseCaseExampleDetails: function () {
        return loadable(() => import(/* webpackChunkName: "UseCaseExampleManagement_UseCaseExampleDetails" */ '@root/Application/c.ProductManagement/PC/Modules/4_Example/EditorLinkExampleDetails/EditorLinkExampleDetails'));
    },
    ToggleSidebar: function () {
        return loadable(() => import(/* webpackChunkName: "ToggleSidebar" */ '@root/Application/e.Editor/Phone/Modules/6_CMSElement/StandardElements/CMSText/CMSText_Editor/ToggleSidebar/ToggleSidebar'));
    },
    LookAndFeelSidebar: function () {
        return loadable(() => import(/* webpackChunkName: "LookAndFeelSidebar" */ '@root/Application/e.Editor/Phone/Modules/4_CMSPageContent/CMSPageContent_Editor/LookAndFeelSidebar/LookAndFeelSidebar'));
    },
    VideoProperties: function () {
        return loadable(() => import(/* webpackChunkName: "VideoProperties" */ '@root/Application/e.Editor/Phone/Modules/6_CMSElement/StandardElements/CMSVideo/CMSVideo_Editor/CMSVideoAddEdit/VideoProperties/VideoProperties'));
    },
    ColorFillAddEdit: function () {
        return loadable(() => import(/* webpackChunkName: "ColorFillAddEdit" */ '@root/Application/e.Editor/Phone/Modules/6_CMSElement/StandardElements/CMSColorFill/CMSColorFill_Editor/CMSColorFillAddEdit/ColorFillAddEdit/ColorFillAddEdit'));
    },
    ColorFillManagement_ColorFillDetails: function () {
        return loadable(() => import(/* webpackChunkName: "ColorFillManagement_ColorFillDetails" */ '@root/Application/e.Editor/Phone/Modules/6_CMSElement/StandardElements/CMSColorFill/CMSColorFill_Editor/CMSColorFillAddEdit/ColorFillManagement_ColorFillDetails/ColorFillManagement_ColorFillDetails'));
    },
    ColorFillPopupDescription: function () {
        return loadable(() => import(/* webpackChunkName: "ColorFillPopupDescription" */ '@root/Application/e.Editor/Phone/Modules/6_CMSElement/StandardElements/CMSColorFill/CMSColorFill_Editor/CMSColorFillAddEdit/ColorFillPopupDescription/ColorFillPopupDescription'));
    },
    MoveableElementHolderPropertiesSidebar: function () {
        return loadable(() => import(/* webpackChunkName: "MoveableElementHolderPropertiesSidebar" */ '@root/Application/e.Editor/Phone/Modules/6_CMSElement/StandardElements/CMSMoveableElementHolder/CMSMoveableElementHolder_Editor/MoveableElementHolderPropertiesSidebar/MoveableElementHolderPropertiesSidebar'));
    },
    ColorFillWrapperProperties: function () {
        return loadable(() => import(/* webpackChunkName: "ColorFillWrapperProperties" */ '@root/Application/e.Editor/Phone/Modules/6_CMSElement/StandardElements/CMSColorFillWrapper/CMSColorFillWrapper_Editor/ColorFillWrapperProperties/ColorFillWrapperProperties'));
    },
    IFramePropertiesSidebar: function () {
        return loadable(() => import(/* webpackChunkName: "IFramePropertiesSidebar" */ '@root/Application/e.Editor/Phone/Modules/6_CMSElement/StandardElements/CMSIFrame/CMSIFrame_Editor/IFramePropertiesSidebar/IFramePropertiesSidebar'));
    },
    TextHighlightTab: function () {
        return loadable(() => import(/* webpackChunkName: "TextHighlightTab" */ '@root/Application/e.Editor/Phone/Modules/6_CMSElement/StandardElements/CMSTextHighlight/TextHighlightTab/TextHighlightTab'));
    },
    CrossOutWordTab: function () {
        return loadable(() => import(/* webpackChunkName: "CrossOutWordTab" */ '@root/Application/e.Editor/Phone/Modules/6_CMSElement/StandardElements/CMSCrossOutWord/CrossOutWordTab/CrossOutWordTab'));
    },
    TabbedPopup_Sample: function () {
        return loadable(() => import(/* webpackChunkName: "TabbedPopup_Sample" */ '@root/Application/c.ProductManagement/PC/Modules/4_Example/Framework/Blocks/Popup_Sample/TabbedPopup_Sample/TabbedPopup_Sample'));
    },
    LinkedPageDetails: function () {
        return loadable(() => import(/* webpackChunkName: "LinkedPageDetails" */ '@root/Application/e.Editor/Phone/Modules/8_MultiMediaPopup/MultiMediaManagement/MultiMediaManagement_Element/MultiMediaMangement_ElementDetails/LinkedPageDetails/LinkedPageDetails'));
    },
    MultiPageFeatures: function () {
        return loadable(() => import(/* webpackChunkName: "MultiPageFeatures" */ '@root/Application/e.Editor/Phone/Modules/6_CMSElement/StandardElements/CMSMultiPageElement/CMSMultiPageElement_Editor/MultiPageFeatures/MultiPageFeatures'));
    }
};

const ComponentController = {
    GetComponent: function (strComponentName) {
        return objComponents[strComponentName]();
    },
    GetElement: function (strComponentName) {
        return ElementComponentController.GetComponent(strComponentName);
    },
    CheckComponent: function (strComponentName) {
        return objComponents[strComponentName];
    }
};

export default ComponentController;






