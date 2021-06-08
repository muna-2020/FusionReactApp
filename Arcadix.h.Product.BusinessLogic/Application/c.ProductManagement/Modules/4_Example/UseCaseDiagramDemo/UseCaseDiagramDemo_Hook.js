//React Related imports
import React, { useEffect } from "react";

/**
 * @name GetInitialState
 * @summary get initial State
 */
export function GetInitialState() {
    //Initialize Diagram Nodes
    let arrNodes = [{
        id: "Start",
        height: 40,
        width: 40,
        offsetX: 300,
        offsetY: 20,
        shape: { type: "UmlActivity", shape: "InitialNode" }
    },
    {
        id: "ReceiveCall",
        height: 40,
        width: 105,
        offsetX: 300,
        offsetY: 100,
        shape: { type: "UmlActivity", shape: "Action" },
        annotations: [{ content: "Receive Customer Call" }]
    },
    {
        id: "node2",
        height: 10,
        width: 70,
        offsetX: 300,
        offsetY: 170,
        shape: { type: "UmlActivity", shape: "ForkNode" }
    },
    {
        id: "Determine",
        height: 40,
        width: 105,
        offsetX: 190,
        offsetY: 250,
        shape: { type: "UmlActivity", shape: "Action" },
        annotations: [{ content: "Determine Type of Call" }]
    },
    {
        id: "Log",
        height: 40,
        width: 105,
        offsetX: 410,
        offsetY: 250,
        shape: { type: "UmlActivity", shape: "Action" },
        annotations: [{ content: "Customer Logging a Call" }]
    },
    {
        id: "node5",
        height: 50,
        width: 50,
        offsetX: 190,
        offsetY: 350,
        shape: { type: "UmlActivity", shape: "Decision" }
    },
    {
        id: "transfer_sales",
        height: 40,
        width: 105,
        offsetX: 100,
        offsetY: 450,
        shape: { type: "UmlActivity", shape: "Action" },
        annotations: [{ content: "Transfer the Call to Sales" }]
    },
    {
        id: "transfer_desk",
        height: 40,
        width: 105,
        offsetX: 280,
        offsetY: 450,
        shape: { type: "UmlActivity", shape: "Action" },
        annotations: [{ content: "Transfer the Call to Help Desk" }]
    },
    {
        id: "node8",
        height: 50,
        width: 50,
        offsetX: 190,
        offsetY: 540,
        shape: { type: "UmlActivity", shape: "MergeNode" }
    },
    {
        id: "node9",
        height: 10,
        width: 70,
        offsetX: 300,
        offsetY: 630,
        shape: { type: "UmlActivity", shape: "JoinNode" }
    },
    {
        id: "CloseCall",
        height: 40,
        width: 105,
        offsetX: 300,
        offsetY: 710,
        shape: { type: "UmlActivity", shape: "Action" },
        annotations: [{ content: "Close Call", margin: { left: 25, right: 25 } }]
    },
    {
        id: "node11",
        height: 40,
        width: 40,
        offsetX: 300,
        offsetY: 800,
        shape: { type: "UmlActivity", shape: "FinalNode" }
    }];
    let arrConnectors = [
        {
            id: "connector1",
            sourceID: "Start",
            targetID: "ReceiveCall"
        },
        {
            id: "connector2",
            sourceID: "ReceiveCall",
            targetID: "node2"
        },
        {
            id: "connector3",
            sourceID: "node2",
            targetID: "Determine",
            sourcePortID: "port1",
            targetPortID: "portTop",
            segments: [
                { type: "Orthogonal", length: 20, direction: "Bottom" },
                { type: "Orthogonal", length: 50, direction: "Left" }
            ]
        },
        {
            id: "connector4",
            sourceID: "node2",
            targetID: "Log",
            sourcePortID: "port2",
            targetPortID: "portTop",
            segments: [
                { type: "Orthogonal", length: 20, direction: "Bottom" },
                { type: "Orthogonal", length: 50, direction: "Right" }
            ]
        },
        { id: "connector5", sourceID: "Determine", targetID: "node5" },
        {
            id: "connector6",
            sourceID: "node5",
            targetID: "transfer_sales",
            sourcePortID: "portLeft",
            targetPortID: "portTop",
            shape: {
                type: "UmlActivity",
                flow: "Object"
            },
            annotations: [
                {
                    id: "connector6Label",
                    content: "type=New Customer",
                    offset: 0.715,
                    style: { fill: "white", color: "black", textWrapping: 'NoWrap' }
                }
            ]
        },
        {
            id: "connector7",
            sourceID: "node5",
            targetID: "transfer_desk",
            sourcePortID: "portRight",
            targetPortID: "portTop",
            shape: {
                type: "UmlActivity",
                flow: "Object"
            },
            annotations: [
                {
                    id: "connector7Label",
                    content: "type=Existing Customer",
                    offset: 0.75,
                    style: { fill: "white", color: "black", textWrapping: 'NoWrap' }
                }
            ]
        },
        {
            id: "connector8",
            sourceID: "transfer_sales",
            targetID: "node8",
            sourcePortID: "portBottom",
            targetPortID: "portLeft",
            segments: [{ type: "Orthogonal", length: 50, direction: "Bottom" }]
        },
        {
            id: "connector9",
            sourceID: "transfer_desk",
            targetID: "node8",
            sourcePortID: "portBottom",
            targetPortID: "portRight",
            segments: [{ type: "Orthogonal", length: 50, direction: "Bottom" }]
        },
        {
            id: "connector10",
            sourceID: "node8",
            targetID: "node9",
            sourcePortID: "portBottom",
            targetPortID: "port3"
        },
        {
            id: "connector11",
            sourceID: "Log",
            targetID: "node9",
            sourcePortID: "portBottom",
            targetPortID: "port4",
            segments: [
                { type: "Orthogonal", length: 265, direction: "Bottom" },
                { type: "Orthogonal", length: 50, direction: "Left" }
            ]
        },
        { id: "connector12", sourceID: "node9", targetID: "CloseCall" },
        { id: "connector13", sourceID: "CloseCall", targetID: "node11" }
    ];
    let arrUmlActivityShapes = [
        { id: 'Action', shape: { type: 'UmlActivity', shape: 'Action' } },
        { id: 'Decision', shape: { type: 'UmlActivity', shape: 'Decision' } },
        { id: 'MergeNode', shape: { type: 'UmlActivity', shape: 'MergeNode' } },
        { id: 'InitialNode', shape: { type: 'UmlActivity', shape: 'InitialNode' } },
        { id: 'FinalNode', shape: { type: 'UmlActivity', shape: 'FinalNode' } },
        { id: 'ForkNode', shape: { type: 'UmlActivity', shape: 'ForkNode' } },
        { id: 'JoinNode', shape: { type: 'UmlActivity', shape: 'JoinNode' } },
        { id: 'TimeEvent', shape: { type: 'UmlActivity', shape: 'TimeEvent' } },
        { id: 'AcceptingEvent', shape: { type: 'UmlActivity', shape: 'AcceptingEvent' } },
        { id: 'SendSignal', shape: { type: 'UmlActivity', shape: 'SendSignal' } },
        { id: 'ReceiveSignal', shape: { type: 'UmlActivity', shape: 'ReceiveSignal' } },
        { id: 'StructuredNode', shape: { type: 'UmlActivity', shape: 'StructuredNode' } },
        { id: 'Note', shape: { type: 'UmlActivity', shape: 'Note' } },
    ];
    return {
        Nodes: arrNodes,
        Connectors: arrConnectors,
        UmlActivityShapes: arrUmlActivityShapes,
        isMobile:""
    };
}

/**
 * @name InitialLoad
 * @param {any} objContext
 * @summary used for adding events
 */
export function InitialLoad(objContext) {
    useEffect(() => {
        AddEvents(objContext);
        ApplicationState.SetProperty("blnShowAnimation", false);
    }, []);    
}

/**
 * @name addEvents
 * @param {any} objContext
 * @summary used to add events
 */
function AddEvents(objContext) {
    objContext.dispatch({ type: "SET_STATE", payload: { "isMobile": window.matchMedia('(max-width:550px)').matches } });    
    if (objContext.state.isMobile) {
        let paletteIcon = document.getElementById('palette-icon');
        if (paletteIcon) {
            paletteIcon.addEventListener('click', openPalette, false);
        }
    }
}