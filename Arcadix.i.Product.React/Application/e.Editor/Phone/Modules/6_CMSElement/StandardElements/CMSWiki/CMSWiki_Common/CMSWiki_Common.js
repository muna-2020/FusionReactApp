//React imports
import React from 'react';

/**
 * @name CMSWiki_Common
 * @param {any} props parent props
 * @summary Containes the JSX for Wiki.
 * @returns {any} CMSWiki_Common
 */
const CMSWiki_Common = (props) => {

    let { Context, Events, Callbacks, AppType } = props;

    /**
     * @name GetContent
     * @summary Contains the JSX of wiki.
     * @returns {any} JSX
     */
    const GetContent = () => {
        if (Context.state.ElementJson["cIsFirstLoad"] && Context.state.ElementJson["cIsFirstLoad"] === "Y") {
            return Context.state.ElementJson["vElementJson"]["Values"][0]["vWikiKeyword"];
        }
        else {
            return (
                <span
                    ielementid={Context.state.ElementJson["iElementId"]}
                    ielementtypeid={Context.state.ElementJson["iElementTypeId"]}
                    className={"wiki-span"}
                    type="WikiDiv"
                    onClick={Events.OpenWikiInfoPopup}
                    onDoubleClick={Events.ShowWikiSidebar ? (event) => { Events.ShowWikiSidebar(event); } : Events.ShowWikiSidebar}
                    contentEditable={false}>
                    <span className={"wiki-span"} dangerouslySetInnerHTML={{ __html: Context.state.ElementJson["vElementJson"]["Values"][0]["vWikiKeyword"] }} />
                </span>
            );
        }
    };

    return GetContent();
};

export default CMSWiki_Common;
