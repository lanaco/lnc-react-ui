/* eslint-disable react/prop-types */
import styled from "@emotion/styled";
import { useTheme } from "@emotion/react";
import PropTypes from "prop-types";
import {
  getBorderRadiusValueWithUnits,
  getColorRgbaValue,
} from "../../_utils/utils";

const Container = styled.div`
  display: inline-flex;
  flex-wrap: wrap;
  width: fit-content;
  border-radius: ${(props) => props.borderRadius};

  & button {
    border: none;
    border-top: ${(props) =>
      "0.0625rem solid " +
      getColorRgbaValue(
        props.theme,
        "ButtonGroup",
        props.color,
        "enabled",
        "border"
      )};

    border-bottom: ${(props) =>
      "0.0625rem  solid " +
      getColorRgbaValue(
        props.theme,
        "ButtonGroup",
        props.color,
        "enabled",
        "border"
      )};
  }

  & button:focus {
    outline: none;
  }

  & button:not(:first-of-type):not(:last-of-type) {
    border-radius: 0;
  }

  & button[data-type="filled"],
  button[data-type="tinted"] {
    border: none;
  }

  & button:first-of-type {
    border-radius: ${(props) =>
      `${props.borderRadius} 0 0 ${props.borderRadius}`};
    border-left: ${(props) =>
      "0.0625rem solid " +
      getColorRgbaValue(
        props.theme,
        "ButtonGroup",
        props.color,
        "enabled",
        "border"
      )};
  }

  & button:last-of-type {
    border-radius: ${(props) =>
      `0 ${props.borderRadius} ${props.borderRadius} 0`};
    border-right: ${(props) =>
      "0.0625rem solid " +
      getColorRgbaValue(
        props.theme,
        "ButtonGroup",
        props.color,
        "enabled",
        "border"
      )};
  }

  & button:first-of-type:not([data-type="filled"]) {
    border-right: ${(props) =>
      "0.0625rem solid " +
      getColorRgbaValue(
        props.theme,
        "ButtonGroup",
        props.color,
        "enabled",
        "border"
      )};
  }

  & button:not(:first-of-type):not(:last-of-type):not([data-type="filled"]) {
    border-right: ${(props) =>
      "0.0625rem solid " +
      getColorRgbaValue(
        props.theme,
        "ButtonGroup",
        props.color,
        "enabled",
        "border"
      )};
  }
`;

const ButtonGroup = ({
  children,
  borderRadius = "regular",
  style = {},
  className = "",
}) => {
  const theme = useTheme();

  return (
    <Container
      borderRadius={getBorderRadiusValueWithUnits(theme, borderRadius)}
      theme={theme}
      style={style}
      className={"lnc-ui-button-group " + className}
    >
      {children}
    </Container>
  );
};

// ButtonGroup.defaultProps = {
//   borderRadius: "regular",
//   className: "",
//   style: {},
// };

ButtonGroup.propTypes = {
  borderRadius: PropTypes.oneOf([
    "slight",
    "regular",
    "edged",
    "curved",
    "none",
  ]),
  className: PropTypes.string,
  style: PropTypes.object,
};

export default ButtonGroup;
