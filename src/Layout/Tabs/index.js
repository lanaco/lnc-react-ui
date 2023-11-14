import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import { useTheme } from "@emotion/react";

const TabsStyled = styled.div`
  background: transparent;
  display: flex;
  justify-content: ${props => props.fullWidth ? 'space-evenly' : 'none'};
  gap: ${props => props.type == "pill" ? '10px' : '0'};
  box-sizing: border-box;
`;

//====================================== PROP TYPES / DEFAULT PROPS ====================================

const Tabs = React.forwardRef((props, ref) => {
  const {
    type,
    fullWidth,
    //----------------
    className,
    style,
    color,
    size,
    children,
    ...rest
  } = props;

  const theme = useTheme();
  const [activeIndex, setActiveIndex] = useState();

  const themeProps = { theme, color, size, style, className };

  const onItemClick = (index) => {
     setActiveIndex(index);
  }

  const childrenWithAdjustedProps = React.Children.map(children, (child, index) =>
    React.cloneElement(child, { type: type, first: index == 0, last: index == React.Children.toArray(children).length - 1, fullWidth: fullWidth, index: index, onItemClick: onItemClick, activeIndex: activeIndex, color: color, size: size, fullWidth: fullWidth })
  );

  return (
    <TabsStyled
      ref={ref}
      type={type}
      fullWidth={fullWidth}
      {...themeProps}
      {...rest}
    >
      {childrenWithAdjustedProps}
    </TabsStyled>
  );
});

Tabs.defaultProps = {
  type: "regular",
  fullWidth: false,
  //---------------------------------------------------------------
  style: {},
  className: "",
  size: "small",
  color: "primary",
};

Tabs.propTypes = {
  type: PropTypes.oneOf(["regular", "pill", "underline"]),
  fullWidth: PropTypes.bool,
  //---------------------------------------------------------------
  className: PropTypes.string,
  style: PropTypes.object,
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "success",
    "warning",
    "danger",
    "information",
    "neutral",
    "gray"
  ]),
  size: PropTypes.oneOf(["small", "medium", "large"]),
};

export default Tabs;
