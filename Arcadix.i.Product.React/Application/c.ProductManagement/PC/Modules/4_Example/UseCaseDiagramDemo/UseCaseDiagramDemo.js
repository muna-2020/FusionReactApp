//React Related imports
import React, { useReducer, useEffect } from "react";

//Module realted fies.
import * as UseCaseDiagramDemo_Hook from '@shared/Application/c.ProductManagement/Modules/4_Example/UseCaseDiagramDemo/UseCaseDiagramDemo_Hook';
import UseCaseDiagramDemo_ModuleProcessor from "@shared/Application/c.ProductManagement/Modules/4_Example/UseCaseDiagramDemo/UseCaseDiagramDemo_ModuleProcessor";

//Base classes.
import * as Base_Hook from '@shared/Framework/BaseClass/Base_Hook';

//UseCase Diagram related imports.
//import { SnapConstraints, PortVisibility, SymbolPaletteComponent, DiagramComponent, Inject, UndoRedo, } from "@syncfusion/ej2-react-diagrams";

//import loadable from "@loadable/Component";
//const syncfusion = loadable(() => import('@syncfusion/ej2-react-diagrams'), { ssr: false });

//Internal services
import { LoadDynamicStyles } from '@shared/Framework/Services/CssLoader/CssLoader';

/**
 * @name UseCaseDiagramDemo
 * @summary this component will return the Use Case Diagram as per the given node list
 */
const UseCaseDiagramDemo = (props) => {

    /**
      * @name [state,dispatch]
      * @summary Define state and dispatch for the reducer to set state.
      * @returns {[]} state and dspatch
      */
    const [state, dispatch] = useReducer(Base_Hook.Reducer, UseCaseDiagramDemo_Hook.GetInitialState());

    //Diagram instance used by DiagramComponent & to save the newly formatted diagram.
    let objDiagramInstance;

    /**
    * @name objContext
    * @summary Groups state.dispatch and module object(s) in objContext.
    * @returns {object} objContext
    */
    let objContext = { state, props, dispatch, ["UseCaseDiagramDemo_ModuleProcessor"]: new UseCaseDiagramDemo_ModuleProcessor() };

    //Initial load of data
    UseCaseDiagramDemo_Hook.InitialLoad(objContext);    

    /**
     * @name GetContent
     * @summary get Jsx for Use Case Diagram
     */
    const GetContent = () => {

        let arrNodes = props.Nodes != undefined ? props.Nodes : state.Nodes ;

        return (
            <div className="control-pane">
                <div className="control-section">
                    <div id="umlActivityDiagram" className="umlActivityDiagram">
                        <div className="sb-mobile-palette-bar">
                            <div id="palette-icon" style={{ float: "right", role: "button" }} className="e-ddb-icons1 e-toggle-palette"></div>
                        </div>

                        <div id="palette-space" className="sb-mobile-palette">
                            <SymbolPaletteComponent id="symbolpalette" expandMode="Multiple" palettes={objContext.UseCaseDiagramDemo_ModuleProcessor.GetPalettes(objContext)} width={"100%"} height={"505px"}
                                //Sets the default values of node
                                getNodeDefaults={(objSymbol) => { objContext.UseCaseDiagramDemo_ModuleProcessor.GetSymbolPaletteNodeDefaults(objSymbol); }}
                                symbolHeight={55} symbolWidth={55} symbolMargin={{ left: 15, right: 15, top: 15, bottom: 15 }} getSymbolInfo={(symbol) => {
                                    return { fit: true };
                                }}><Inject services={[UndoRedo]} />
                            </SymbolPaletteComponent>
                            <div>
                                <span className="save" onClick={() => {
                                    objContext.UseCaseDiagramDemo_ModuleProcessor.Download(objDiagramInstance.saveDiagram());
                                }}>Save&#x1F4BE;</span>

                            </div>
                        </div>
                        {
                            arrNodes.length != 0 ?
                                <div id="diagram-space" className="sb-mobile-diagram">
                                    {
                                        props.Nodes != undefined || state.Nodes != undefined ?
                                            <React.Fragment>
                                                <DiagramComponent id="diagram" ref={diagram => (objDiagramInstance = diagram)} width={"100%"} height={"100%"}
                                                    nodes={arrNodes} connectors={state.Connectors} snapSettings={{ constraints: SnapConstraints.None }} getNodeDefaults={(objParams) => {
                                                        objContext.UseCaseDiagramDemo_ModuleProcessor.GetDiagramNodeDefaults(objParams)
                                                    }} //Sets the default values of a connector
                                                    getConnectorDefaults={(obj) => {
                                                        if (obj.id.indexOf('connector') !== -1) {
                                                            obj.type = 'Orthogonal';
                                                            obj.cornerRadius = 10;
                                                            obj.targetDecorator = { shape: 'OpenArrow', style: { strokeColor: '#444', fill: '#444' } };
                                                        }
                                                    }}><Inject services={[UndoRedo]} />
                                                </DiagramComponent>
                                            </React.Fragment> :
                                            <React.Fragment>
                                                <span>
                                                    Node List Is Emplty
                                    </span>
                                            </React.Fragment>
                                    }

                                </div>
                                :
                                <div>
                                    No Content
                                </div>
                        }
                        
                    </div>
                </div>
            </div>
            );
    }

    return (
        <React.Fragment>
            {
                //GetContent()
            }
        </React.Fragment>
    );
};

LoadDynamicStyles(JConfiguration.ProductManagementSkinPath + "/Css/Application/ReactJs/PC/Modules/4_Example/UseCaseDiagramDemo/UseCaseDiagramDemo.css");

export default UseCaseDiagramDemo;
