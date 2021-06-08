//React imports
import React, { useEffect, useRef, forwardRef, useImperativeHandle } from 'react';

//Inline Images import
import ArrowLeftImage from '@inlineimage/Framework/ReactJs/PC/Controls/Slider/angle_left.png?inline';
import ArrowRightImage from '@inlineimage/Framework/ReactJs/PC/Controls/Slider/angle_right.png?inline';

/**
 * @name Slider
 * @summary This Component implements slider functionality for OfficeRibbon Components
 * @param {*} props 
 */
const Slider = (props, ref) => {

    /**
     * @summary ref pointing to left button DOM.
     */
    let refLeftButton = useRef(null);
    /**
     * @summary ref pointing to right button DOM.
     */
    let refRightButton = useRef(null);

    let strParentDiv = props.Meta?.ParentDivId ?? "Editor_OfficeRibbon";
    let strSliderDiv = props.Meta?.SliderDivId ?? "Editor_SliderDiv";

    /**
    * @summary This initializes the slider.
    */
    useEffect(() => {        
        InitializeSlider();  
    }, []);

    /**
     * @summary This Adds the necessary event listeners to body for slider.
     */
    useEffect(() => {
        window.addEventListener("resize", UpdateDimensions);
        return () => {
            window.removeEventListener("resize", UpdateDimensions);
        };
    }, []);

    /**
     * @summary Auto Event dispatch in case of resize window.
     */
    useEffect(() => {
        window.dispatchEvent(new Event('resize'));
    }, [window.width]);

    useImperativeHandle(ref, () => ({
        ResetSlider: () => InitializeSlider()
    }), []);

    /**
     * @summary This method initializes the slider.
     * */
    const InitializeSlider = () => {
        let ParentDivID = document.getElementById(strParentDiv);
        let SliderDivID = document.getElementById(strSliderDiv);
        let EditorRightButton = refRightButton.current;
        let EditorLeftButton = refLeftButton.current;

        if (ParentDivID.offsetWidth > SliderDivID.offsetWidth) {
            EditorRightButton.setAttribute("style", "display:none");
            EditorLeftButton.setAttribute("style", "display:none");
        }
        else {
            EditorRightButton.setAttribute("style", "display:flex");
        }     
    }

    /**
     * @summary This method updates the new dimensions to the slider.
     * */
    function UpdateDimensions() {
        if (refLeftButton.current!==null && refRightButton.current !== null) {
            var ParentDivID = document.getElementById(strParentDiv);
            var SliderDivID = document.getElementById(strSliderDiv);
            var EditorRightButton =refRightButton.current;
            var EditorLeftButton = refLeftButton.current;

            if (ParentDivID.offsetWidth > SliderDivID.offsetWidth) {
                EditorRightButton.setAttribute("style", "display:none");
                EditorLeftButton.setAttribute("style", "display:none");
            }
            else {
                EditorRightButton.setAttribute("style", "display:flex");
            }
        }
    }

    /**
    * @summary SlidderLeft and SlidderRight are the two function for the slider
    */
    function SlidderLeft() {
        var ParentDivID = document.getElementById(strParentDiv);
        var EditorRightButton = refRightButton.current;
        EditorRightButton.setAttribute("style", "display:flex");
        ParentDivID.scrollLeft -= 91; //substract and move right
        if (ParentDivID.scrollLeft <= 0) //untill comes to first position
        {
            var EditorLeftButton = refLeftButton.current;
            EditorLeftButton.setAttribute("style", "display:none");
        }
    }

    /**
     * @summary Event handler for slider right click.
     * */
    function SlidderRight() {
        var ParentDivID = document.getElementById(strParentDiv);
        var EditorLeftButton = refLeftButton.current;
        EditorLeftButton.setAttribute("style", "display:flex");
        if (ParentDivID.scrollLeft < 91) {
            ParentDivID.scrollLeft += 91;
        }
        else {
            ParentDivID.scrollLeft += 91;
        }   //each item aprox width

        if (ParentDivID.scrollWidth - ParentDivID.clientWidth - Math.round(ParentDivID.scrollLeft) <= 0) { //scrollwidth is the width of parent which needs to be scrolled minus the viewable width minus the incrementing scrollleft value to reach the end 
            var EditorRightButton = refRightButton.current;
            EditorRightButton.setAttribute("style", "display:none !important");
        }
    }

    return (<div className="slider-officeribbon">
        {/* slidderleft icon start */}
        < span className="arrow arrow-left" style={{ display: "none" }} ref={refLeftButton} onClick={() => { SlidderLeft() }} >
            <img src={ArrowLeftImage} alt="" />
        </span>
        {/* slidderleft icon end */}
        {props.children}
        {/* slidderright icon start */}
        <span className="arrow arrow-right" style={{ display: "none" }}  ref={refRightButton} onClick={() => { SlidderRight() }}>
            <img src={ArrowRightImage} alt="" />
        </span>
        {/* slidderright icon end */}
    </div>);

}


export default forwardRef(Slider);
