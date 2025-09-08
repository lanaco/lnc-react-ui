/* eslint-disable react/display-name */
import { cloneElement, forwardRef, isValidElement } from "react";
import PropTypes from "prop-types";
import { useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import {
  getColorRgbaValue,
  getComponentTypographyCss,
} from "../../_utils/utils";

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
  height: ${(props) =>
    props.theme.components.Progress.default.enabled.sizes[props.size]};
  border-radius: 5px;
  animation: progres 4s infinite linear;
`;

const Progressed = styled.div`
  position: relative;
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
  position: absolute;
  border-radius: ${(props) =>
    props.progressPercentage == 100 ? "5px" : "5px 0px 0px 5px"};
  transition: width 1s cubic-bezier(0.4, 0, 0.2, 1);

  & .progress-icon {
    position: absolute;
    right: 0;
    top: 50%;
    transform: translate(50%, -50%);
  }
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
`;

const ProgressBar = forwardRef((props, ref) => {
  const {
    id = "",
    showLabel = false,
    progressPercentage = 0,
    className = "",
    style = {},
    onChange = () => {},
    size = "small",
    color = "primary",
    progressBarEndComponent,
    ...rest
  } = props;

  const theme = useTheme();

  const clonedProgress = () => {
    if (isValidElement(progressBarEndComponent)) {
      return cloneElement(progressBarEndComponent, {
        className: `progress-icon ${progressBarEndComponent?.props?.className}`,
      });
    }
  };

  return (
    <Bar
      style={style}
      className={"lnc-ui-progress " + className}
      theme={theme}
      size={size}
      showLabel={showLabel}
      progressPercentage={progressPercentage}
      {...rest}
    >
      <Progressed
        progressPercentage={progressPercentage}
        theme={theme}
        color={color}
      >
        {progressBarEndComponent !== null && clonedProgress()}
      </Progressed>
      {showLabel && (
        <Label theme={theme} size={size}>
          {progressPercentage}%
        </Label>
      )}
    </Bar>
  );
});

// ProgressBar.defaultProps = {
//   id: "",
//   showLabel: false,
//   progressPercentage: 0,
//   //------------------
//   onChange: () => {},
//   //------------------
//   className: "",
//   style: {},
//   size: "small",
//   color: "primary",
//   //-------------------
// };

ProgressBar.propTypes = {
  id: PropTypes.any,
  showLabel: PropTypes.bool,
  progressPercentage: PropTypes.number,
  //-------------------------
  onChange: PropTypes.func,
  //-------------------------
  className: PropTypes.string,
  style: PropTypes.object,
  size: PropTypes.oneOf(["small", "medium", "large"]),
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "success",
    "danger",
    "warning",
    "disabled",
    "information",
    "neutral",
    "gray",
  ]),
  progressBarEndComponent: PropTypes.any,
};

export default ProgressBar;
