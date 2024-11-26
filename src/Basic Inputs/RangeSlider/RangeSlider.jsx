/* eslint-disable react/display-name */
import { useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import PropTypes from "prop-types";
import { useCallback, useEffect, useState, useRef, forwardRef } from "react";
import { useUpdateEffect } from "react-use";
import {
  getBorderRadiusValueWithUnits,
  getColorRgbaValue,
  getComponentTypographyCss,
  getSizeValueWithUnits,
} from "../../_utils/utils";

const standardCssFields = ({ theme, size }) => {
  var height = getSizeValueWithUnits(theme, size);

  return `
    min-height: ${height};
    max-height: ${height};
  `;
};

const ThumbSize = {
  small: "0.875rem",
  medium: "1.125rem",
  large: "1.375rem",
};

const StyledRangeSlider = styled.div`
  position: relative;
  ${(props) => standardCssFields(props)};
  display: inline-flex;
  align-items: center;
`;

const InputSlider = styled.input`
  -webkit-appearance: none; /* Override default CSS styles */
  appearance: none;
  width: 100%; /* Full-width */
  height: 0.25rem; /* Specified height */
  border-radius: 3px;
  outline: none; /* Remove outline */
  -webkit-transition: 0.2s; /* 0.2 seconds transition on hover */
  background: ${(props) => props.rangeBackground};
  transition: background 450ms ease-in;
  -webkit-appearance: none;
  border-radius: ${(props) =>
    getBorderRadiusValueWithUnits(props.theme, "regular")};
  &::-webkit-slider-thumb {
    -webkit-appearance: none; /* Override default look */
    appearance: none;
    width: ${(props) =>
      ThumbSize[props.size]}; /* Set a specific slider handle width */
    height: ${(props) => ThumbSize[props.size]}; /* Slider handle height */
    border-radius: 50%;
    background-color: ${(props) =>
      getColorRgbaValue(
        props.theme,
        "Range",
        props.color,
        props.disabled === true ? "disabled" : "enabled",
        "background"
      )};
    cursor: pointer; /* Cursor on hover */
    border: none;
  }
  &::-moz-range-thumb {
    width: ${(props) =>
      ThumbSize[props.size]}; /* Set a specific slider handle width */
    height: ${(props) => ThumbSize[props.size]}; /* Slider handle height */
    border-radius: 50%;
    background-color: ${(props) =>
      getColorRgbaValue(
        props.theme,
        "Range",
        props.color,
        props.disabled === true ? "disabled" : "enabled",
        "background"
      )};
    cursor: pointer; /* Cursor on hover */
    border: none;
  }
`;

const Popover = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  ${(props) =>
    getComponentTypographyCss(props.theme, "Range", props.size, "enabled")};
  left: ${(props) =>
    `calc(${props.inputValue + "%"} + (${8 - props.inputValue * 0.15}px))`};
  top: ${(props) => "calc(-" + ThumbSize[props.size] + ")"};
  transform: translateX(-50%);
  & > .text-content {
    color: white;
    background-color: ${(props) =>
      getColorRgbaValue(
        props.theme,
        "Range",
        props.color,
        props.disabled === true ? "disabled" : "enabled",
        "background"
      )};
    border-radius: 3px;
    z-index: 2;
    padding: 2px 6px;
  }
  & > .arrow {
    & > .outer {
      height: 4px;
      position: relative;
      & > .inner {
        width: 8px;
        height: 8px;
        background: ${(props) =>
          getColorRgbaValue(
            props.theme,
            "Range",
            props.color,
            props.disabled === true ? "disabled" : "enabled",
            "background"
          )};
        transform: rotate(45deg);
        position: absolute;
        top: -6px;
        left: -4px;
        z-index: 1;
        border-radius: 1px;
      }
    }
  }
`;

const RangeSliderInput = forwardRef((props, ref) => {
  const {
    defaultValue,
    value = null,
    min = 0,
    max = 100,
    disabled,
    tabIndex = 0,
    onChange = () => {},
    onInput = () => {},
    color = "primary",
    size = "small",
    className = "",
    style = {},
    ...rest
  } = props;

  const rangeRef = useRef();

  const theme = useTheme();
  const themeProps = { theme, size, color, className, style };

  const sliderColor = getColorRgbaValue(
    theme,
    "Range",
    color,
    "enabled",
    "unfilled"
  );
  const [valueColor, setValueColor] = useState(
    getColorRgbaValue(
      theme,
      "Range",
      color,
      disabled ? "disabled" : "enabled",
      "background"
    )
  );
  const [rangeBackground, setRangeBackground] = useState();

  const [showPopover, setShowPopover] = useState();

  // Convert to percentage
  const getPercent = useCallback(
    (value) => Math.round(((value - min) / (max - min)) * 100),
    [min, max]
  );

  const [inputValue, setInputValue] = useState(value ? value : defaultValue);

  useUpdateEffect(() => {
    setInputValue(value);
  }, [value]);

  useEffect(() => {
    changeSliderColor(inputValue ? inputValue : 0);
  }, [inputValue, getPercent, disabled, color]);

  useEffect(() => {
    setValueColor(
      getColorRgbaValue(
        theme,
        "Range",
        color,
        disabled ? "disabled" : "enabled",
        "background"
      )
    );
  }, [color, disabled]);

  const handleOnInput = (e) => {
    changeSliderColor(e.target.value);

    if (onInput) onInput(e);
  };

  const changeSliderColor = (sliderValue) => {
    setRangeBackground(
      `linear-gradient(to right, ${valueColor} 0%, ${valueColor} ${getPercent(
        sliderValue
      )}%, ${sliderColor} ${getPercent(sliderValue)}%, ${sliderColor} 100%)`
    );
  };

  const handleOnChange = (e) => {
    setInputValue(e.target.value);

    if (onChange) onChange(e);
  };
  return (
    <StyledRangeSlider {...themeProps}>
      {showPopover && inputValue && (
        <>
          <Popover {...themeProps} inputValue={getPercent(inputValue)}>
            <div className="text-content">{inputValue}</div>
            <div className="arrow">
              <div className="outer">
                <div className="inner"></div>
              </div>
            </div>
          </Popover>
        </>
      )}
      {value == null || value == "undefined" ? (
        <InputSlider
          ref={ref ? ref : rangeRef}
          id="fader"
          type="range"
          min={min}
          max={max}
          defaultValue={defaultValue}
          disabled={disabled}
          tabIndex={tabIndex}
          onMouseEnter={() => {
            setShowPopover(true);
          }}
          onMouseLeave={() => {
            setShowPopover(false);
          }}
          rangeBackground={rangeBackground}
          onInput={handleOnInput}
          onChange={handleOnChange}
          {...themeProps}
          {...rest}
        />
      ) : (
        <InputSlider
          ref={ref ? ref : rangeRef}
          id="fader"
          type="range"
          min={min}
          max={max}
          value={inputValue}
          disabled={disabled}
          tabIndex={tabIndex}
          onMouseEnter={() => {
            setShowPopover(true);
          }}
          onMouseLeave={() => {
            setShowPopover(false);
          }}
          rangeBackground={rangeBackground}
          onInput={handleOnInput}
          onChange={handleOnChange}
          {...themeProps}
          {...rest}
        />
      )}
    </StyledRangeSlider>
  );
});

// RangeSliderInput.defaultProps = {
//   value: null,
//   min: 0,
//   max: 100,
//   disabled: false,
//   tabIndex: 0,
//   //------------------
//   onChange: (value) => {},
//   onInput: (e) => {},
//   //------------------
//   className: "",
//   style: {},
//   size: "small",
//   color: "primary",
// };

RangeSliderInput.propTypes = {
  value: PropTypes.number,
  defaultValue: PropTypes.number,
  min: PropTypes.number,
  max: PropTypes.number,
  disabled: PropTypes.bool,
  tabIndex: PropTypes.number,
  //-------------------------
  onChange: PropTypes.func,
  onInput: PropTypes.func,
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
};

export default RangeSliderInput;
