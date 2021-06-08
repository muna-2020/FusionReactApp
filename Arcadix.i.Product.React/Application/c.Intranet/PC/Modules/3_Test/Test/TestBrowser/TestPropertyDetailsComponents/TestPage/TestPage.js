// React related imports.
import React from 'react';

/**
 * @name TestPage
 * @param {object} props props
 * @summary This component is used for TestPage in TestPropertyDetails.
 * @returns {object} React.Fragement that contains the content to be added in popup required for TestPropertyDetails.
 */
const TestPage = props => {

    let objTextResource = props.Resource.Text;

    /**
     * @name GetContent
     * @summary Forms the whole jsx required for the component.
     * @returns {object} jsx, React.Fragment
     */
    const GetContent = () => {

        return <div>
            <h2>{Localization.TextFormatter(objTextResource, 'Testpage')}</h2>
            <h3>{Localization.TextFormatter(objTextResource, 'TaskName')}</h3>
            <table>
                <tr>
                    <td>{Localization.TextFormatter(objTextResource, 'ShowIntroductionPage') + ":"}</td>
                    <td>{props.Data.TestData.cDisplayTaskNameAsTaskTitle ? props.Data.TestData.cDisplayTaskNameAsTaskTitle : "N"}</td>
                </tr>
                <tr>
                    <td>{Localization.TextFormatter(objTextResource, 'TaskPageTopLeftTitle') + ":"}</td>
                    <td>{props.Data.TestData.objTestData.vTaskPageTopLeftTitle}</td>
                </tr>
            </table>

            <h3>{Localization.TextFormatter(objTextResource, 'Footer')}</h3>
            <table>
                <tr>
                    <td>{Localization.TextFormatter(objTextResource, 'HideEndTestButton') + ":"}</td>
                    <td>{props.Data.TestData.t_TestDrive_Test_TestProperty[0].cHideEndTestButtonEvenIfEnabledByalgorithm ? props.Data.TestData.t_TestDrive_Test_TestProperty[0].cHideEndTestButtonEvenIfEnabledByalgorithm : "N"}</td>
                </tr>                
            </table>

            <h3>{Localization.TextFormatter(objTextResource, 'Evaluation')}</h3>
            <table>
                <tr>
                    <td>{Localization.TextFormatter(objTextResource, 'ShowTaskNotAnswered') + ":"}</td>
                    <td>{props.Data.TestData.t_TestDrive_Test_TestProperty[0].cShowTaskNotAnswered ? props.Data.TestData.t_TestDrive_Test_TestProperty[0].cShowTaskNotAnswered : "N"}</td>
                </tr>               
            </table>

        </div>
    }
    return (
        props.Data.TestData.strTestUsage == "HighStake" || props.Data.TestData.strTestUsage == "HighStakeAdaptive" || props.Data.TestData.strTestUsage == "Demo" || props.Data.TestData.strTestUsage == "Wrapper" || props.Data.TestData.strTestUsage == "Survey" ? GetContent() : <React.Fragment />    );
};

export default TestPage;
