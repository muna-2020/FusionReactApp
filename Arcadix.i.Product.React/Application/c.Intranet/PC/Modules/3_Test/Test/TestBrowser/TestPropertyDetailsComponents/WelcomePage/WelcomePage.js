// React related imports.
import React from 'react';

/**
 * @name WelcomePage
 * @param {object} props props
 * @summary This component is used for WelcomePage in TestPropertyDetails.
 * @returns {object} React.Fragement that contains the content to be added in popup required for TestPropertyDetails.
 */
const WelcomePage = props => {

    let objTextResource = props.Resource.Text;

    const GetTextDiv = () => {
        return <div>            
            <h3>{Localization.TextFormatter(objTextResource, "Text")}</h3>   
            <table>
                <tr>
                    <td>{Localization.TextFormatter(objTextResource, 'TitleLeftSide') + ":"}</td>
                    <td>{props.Data.TestData.objTestData.vTestTitle}</td>
                </tr>
                 <tr>
                    <td>{Localization.TextFormatter(objTextResource, 'TextStartButton') + ":"}</td>
                    <td>{props.Data.TestData.objTestData.vStartButtonText}</td>
                </tr>
                 <tr>
                    <td>{Localization.TextFormatter(objTextResource, 'TitleTopLeft') + ":"}</td>
                    <td>{props.Data.TestData.objTestData.vIntroductionPageTopLeftTitle}</td>
                </tr>
                 <tr>
                    <td>{Localization.TextFormatter(objTextResource, 'TitleTopRight') + ":"}</td>
                    <td>{props.Data.TestData.objTestData.vIntroductionPageRightTitle}</td>
                </tr>
                 <tr>
                    <td>{Localization.TextFormatter(objTextResource, 'FontSize') + ":"}</td>
                    <td>{props.Data.TestData.objTestData.iIntroductionPageRightTitleFontSize}</td>
                </tr>
                <tr>
                    <td>{Localization.TextFormatter(objTextResource, 'IntroText') + ":"}</td>
                    <td>{props.Data.TestData.objTestData.tTestInstructionForPupil}</td>
                </tr>
            </table>
        </div>
    }


    /**
     * @name GetContent
     * @summary Forms the whole jsx required for the component.
     * @returns {object} jsx, React.Fragment
     */
    const GetContent = () => {

        return <div>
            <h2>{Localization.TextFormatter(objTextResource, 'WelcomePage')}</h2>
            <h3>{Localization.TextFormatter(objTextResource, 'General')}</h3>
            <table>
                <tr>
                    <td>{Localization.TextFormatter(objTextResource, 'ShowIntroductionPage') + ":"}</td>
                    <td>{props.Data.TestData.t_TestDrive_Test_TestProperty[0].cShowIntroductionPage ? props.Data.TestData.t_TestDrive_Test_TestProperty[0].cShowIntroductionPage : "N"}</td>
                </tr>
            </table>
            {props.Data.TestData.t_TestDrive_Test_TestProperty[0].cShowIntroductionPage == "Y" ? GetTextDiv() : <React.Fragment />}

        </div>
    }
    return (
        props.Data.TestData.strTestUsage == "HighStake" || props.Data.TestData.strTestUsage == "HighStakeAdaptive" || props.Data.TestData.strTestUsage == "Demo" || props.Data.TestData.strTestUsage == "Wrapper" || props.Data.TestData.strTestUsage == "Survey" ? GetContent() : <React.Fragment />    );
};

export default WelcomePage;
