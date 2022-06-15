import { useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import PropTypes from "prop-types";
import React, { useCallback, useEffect, useState } from "react";

const standardCssFields = ({ theme, size }) => {
  var height = { small: "1.875rem", medium: "2.25rem", large: "2.625rem" }[
    size
  ];

  return `
    font-family: ${theme.typography.fontFamily};
    font-size: ${theme.typography[size].fontSize};
    min-height: ${height};
    max-height: ${height};
  `;
};

const StyledRangeSlider = styled.div`
  position: relative;
  ${(props) => standardCssFields(props)};
  display: flex;
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

  &::-webkit-slider-thumb {
    -webkit-appearance: none; /* Override default look */
    appearance: none;
    width: ${(props) =>
      props.theme.typography[props.size]
        .thumb}; /* Set a specific slider handle width */
    height: ${(props) =>
      props.theme.typography[props.size].thumb}; /* Slider handle height */
    border-radius: 50%;
    background: ${(props) =>
      props.disabled
        ? props.theme.test_palette["disabled"][500]
        : props.theme.test_palette[props.color][400]};
    cursor: pointer; /* Cursor on hover */
    border: none;
  }

  &::-moz-range-thumb {
    width: ${(props) =>
      props.theme.typography[props.size]
        .thumb}; /* Set a specific slider handle width */
    height: ${(props) =>
      props.theme.typography[props.size].thumb}; /* Slider handle height */
    border-radius: 50%;
    background: ${(props) =>
      props.disabled
        ? props.theme.test_palette["disabled"][500]
        : props.theme.test_palette[props.color][400]};
    cursor: pointer; /* Cursor on hover */
    border: none;
  }
`;

const Popover = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  left: ${(props) =>
    `calc(${props.inputValue + "%"} + (${8 - props.inputValue * 0.15}px))`};
  top: ${(props) => "-" + props.theme.typography[props.size].thumb};
  transform: translateX(-50%);
  & > .text-content {
    color: white;
    background-color: ${(props) => props.theme.test_palette[props.color][400]};
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
        background: ${(props) => props.theme.test_palette[props.color][400]};
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

const RangeSlider = React.forwardRef((props, ref) => {
  const { value, min, max, disabled, onChange, onInput, color, size, ...rest } =
    props;
  const theme = useTheme();
  const themeProps = { theme, size, color };

  const sliderColor = theme.test_palette["disabled"][400];
  const [rangeBackground, setRangeBackground] = useState();

  const [showPopover, setShowPopover] = useState();

  // Convert to percentage
  const getPercent = useCallback(
    (value) => Math.round(((value - min) / (max - min)) * 100),
    [min, max]
  );

  const [inputValue, setInputValue] = useState(value);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  useEffect(() => {
    changeSliderColor(inputValue);
  }, [inputValue, getPercent, disabled]);

  useEffect(() => {
    changeSliderColor(0);
  }, [color]);

  const handleOnInput = (e) => {
    changeSliderColor(e.target.value);

    if (onInput) onInput(e);
  };

  const changeSliderColor = (sliderValue) => {
    let valueColor = disabled
      ? theme.test_palette["disabled"][500]
      : theme.test_palette[color][400];
    setRangeBackground(
      `linear-gradient(to right, ${valueColor} 0%, ${valueColor} ${getPercent(
        sliderValue
      )}%, ${sliderColor} ${getPercent(sliderValue)}%, ${sliderColor} 100%)`
    );
  };

  const handleOnChange = (e) => {
    setInputValue(e.target.value);

    if (onChange) onChange(e.target.value);
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
      <InputSlider
        id="fader"
        type="range"
        min={min}
        max={max}
        value={inputValue}
        disabled={disabled}
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
      ></InputSlider>
    </StyledRangeSlider>
  );
});

RangeSlider.defaultProps = {
  value: null,
  min: 0,
  max: 100,
  disabled: false,
  //------------------
  onChange: (value) => {},
  onInput: (e) => {},
  //------------------
  className: "",
  style: {},
  size: "small",
  color: "primary",
};

RangeSlider.propTypes = {
  value: PropTypes.number,
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  disabled: PropTypes.bool,
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
  ]),
};

export default RangeSlider;
