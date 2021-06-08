//Base classes.
import Base_ModuleProcessor from '@shared/Framework/BaseClass/Base_ModuleProcessor';

//UniqueId.
import * as UniqueId from "@root/Framework/Services/UniqueId/UniqueId";

/**
* @name Popup_ComponentProcessor
* @summary Class for Popup component display.
*/
class Popup_ComponentProcessor extends Base_ModuleProcessor {

    /**
     * @name AddNewPopup
     * @param {any} objContext
     * @param {any} objPopup
     * @param {any} strPopupType
     * @summary adds new popup by updating the local state with new popup details.
     */
    AddNewPopup(objContext, objPopupData, strPopupType) {
        objContext = objContext.PopupRef.current.GetLatestContext();
        let objPopupFrameData = {
            Id: UniqueId.GetUniqueId(),
            Meta: {
                PopupType: strPopupType,
                ...objContext.props.Meta
            },
            Data: { PopupData: objPopupData },
            CallBacks: {
                GetDimensions: this.GetDimensions,
            },
            Events: {
                ClosePopup: (strId) => {
                    objContext.Popup_ComponentProcessor.ClosePopup(objContext, strId);
                }
            },
            Resource: objContext.props.Resource,
            ParentProps: { ...objContext.props.ParentProps, IsEditor: objContext.props.Meta.GroupName == "editorPopup" ? "Y" : "N" }
        }
        let arrPopupGroups = objContext.state[objContext.props.Meta.GroupName] ? objContext.state[objContext.props.Meta.GroupName] : [];
        let arrNewPopupGroups = [...arrPopupGroups, objPopupFrameData];
        objContext.dispatch({ type: "SET_STATE", payload: { [objContext.props.Meta.GroupName]: arrNewPopupGroups } });
        if (objPopupData.CallBacks.PopupCallBack) { // return Id if callback is present
            objPopupData.CallBacks.PopupCallBack(objPopupData.Id);
        }
    };

    /**
     * @name ClosePopup
     * @param {object} objContext passes Context Object
     * @param {*} objPopupParam
     * @summary remove a popup from the dom by removing popup data from the local state with.
     */
    ClosePopup(objContext, strId) {
        objContext = objContext.PopupRef.current.GetLatestContext();
        let arrNewPopupGroups = objContext.state[objContext.props.Meta.GroupName].filter(item => item.Id !== strId);
        objContext.dispatch({type: "SET_STATE",payload: {[objContext.props.Meta.GroupName]: arrNewPopupGroups}});
    };
}

export default Popup_ComponentProcessor;