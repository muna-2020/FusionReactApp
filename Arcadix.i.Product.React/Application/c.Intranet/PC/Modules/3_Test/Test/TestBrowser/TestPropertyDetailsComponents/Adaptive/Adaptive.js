// React related imports.
import React from 'react';

/**
 * @name Adaptive
 * @param {object} props props
 * @summary This component is used for Adaptive in TestPropertyDetails.
 * @returns {object} React.Fragement that contains the content to be added in popup required for TestPropertyDetails.
 */
const Adaptive = props => {

    let objTextResource = props.Resource.Text;

    const GetSequentialTableDiv = () => {
        return <div className="result-range-table">
            <table className="testproperty-table">
            <tr>
                {props.Data.TestData.arrSubSubjects.map(strSubjectName => <th>{strSubjectName}</th>)}
            </tr>
            <tr>
                {props.Data.TestData.arrSubSubjects.map((strSubjectName, index) => {
                    return <td>{index + 1}</td>
                })}
            </tr>
            </table>
        </div>
    };

    /**
     * @name GetCustomTableDiv
     * @summary Forms jsx for CustomTable.
     * @returns {object} jsx, React.Fragment
     */
    const GetCustomTableDiv = () => {
        let objRounds = props.Data.TestData.t_TestDrive_Test_AdaptiveTaskSubSubjectSequence.filter(objData => props.Data.TestData.arrSubSubjectIds.includes(objData["iSubSubjectId"])).reduce((arrReturn, objSubSubjectSequence) => {
            arrReturn[objSubSubjectSequence["iRound"]] = [...arrReturn[objSubSubjectSequence["iRound"]] || [], objSubSubjectSequence];
            return arrReturn;
        }, {});
        return <React.Fragment>
            <div className="result-range-table">
                <table className="testproperty-table">
                    <tr>
                        <th></th>
                        {props.Data.TestData.arrSubSubjects.map(strSubjectName => <th>{strSubjectName}</th>)}
                    </tr>
                    {Object.keys(objRounds).map(strRound => {
                        return <tr>
                            <td>{strRound + "."}</td>
                            {objRounds[strRound].map((objSubSubjectSequence, intIndex) => {
                                return <td>
                                    <label
                                        id={"iDisplayOrder_" + strRound + "_" + intIndex}
                                        className=""
                                    >
                                        {objSubSubjectSequence["iDisplayOrder"]}
                                    </label>
                                </td>
                            })}      
                        </tr>
                    })}
                </table>                
            </div>
        </React.Fragment>
    }


    /**
    * @name GetSubjectPropertyTableDiv
    * @summary Forms the jsx required for SubjectPropertyTable.
    * @returns {object} jsx, React.Fragment
    */
    const GetSubjectPropertyTableDiv = () => {
        return <React.Fragment>
            <div className="result-range-table">
                <table className="testproperty-table">
                    <tr>
                        <th></th>
                        {props.Data.TestData.arrSubjects.map(strSubjectName => <th>{strSubjectName}</th>)}                      
                    </tr>
                    <tr>
                        <td>{Localization.TextFormatter(objTextResource, "AbilityMean")}</td>
                        {props.Data.TestData.arrSubjects.map((strSubjectName, intIndex) => {
                            return <td>
                                        <label
                                            id={"dConstance" + intIndex}>
                                            {props.Data.TestData.arrt_TestDrive_Test_SubjectProperty?.[intIndex]?.["dConstance"]}
                                        </label>   
                                   </td>
                        })}                       
                    </tr>
                    <tr>
                        <td>{Localization.TextFormatter(objTextResource, "AbilityVariance")}</td>
                        {props.Data.TestData.arrSubjects.map((strSubjectName, intIndex) => {
                            return <td>
                                <label
                                    id={"dVariance" + intIndex}>
                                    {props.Data.TestData.arrt_TestDrive_Test_SubjectProperty?.[intIndex]?.["dVariance"]}
                                </label> 
                            </td>
                        })}                        
                    </tr>
                </table>
            </div>
        </React.Fragment >
    }

    /**
     * @name GetContent
     * @summary Forms the whole jsx required for the component.
     * @returns {object} jsx, React.Fragment
     */
    const GetContent = () => {

        return <div>
            <h3>{Localization.TextFormatter(objTextResource, 'AdaptiveFeatures') + ":"}</h3>
            <table>            
            {props.Data.TestData.t_TestDrive_Test_AdaptiveAlgorithmConfiguration.map(objAdaptiveData => {
                if (objAdaptiveData.vAttributeKey == "vProvider") {
                    return <tr><td>{Localization.TextFormatter(objTextResource, 'Provider')}</td><td>{objAdaptiveData.vValue}</td></tr>                    
                }
                if (objAdaptiveData.vAttributeKey == "vModel") {
                    return <tr><td>{Localization.TextFormatter(objTextResource, 'ModelType')}</td><td>{objAdaptiveData.vValue}</td></tr>                    
                }
                if (objAdaptiveData.vAttributeKey == "vModelName") {
                    return <tr><td>{Localization.TextFormatter(objTextResource, 'ModelName')}</td><td>{objAdaptiveData.vValue}</td></tr>                    
                }
                if (objAdaptiveData.vAttributeKey == "dModelConstant") {
                    return <tr><td>{Localization.TextFormatter(objTextResource, 'ModelConstant')}</td><td>{objAdaptiveData.vValue}</td></tr>                    
                }
                if (objAdaptiveData.vAttributeKey == "dDifficultyFrom") {
                    return <tr><td>{Localization.TextFormatter(objTextResource, 'DifficultyFrom')}</td><td>{objAdaptiveData.vValue}</td></tr>                    
                }
                if (objAdaptiveData.vAttributeKey == "dDifficultyTo") {
                    return <tr><td>{Localization.TextFormatter(objTextResource, 'DifficultyTo')}</td><td>{objAdaptiveData.vValue}</td></tr>                    
                }
                if (objAdaptiveData.vAttributeKey == "dCambAbilityRangeMin") {
                    return <tr><td>{Localization.TextFormatter(objTextResource, 'AbilityRangeMin')}</td><td>{objAdaptiveData.vValue}</td></tr>                    
                }
                if (objAdaptiveData.vAttributeKey == "dCambAbilityRangeMax") {
                    return <tr><td>{Localization.TextFormatter(objTextResource, 'AbilityRangeMax')}</td><td>{objAdaptiveData.vValue}</td></tr>                    
                }
                if (objAdaptiveData.vAttributeKey == "dCambDifficultyParameterMin") {
                    return <tr><td>{Localization.TextFormatter(objTextResource, 'DifficultyParamMin')}</td><td>{objAdaptiveData.vValue}</td></tr>                    
                }
                if (objAdaptiveData.vAttributeKey == "dCambDifficultyParameterMax") {
                    return <tr><td>{Localization.TextFormatter(objTextResource, 'DifficultyParamMax')}</td><td>{objAdaptiveData.vValue}</td></tr>                    
                }
                if (objAdaptiveData.vAttributeKey == "dCambDifficultyParameterInterQuad") {
                    return <tr><td>{Localization.TextFormatter(objTextResource, 'DifficultyParamQuad')}</td><td>{objAdaptiveData.vValue}</td></tr>                    
                }
                if (objAdaptiveData.vAttributeKey == "vAblityEstimationMethod") {
                    return <tr><td>{Localization.TextFormatter(objTextResource, 'AblityEstimationMethod')}</td><td>{objAdaptiveData.vValue}</td></tr>                    
                }
                if (objAdaptiveData.vAttributeKey == "vNextTaskSelectionMethod") {
                    return <tr><td>{Localization.TextFormatter(objTextResource, 'NextTaskSelectionMethod')}</td><td>{objAdaptiveData.vValue}</td></tr>                    
                }
                if (objAdaptiveData.vAttributeKey == "vRandomSequence") {
                    return <tr><td>{Localization.TextFormatter(objTextResource, 'RandomSequence')}</td><td>{objAdaptiveData.vValue}</td></tr>                    
                }
                if (objAdaptiveData.vAttributeKey == "dStandardError") {
                    return <tr><td>{Localization.TextFormatter(objTextResource, 'StandardError')}</td><td>{objAdaptiveData.vValue}</td></tr>                    
                }
                if (objAdaptiveData.vAttributeKey == "iMaximunNumberOfTasks") {
                    return <tr><td>{Localization.TextFormatter(objTextResource, 'MaximumNumberOfTasks')}</td><td>{objAdaptiveData.vValue}</td></tr>                    
                }
                if (objAdaptiveData.vAttributeKey == "iMinimumNumberOfTasks") {
                    return <tr><td>{Localization.TextFormatter(objTextResource, 'Minimumtasks')}</td><td>{objAdaptiveData.vValue}</td></tr>                    
                }
                if (objAdaptiveData.vAttributeKey == "dTransformationMean") {
                    return <tr><td>{Localization.TextFormatter(objTextResource, 'TransformationMean')}</td><td>{objAdaptiveData.vValue}</td></tr>                    
                }
                if (objAdaptiveData.vAttributeKey == "dTransformationStandardDeviation") {
                    return <tr><td>{Localization.TextFormatter(objTextResource, 'TransformationStandardDeviation')}</td><td>{objAdaptiveData.vValue}</td></tr>                    
                }
                if (objAdaptiveData.vAttributeKey == "dConfidenceIntervalAlpha") {
                    return <tr><td>{Localization.TextFormatter(objTextResource, 'ConfidenceIntervalAlpha')}</td><td>{objAdaptiveData.vValue}</td></tr>                    
                }                
            })}
            </table>    
            <h3>{Localization.TextFormatter(objTextResource, 'SubSubjectSequence') + ":"}</h3>
            {props.Data.TestData.cIsAdaptiveTaskSubSubjectChosenSequential == "N" && props.Data.TestData.t_TestDrive_Test_AdaptiveTaskSubSubjectSequence.length > 0 ? GetCustomTableDiv() : GetSequentialTableDiv()}  
            <h3>{Localization.TextFormatter(objTextResource, 'ConstanceAndVariance') + ":"}</h3>
            {props.Data.TestData.t_TestDrive_Test_TestProperty[0].cOverrideConstanceAndVariance == "Y" ? GetSubjectPropertyTableDiv() : <React.Fragment />}
        </div>
    }
    return (
        props.Data.TestData.strTestUsage == "HighStakeAdaptive" ? GetContent() : <React.Fragment />
    );
};

export default Adaptive;
