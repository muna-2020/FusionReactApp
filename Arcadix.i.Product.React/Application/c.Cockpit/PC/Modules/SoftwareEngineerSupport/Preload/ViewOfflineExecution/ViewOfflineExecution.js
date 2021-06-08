// React related imports.
import React from 'react';

/**
 * @name CurrentExecutionName
 * @param {object} props props
 * @summary This component displays the ViewOfflineExecution data in View.
 * @returns {object} React.Fragement that encapsulated the display grid with ViewOfflineExecution details.
 */
const ViewOfflineExecution = props => {

    /**  
     * @name GetContent
     * @summary Get the content to display
     * @return {JSX} Jxs
     */
    function GetContent() {
        let objOfflineExecutionObject=props.Data.OfflineExecuitionData;
        let objParameter = JSON.parse(objOfflineExecutionObject.vParameters);
        return (
            <React.Fragment>
                <div style={{ "paddingTop": "50px" }}>
                    <span>{objOfflineExecutionObject.vExecutionName} : </span><br/>
                    <a style={{ "color": "green" }}
                        href={"G:/DataCommon/Data/Repo/Offline/"+objParameter.iMainClient+"/Preload/"+objOfflineExecutionObject.uOfflineProcessExecutionId.toLowerCase()+"/"+objOfflineExecutionObject.t_TestDrive_OfflineProcess_Execution_File[0].vFileName}>
                        OfflineExecutionFilePath
                    </a>
                </div>
            </React.Fragment>
        );
    }

    /**
     * @summary returns JSX
     */
    return (
        <React.Fragment>
            {GetContent()}
        </React.Fragment>
    );
}

export default ViewOfflineExecution;