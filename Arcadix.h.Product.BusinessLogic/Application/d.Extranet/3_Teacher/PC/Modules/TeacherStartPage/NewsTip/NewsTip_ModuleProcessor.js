
/**
* @name NewsTip_ModuleProcessor
* @summary Class for Teacher module display and manipulate.
*/
class NewsTip_ModuleProcessor extends ExtranetBase_ModuleProcessor {

    /**
     * @name StoreMapList     
     * @summary Returns list of objects used in the module
     * @return {Array} Array of object list
     */
    static StoreMapList() {
        //return ["Object_Extranet_Shared_SurveyQuestion"];
        return [];
    }


    /**
    * @name LoadInitialData
    * @param {object} objContext context object
    * @summary Calls the Queue and Execute method
    */
    LoadInitialData(objContext) {
        (new ObjectQueue()).QueueAndExecuteAPI(this, objContext.props);
    }

    /**
    * @name GetDynamicStyles
    * @param {object} props props
    * @summary Required for css
    * @returns {object} arrStyles
    */
    GetDynamicStyles(props) {
        return [
            JConfiguration.ExtranetSkinPath + "/Css/Application/3_Teacher/ReactJs/PC/TeacherStartPage/NewsTips/NewsTips.css"
        ];
    }

    /**
    * @name InitialDataParams
    * @param {object} props Passes props
    * @summary Get initial request params for the component.
    * @returns {Array} return arrays of initial request params
    */
    InitialDataParams(props) { return []; }

    /**
    * @name CloseNewsTip
    * @param {object} objContext Context object
    * @summary Invokes the passed event "CloseClick", which in turn change the state blnShowNewsTip to false
    */
    CloseNewsTip(objContext) {

        objContext.props.CloseClick();
    }

    /**
    * @name ShowNewsTipContent
    * @param {object} objContext Context object
    * @param {object} objNewsTip News Tips object
    * @summary Sets appropriate states and shows the News Tips content
    */
    ShowNewsTipContent(objContext, objNewsTip) {
        objContext.dispatch({ type: "SET_STATE", payload: { "blnShowNewsTipContent": true, objNewsTip: objNewsTip } });
        //strPageId: objNewsTip["PageId"], PageJson: objNewsTip["PageJson"], intOrderId: objNewsTip["OrderId"],
    }

    /**
    * @name UpdateNewsTipContent
    * @param {object} objContext Context object
    * @param {String} strArrowClick Previous or Next arrow clicked for showing the previous and next tip. If it's first tip, then previous closes the news tip content and shows the News tips list.
    * @summary Updates the news tips content on arrow click 
    */
    UpdateNewsTipContent(objContext, strArrowClick) {
        let intCurrentOrderId = objContext.state.objNewsTip.iOrder;
        let arrNewsTipData = objContext.props.NewsTipData;
        let intCurrentTipIndex = 0;
        arrNewsTipData.map((obj, index) => {
            if (obj["iOrder"] == intCurrentOrderId)
                intCurrentTipIndex = index;
        });
        if (strArrowClick == "Previous") {
            if (intCurrentTipIndex == 0) {
                objContext.dispatch({
                    type: "SET_STATE", payload: { "blnShowNewsTipContent": false }
                });
            } else {
                objContext.dispatch({
                    type: "SET_STATE", payload: {
                        objNewsTip: arrNewsTipData[intCurrentTipIndex - 1]
                    }
                });
            }
        } else {
            if (intCurrentTipIndex !== arrNewsTipData.length) {
                objContext.dispatch({
                    type: "SET_STATE", payload: {
                        objNewsTip: arrNewsTipData[intCurrentTipIndex + 1]
                    }
                });
            }
        }
    }

    /**
    * @name GetFormattedDate
    * @param {String} strDate Date
    * @summary Formats the passed date in dd.mm.yyyy
    * @returns {String} current formated date
    */
    GetFormattedDate(strDate) {
        let objDay = new Date(strDate);
        let strDay = objDay.getDate();
        let strMonth = objDay.getMonth() + 1; //January is 0!
        let strYear = objDay.getFullYear();

        strDay = strDay < 10 ? '0' + strDay : strDay;
        strMonth = strMonth < 10 ? '0' + strMonth : strMonth;

        return strDate ? strDay + '.' + strMonth + '.' + strYear : "";
    }


    /**
    * @name GetPrefetchFiles
    * @param {object} props props
    * @returns {object} PrefetchFiles
    */
    GetPrefetchFiles(props) {
        return {
            "Components": [],
            "Files": []
        }
    }
}

export default NewsTip_ModuleProcessor;