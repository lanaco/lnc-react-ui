import React from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import { useTheme } from "@emotion/react";
import "../../Base/fontawesome/css/fontawesome.css";
import {
  getBorderRadiusValueWithUnits,
  getColorRgbaValue,
  getDisabledStateCss,
  getSizeValueWithUnits,
} from "../../_utils/utils";
import Icon from "../Icon";

const StyledAvatar = styled.div`
  border-radius: ${(props) =>
    getBorderRadiusValueWithUnits(props.theme, "curved")};
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${(props) =>
    props.sizeInUnits
      ? props.sizeInUnits
      : getSizeValueWithUnits(props.theme, props.size)};
  width: ${(props) =>
    props.sizeInUnits
      ? props.sizeInUnits
      : getSizeValueWithUnits(props.theme, props.size)};
  ${(props) => props.disabled && getDisabledStateCss(props.theme)};
  background-color: ${(props) =>
    !props.disabled &&
    getColorRgbaValue(props.theme, "Chip", props.color, "enabled", "text")};
  overflow: hidden;
  & img {
    height: ${(props) =>
      props.sizeInUnits
        ? props.sizeInUnits
        : getSizeValueWithUnits(props.theme, props.size)};
    width: ${(props) =>
      props.sizeInUnits
        ? props.sizeInUnits
        : getSizeValueWithUnits(props.theme, props.size)};
  }
`;

const Avatar = React.forwardRef((props, ref) => {
  const {
    image,
    icon,
    tabIndex,
    sizeInUnits,
    disabled,
    //----------------
    onFocus,
    onBlur,
    onClick,
    //----------------
    className,
    style,
    color,
    size,
    ...rest
  } = props;

  const theme = useTheme();

  const themeProps = { theme, color, style, size, sizeInUnits, className };

  return (
    <StyledAvatar
      ref={ref}
      {...themeProps}
      onClick={onClick}
      onFocus={onFocus}
      onBlur={onBlur}
      {...rest}
    >
      {image ? <img src={image} /> : <Icon icon={icon} size={size} sizeInUnits={sizeInUnits ? `calc(${sizeInUnits} / 2)` : null}/>}
    </StyledAvatar>
  );
});

Avatar.defaultProps = {
  icon: "user",
  disabled: false,
  //-------------------------
  onBlur: () => {},
  onFocus: () => {},
  onClick: () => {},
  //-------------------------
  style: {},
  color: "primary",
  size: "small",
};

Avatar.propTypes = {
  image: PropTypes.string,
  /**
   * If `image` is not defined, icon can be used.
   */
  icon: PropTypes.string,
  tabIndex: PropTypes.number,
  /**
   * it has higher priority than `size` prop
   */
  sizeInUnits: PropTypes.string,
  disabled: PropTypes.bool,
  //---------------------------------------------------------------
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  onClick: PropTypes.func,
  //---------------------------------------------------------------
  className: PropTypes.string,
  style: PropTypes.object,
  size: PropTypes.oneOf(["small", "medium", "large"]),
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "success",
    "warning",
    "danger",
    "information",
  ]),
};

export default Avatar;
