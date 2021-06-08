import Base_ModuleProcessor from '@shared/Framework/BaseClass/Base_ModuleProcessor';
import * as GridGenerator_Sample_MetaData from '@shared/SupportApplication/Demo/Modules/ComponentUsage/Blocks/GridGenerator_Sample/GridGenerator_Sample_MetaData';
import * as GridGenerator_Sample_ResourceData from '@shared/SupportApplication/Demo/Modules/ComponentUsage/Blocks/GridGenerator_Sample/GridGenerator_Sample_ResourceData';
import * as GridGenerator_Sample_Data from '@shared/SupportApplication/Demo/Modules/ComponentUsage/Blocks/GridGenerator_Sample/GridGenerator_Sample_Data';

/**
* @name GridGenerator_Sample_ModuleProcessor
* @summary Class for ApplicationType module display.
*/
class GridGenerator_Sample_ModuleProcessor extends Base_ModuleProcessor {

    /**
     * @name StoreMapList     
     * @summary Returns list of objects used in the module
     * @return {Array} Array of object list
     */
    static GetStoreData() {
        return (objStore) => {
            return {
                ["Data"]: GridGenerator_Sample_Data.GetData(),
                ["Meta"]: GridGenerator_Sample_MetaData.GetMetaData(),
                ["Resource"]: GridGenerator_Sample_ResourceData.GetResourceData()
            };
        };
    }

    /**
    * @name GetCallBacks
    * @param {object} objSelectedRow Selected Row
    * @summary CallBack for on click row
    */
    OnClickRow(objSelectedRow) {
        //alert(JSON.stringify(objSelectedRow));
        console.log("objSelectedRow", objSelectedRow);
    }

    /**
    * @name GetGridActionButtons
    * @param {object} objContext Context object
    * @summary GridActionButtons
    * @return {Array} GridActionButtons
    */
    GetGridActionButtons(objContext) {
        return [
            {
                "Type": "Add",
                "Text": "Add",
                "Image": objContext.props.JConfiguration.ExtranetSkinPath + "/Images/Common/Icons/pluswhite.svg"
            }, {
                "Text": "DoSomeAction",
                "Image": objContext.props.JConfiguration.ExtranetSkinPath + "/Images/Common/Icons/GridUpload.svg",
                "ClassName": "grey-button",
                "Action": () => { alert('DoSomeAction action'); }
            }
        ];
    }

    /**
    * @name GetGridActionButtons
    * @param {object} objContext Context object
    * @summary GridActionButtons
    * @return {Array} GridActionButtons
    */
    GetActionButtons() {
        return [
            {
                "Key": "Activate",
                "Text": "Activate...",
                "ClassName": "button",
                "Action": (objAction) => {
                    console.log("Activate", objAction);
                }
            },
            {
                "Key": "Deactivate",
                "Text": "Deactivate...",
                "ClassName": "button",
                "Action": (objAction) => {
                    console.log("Deactivate", objAction);
                }
            },
            {
                "Key": "ExtraButton",
                "Text": "ExtraButton...",
                "ClassName": "button",
                "Image": "Themes/Default/d.Extranet/Skin2018/Images/Common/Icons/GridUpload.svg",
                "Action": (ActionObject) => { }
            }
        ];
    }

    /**
    * @name SaveMethod
    * @param {object} objSaveData SaveData
    * @param {object} OnGridCallBack GridCallBack
    * @summary SaveMethod
    */
    SaveMethod(objSaveData, OnGridCallBack) {
        console.log("objSaveData", objSaveData);
        console.log("OnGridCallBack", OnGridCallBack);
    }   

    /**
    * @name OnBeforeGridRowRender
    * @param {object} objContext Context object
    * @param {object} objRowData objRowData
    * @summary Executes before everything else when Grid row is formed
    * @returns {object} extra row data
    */
    OnBeforeGridRowRender(objContext,objRowData) {
        if (objContext.state.strStatus === "Active") {
            if (objRowData["t_TestDrive_Member_Teacher_School"][0]["cIsDeleted"] === "N") {
                return {
                    ...objRowData,
                    "ActiveImageIcon": objContext.props.JConfiguration.ExtranetSkinPath + "/Images/Common/Icons/check_green.svg"
                };
            } else {
                return null;
            }
        }
        else if (objContext.state.strStatus === "InActive") {
            if (objRowData["t_TestDrive_Member_Teacher_School"][0]["cIsDeleted"] === "Y") {
                return {
                    ...objRowData,
                    "ActiveImageIcon": objContext.props.JConfiguration.ExtranetSkinPath + "/Images/Common/Icons/errorDeactive.svg"
                };
            } else {
                return null;
            }
        } else {
            var strStatusImage = objRowData["t_TestDrive_Member_Teacher_School"][0]["cIsDeleted"] === 'N' ? "check_green.svg" : "errorDeactive.svg";
            return {
                ...objRowData,
                "ActiveImageIcon": objContext.props.JConfiguration.ExtranetSkinPath + "/Images/Common/Icons/" + strStatusImage
            };
        }
    }

    /**
    * @name OnBeforeEditRow
    * @param {object} objEditRowData EditRowData object
    * @summary Executes before everything else when Edit Row is clicked
    * @returns {object} extra row data
    */
    OnBeforeEditRow(objEditRowData) {
        if (objEditRowData["t_TestDrive_Member_Teacher_School"][0]["cIsDeleted"] === "N") {
            return { "AllowEdit": true, "ButtonKeys": ["Deactivate"] };
        } else {
            return { "AllowEdit": false, "ButtonKeys": ["Activate"] };
        }
    }

    /**
    * @name GetCallBacks
    * @param {object} objContext Context object
    * @summary Returns object that contains all the CallBack methods.
    * @return {object} objCallBasics
    */
    GetCallBacks(objContext) {
        return {
            GridActionButtons: this.GetGridActionButtons(objContext),
            RowActionButtons: this.GetActionButtons(objContext),
            OnClickRow: this.OnClickRow,
            SaveMethod: this.SaveMethod,
            SkinPath: objContext.props.JConfiguration.ExtranetSkinPath,
            OnBeforeGridRowRender: (objRowData) => this.OnBeforeGridRowRender(objContext,objRowData),
            //Performs the logic based on objEditRowData 
            //and return the array of string to hold the 
            //button key(same as passed in the RowActionButtons)
            OnBeforeEditRow: (objEditRowData) => { return this.OnBeforeEditRow(objEditRowData);}
        };
    }    
}

export default GridGenerator_Sample_ModuleProcessor;