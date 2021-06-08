//React related imports
import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";

//Components used...
import JSONFormatter from '@root/Framework/Controls/JSONFormatter/JSONFormatter';

//Store related imports
import ApplicationState from '@shared/Framework/DataService/ApplicationState/ApplicationState';

/**
 * @name mapStateToProps
 * @param {*} state
 * we just map the whole Entity and ApplicationState to get the redux data to show 
 */
export function mapStateToProps(state) {
    if (!global["mode"]) {
        return {
            Entity: state.Entity,
            ApplicationState: state.ApplicationState,
            EntityName: state.PerformanceLog.Entity
        };
    }
}

/**
 * @name ReduxView
 * @param {*} props 
 * ReduxView is the Component to show the complete Redux data or Redux data of the main module based on the choice of user.
 * Will do the simple mapping with Entity and AppicationState from redux and put them in state.
 * As the data will be more, string display can flood the UI, So we use third party JSON view approach.
 * To get data for the main module, When we get the component(with or without SSR), we get the Initial data params and store them in the Application state with the key “DataCalls”
 * We get this data in the ReduxView component by mapping to the Application again, to loop through it to get the Entity names and display only those entries in the ReduxView.
 * we take the Entity object or the AppicationState object and pass it to JSONTree,and the JSONTree returns the view in json tree format.

 */
const ReduxView = props => {

    const [objEntity, setEntity] = useState([]);//local state for Entity data
    const [objApplicationState, setApplicationState] = useState([]);//local state for ApplicationState data
    const [blnShowFullReduxContent, setShowFullReduxContent] = useState(true); //To decide either to show Full content or the module content

    /**
     * Sets the Entity data when the entity changes
     */
    useEffect(() => {
        setEntity({ "Entity": props.Entity });
    }, [props.Entity]);

    /**
     * Sets the Entity data for first time
     */
    useEffect(() => {
        setEntity({ "Entity": props.Entity });
    }, []);

    /**
     * Sets the ApplicationState data when the ApplicationState changes
     */
    useEffect(() => {
        setApplicationState({ "ApplicationState": props.ApplicationState });
    }, [props.ApplicationState]);

    /**
     * @name GetEntityDiv
     * @summary Form jsx for the Entity
     */
    const GetEntityDiv = () => {      
        return < JSONFormatter
                    Data={{
                        JSONData: FormatEntity(objEntity)
                    }}
                />
    }

    /**
     * @name FormatEntity
     * @param {any} objEntity
     * @summary it fomats and returns the entity    
     * @returns {object} returns formatted Entity
     */
    const FormatEntity = (objEntity) => {
        let objModifiedEntity = objEntity;

        //formatting the entity before passing to JsonTree.
        if (typeof objModifiedEntity == "object" && Object.keys(objModifiedEntity)[0] == "Entity") {
            Object.keys(objModifiedEntity["Entity"]).map((objData, index) => {
                Object.keys(objModifiedEntity["Entity"][objData]).map((objProperty, index) => {
                    if (objProperty.split(";")[0] == objData || objProperty == "Data") {
                        if (objProperty != "Data") {
                            Object.keys(objModifiedEntity["Entity"][objData][objProperty]).map(objKey => {
                                if (objKey != "Data") {
                                    delete objModifiedEntity["Entity"][objData][objProperty][objKey];
                                }
                            })
                        }
                    }
                    else {
                        delete objModifiedEntity["Entity"][objData][objProperty];
                    }
                });
            });
        }
        else
            objModifiedEntity = objModifiedEntity;
        return objModifiedEntity;
    }

    /**
     * @name GetApplicationStateDiv
     * @summary Form jsx for the ApplicationState
     */
    const GetApplicationStateDiv = () => {
        return < JSONFormatter
                    Data={{
                        JSONData: objApplicationState
                    }}
                />
    }

    /**
     * @name GetFullContent
     * @summary Get the jsx Full of the Full redux content
     */
    const GetFullContent = () => {
        return (<React.Fragment>
            {GetEntityDiv()}
            {GetApplicationStateDiv()}
        </React.Fragment>);
    }

    /**
     * @name GetModuleContent
     * @summary Get the jsx Full of the module redux content
     */
    const GetModuleContent = () => {
        let arrDataCalls = ApplicationState.GetProperty("ModuleAPICalls");
        var objModuleEntity = {};
        if (arrDataCalls != undefined) {
            arrDataCalls.map(objDataCall => {

                //getting Entity Key from URL.
                let arrUrl = objDataCall["URL"].split("/");
                let strEntityName = "";
                arrUrl.map((strUrl, index) => {
                    if (index != 0) {
                        strEntityName == "" ? strEntityName += strUrl : strEntityName += "_" + strUrl;
                    }
                })
                objModuleEntity = { ...objModuleEntity, [strEntityName]: objEntity["Entity"][strEntityName] };
            });
        }
        return (<div className="performance-log-sidebar show">
                    < JSONFormatter
                        Data={{
                            JSONData: FormatEntity({ ["Entity"]: objModuleEntity })["Entity"]
                        }}
                    />
        </div>);
    }

    /**
     * @name GetContent
     * @summary returns the main jsx content
     */
    const GetContent = () => {

        return <div className="performance-log-sidebar show">

            <div className="plog-radio-flex">
                <div className="plog-radio-item">
                    <span>FullContent</span>
                    <label className="plog-radio">
                        <input type="radio" checked={blnShowFullReduxContent} onChange={() => setShowFullReduxContent(true)}/>
                        <span className="checkmark" />
                    </label>
                </div>
                <div className="plog-radio-item">
                    <span>ModuleContent</span>
                    <label className="plog-radio">
                        <input type="radio" checked={!blnShowFullReduxContent} onChange={() => setShowFullReduxContent(false)}/>
                        <span className="checkmark" />
                    </label>
                </div>
            </div>

            {blnShowFullReduxContent ? GetFullContent() : GetModuleContent()}
        </div> 
    
    }


    return <React.Fragment>{GetContent()}</React.Fragment>
};

export default connect(mapStateToProps)(ReduxView);