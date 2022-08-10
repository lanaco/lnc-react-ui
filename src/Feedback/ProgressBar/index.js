import React from "react";
import PropTypes from "prop-types";
import { useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import { getColorRgbaValue, getComponentTypographyCss } from "../../_utils/utils";

const Bar = styled.div`
  width: 100%;
  position: relative;
  background-color: ${(props) =>
    getColorRgbaValue(
      props.theme,
      "Progress",
      props.color,
      "enabled",
      "unfilled"
    )};
  height: ${(props) => (props.showLabel ? "1.375rem" : "0.625rem")};
  border-radius: 5px;
  animation: progres 4s infinite linear;
`;

const Progressed = styled.div`
  height: 100%;
  width: ${(props) => props.progressPercentage + "%"};
  background-color: ${(props) =>
    getColorRgbaValue(
      props.theme,
      "Progress",
      props.color,
      "enabled",
      "background"
    )};
  position absolute;
  border-radius: ${(props) =>
    props.progressPercentage == 100 ? "5px" : "5px 0px 0px 5px"};
  
  -webkit-transition: width 1s cubic-bezier(0.4, 0, 0.2, 1);
  -moz-transition: width 1s cubic-bezier(0.4, 0, 0.2, 1);
  -o-transition: width 1s cubic-bezier(0.4, 0, 0.2, 1);
  transition: width 1s cubic-bezier(0.4, 0, 0.2, 1);
`;

const Label = styled.label`
  ${(props) =>
    getComponentTypographyCss(props.theme, "Progress", props.size, "enabled")};
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: ${(props) =>
    getColorRgbaValue(props.theme, "Progress", props.color, "enabled", "text")};
  font-size: 0.875rem;
`;

const ProgressBar = React.forwardRef((props, ref) => {
  const {
    id,
    showLabel,
    progressPercentage,
    className,
    style,
    onChange,
    color,
    ...rest
  } = props;

  const theme = useTheme();

  return (
    <Bar theme={theme} showLabel={showLabel} {...rest}>
      <Progressed
        progressPercentage={progressPercentage}
        theme={theme}
        color={color}
      />
      {showLabel && <Label theme={theme} size={"small"}>{progressPercentage}%</Label>}
    </Bar>
  );
});

ProgressBar.defaultProps = {
  id: "",
  showLabel: false,
  progressPercentage: 0,
  //------------------
  onChange: () => {},
  //------------------
  className: "",
  style: {},
  color: "primary",
  //-------------------
};

ProgressBar.propTypes = {
  id: PropTypes.string.isRequired,
  showLabel: PropTypes.bool,
  progressPercentage: PropTypes.number,
  //-------------------------
  onChange: PropTypes.func,
  //-------------------------
  className: PropTypes.string,
  style: PropTypes.object,
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "success",
    "danger",
    "warning",
    "disabled",
    "info",
  ]),
};

export default ProgressBar;
