import React, { useRef } from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import { useTheme } from "@emotion/react";
import { getColorRgbaValue, getComponentTypographyCss } from "../../_utils/utils";
import { useState } from "react";
import Icon from "../../General/Icon";

const StyledBreadcrumbs = styled.div`
  display: inline-flex;
  flex-wrap: wrap;
  ${(props) =>
    getComponentTypographyCss(
      props.theme,
      "Breadcrumbs",
      props.size,
      "enabled"
    )};
  color: ${(props) =>
    getColorRgbaValue(
      props.theme,
      "Breadcrumbs",
      props.color,
      "enabled",
      "text"
    )};
`;

const StyledCollapse = styled.div`
  cursor: pointer;
`;

const BreadcrumbItem = styled.span``;

const Breadcrumbs = React.forwardRef((props, ref) => {
  const {
    separator,
    maxItems,
    itemsAfterCollapse,
    itemsBeforeCollapse,
    //----------------
    className,
    style,
    color,
    size,
    children,
    ...rest
  } = props;

  const theme = useTheme();

  const themeProps = { theme, size, color, className, style };

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
            <StyledCollapse key={index} onClick={(e) => setCollapse(!collapse)}>
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
      )
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

Breadcrumbs.defaultProps = {
  maxItems: 8,
  itemsAfterCollapse: 1,
  itemsBeforeCollapse: 1,
  separator: "/",
  //-------------------------
  style: {},
  color: "neutral",
  size: "small",
};

Breadcrumbs.propTypes = {
  separator: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  /**
   * Specifies the maximum number of breadcrumbs to display. When there are more than the maximum number, only the first itemsBeforeCollapse and last itemsAfterCollapse will be shown, with an ellipsis in between
   */
  maxItems: PropTypes.number,
  /**
   * If max items is exceeded, the number of items to show after the ellipsis.
   */
  itemsAfterCollapse: PropTypes.number,
  /**
   * If max items is exceeded, the number of items to show before the ellipsis.
   */
  itemsBeforeCollapse: PropTypes.number,
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
  ]),
  size: PropTypes.oneOf(["small", "medium", "large"]),
};

export default Breadcrumbs;
