//React related imports...
import React, { useReducer } from "react";
import { connect } from 'react-redux';

//Base classes...
import * as IntranetBase_Hook from '@shared/Framework/BaseClass/IntranetBaseClass/IntranetBase_Hook';

//Module related files...
import TaskFolderDetails_ModuleProcessor from '@shared/Application/c.Intranet/Modules/2_Task/TaskFolder/TaskFolderDetails/TaskFolderDetails_ModuleProcessor';
import * as TaskFolderDetails_Hook from '@shared/Application/c.Intranet/Modules/2_Task/TaskFolder/TaskFolderDetails/TaskFolderDetails_Hook';
import BasicProperty from '@root/Application/c.Intranet/PC/Modules/2_Task/TaskFolder/TaskFolderDetailsComponents/BasicProperties/BasicProperties';
import Language from '@root/Application/c.Intranet/PC/Modules/2_Task/TaskFolder/TaskFolderDetailsComponents/Language/Language';

/**
 * @name TaskFolderDetails
 * @param {object} props props
 * @summary This component displays the Task Folder details.
 * @returns {object} jsx.
 */
const TaskFolderDetails = props => {

    /**
     * @name [state,dispatch]
     * @summary Define state and dispatch for the reducer to set state.
     * @returns {[]} state and dispatch
     */
    const [state, dispatch] = useReducer(IntranetBase_Hook.Reducer, TaskFolderDetails_Hook.GetInitialState(props));

    /**
     * @name objContext
     * @summary Groups state.dispatch and module object(s) in objContext.
     * @returns {object} objContext
     */
    let objContext = { state, props, dispatch, ["ModuleName"]: "TaskFolderDetails", ["TaskFolderDetails_ModuleProcessor"]: new TaskFolderDetails_ModuleProcessor() };

    /**
    * @name  Initialize
    * @param {object} objContext context object
    * @summary Initializing API and DynamicStyles
    * @returns null
    */
    objContext.TaskFolderDetails_ModuleProcessor.Initialize(objContext, objContext.TaskFolderDetails_ModuleProcessor);

    /**
     * @name Initialize
     * @param {object} objContext context object
     * @summary Initialize method call to load the custom hooks.
     * @returns null
     */
    TaskFolderDetails_Hook.Initialize(objContext);

    /**
     * @name GetContent
     * @summary Forms the whole jsx required for the module.
     * @returns {object} jsx
     */
    const GetContent = () => {
        let objTextResource = props.TextResource ?? Object_Framework_Services_TextResource.GetData("/c.Intranet/Modules/2_Task/Task", objContext.props);
        let objTaskFolderData = objContext.TaskFolderDetails_ModuleProcessor.GetTaskFolderDetails(props.SelectedRow, objContext);
        return (<div className="file-explorer-detail">
            <FillHeight
                Meta={{
                    HeaderIds: ["MasterHeader", "TaskTitle", "FilterBlock", "BreadCrumb", "OfflineExecution"],
                    FooterIds: [""]
                }}
                className="bgStyle"
                scrollStyle={{ overflow: "auto" }}
            >
                <h2>{Localization.TextFormatter(objTextResource, 'Folder')}</h2>
                <BasicProperty
                    Data={{
                        TaskFolderData: objTaskFolderData
                    }}
                    Resource={{
                        Text: objTextResource
                    }}
                    ComponentController={props.ComponentController}
                />

                <Language Data={{
                    TaskFolderData: objTaskFolderData
                }}
                    Resource={{
                        Text: objTextResource
                    }}
                />

                <h2>Lektorat</h2>
                <table>
                    <tr style={{ color: "red" }}>Yet to be implemented</tr>
                </table>
                <h2>Eingabestatus der Tests</h2>
                <table>
                    <tr style={{ color: "red" }}>Yet to be implemented</tr>
                </table>

                {/* 
                <h3>Beschreibung::</h3>
                <p>-</p>
                <h2>Lektorat</h2>
                <table>
                    <tr>
                        <td>begutachtet, Änderungsvorschläge im Kommentar</td>
                        <td>0 Aufgaben</td>
                    </tr>
                    <tr>
                        <td>begutachtet und abgeschlossen</td>
                        <td>0 Aufgaben</td>
                    </tr>
                    <tr>
                        <td>zurück an die Begutachterin</td>
                        <td>0 Aufgaben</td>
                    </tr>
                    <tr>
                        <td>Aufgabe nicht geeignet</td>
                        <td>0 Aufgaben</td>
                    </tr>
                    <tr>
                        <td>nicht begutachtet</td>
                        <td>0 Aufgaben</td>
                    </tr>
                    <tr>
                        <td>Aufgabe überarbeitet</td>
                        <td>0 Aufgaben</td>
                    </tr>
                </table>

                <h2>Eingabestatus der Tests</h2>

                <table>
                    <tr>
                        <td>B Basis</td>
                        <td>0 Aufgaben</td>
                    </tr>
                    <tr>
                        <td>T Trennschärfe bestimmen</td>
                        <td>0 Aufgaben</td>
                    </tr>
                    <tr>
                        <td>R(t) Revision Trennschärfe</td>
                        <td>0 Aufgaben</td>
                    </tr>
                    <tr>
                        <td>K Kalibration</td>
                        <td>0 Aufgaben</td>
                    </tr>
                    <tr>
                        <td>A(i) Inaktiv Adaptiv</td>
                        <td>0 Aufgaben</td>
                    </tr>
                    <tr>
                        <td>R(k) Revision Kalibration</td>
                        <td>0 Aufgaben</td>
                    </tr>
                    <tr>
                        <td>A(a) Aktiv Adaptiv</td>
                        <td>0 Aufgaben</td>
                    </tr>
                </table>
                */}
            </FillHeight>
        </div>
        )
    }
    return props.isLoadComplete || state.isLoadComplete ? GetContent() : <div className="file-explorer-detail-empty-message" />;
    //return (
    //    props.TaskFolderData ? GetContent() : <React.Fragment />
    //);
};

export default connect(IntranetBase_Hook.MapStoreToProps(TaskFolderDetails_ModuleProcessor.StoreMapList()))(TaskFolderDetails);
