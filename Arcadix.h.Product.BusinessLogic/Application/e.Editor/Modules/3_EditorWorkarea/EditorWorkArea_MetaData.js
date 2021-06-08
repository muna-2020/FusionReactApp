//Application state Classes
import ApplicationState from '@shared/Framework/DataService/ApplicationState/ApplicationState';

//UniqueId.
import * as UniqueId from "@root/Framework/Services/UniqueId/UniqueId";

//In-line Image imports...
import MobilePreviewImage from '@inlineimage/Application/e.Editor/ReactJs/PC/Modules/3_EditorWorkArea/MobilePreview.svg?in-line';
import MoveNextImage from '@inlineimage/Application/e.Editor/ReactJs/PC/Modules/3_EditorWorkArea/MoveNext.svg?in-line';
import MovePrevImage from '@inlineimage/Application/e.Editor/ReactJs/PC/Modules/3_EditorWorkArea/MovePrev.svg?in-line';
import PointOverride_NoImage from '@inlineimage/Application/e.Editor/ReactJs/PC/Modules/3_EditorWorkArea/PointOverride_No.svg?in-line';
import PointOverride_YesImage from '@inlineimage/Application/e.Editor/ReactJs/PC/Modules/3_EditorWorkArea/PointOverride_Yes.svg?in-line';
import CloseWindowImage from '@inlineimage/Common/ReactJs/PC/Icons/CloseWindow.png';
import PresentationImage from '@inlineimage/Application/c.Intranet/ReactJs/PC/Modules/2_Task/Presentation.svg?inline';
import DemoImage from '@inlineimage/Application/c.Intranet/ReactJs/PC/Modules/2_Task/Demo_32.svg?inline';
import LearningImage from '@inlineimage/Application/c.Intranet/ReactJs/PC/Modules/2_Task/TestLerntest_32.svg?inline';
import LowStakeImage from '@inlineimage/Application/c.Intranet/ReactJs/PC/Modules/2_Task/TestPruefung_32.svg?inline';
import HighStakeImage from '@inlineimage/Application/c.Intranet/ReactJs/PC/Modules/2_Task/HighStake_32.svg?inline';
import HighStakeExampleImage from '@inlineimage/Application/c.Intranet/ReactJs/PC/Modules/2_Task/HighStake_Example.svg?inline';
import HighStakeIntroImage from '@inlineimage/Application/c.Intranet/ReactJs/PC/Modules/2_Task/HighStake_Intro.svg?inline';
import HighStakeBreakImage from '@inlineimage/Application/c.Intranet/ReactJs/PC/Modules/2_Task/HighStake_Pause.svg?inline';
import HighStakeSurveyImage from '@inlineimage/Application/c.Intranet/ReactJs/PC/Modules/2_Task/HighStakeSurvey.svg?inline';
import HighStakeSurveyListImage from '@inlineimage/Application/c.Intranet/ReactJs/PC/Modules/2_Task/HighStakeSurveyList.svg?inline';
import HighStakeAdaptiveImage from '@inlineimage/Application/c.Intranet/ReactJs/PC/Modules/2_Task/HighStakeAdaptive.svg?inline';
import SurveyImage from '@inlineimage/Application/c.Intranet/ReactJs/PC/Modules/2_Task/Survey_32.svg?inline';
import SurveyListImage from '@inlineimage/Application/c.Intranet/ReactJs/PC/Modules/2_Task/SurveyPlaceHolder.svg?inline';
import SpacerImage from '@inlineimage/Application/c.Intranet/ReactJs/PC/Modules/2_Task/spacer.svg?inline';

/**
 * @name GetDefaultContainertJson
 * @param {any} intTemplateId template id
 * @summary Contains the default container json.
 * @returns {object} container json object.
 */
export const GetDefaultContainertJson = (intTemplateId) => {
    let objClientUserDetails = ApplicationState.GetProperty("ClientUserDetails") ? ApplicationState.GetProperty("ClientUserDetails") : ClientUserDetails;
    let objContainerJson = {
        "iContainerId": UniqueId.GetUniqueId(),
        "iContainerTemplateId": intTemplateId,
        "Elements": [],
        "iContainerTypeId": 5,
        "vContainerBackgroundColor": "white",
        "iContainerFolderId": 0,
        "iMainClientId": parseInt(objClientUserDetails["MainClientId"]),
        "cIsDeleted": "N",
        "cShowCalculator": "N",
        "cShowCalculatorOnLoad": "N",
        "cIsAnswerTitleEditable": "N",
        "cIsDisplayedInContainerTree": "N",
        "cIsSetHeight": "N",
        "uUserId": objClientUserDetails["UserId"]
    };
    return objContainerJson;
};


/**
 * @name GetImageMeta
 * @summary forms the default images for inline import.
 * */
export const GetImageMeta = () => {
    return {
        MobilePreviewImage: MobilePreviewImage,
        MoveNextImage: MoveNextImage,
        MovePrevImage: MovePrevImage,
        PointOverride_NoImage: PointOverride_NoImage,
        PointOverride_YesImage: PointOverride_YesImage,
        CloseWindowImage: CloseWindowImage,
        PresentationImage: PresentationImage,
        DemoImage: DemoImage,
        LearningImage: LearningImage,
        LowStakeImage: LowStakeImage,
        HighStakeImage: HighStakeImage,
        HighStakeExampleImage: HighStakeExampleImage,
        HighStakeIntroImage: HighStakeIntroImage,
        HighStakeBreakImage: HighStakeBreakImage,
        HighStakeSurveyImage: HighStakeSurveyImage,
        HighStakeSurveyListImage: HighStakeSurveyListImage,
        HighStakeAdaptiveImage: HighStakeAdaptiveImage,
        SurveyImage: SurveyImage,
        SurveyListImage: SurveyListImage,
        SpacerImage: SpacerImage
    }
}