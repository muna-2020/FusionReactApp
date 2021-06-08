//Base classes.
import Base_ModuleProcessor from '@shared/Framework/BaseClass/Base_ModuleProcessor';

//UseCase Diagram related imports.
import { PortVisibility } from "@syncfusion/ej2-react-diagrams";

/**
  * @name UseCaseDiagramDemo_ModuleProcessor
  * @summary Class for Country module display.
  */
class UseCaseDiagramDemo_ModuleProcessor extends Base_ModuleProcessor {

    constructor() {
        super();
    }

    /**
      * @name GetPalettes
      * @param {any} objContext
      * @summary use to get Palettes Data
      * @returns {Array} return array of Palettes
      */
    GetPalettes(objContext) {
        return [
            {
                id: "umlActivity",
                expanded: true,
                symbols: objContext.state.UmlActivityShapes,
                title: "UML Shapes"
            },
            {
                id: "connectors",
                expanded: true,
                symbols: this.GetConnectors(),
                title: "Connectors"
            }
        ];
    }

    /**
      * @name GetConnectors
      * @summary get list of arrow connectors
      * @returns {Array} return ConnectorSymbols
      */
    GetConnectors() {
        let arrConnectorSymbols = [
            {
                id: 'Link1', type: 'Orthogonal', sourcePoint: { x: 0, y: 0 }, targetPoint: { x: 40, y: 40 },
                targetDecorator: { shape: 'Arrow' }, style: { strokeWidth: 2 }
            },
            {
                id: 'Link2', type: 'Orthogonal', sourcePoint: { x: 0, y: 0 }, targetPoint: { x: 40, y: 40 },
                targetDecorator: { shape: 'Arrow' }, style: { strokeWidth: 2, strokeDashArray: '4 4' }
            },
            {
                id: 'Link3', type: 'Straight', sourcePoint: { x: 0, y: 0 }, targetPoint: { x: 40, y: 40 },
                targetDecorator: { shape: 'Arrow' }, style: { strokeWidth: 2 }
            }
        ];
        return arrConnectorSymbols;
    }

    /**
      * @name GetSymbolPaletteNodeDefaults
      * @param {any} objSymbol
      * @summary setting default node for SymbolPalette  
      * @returns {Object} returns Symbol object with shape
      */
    GetSymbolPaletteNodeDefaults(objSymbol) {
        if (objSymbol.id === 'JoinNode') {
            objSymbol.width = 20;
            objSymbol.height = 50;
        }
        else if (objSymbol.id === 'ForkNode') {
            objSymbol.width = 50;
            objSymbol.height = 20;
        }
        else if (objSymbol.id === 'Decision' || objSymbol.id === 'MergeNode') {
            objSymbol.width = 50;
            objSymbol.height = 40;
        }
        else {
            objSymbol.width = 50;
            objSymbol.height = 50;
        }
        if (objSymbol.id === 'InitialNode' || objSymbol.id === 'FinalNode' || objSymbol.id === 'JoinNode' || objSymbol.id === 'ForkNode') {
            objSymbol.style.fill = '#444';
        }
        objSymbol.style.strokeColor = '#444';
        return objSymbol;
    }

    /**
      * @name GetDiagramNodeDefaults
      * @param {any} objSymbol
      * @summary setting default node for Diagram
      * @returns {Object} Get Diagram node default param
      */
    GetDiagramNodeDefaults(objParam) {
        objParam.ports = this.GetNodePorts(objParam);
        if (objParam.ports) {
            for (let i = 0; i < objParam.ports.length; i++) {
                objParam.ports[i].visibility = PortVisibility.Hidden;
            }
        }
        if (objParam.id === 'Start' || objParam.id === 'node2' || objParam.id === 'node9' || objParam.id === 'node11') {
            objParam.style.fill = '#444';
        }
        objParam.style.strokeColor = '#444';
        return objParam;
    }


    /**
      * @name GetNodePorts
      * @param {any} objData
      * @summary get List of Ports
      */
    GetNodePorts(objData) {
        if (objData.id === 'node2' || objData.id === 'node9') {
            let node2Ports = [
                { id: 'port1', offset: { x: 0.2, y: 1 } },
                { id: 'port2', offset: { x: 0.8, y: 1 } },
                { id: 'port3', offset: { x: 0.2, y: 0 } },
                { id: 'port4', offset: { x: 0.8, y: 0 } },
            ];
            return node2Ports;
        }
        else {
            let ports = [
                { id: 'portLeft', offset: { x: 0, y: 0.5 } },
                { id: 'portRight', offset: { x: 1, y: 0.5 } },
                { id: 'portBottom', offset: { x: 0.5, y: 1 } },
                { id: 'portTop', offset: { x: 0.5, y: 0 } },
            ];
            return ports;
        }
    }

    /**
      * @name Download
      * @param {any} objData
      * @summary used to save or reload node array data used for UseCase Diagram.
      */
    Download(objData) {
        if (window.navigator.msSaveBlob) {
            var blob = new Blob([objData], { type: "data:text/json;charset=utf-8," });
            window.navigator.msSaveOrOpenBlob(blob, "Diagram.json");
        }
        else {
            var strData = "data:text/json;charset=utf-8," + encodeURIComponent(objData);
            var a = document.createElement("a");
            a.href = strData;
            a.download = "Diagram.json";
            document.body.appendChild(a);
            a.click();
            a.remove();
            //arrNodes = JSON.parse(objData)["node"];
        }
    }
}

export default UseCaseDiagramDemo_ModuleProcessor;