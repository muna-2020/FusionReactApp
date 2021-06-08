//React imports
import React from 'react';

/**
 * @name WrapperComponent
 * @sumamry Returns a memoized instance of a component
 * */
const WrapperComponent = React.memo((props) => {

    if (global.WrapperComponents == undefined)
        global.WrapperComponents = {};
    let Component = global.WrapperComponents[props.ComponentName];
    if (Component == undefined) {
        Component = props.ParentProps.ComponentController.GetFrameworkComponent(props.ComponentName);
        global.WrapperComponents[props.ComponentName] = Component
    }

    return < Component {...props} />;
}, (prevProps, nextProps) => {
    Object.keys(prevProps).map(prevPropsKey => {
        if (prevProps[prevPropsKey] !== nextProps[prevPropsKey]) {
            console.log('wrapper re render', prevPropsKey);
            console.log("prevProps", prevProps[prevPropsKey]);
            console.log("nextProps", nextProps[prevPropsKey]);
        }
    })
    return prevProps === nextProps;
});

//const WrapperComponent = props => {
//    let Component = props.ParentProps.ComponentController.GetFrameworkComponent(props.ComponentName);
//    return useMemo(() => < Component {...props} />, [props]);
//};

export default WrapperComponent;
