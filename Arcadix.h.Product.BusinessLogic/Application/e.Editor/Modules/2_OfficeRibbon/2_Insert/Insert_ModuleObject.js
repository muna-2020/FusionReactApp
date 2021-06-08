//Base classes.
import EditorBase_ModuleObject from '@shared/Framework/BaseClass/EditorBaseClass/EditorBase_ModuleObject';

//Application State Classes
import EditorState from '@shared/Framework/DataService/EditorState/EditorState';

//Module Classes
import * as Links from "@root/Framework/Controls/TextEditor/Links/Links";

class Insert_ModuleObject extends EditorBase_ModuleObject {

 /**
 * @summary display ImageAddEditPopup
 */
    ShowImageAddEditPopup(){
        let showPopup = EditorState.GetProperty('showPopUp');
        showPopup({
            popUpName: "imageaddedit",
            showHeader: true,
            headerTitle: "Insert Image"
        });
    };

    /**
     * @summary This method is responsible for showing or hiding emoticon popup
     * @param {any} objContext Component context object
     * @param {any} objEvt Event Object
     */
    ShowEmoticons(objContext, objEvt){
        objEvt.nativeEvent.stopImmediatePropagation();
        let blnStatus = objContext.state.Font.showEmoticons ? false : true;
        objContext.dispatch({
            type: "SHOW_EMOTICONS",
            payload: blnStatus
        });
    };

/**
* @summary This method is responsible for showing symbol popup
* @param {any} objContext Component context object
* @param {any} objEvt Event Object
*/
    ShowSymbol(objContext, objEvt){
        objEvt.nativeEvent.stopImmediatePropagation();
        let blnStatus = objContext.state.Font.ShowSymbol ? false : true;
        objContext.dispatch({
            type: "SHOW_SYMBOL",
            payload: blnStatus
        });
    };

 /**
* @summary display image selection popup
*/
   ShowImageSelectionPopUp(){
        const fnShowPopup = EditorState.GetProperty("showeditorPopUp");
        fnShowPopup({
            MaxHeight: "582px",
            MaxWidth: "670px",
            popUpMinHeight: "582px",
            popUpMinWidth: "670px",
            popUpName: "imageaddedit", //name of the component to be displayed inside the popup. must be present in ComponentController
            passedEvents: {
                HasCloseButton: "Y",
                showHeader: true
            },
            headerTitle: "",
            Data: {},
            showHeader: true
        });
    };

    /**
    * @summary This shows the link popup
    */
  ShowLinkPopup(){
        let FnShowPopup = EditorState.GetProperty('showeditorPopUp')
        FnShowPopup({
            popUpName: "linkpopup",
            popUpMinHeight: "632px",
            popUpMinWidth: "670px",
            showHeader: false,
        });
    };

    /**
     * @summary Remove mail link
     * @param {*} mail link to remove
     */
    RemoveLink(mail) {
        Links.RemoveLink();
    };
}

export default Insert_ModuleObject;