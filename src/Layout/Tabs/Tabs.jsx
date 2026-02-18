/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import { forwardRef, useState, Children, cloneElement } from "react";
import styled from "@emotion/styled";
import { useTheme } from "@emotion/react";

const TabsStyled = styled.div`
  background: transparent;
  display: flex;
  justify-content: ${(props) => (props.fullWidth ? "space-evenly" : "none")};
  gap: ${(props) => (props.type == "pill" ? "10px" : "0")};
  box-sizing: border-box;
`;

//====================================== PROP TYPES / DEFAULT PROPS ====================================

const Tabs = forwardRef((props, ref) => {
  const {
    type = "regular",
    fullWidth = false,
    //----------------
    className = "",
    style = {},
    color = "primary",
    size = "small",
    children,
    ...rest
  } = props;

  const theme = useTheme();
  const [activeIndex, setActiveIndex] = useState();

  const themeProps = {
    theme,
    color,
    size,
    style,
    className: "lnc-ui-tabs " + className,
  };

  const handleItemClick = (index) => {
    setActiveIndex(index);
  };

  const childrenWithAdjustedProps = Children.map(children, (child, index) =>
    cloneElement(child, {
      type: type,
      first: index == 0,
      last: index == Children.toArray(children).length - 1,
      fullWidth: fullWidth,
      index: index,
      itemClick: handleItemClick,
      activeIndex: activeIndex,
      color: color,
      size: size,
    })
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

// Tabs.defaultProps = {
//   type: "regular",
//   fullWidth: false,
//   //---------------------------------------------------------------
//   style: {},
//   className: "",
//   size: "small",
//   color: "primary",
// };

export default Tabs;
