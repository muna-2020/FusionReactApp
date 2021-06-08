import * as Grid_EditableGrid_Sample_MetaData from '@shared/Application/c.ProductManagement/Modules/6_Example/Framework/Blocks/Grid_Sample/Grid_EditableGrid_Sample/Grid_EditableGrid_Sample_MetaData';
import * as Grid_EditableGrid_Sample_ResourceData from '@shared/Application/c.ProductManagement/Modules/6_Example/Framework/Blocks/Grid_Sample/Grid_EditableGrid_Sample/Grid_EditableGrid_Sample_ResourceData';
import * as Grid_EditableGrid_Sample_Data from '@shared/Application/c.ProductManagement/Modules/6_Example/Framework/Blocks/Grid_Sample/Grid_EditableGrid_Sample/Grid_EditableGrid_Sample_Data';

/**
* @name DisplayGrid_Sample_ModuleProcessor.
* @summary Class for ApplicationType module display.
*/
class DisplayGrid_Sample_ModuleProcessor extends IntranetBase_ModuleProcessor {

    /**
     * @name StoreMapList     
     * @summary Returns list of objects used in the module
     * @return {Array} Array of object list
     */
    static GetStoreData() {
        return (objStore) => {
            return {
                ["Data"]: Grid_EditableGrid_Sample_Data.GetData(),
                ["Meta"]: Grid_EditableGrid_Sample_MetaData.GetMetaData(),
                ["Resource"]: Grid_EditableGrid_Sample_ResourceData.GetResourceData()
            }
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
    SaveMethod(objSaveData, OnGridCallBack, objContext) {
        console.log("objSaveData", objSaveData);
        let arrRowData
        if (objSaveData.IsNewRow) {
            arrRowData = [{ ...objSaveData, "FilterId": 1 } , ...objContext.state.arrRowData];
        }
        else {
            arrRowData = objContext.state.arrRowData.map(obj => obj["Id"] == objSaveData["Id"] ? objSaveData : obj);
        }        
        objContext.dispatch({ type: 'SET_STATE', payload: { arrRowData } });
        OnGridCallBack();
    }

    /**
    * @name OnBeforeGridRowRender
    * @param {object} objContext Context object
    * @param {object} objRowData objRowData
    * @summary Executes before everything else when Grid row is formed
    * @returns {object} extra row data
    */
    OnBeforeGridRowRender(objContext, objRowData) {
        return {
            ...objRowData,
            "ImageColumn": objContext.props.JConfiguration.ExtranetSkinPath + "/Images/Common/Icons/check_green.svg" ,
            "ActiveImageIcon": objContext.props.JConfiguration.ExtranetSkinPath + "/Images/Common/Icons/" 
        };
    }

    /**
    * @name OnBeforeEditRow
    * @param {object} objEditRowData EditRowData object
    * @summary Executes before everything else when Edit Row is clicked
    * @returns {object} extra row data
    */
    OnBeforeEditRow(objEditRowData) {
        return { "AllowEdit": true, "ButtonKeys": ["Deactivate"] };
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
            //Returns an array to contain the buttons at the top after the header…..
            SaveMethod: (objSaveData, OnGridCallBack) => this.SaveMethod(objSaveData, OnGridCallBack, objContext),
            //Method reference for the Save button to return the row data that got edited (or added in case of add) to parent component(module).
            OnBeforeGridRowRender: (objRowData) => this.OnBeforeGridRowRender(objContext, objRowData),
            //Performs the logic based on objEditRowData and returns trie if the row has to be shown.            
            OnBeforeEditRow: (objEditRowData) => { return this.OnBeforeEditRow(objEditRowData); }
            //Performs the logic based on objEditRowData and returns
            //AllowEdit(true for Active row and false for inactive row) and 
            //the array of string to hold the button keys(same as passed in the RowActionButtons)
        };
    }    

    /**
    * @name GetEvents
    * @summary Returns object that contains all the event methods.
    * @return {object} 
    */
    GetEvents() {
        return {
            OnClickRow: this.OnClickRow, //Method reference to return the selectected row.
        }
    }
}

export default DisplayGrid_Sample_ModuleProcessor;