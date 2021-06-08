//React related imports
import React, { useState } from 'react';

//Module related imports
import OfflineExecutionProgress from '@root/Framework/Controls/Offline/OfflineExecutionProgress/OfflineExecutionProgress';

//Inline Images import
import CloseImage from '@inlineimage/Framework/ReactJs/Pc/Controls/Offline/OfflineExecution/closeWindow.png?inline';

/**
 * @name ViewOffineExecution
 * @param {any} props
 */
const ViewOfflineExecution = (props) => {

    const [tab, openTab] = useState(1);

    /**
     * @name GetContent
     * @summary to get the Jsx to display for Offline Progress.
     */
    const GetContent = () => {
        return (
            <div className="view-offline-execution-popup">
                <ul className="oe-tab-nav">
                    <li onClick={() => openTab(1)} className={tab === 1 ? "active" : ""}>
                        <span>Running</span>
                        {tab === 3 ? <img src={CloseImage} alt="" /> : <React.Fragment />}
                    </li>
                    <li onClick={() => openTab(2)} className={tab === 2 ? "active" : ""}>
                        <span>Viewed</span>
                        {tab === 3 ? <img src={CloseImage} alt="" /> : <React.Fragment />}
                    </li>
                </ul>
                {
                    tab === 1 ? (
                        <div className="running-process">
                            <OfflineExecutionProgress
                                Data={{
                                    OfflineExecutionData: props.Data.OfflineExecutionData,
                                    Type: props.Type,
                                    cIsOfflineClosed: "N"
                                }}
                                ParentProps={props.ParentProps}
                            />
                        </div>
                    ) : <React.Fragment />
                }
                {
                    tab === 2 ? (
                        <div className="offline-execution list-view" id="OfflineExecution">
                            {
                                props.Data.OfflineExecutionData.map(objOfflineExecutionObject => {
                                    var ClassName = props.Data.cIsShowAll ? "offline-execution-list" : (props.Data.uOfflineProcessExecutionId == objOfflineExecutionObject["uOfflineProcessExecutionId"] ? "offline-execution-list active" : "offline-execution-list")
                                    if (objOfflineExecutionObject.vExecutionName) {
                                        let strDisplayFileName = objOfflineExecutionObject?.["vExecutionName"] + '.' + objOfflineExecutionObject?.t_TestDrive_OfflineProcess_Execution_File?.[0]?.["vFileName"]?.substring(objOfflineExecutionObject.t_TestDrive_OfflineProcess_Execution_File[0]["vFileName"].lastIndexOf('.') + 1)
                                        return ((objOfflineExecutionObject.cIsViewed == "Y" || props.Data.ExecutionIdToView) && objOfflineExecutionObject.t_TestDrive_OfflineProcess_Execution_File.length > 0) ?
                                            < div className={ClassName} >
                                                <span>{objOfflineExecutionObject.vExecutionName} : </span>
                                                <span><a href={JConfiguration.BaseUrl + "API/Framework/Services/StreamFile?" + "sessionkey=" + JConfiguration.SessionKey + "&FileName=" + objOfflineExecutionObject.t_TestDrive_OfflineProcess_Execution_File[0]["vFileName"] + "&Type=Offline/" + objOfflineExecutionObject.t_TestDrive_OfflineProcess_Definition[0]["vOfflineProcessKeyword"] + "&MainClientId=" + objOfflineExecutionObject["iMainClientId"] + "&DisplayFileName=" + strDisplayFileName}>
                                                    View
                                        </a></span>
                                            </div>
                                            :
                                            <React.Fragment />
                                    }
                                })
                            }
                        </div>

                    ) : <React.Fragment />
                }



            </div>
        );
    }

    return (
        <React.Fragment>
            {props.Data && props.Data.OfflineExecutionData ? GetContent() : <React.Fragment />}
        </React.Fragment>
    );
}

export default ViewOfflineExecution;