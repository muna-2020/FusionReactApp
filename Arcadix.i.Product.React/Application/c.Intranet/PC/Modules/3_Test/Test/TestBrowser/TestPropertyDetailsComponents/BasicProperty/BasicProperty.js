// React related imports.
import React from 'react';

/**
 * @name BasicProperty
 * @param {object} props props
 * @summary This component is used for BasicProperty in TestPropertyDetails.
 * @returns {object} React.Fragement that contains the content to be added in popup required for TestPropertyDetails.
 */
const BasicProperty = props => {

    let objTextResource = props.Resource.Text;

    /**
     * @name GetContent
     * @summary Forms the whole jsx required for the component.
     * @returns {object} jsx, React.Fragment
     */
    const GetContent = () => {

        return <div>
                <h3>{Localization.TextFormatter(objTextResource, 'General') + ":"}</h3>
                <table>
                    <tr><td>{Localization.TextFormatter(objTextResource, 'Name')}</td><td>{props.Data.TestData.vTestName}</td></tr>
                    <tr><td>{Localization.TextFormatter(objTextResource, 'Number')}</td><td>{props.Data.TestData.uTestId}</td></tr>
                <tr><td>{Localization.TextFormatter(objTextResource, 'Subject')}</td><td>{props.Data.TestData.strSubject}</td></tr>
                {props.Data.TestData.strTestUsage != "HighStake" && props.Data.TestData.strTestUsage != "HighStakeAdaptive" && props.Data.TestData.strTestUsage != "Wrapper" && props.Data.TestData.strTestUsage != "Survey" ?
                    <React.Fragment>
                        <tr><td>{Localization.TextFormatter(objTextResource, 'ActionAspect')}</td><td>{props.Data.TestData.strCategoryName}</td></tr>
                        <tr><td>{Localization.TextFormatter(objTextResource, 'Competence')}</td><td>{props.Data.TestData.strCategoryCompetencyName}</td></tr>
                    </React.Fragment> : <React.Fragment />}
                    <tr><td>{Localization.TextFormatter(objTextResource, 'Usage')}</td><td>{props.Data.TestData.strTestUsage}</td></tr>
                    <tr><td>{Localization.TextFormatter(objTextResource, 'TestType')}</td><td>{props.Data.TestData.strTestType}</td></tr>
                    <tr><td>{Localization.TextFormatter(objTextResource, 'LookAndFeel')}</td><td>{props.Data.TestData.strSkinName}</td></tr>
                </table>             
        </div>       
    }
    return (
        GetContent()
    );
};

export default BasicProperty;
