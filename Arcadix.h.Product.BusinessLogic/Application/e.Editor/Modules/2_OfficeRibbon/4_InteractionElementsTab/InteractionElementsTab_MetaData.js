
//Module related imports
import * as CMSInput_Editor_MetaData from "@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSInput/CMSInput_Editor/CMSInput_Editor_MetaData";
import * as CMSDropdown_Editor_MetaData from "@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSDropdown/CMSDropdown_Editor/CMSDropdown_Editor_MetaData";
import * as CMSTextArea_Editor_MetaData from "@shared/Application/e.Editor/Modules/6_CMSElement/StandardElements/CMSTextArea/CMSTextArea_Editor/CMSTextArea_Editor_MetaData";

//In-line Images import
import AddImageImage from '@inlineimage/Application/e.Editor/ReactJs/PC/Modules/2_OfficeRibbon/4_InteractionElementsTab/AddImage.svg?in-line';
import AdditionImage from '@inlineimage/Application/e.Editor/ReactJs/PC/Modules/2_OfficeRibbon/4_InteractionElementsTab/Addition.svg?in-line';
import AddTextImage from '@inlineimage/Application/e.Editor/ReactJs/PC/Modules/2_OfficeRibbon/4_InteractionElementsTab/AddText.svg?in-line';
import DeleteDragDropImage from '@inlineimage/Application/e.Editor/ReactJs/PC/Modules/2_OfficeRibbon/4_InteractionElementsTab/DeleteDragDrop.svg?in-line';
import DeleteLinkImage from '@inlineimage/Application/e.Editor/ReactJs/PC/Modules/2_OfficeRibbon/4_InteractionElementsTab/DeleteLink.svg?in-line';
import DictationImage from '@inlineimage/Application/e.Editor/ReactJs/PC/Modules/2_OfficeRibbon/4_InteractionElementsTab/Dictation.svg?in-line';
import DivisionImage from '@inlineimage/Application/e.Editor/ReactJs/PC/Modules/2_OfficeRibbon/4_InteractionElementsTab/Division.svg?in-line';
import DragDropDeactivateImage from '@inlineimage/Application/e.Editor/ReactJs/PC/Modules/2_OfficeRibbon/4_InteractionElementsTab/DragDropDeactivate.svg?in-line';
import DropdownImage from '@inlineimage/Application/e.Editor/ReactJs/PC/Modules/2_OfficeRibbon/4_InteractionElementsTab/Dropdown.svg?in-line';
import EllipseImage from '@inlineimage/Application/e.Editor/ReactJs/PC/Modules/2_OfficeRibbon/4_InteractionElementsTab/Ellipse.svg?in-line';
import EmailImage from '@inlineimage/Application/e.Editor/ReactJs/PC/Modules/2_OfficeRibbon/4_InteractionElementsTab/Email.svg?in-line';
import Field_LettersImage from '@inlineimage/Application/e.Editor/ReactJs/PC/Modules/2_OfficeRibbon/4_InteractionElementsTab/Field_Letters.svg?in-line';
import Field_NumbersImage from '@inlineimage/Application/e.Editor/ReactJs/PC/Modules/2_OfficeRibbon/4_InteractionElementsTab/Field_Numbers.svg?in-line';
import Field_WordImage from '@inlineimage/Application/e.Editor/ReactJs/PC/Modules/2_OfficeRibbon/4_InteractionElementsTab/Field_Word.svg?in-line';
import InsertLinkImage from '@inlineimage/Application/e.Editor/ReactJs/PC/Modules/2_OfficeRibbon/4_InteractionElementsTab/InsertLink.svg?in-line';
import MultiplicationImage from '@inlineimage/Application/e.Editor/ReactJs/PC/Modules/2_OfficeRibbon/4_InteractionElementsTab/Multiplication.svg?in-line';
import PairingCircleImage from '@inlineimage/Application/e.Editor/ReactJs/PC/Modules/2_OfficeRibbon/4_InteractionElementsTab/PairingCircle.svg?in-line';
import PairingDeleteImage from '@inlineimage/Application/e.Editor/ReactJs/PC/Modules/2_OfficeRibbon/4_InteractionElementsTab/PairingDelete.svg?in-line';
import PairingImageImage from '@inlineimage/Application/e.Editor/ReactJs/PC/Modules/2_OfficeRibbon/4_InteractionElementsTab/PairingImage.svg?in-line';
import PairingLineImage from '@inlineimage/Application/e.Editor/ReactJs/PC/Modules/2_OfficeRibbon/4_InteractionElementsTab/PairingLine.svg?in-line';
import PolygonImage from '@inlineimage/Application/e.Editor/ReactJs/PC/Modules/2_OfficeRibbon/4_InteractionElementsTab/Polygon.svg?in-line';
import RectangleImage from '@inlineimage/Application/e.Editor/ReactJs/PC/Modules/2_OfficeRibbon/4_InteractionElementsTab/Rectangle.svg?in-line';
import RemoveHotspotImage from '@inlineimage/Application/e.Editor/ReactJs/PC/Modules/2_OfficeRibbon/4_InteractionElementsTab/RemoveHotspot.svg?in-line';
import SetDragImage from '@inlineimage/Application/e.Editor/ReactJs/PC/Modules/2_OfficeRibbon/4_InteractionElementsTab/SetDrag.svg?in-line';
import SetDropImage from '@inlineimage/Application/e.Editor/ReactJs/PC/Modules/2_OfficeRibbon/4_InteractionElementsTab/SetDrop.svg?in-line';
import SubtractionImage from '@inlineimage/Application/e.Editor/ReactJs/PC/Modules/2_OfficeRibbon/4_InteractionElementsTab/Subtraction.svg?in-line';
import TextareaImage from '@inlineimage/Application/e.Editor/ReactJs/PC/Modules/2_OfficeRibbon/4_InteractionElementsTab/Textarea.svg?in-line';
import TextCorrectionImage from '@inlineimage/Application/e.Editor/ReactJs/PC/Modules/2_OfficeRibbon/4_InteractionElementsTab/TextCorrection.svg?in-line';
import TextFieldImage from '@inlineimage/Application/e.Editor/ReactJs/PC/Modules/2_OfficeRibbon/4_InteractionElementsTab/TextField.svg?in-line';
import TextIncorrectImage from '@inlineimage/Application/e.Editor/ReactJs/PC/Modules/2_OfficeRibbon/4_InteractionElementsTab/TextIncorrect.svg?in-line';
import TextPairingImage from '@inlineimage/Application/e.Editor/ReactJs/PC/Modules/2_OfficeRibbon/4_InteractionElementsTab/TextPairing.svg?in-line';
import TypeImage from '@inlineimage/Application/e.Editor/ReactJs/PC/Modules/2_OfficeRibbon/4_InteractionElementsTab/Type.svg?in-line';
import ValidateImage from '@inlineimage/Application/e.Editor/ReactJs/PC/Modules/2_OfficeRibbon/4_InteractionElementsTab/Validate.svg?in-line';
import WordIncorrectImage from '@inlineimage/Application/e.Editor/ReactJs/PC/Modules/2_OfficeRibbon/4_InteractionElementsTab/WordIncorrect.svg?in-line';

/**
 * @name GetInputTextOnlyDragStartJson
 * @summary This methods returns Simple input initialjson.
 * @returns {object} Initial input Json.
 * */
export const GetInputTextOnlyDragStartJson = () => {
    let objElementJson = CMSInput_Editor_MetaData.GetDefaultCMSInputTextJson();
    return objElementJson;
};

/**
 * @name GetInputWordOnlyDragStartJson
 * @summary This methods returns Simple word only input initial json.
 * @returns {object} Initial word only input Json.
 * */
export const GetInputWordOnlyDragStartJson = () => {
    let objElementJson = CMSInput_Editor_MetaData.GetDefaultCMSInputWordJson();
    return objElementJson;
};

/**
 * @name GetInputNumberOnlyDragStartJson
 * @summary This methods returns Simple number only input initial json.
 * @returns {object} Initial number only input Json.
 * */
export const GetInputNumberOnlyDragStartJson = () => {
    let objElementJson = CMSInput_Editor_MetaData.GetDefaultCMSInputNumberJson();
    return objElementJson;
};

/**
 * @name GetInputLetterOnlyJson
 * @summary This methods returns Simple letter only input initial json.
 * @returns {object} Initial letter only input Json.
 * */
export const GetInputLetterOnlyJson = () => {
    let objElementJson = CMSInput_Editor_MetaData.GetDefaultCMSInputLetterJson();
    return objElementJson;
};

/**
 * @name GetInputDotOnlyDragStartJson
 * @summary This methods returns Simple Dot only input initial json.
 * @returns {object} Initial Dot only input Json.
 * */
export const GetInputDotOnlyDragStartJson = () => {
    let objElementJson = CMSInput_Editor_MetaData.GetDefaultCMSInputDotJson();
    return objElementJson;
};

/**
 * @name GetInputDotOnlyDragStartJson
 * @summary This methods returns Simple comma only input initial json.
 * @returns {object} Initial comma only input Json.
 * */
export const GetInputCommaOnlyDragStartJson = () => {
    let objElementJson = CMSInput_Editor_MetaData.GetDefaultCMSInputCommaJson();
    return objElementJson;
};

/**
 * @name GetInputSemicolonOnlyDragStartJson
 * @summary This methods returns Simple semicolon only input initial json.
 * @returns {object} Initial semicolon only input Json.
 * */
export const GetInputSemicolonOnlyDragStartJson = () => {
    let objElementJson = CMSInput_Editor_MetaData.GetDefaultCMSInputSemicolonJson();
    return objElementJson;
};

/**
 * @name GetDropDownDragStartJson
 * @summary This methods returns dropdown initial json.
 * @returns {object} Initial dropdown Json.
 * */
export const GetDropDownDragStartJson = () => {
    let objElementJson = CMSDropdown_Editor_MetaData.GetDefaultElementJson();
    return objElementJson;
};

/**
 * @name GetTextAreaJson
 * @summary This methods returns TextArea initial json.
 * @returns {object} Initial TextArea Json.
 * */
export const GetTextAreaJson = () => {
    let objElementJson = CMSTextArea_Editor_MetaData.GetDefaultCMSTextAreaJson();
    return objElementJson;
};

/**
 * @name GetDictateJson
 * @summary This methods returns Dictate initial json.
 * @returns {object} Initial Dictate Json.
 * */
export const GetDictateJson = () => {
    let objElementJson = CMSTextArea_Editor_MetaData.GetDefaultCMSTextAreaDictationJson();
    return objElementJson;
};

/**
 * @name GetImageMeta
 * @summary forms the default images for in-line import.
* */
export const GetImageMeta = () => {
    return {
        AddImageImage: AddImageImage,
        AdditionImage: AdditionImage,
        AddTextImage: AddTextImage,
        DeleteDragDropImage: DeleteDragDropImage,
        DeleteLinkImage: DeleteLinkImage,
        DictationImage: DictationImage,
        DivisionImage: DivisionImage,
        DragDropDeactivateImage: DragDropDeactivateImage,
        DropdownImage: DropdownImage,
        EllipseImage: EllipseImage,
        EmailImage: EmailImage,
        Field_LettersImage: Field_LettersImage,
        Field_NumbersImage: Field_NumbersImage,
        Field_WordImage: Field_WordImage,
        InsertLinkImage: InsertLinkImage,
        MultiplicationImage: MultiplicationImage,
        PairingCircleImage: PairingCircleImage,
        PairingDeleteImage: PairingDeleteImage,
        PairingImageImage: PairingImageImage,
        PairingLineImage: PairingLineImage,
        PolygonImage: PolygonImage,
        RectangleImage: RectangleImage,
        RemoveHotspotImage: RemoveHotspotImage,
        SetDragImage: SetDragImage,
        SetDropImage: SetDropImage,
        SubtractionImage: SubtractionImage,
        TextareaImage: TextareaImage,
        TextCorrectionImage: TextCorrectionImage,
        TextFieldImage: TextFieldImage,
        TextIncorrectImage: TextIncorrectImage,
        TextPairingImage: TextPairingImage,
        TypeImage: TypeImage,
        ValidateImage: ValidateImage,
        WordIncorrectImage: WordIncorrectImage
    }
}