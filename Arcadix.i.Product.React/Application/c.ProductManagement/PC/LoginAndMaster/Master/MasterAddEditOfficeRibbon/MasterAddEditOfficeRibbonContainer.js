import React, {useEffect } from 'react';
import MasterAddEditOfficeRibbon from '@root/Application/c.ProductManagement/PC/LoginAndMaster/Master/MasterAddEditOfficeRibbon/MasterAddEditOfficeRibbon';
import ComponentController from "@root/Application/c.ProductManagement/PC/Controller/Componentcontroller/Componentcontroller";

const OfficeRibbonContainer = props => {
   

    let arrToolBarData = [
        {//Group1
            "vGroupName":"course",
            "t_GroupData":[ 
                {
                    "vTextName":"course",
                    "uImageUrl":"down.png",
                    "type":"single"
                },
                
            ]
        },
        {//Group2
            "vGroupName":"demo",
            "t_GroupData":[ 
                {
                    "vTextName":"demo",
                    "uImageUrl":"down.png",
                    "type":"single"
                },
                
            ]
        },
        {//Group3
            "vGroupName":"Exercise+exam",
            "t_GroupData":[ 
                {
                    "vTextName":"Learn",
                    "uImageUrl":"down.png",
                    "type":"single"
                },
                {
                    "vTextName":"Check",
                    "uImageUrl":"down.png",
                    "type":"single"
                },
            ]
        },
            {//Group4
            "vGroupName":"test",
            "t_GroupData":[ 
                {
                    "vTextName":"Learn",
                    "uImageUrl":"down.png",
                    "type":"single"
                },
                {
                    "type":"multiple",
                    "t_MultipleData": [
                                            {
                                                "vTextName":"example",
                                                "uImageUrl":"down.png",
                                                "type":"single"
                                            },
                                            {
                                                "vTextName":"manual",
                                                "uImageUrl":"down.png",
                                                "type":"single"
                                            },
                                            {
                                                "vTextName":"pause",
                                                "uImageUrl":"down.png",
                                                "type":"single"
                                            },

                                    ]
                },
                {
                    "type":"multiple",
                    "t_MultipleData": [
                                            {
                                                "vTextName":"survey",
                                                "uImageUrl":"down.png",
                                                "type":"single"
                                            },
                                            {
                                                "vTextName":"list",
                                                "uImageUrl":"down.png",
                                                "type":"single"
                                            },
                        ]
                },
                {
                    "vTextName":"test",
                    "uImageUrl":"down.png",
                    "type":"single"
                },
            ]
        },
            {//Group5
            "vGroupName":"survey",
            "t_GroupData":[ 
                {
                    "vTextName":"survey",
                    "uImageUrl":"down.png",
                    "type":"single"
                },
                {
                    "vTextName":"list",
                    "uImageUrl":"down.png",
                    "type":"inverted"
                },
            ]
        },
        {//Group6
            "vGroupName":"To edit",
            "t_GroupData":[ 
                {
                    "vTextName":"survey",
                    "uImageUrl":"down.png",
                    "type":"single"
                },
                {
                    "type":"multiple",
                    "t_MultipleData": [
                                            {
                                                "vTextName":"copy",
                                                "uImageUrl":"down.png",
                                                "type":"single"
                                            },
                                            {
                                                "vTextName":"cut out",
                                                "uImageUrl":"down.png",
                                                "type":"single"
                                            },
                                                {
                                                "vTextName":"Insert",
                                                "uImageUrl":"down.png",
                                                "type":"single"
                                            },
                        ]
                },
                {
                    "vTextName":"Clear",
                    "uImageUrl":"down.png",
                    "type":"single"
                },
                {
                    "vTextName":"Abort, Stop",
                    "uImageUrl":"down.png",
                    "type":"single"
                },
            ]
        },
        {//Group7
            "vGroupName":"dates",
            "t_GroupData":[ 
                {
                    "vTextName":"Back to the search result",
                    "uImageUrl":"down.png",
                    "type":"single"
                },
                
            ]
        },
            {//Group7
            "vGroupName":"Open Editor",
            "t_GroupData":[ 
                {
                    "vTextName":"Open Editor",
                    "uImageUrl":"down.png",
                    "type":"single"
                },
                
            ]
        }
    ]

    let arrOfficeRibbonData = [
        
        {
            Text : "Tab1",
            OnTabClick : ()=>{alert('Call Back from module')},
            ComponentName : "login"
        },
        {
            Text : "Tab2",
            OnTabClick : ()=>{alert('Call Back from module')},
            ToolBarData : arrToolBarData
        },
    ]

    useEffect(()=>{        
        ApplicationState.SetProperty("PopupOfficeRibbonData", {"SampleModuleName":arrOfficeRibbonData});
    },[])
    
    return <div className="top-navigation">
        <MasterAddEditOfficeRibbon ModuleName="SampleModuleName" SkinPath={props.JConfiguration.ExtranetSkinPath} JConfiguration={props.JConfiguration} ComponentController ={ComponentController} isSSRDisabled={false}/>
    </div>
}

export default OfficeRibbonContainer;
