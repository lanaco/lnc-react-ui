import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import { useTheme } from "@emotion/react";
import { getColorRgbaValue } from "../../_utils/utils";


const StyledNested = styled.div`
    ${props => props.tuckIn == true && "margin-left: 0.3rem;"}
    ${props => props.tuckIn == true && "padding-left: 0.3rem;"}
    ${props => props.tuckIn == true && `border-left: 2px solid ${getColorRgbaValue(
        props.theme,
        "MenuItem",
        props.color,
        "focus",
        "background"
    )};`}
    border-radius: 2px;
`;

const NestedMenuItem = React.forwardRef((props, ref) => {
    const {
        item,
        //------------------
        onItemSelected,
        //--------------------
        tuckIn,
        color,
        size,
        className,
        style,
        __TYPE__,
        children,
        ...rest
    } = props;

    const theme = useTheme();
    const [show, setShow] = useState(false);

    const toggleNested = () => {
        setShow(!show);
    }

    const clonedItem = React.cloneElement(item, { isNested: true, showNested: show, toggleNested: toggleNested, color: color, size: size })

    const clonedChildren = React.Children.map(children, (child, index) => {
        if (React.isValidElement(child)) {
            if (child.props.__TYPE__ == "MENU_ITEM" || child.props.__TYPE__ == "NESTED_ITEM") {
                return React.cloneElement(child, {
                    color: color,
                    size: size,
                    onItemSelected: onItemSelected,
                });
            }
        }
    });

    return <>
    <>
        {clonedItem}
    </>
    {show && <StyledNested theme={theme} tuckIn={tuckIn} color={color} size={size} className={"nested-item-lnc "+className} style={style} ref={ref} {...rest}>{clonedChildren}</StyledNested>}
    </> 
})

NestedMenuItem.defaultProps = {
    tuckIn: true,
    size: "small",
    color: "primary",
    style: {},
    className: "",
    __TYPE__: "NESTED_ITEM",
};

NestedMenuItem.propTypes = {
    item: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
    //--------------------------
    /**
     * Determines wether nested items will be tucked in to the right (using margin-right and padding-left).
     */
    tuckIn: PropTypes.bool,
    className: PropTypes.string,
    style: PropTypes.object,
    color: PropTypes.oneOf([
        "primary",
        "secondary",
        "success",
        "warning",
        "danger",
        "information",
        "neutral"
    ]),
    size: PropTypes.oneOf(["small", "medium", "large"]),
    __TYPE__: PropTypes.string,
};

export default NestedMenuItem;