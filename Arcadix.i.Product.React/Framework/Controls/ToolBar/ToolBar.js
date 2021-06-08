// React related imports.
import React from 'react';

/**
* @name ToolBar
* @param {object} props props
* @summary Takes toolbar Data as props and click methods referenes can be passed along with each icon.
* @returns {object} returns a jsx with provided data that will be displayed in it.
*/
const ToolBar = props => {

    /**
    * @name GetGroupData
    * @param {Array} arrGroupData Group Data
    * @summary forms array of JSX consisting of data inside the groups.
    * @returns {object} JSX
    */
    function GetGroupData(arrGroupData) {
        let ToolBarGroup = [];
        ToolBarGroup = arrGroupData.map((objGroupData, intIndex) => {            
            let strClassName = "items" + (objGroupData["type"] === "inverted" ? " inverted" : "");//+ objGroupData["Disabled"] == true ? " Disabled" : ""
            let strImage = objGroupData["ImageName"] && props.ImageMeta && props.ImageMeta[objGroupData["ImageName"]] ? props.ImageMeta[objGroupData["ImageName"]] : props.Resource.SkinPath + objGroupData["uImageUrl"];
            let strImageText = objGroupData["ImageText"] ?? objGroupData["vTextName"] ?? "";
            if (objGroupData["Disabled"]) {
                strClassName = strClassName + " Disabled";
            }
            if (objGroupData["type"] === "Multiple") {
                return <div className = "vertical-list">{GetGroupData(objGroupData["MultipleData"])}</div>;
            }            
            else {
                return objGroupData.HideOption ? <React.Fragment /> : <div
                            id={props.Id + "_ToolBarGroup_" + intIndex}
                            key={props.Id + "_ToolBarGroup_" + intIndex}
                            className={strClassName}
                            title={strImageText}
                            onClick={objGroupData["OnClick"] ? objGroupData["OnClick"] : () => { }}
                        >
                    <a href={objGroupData["Href"]}>
                        <WrapperComponent
                            ComponentName={"Image"}
                            Data={{
                                Image: strImage,
                                AltText: strImageText
                            }}
                            ParentProps={props.ParentProps}
                        />
                    </a>
                    <span>{objGroupData["vTextName"]}</span>
                       </div>;
            }
        });
        return ToolBarGroup;
    }

    /**
    * @name GetContent
    * @summary ToolBar JSX formation 
    * @returns {object} JSX for ToolBar Content
    */
    const GetContent = () => {
        let ToolBar = props.Data.ToolBarData.map((objToolBarData, intIndex) => {
            return (
                <div className="ribbon-flex" key={props.Id + "_ToolBar_" + intIndex}>
                    <div className="column">
                        <div className="items-flex">
                            {GetGroupData(objToolBarData["t_GroupData"])}
                        </div>
                        {objToolBarData.HideOption ? <React.Fragment /> : <div className="bottom-text">{objToolBarData["vGroupName"]}</div>}
                    </div>
                </div>
            );
        });
        return ToolBar;
    };

    /**
    * JSX for ToolBar
    */
    return GetContent();
};

export default ToolBar;