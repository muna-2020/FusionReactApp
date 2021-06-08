// React related imports.
import React, { useReducer } from 'react';


/**
  * @name ShowProcedureDefinition
  * @param {object} props props
  * @summary This component displays the DatabaseComparision.
  * @returns {object} React.Fragement that encapsulated the display grid with DatabaseCompare details.
  */
const ShowProcedure = props => {
       
    /**  
      * @name GetContent
      * @summary Get the content to display
      * @return {Jxs} jsx to view
      */
    function GetContent() {
        if (props.Data.ProcedureData.length != 0) {
            return (
                <React.Fragment>
                    <div style={{"width": "950px","height": "630px","overflow": "auto"}}>
                        <ul>
                            {
                                props.Data.ProcedureData.map(objData => {
                                    return (
                                        <li style={{ "paddingLeft": "10px", "paddingTop":"10px"}}>
                                            <span id={props.Data.Id + "_" + objData.vName} style={{ "fontWeight": "600", "cursor": "pointer" }}
                                            onClick={() => { props.Data.objContext.DatabaseCompare_ModuleProcessor.OnClickProcedure(event, props.Data.objContext, objData.vName, props.Data.Id) }}
                                            >{objData.vName.split(".").length > 1 ? objData.vName.split(".")[1] : objData.vName}</span></li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                </React.Fragment>
            )
        }
        else
        {
            return (
                <React.Fragment>
                    <span style={{ "color":"blue"}} >no dependent procedure found.</span>
                </React.Fragment>
            );
        }
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

export default ShowProcedure;