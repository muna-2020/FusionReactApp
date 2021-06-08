//React related import.
import React, { useLayoutEffect } from "react";

/**
* @name FillHeight
* @param {object} props props
* @summary This component is to adjust the content in the viewable screen,FillHeight calculates height of the div and adds scroll to it. 
* @return {object} Div that encapsulated the props.children.
*/
const FillHeight = (props) => {

    const refContent = React.useRef();

    /**
     * @name useEffect
     * @summary On page resize,UpdateDimensions event is called to adjust the height
     * @return After adjusting the height the UpdateDimensions event is removed
     * */
    useLayoutEffect(() => {
        UpdateDimensions();
        window.addEventListener("resize", UpdateDimensions);
        return () => {
            window.removeEventListener("resize", UpdateDimensions);
        };
      }, []);
 
    /**
     * @name UpdateDimensions
     * @summary Calculates the height of the screen and adjust the content height
     * */
    const UpdateDimensions = () => {
        let arrHeaderHeight = props.Meta.HeaderIds || [];  //copy the all the header ids in the array
        let arrFooterHeight = props.Meta.FooterIds || [];   //copy the all the header ids in the array
        let intAdditionalPadding = props.Meta.AdditionalPadding || 0;
        let intTotalHeadFoot = 0; //total header and footer

        //summing up total header   
        arrHeaderHeight.forEach(element => {
            let intHeaderElement = document.getElementById(element);
            if (intHeaderElement) {
                intTotalHeadFoot += intHeaderElement.offsetHeight;
            }
        });

        //summing up total footer   
        arrFooterHeight.forEach(element => {
            let intFooterElement = document.getElementById(element);
            if (intFooterElement) {
                intTotalHeadFoot += intFooterElement.offsetHeight;
            }
        });

        //check if the refernce height is the window or parent 
        let intContentHeight, intReferenceVal = 0;
        let strCheckReferenceHeight = props.Meta.ParentReference || undefined; //change with the parent refernce name
        if (strCheckReferenceHeight === undefined) {
            intContentHeight = window.innerHeight - intTotalHeadFoot;
        }
        else {
            intReferenceVal = document.getElementById(props.Meta.ParentReference).offsetHeight;
            intContentHeight = intReferenceVal - intTotalHeadFoot; //calculating the content height from parent,footer and header
        }

        if (intContentHeight < 0) { //check if midHeight less than 0 set it to 0
            intContentHeight = 0;
        }
        intContentHeight = intContentHeight - intAdditionalPadding;
        refContent.current.style.height = intContentHeight + "px";
    };

    let objStyle = {
        overflow: props.Meta.DoNotOverFlow ? undefined : "auto",
        position: "position"
    };
    //assigning and overriding objParentCssStyle over objDivHeight
    if (props.Meta.StyleObject) {
        objStyle = { ...objStyle, ...props.Meta.StyleObject}
    }

    return (
        <div id={props.id === undefined ? "FillHeightContent" : props.id + "FillHeightContent"} ref={refContent} style={objStyle}  className="bgStyle" >
            {props.children}
        </div>
    );
};

export default FillHeight;
