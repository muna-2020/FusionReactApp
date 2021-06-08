// React related imports.
import React from 'react';

/**
 * @name TimeKeepingExtras
 * @param {object} props props
 * @summary This component is used for TimeKeepingExtras in TestPropertyDetails.
 * @returns {object} React.Fragement that contains the content to be added in popup required for TestPropertyDetails.
 */
const TimeKeepingExtras = props => {

    let objTextResource = props.Resource.Text;

    /**
     * @name GetContent
     * @summary Forms the whole jsx required for the component.
     * @returns {object} jsx, React.Fragment
     */
    const GetContent = () => {

        return <div>
            <h3>{Localization.TextFormatter(objTextResource, 'Extras')}</h3>
            <table>
                <tr>
                    <td>{Localization.TextFormatter(objTextResource, 'Duration') + ":"}</td>
                    <td>{props.Data.TestData.t_TestDrive_Test_TestProperty[0].iDurationOfTestInMinutes}</td>
                </tr>
                <tr>
                    <td>{Localization.TextFormatter(objTextResource, 'MinimumTasks') + ":"}</td>
                    <td>{props.Data.TestData.t_TestDrive_Test_TestProperty[0].iMinimumTasksBeforeTestLimitIsConsidered}</td>
                </tr>
                <tr>
                    <td>{Localization.TextFormatter(objTextResource, 'TestTimeLimit') + ":"}</td>
                    <td>{props.Data.TestData.t_TestDrive_Test_TestProperty[0].cCheckTestTimeLimitOnServerSide ? props.Data.TestData.t_TestDrive_Test_TestProperty[0].cCheckTestTimeLimitOnServerSide : "N"}</td>
                </tr>
            </table>
        </div>
    }
    return (
        props.Data.TestData.strTestUsage == "HighStake" || props.Data.TestData.strTestUsage == "HighStakeAdaptive" || props.Data.TestData.strTestUsage == "Survey" ? GetContent() : <React.Fragment />
    );
};

export default TimeKeepingExtras;
