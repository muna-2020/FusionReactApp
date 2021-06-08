// React related imports.
import React from "react";
import { connect } from 'react-redux';

//Component Related Module
import * as Base_Hook from '@shared/Framework/BaseClass/Base_Hook';

//Inline Images import
//import AnimationImage from '@intranetdefaulttheme/Images/Common/JNavigation/Preloader_Module.gif?inline';

/**
* @name Animation
* @param {object} props props
* @summary This component displays the Animation.
* @returns {object} JSX for the Animation
*/
const Animation = props => {

    return (
        <div id={props.Id}>
            {
                props.blnShowAnimation ?
                    <div className="animation-overlay">
                        <div className="animation-image">
                            {
                                props.Meta.ShowAnimationImage
                                    ?
                                    ((props.Resource.ImagePath || props.ImageMeta)
                                        ?
                                        (props.ImageMeta
                                            ?
                                            <img src={props.ImageMeta.Animation} />
                                            :
                                            <img src={props.Resource.ImagePath} />)
                                        : props.Resource.SkinPath + '/Css/Framework/Controls/Animation/pluswhite.svg')
                                    :
                                    <React.Fragment />
                            }
                        </div>
                    </div> : <React.Fragment />
            }
        </div>
    );
}

export default connect(Base_Hook.MapStoreToProps([{ StoreKey: "ApplicationState",DataKey: "blnShowAnimation" }]))(Animation);