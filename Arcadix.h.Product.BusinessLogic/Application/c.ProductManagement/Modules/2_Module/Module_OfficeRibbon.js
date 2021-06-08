/**
* @name GetModuleOfficeRibbonData
* @param {object} objData takes  objData
* @summary Get data to initialize RibbonData
* @returns {array} array
*/
export function GetModuleOfficeRibbonData(objData) {
    var objTextResource = Object_Framework_Services_TextResource.GetData("/c.ProductManagement/Modules/2_Module/Module", objData.objContext.props);

    var arrBaseToolBar = [
        {
            "vGroupName": Localization.TextFormatter(objTextResource, "New"),
            "t_GroupData": [
                {
                    "type": "single",
                    "OnClick": () => objData.AddPopup(),
                    "ImageName": "NewImage"
                }
            ]
        },
        {
            "vGroupName": Localization.TextFormatter(objTextResource, "Edit"),
            "t_GroupData": [
                {
                    "vTextName": Localization.TextFormatter(objTextResource, "Edit"),
                    "type": "single",
                    "OnClick": () => objData.EditPopup(),
                    "ImageName": "EditImage"
                },
                {
                    "type": "Multiple",
                    "MultipleData": [
                        {
                            "vTextName": Localization.TextFormatter(objTextResource, "Copy"),
                            "type": "single",
                            "OnClick": () => objData.Copy(),
                            "ImageName": "CopyImage"
                        },
                        {
                            "vTextName": Localization.TextFormatter(objTextResource, "Cut"),
                            "type": "single",
                            "OnClick": () => objData.Cut(),
                            "ImageName": "CutImage",
                        },
                        {
                            "vTextName": Localization.TextFormatter(objTextResource, "Paste"),
                            "type": "single",
                            "OnClick": () => objData.Paste(),
                            "ImageName": "PasteImage",
                        },
                    ]
                },
                {
                    "vTextName": Localization.TextFormatter(objTextResource, "Delete"),
                    "type": "single",
                    "OnClick": () => objData.DeletePopup(),
                    "ImageName": "DeleteImage"
                }
            ]
        }
    ];        

    var arrAdditionalToolBar = ApplicationState.GetProperty("ActiveMainNavigationId") == "71902243-108E-4E3B-A27C-0C1DA0E11FB9" ?
        [
            {
                "vGroupName": Localization.TextFormatter(objTextResource, "Actions"),
                "t_GroupData": [
                    {
                        "vTextName": Localization.TextFormatter(objTextResource, "Preview"),
                        "uImageUrl": "/Images/Common/OfficeRibbon/New_Large.svg",
                        "type": "single",
                        "OnClick": () => objData.PreviewModule(),
                        "ImageName": "NewImage"
                    },
                    {
                        "vTextName": Localization.TextFormatter(objTextResource, "CopyLink"),
                        "type": "single",
                        "OnClick": () => objData.CopyLinkToClipBoard(),
                        "ImageName": "CopyLinkImage"
                    }                    
                ]
            }
        ]
        :
        [
            {
                "vGroupName": Localization.TextFormatter(objTextResource, "Actions"),
                "t_GroupData": [
                    {
                        "vTextName": Localization.TextFormatter(objTextResource, "Editor"),
                        "uImageUrl": "/Images/Common/OfficeRibbon/OpenEditor.svg",
                        "type": "single",
                        "OnClick": () => objData.OpenContent(),
                        "ImageName": "OpenEditorImage"
                    },
                    {
                        "vTextName": Localization.TextFormatter(objTextResource, "Documents"),
                        "uImageUrl": "/Images/Common/OfficeRibbon/Document.svg",
                        "type": "single",
                        "OnClick": () => objData.OpenDocuments(),
                        "ImageName": "DocumentImage"
                    }
                ]
            }            
        ];

    arrBaseToolBar = [...arrBaseToolBar, ...arrAdditionalToolBar];

    return (
        [
            {
                Text: ApplicationState.GetProperty("ActiveMainNavigationId") == "71902243-108E-4E3B-A27C-0C1DA0E11FB9" ? Localization.TextFormatter(objTextResource, "Example") : Localization.TextFormatter(objTextResource, "Module"),
                ToolBarData: arrBaseToolBar,
                ImageMeta: {
                    ...objData.objContext.ImageMeta
                }
            }
        ]
    );
}
