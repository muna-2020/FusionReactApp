// React related imports.
import React from 'react';

/**
 * @name FinalPage
 * @param {object} props props
 * @summary This component is used for FinalPage in TestPropertyDetails.
 * @returns {object} React.Fragement that contains the content to be added in popup required for TestPropertyDetails.
 */
const FinalPage = props => {

    let objTextResource = props.Resource.Text;

    /**
     * @name GetContent
     * @summary Forms the whole jsx required for the component.
     * @returns {object} jsx, React.Fragment
     */
    const GetContent = () => {

        return <div>
            <h2>{Localization.TextFormatter(objTextResource, 'FinalPage')}</h2>
            <h3>{Localization.TextFormatter(objTextResource, 'Heading')}</h3>
            <table>
                <tr>
                    <td>{Localization.TextFormatter(objTextResource, 'ShowResultExcelOnTestComplete') + ":"}</td>
                    <td>{props.Data.TestData.t_TestDrive_Test_TestProperty[0].cIsShowResultExcelOnTestComplete ? props.Data.TestData.t_TestDrive_Test_TestProperty[0].cIsShowResultExcelOnTestComplete : "N"}</td>
                </tr>
                <tr>
                    <td>{Localization.TextFormatter(objTextResource, 'ShowResultDocumentOnTestComplete') + ":"}</td>
                    <td>{props.Data.TestData.t_TestDrive_Test_TestProperty[0].cIsShowResultDocumentOnTestComplete ? props.Data.TestData.t_TestDrive_Test_TestProperty[0].cIsShowResultDocumentOnTestComplete : "N"}</td>
                </tr>
            </table>

            <h3>{Localization.TextFormatter(objTextResource, 'Display')}</h3>
            <table>
                <tr>
                    <td>{Localization.TextFormatter(objTextResource, 'ResultPageTopLeftTitle') + ":"}</td>
                    <td>{props.Data.TestData.objTestData.vResultPageTopLeftTitle}</td>
                </tr>   
                <tr>
                    <td>{Localization.TextFormatter(objTextResource, 'ResultButton') + ":"}</td>
                    <td>{props.Data.TestData.objTestData.vResultButtonText}</td>
                </tr>   
                <tr>
                    <td>{Localization.TextFormatter(objTextResource, 'Display') + ":"}</td>
                    <td>{props.Data.TestData.strResultPageTextCertificate}</td>
                </tr> 
                {
                    props.Data.TestData.cHasResultPageCertificate == "Y" ? 
                    <tr>
                        <td>{Localization.TextFormatter(objTextResource, 'CertificateType') + ":"}</td>
                        <td>{props.Data.TestData.strResultCertificateType}</td>
                    </tr> 
                    :
                    <React.Fragment/>
                }                
            </table>

            <h3>{Localization.TextFormatter(objTextResource, 'ResultPageText')}</h3>
            <table>
                <tr>
                    <td>{Localization.TextFormatter(objTextResource, 'ResultTextByRange') + ":"}</td>
                    <td>{props.Data.TestData.cUseResultTextByRange ? props.Data.TestData.cUseResultTextByRange : "N"}</td>
                </tr>     
                {props.Data.TestData.cUseResultTextByRange == "Y" && props.Data.TestData.t_TestDrive_Test_ResultPageText?.length > 0 ? 
                    <React.Fragment>
                        <tr>
                            <td>{Localization.TextFormatter(objTextResource, 'Display') + ":"}</td>
                        </tr>
                        {Object.keys(props.Data.TestData.objResultPageText).map(strKey => {
                            return <React.Fragment>
                                <tr><td><b>{strKey}</b></td><td/></tr>
                                {props.Data.TestData.objResultPageText[strKey].map(objResultText => {
                                    return < React.Fragment >
                                            <tr><td>{Localization.TextFormatter(objTextResource, 'From') + ": " + objResultText["dResultValueFrom"] + "  " + Localization.TextFormatter(objTextResource, 'To') + ": " + objResultText["dResultValueTo"]}</td><td/></tr>
                                            <tr><td>{objResultText["tTestResultPageText"]}</td><td/></tr>
                                    </React.Fragment>
                                })}
                            </React.Fragment>
                        })
                        }                        
                        </React.Fragment>
                    :
                    <tr>
                        <td>{Localization.TextFormatter(objTextResource, 'ResultPageText') + ":"}</td>
                        <td>{props.Data.TestData.objTestData.tTestResultPageText}</td>
                    </tr> 
                    }             
            </table>
        </div>
    }
    return (
        props.Data.TestData.strTestUsage == "HighStake" || props.Data.TestData.strTestUsage == "HighStakeAdaptive" || props.Data.TestData.strTestUsage == "Demo" || props.Data.TestData.strTestUsage == "Wrapper" || props.Data.TestData.strTestUsage == "Survey"  ? GetContent() : <React.Fragment />
    );
};

export default FinalPage;
