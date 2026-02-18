/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import { forwardRef } from "react";
import styled from "@emotion/styled";
import { useTheme } from "@emotion/react";
import {
  getColorRgbaValue,
  getComponentTypographyCss,
} from "../../_utils/utils";
import { useState } from "react";
import Icon from "../../General/Icon/Icon";

const StyledBreadcrumbs = styled.div`
  display: inline-flex;
  flex-wrap: wrap;
  ${(props) =>
    getComponentTypographyCss(
      props.theme,
      "Breadcrumbs",
      props.size,
      "enabled",
    )};
  color: ${(props) =>
    getColorRgbaValue(
      props.theme,
      "Breadcrumbs",
      props.color,
      "enabled",
      "text",
    )};
`;

const StyledCollapse = styled.div`
  cursor: pointer;
`;

const BreadcrumbItem = styled.span``;

const Breadcrumbs = forwardRef((props, ref) => {
  const {
    separator = "/",
    maxItems = 8,
    itemsAfterCollapse = 1,
    itemsBeforeCollapse = 1,
    //----------------
    className = "",
    style = {},
    color = "neutral",
    size = "small",
    children,
    ...rest
  } = props;

  const theme = useTheme();

  const themeProps = {
    theme,
    size,
    color,
    className: "lnc-ui-breadcrumbs " + className,
    style,
  };

  const [collapse, setCollapse] = useState(true);

  const Items = ({
    maxItems,
    itemsAfterCollapse,
    itemsBeforeCollapse,
    children,
  }) => {
    if (typeof children?.map !== "function")
      return (
        <Item
          index={0}
          length={children.length}
          separator={separator}
          child={children}
        />
      );

    return children?.map((child, index) =>
      maxItems <= children.length && collapse == true ? (
        itemsBeforeCollapse - 1 >= index ||
        children.length - itemsAfterCollapse <= index ? (
          <Item
            key={index}
            index={index}
            length={children.length}
            separator={separator}
            child={child}
          />
        ) : (
          itemsBeforeCollapse == index && (
            <StyledCollapse key={index} onClick={() => setCollapse(!collapse)}>
              <Icon icon="ellipsis" />
              {separator}&nbsp;
            </StyledCollapse>
          )
        )
      ) : (
        <Item
          key={index}
          index={index}
          length={children.length}
          separator={separator}
          child={child}
        />
      ),
    );
  };

  const Item = ({ index, length, separator, child }) => {
    return (
      <BreadcrumbItem>
        {child}
        {index + 1 !== length && <>&nbsp;{separator}&nbsp;</>}
      </BreadcrumbItem>
    );
  };

  return (
    <StyledBreadcrumbs ref={ref} {...themeProps} {...rest}>
      <Items
        maxItems={maxItems}
        itemsAfterCollapse={itemsAfterCollapse}
        itemsBeforeCollapse={itemsBeforeCollapse}
      >
        {children}
      </Items>
    </StyledBreadcrumbs>
  );
});

// Breadcrumbs.defaultProps = {
//   maxItems: 8,
//   itemsAfterCollapse: 1,
//   itemsBeforeCollapse: 1,
//   separator: "/",
//   //-------------------------
//   style: {},
//   color: "neutral",
//   size: "small",
// };

export default Breadcrumbs;
