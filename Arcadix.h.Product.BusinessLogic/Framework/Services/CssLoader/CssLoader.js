export async function LoadDynamicStyles(strUrl) {

    if ((typeof document) != 'undefined' && document !== null) {
        var strId = strUrl.substring(strUrl.indexOf("Theme") + 7); 
        //Loading css as Link tags if IsLoadDynamicCssLinks is enabled.        
        if (JConfiguration.IsLoadDynamicCssLinks === "Y") {
            let strTheme = strId.substring(0, strId.indexOf("/"));
            //Loading Default and MainClientSpecific css files as link tags if theme is MainClientSpecific.
            if (strTheme !== "Default") {
                let strDefaultUrl = strUrl.replace(strTheme, "Default");
                let strDefaultId = strId.replace(strTheme, "Default");
                CreateLinkTag(strDefaultId, strDefaultUrl);
                let strClientSpecificOverrideUrl = JConfiguration.BaseUrl + "Themes/" + strId.split(".")[0] + "_Override.css";
                //Checking if the ClientSpecificOverride css file exists and then add as link tag.
                if ((await fetch(strClientSpecificOverrideUrl)).ok)
                    CreateLinkTag(strId, strClientSpecificOverrideUrl);
            }
            else {
                CreateLinkTag(strId, strUrl);
            }            
        }
        else {
            CreateLinkTag(strId, strUrl);
        }
    }
};

export function LoadDynamicStyles_API(arrDynamicStyles) {

    if ((typeof document) != 'undefined' && document !== null) {
        if (arrDynamicStyles != undefined) {
            var head = document.getElementsByTagName('head')[0];
            arrDynamicStyles.map(objarrDynamicStyle => {
                let strId = objarrDynamicStyle["Id"];                               
                let strContent = objarrDynamicStyle["Content"];
                var domCheckLink = document.getElementById(strId);
                if (domCheckLink != null) {
                    console.log("Stylesheet already added");
                }
                else {
                    let domStyleElement = document.createElement('style');
                    domStyleElement.id = strId;
                    domStyleElement.type = 'text/css';
                    if (domStyleElement.styleSheet) {
                        // This is required for IE8 and below.
                        domStyleElement.styleSheet.cssText = strContent;
                    } else {
                        domStyleElement.appendChild(document.createTextNode(strContent));
                    }
                    head.appendChild(domStyleElement);
                }                
            });
        }
        
    }
};

export function DeleteDynamicStylesheet(strUrl) {
    var strId = strUrl.substring(strUrl.indexOf("Theme") + 7);
    if ((typeof document) != 'undefined') {
        var head = document.getElementsByTagName('head')[0];

        var checkLink = document.getElementById(strId);
        if (checkLink == null) {
            console.log("Stylesheet Not added");
        }
        else {
            newLink.parentNode.removeChild(newLink);
        }
    }
};

/**
 * @name GetLoadedDynamicStyles
 * @summary Forms list of loaded DynamicStyles in DOM.
 * @return {Array} Array of LoadedStyles
 */
export function GetLoadedDynamicStyles() {
    let arrLoadedStyles = [];
    if ((typeof document) != 'undefined' && document !== null) {
        let arrStyleTags = document.getElementsByTagName('style');
        arrStyleTags = Array.from(arrStyleTags);
        let arrLinkTags = document.getElementsByTagName('link');
        arrLinkTags = Array.from(arrLinkTags);
        let arrCssTags = [...arrStyleTags, ...arrLinkTags];
        arrCssTags.forEach(objTag => {
            if (objTag["id"])
                arrLoadedStyles = [...arrLoadedStyles, objTag["id"]];
        });        
    }
    return arrLoadedStyles;
}

export function CreateLinkTag(strId, strUrl) {
    var head = document.getElementsByTagName('head')[0];
    var checkLink = document.getElementById(strId);
    var newLink;
    if (checkLink != null) {
        console.log("Stylesheet already added");
    }
    else {
        newLink = document.createElement('link');
        newLink.setAttribute('id', strId);
        newLink.setAttribute('rel', 'stylesheet');
        newLink.setAttribute('type', 'text/css');
        newLink.setAttribute('href', strUrl);
        newLink.setAttribute('media', 'all');
        head.appendChild(newLink);
    }
}