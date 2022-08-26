import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import { useTheme } from "@emotion/react";
import { getColorRgbaValue } from "../../_utils/utils";


const StyledNested = styled.div`
    margin-left: 0.3rem;
    padding-left: 0.3rem;
    border-left: ${props => `2px solid ${getColorRgbaValue(
        props.theme,
        "DropDownMenuItem",
        props.color,
        "focus",
        "backgoround"
    )}`};
    border-radius: 2px;
`;

const NestedDropdownItem = React.forwardRef((props, ref) => {
    const {
        item,
        //------------------
        onItemSelected,
        //--------------------
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
            if (child.props.__TYPE__ == "TAB_ITEM" || child.props.__TYPE__ == "NESTED_ITEM") {
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
    {show && <StyledNested theme={theme} color={color} size={size} className={className} style={style} {...rest}>{clonedChildren}</StyledNested>}
    </> 
})

NestedDropdownItem.defaultProps = {
    size: "small",
    color: "primary",
    style: {},
    className: "",
    __TYPE__: "NESTED_ITEM",
};

NestedDropdownItem.propTypes = {
    item: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
    //--------------------------
    className: PropTypes.string,
    style: PropTypes.object,
    color: PropTypes.oneOf([
        "primary",
        "secondary",
        "success",
        "warning",
        "danger",
        "information",
    ]),
    size: PropTypes.oneOf(["small", "medium", "large"]),
    __TYPE__: PropTypes.string,
};

export default NestedDropdownItem;