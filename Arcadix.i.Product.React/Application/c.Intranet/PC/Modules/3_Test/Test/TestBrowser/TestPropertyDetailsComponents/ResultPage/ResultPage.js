// React related imports.
import React from 'react';

/**
 * @name ResultPage
 * @param {object} props props
 * @summary This component is used for ResultPage in TestPropertyDetails.
 * @returns {object} React.Fragement that contains the content to be added in popup required for TestPropertyDetails.
 */
const ResultPage = props => {

    let objTextResource = props.Resource.Text;

    /**
     * @name GetContent
     * @summary Forms the whole jsx required for the component.
     * @returns {object} jsx, React.Fragment
     */
    const GetContent = () => {

        return <div>
            <h2>{Localization.TextFormatter(objTextResource, 'ResultPage')}</h2>
            <h3>{Localization.TextFormatter(objTextResource, 'ResultStatus')}</h3>
            <table>
                <tr>
                    <td>{Localization.TextFormatter(objTextResource, 'ResultStatus') + ":"}</td>
                    <td>{props.Data.TestData.t_TestDrive_Test_TestProperty[0].cShowAdditionalResultStatus ? props.Data.TestData.t_TestDrive_Test_TestProperty[0].cShowAdditionalResultStatus : "N"}</td>
                </tr>
                <tr>
                    <td>{Localization.TextFormatter(objTextResource, 'PassValue') + ":"}</td>
                    <td>{props.Data.TestData.t_TestDrive_Test_TestProperty[0].dPassValue}</td>
                </tr>
                <tr>
                    <td>{Localization.TextFormatter(objTextResource, 'ResultAttribute') + ":"}</td>
                    <td>{props.Data.TestData.strTestResultAttribute}</td>
                </tr>
            </table> 

            <h3>{Localization.TextFormatter(objTextResource, 'Notify')}</h3>
            <table>
                <tr>
                    <td>{Localization.TextFormatter(objTextResource, 'NotificationEmail') + ":"}</td>
                    <td>{props.Data.TestData.t_TestDrive_Test_TestProperty[0].vTestCompleteNotificationEmailId}</td>
                </tr>                
            </table>   
        </div>
    }
    return (
        props.Data.TestData.strTestUsage == "HighStake" || props.Data.TestData.strTestUsage == "HighStakeAdaptive" || props.Data.TestData.strTestUsage == "Wrapper" || props.Data.TestData.strTestUsage == "Survey" ? GetContent() : <React.Fragment />    );
};

export default ResultPage;
