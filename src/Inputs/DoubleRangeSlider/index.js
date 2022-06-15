import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "@emotion/styled";
import PropTypes from "prop-types";
import { useTheme } from "@emotion/react";

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

const StyledDoubleRangeSlider = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  ${(props) => standardCssFields(props)};

  /* Removing the default appearance */
  & > :is(.thumb, .thumb::-webkit-slider-thumb) {
    -webkit-appearance: none;
    -webkit-tap-highlight-color: transparent;
  }

  & > .thumb {
    pointer-events: none;
    position: absolute;
    height: 0;
    width: 100%;
    outline: none;
  }

  & > .thumb--left {
    z-index: 3;
  }

  & > .thumb--right {
    z-index: 4;
  }

  /* For Chrome browsers */
  & > .thumb::-webkit-slider-thumb {
    -webkit-appearance: none; /* Override default look */
    appearance: none;
    width: ${props =>  props.theme.typography[props.size].thumb}; /* Set a specific slider handle width */
    height: ${props =>  props.theme.typography[props.size].thumb}; /* Slider handle height */
    border-radius: 50%;
    background: ${(props) => props.disabled ? props.theme.test_palette["disabled"][500] : props.theme.test_palette[props.color][400]};
    cursor: pointer; /* Cursor on hover */
    border: none;
    pointer-events: all;
  }

  /* For Firefox browsers */
  & > .thumb::-moz-range-thumb {
    width: ${props =>  props.theme.typography[props.size].thumb}; /* Set a specific slider handle width */
    height: ${props =>  props.theme.typography[props.size].thumb}; /* Slider handle height */
    border-radius: 50%;
    background: ${(props) => props.disabled ? props.theme.test_palette["disabled"][500] : props.theme.test_palette[props.color][400]};
    cursor: pointer; /* Cursor on hover */
    border: none;
    pointer-events: all;
  }
`;

const Slider = styled.div`
  position: relative;
  width: 100%;
  height: 0.25rem;
  &
    > :is(.slider__track, .slider__range, .slider__left-value, .slider__right-value) {
    position: absolute;
  }

  & > :is(.slider__track, .slider__range) {
    height: 0.25rem; 
  }

  & > .slider__track {
    background-color: ${(props) => props.theme.test_palette["disabled"][400]};
    width: 100%;
    z-index: 1;
  }

  & > .slider__range {
    background-color: ${(props) => props.disabled ? props.theme.test_palette["disabled"][500] : props.theme.test_palette[props.color][400]};
    z-index: 2;
  }
`;

const Popover = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  left: ${(props) =>
    `calc(${props.inputValue + "%"} + (${8 - props.inputValue * 0.15}px))`};
  top: ${props =>  "-" + props.theme.typography[props.size].thumb};
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

const DoubleRangeSlider = React.forwardRef((props, ref) => {
  const { minValue, maxValue, min, max, disabled, onChange, color, size, ...rest } = props;
  const theme = useTheme();
  const themeProps = { theme, size, color };

  const [showPopover, setShowPopover] = useState();

  const [minVal, setMinVal] = useState(minValue);
  const [maxVal, setMaxVal] = useState(maxValue);
  useEffect(() => {
      setMinVal(minValue);
      setMaxVal(maxValue);
  }, [minValue, maxValue])
  const range = useRef(null);

  // Convert to percentage
  const getPercent = useCallback(
    (value) => Math.round(((value - min) / (max - min)) * 100),
    [min, max]
  );

  // Set width of the range to decrease from the left side
  useEffect(() => {
    const minPercent = getPercent(minVal);
    const maxPercent = getPercent(maxVal);

    if (range.current) {
      range.current.style.left = `${minPercent}%`;
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [minVal, getPercent]);

  // Set width of the range to decrease from the right side
  useEffect(() => {
    const minPercent = getPercent(minVal);
    const maxPercent = getPercent(maxVal);

    if (range.current) {
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [maxVal, getPercent]);

  // Get min and max values when their state changes
  useEffect(() => {
    onChange({ min: minVal, max: maxVal });
  }, [minVal, maxVal, onChange]);

  return (
    <StyledDoubleRangeSlider disabled={disabled} {...themeProps} {...rest}>
      {showPopover && minVal && (
        <>
          <Popover {...themeProps} inputValue={getPercent(minVal)}>
            <div className="text-content">{minVal}</div>
            <div className="arrow">
              <div className="outer">
                <div className="inner"></div>
              </div>
            </div>
          </Popover>
        </>
      )}
      {showPopover && maxVal && (
        <>
          <Popover {...themeProps} inputValue={getPercent(maxVal)}>
            <div className="text-content">{maxVal}</div>
            <div className="arrow">
              <div className="outer">
                <div className="inner"></div>
              </div>
            </div>
          </Popover>
        </>
      )}

      <input
        type="range"
        min={min}
        max={max}
        value={minVal}
        onChange={(event) => {
          const value = Math.min(Number(event.target.value), maxVal - 1);
          setMinVal(value);
        }}
        className="thumb thumb--left"
        style={{ zIndex: minVal > max - 100 && "5" }}
        onMouseEnter={() => {
          setShowPopover(true);
        }}
        onMouseLeave={() => {
          setShowPopover(false);
        }}
      />
      <input
        type="range"
        min={min}
        max={max}
        value={maxVal}
        onChange={(event) => {
          const value = Math.max(Number(event.target.value), minVal + 1);
          setMaxVal(value);
        }}
        className="thumb thumb--right"
        onMouseEnter={() => {
          setShowPopover(true);
        }}
        onMouseLeave={() => {
          setShowPopover(false);
        }}
      />

      <Slider {...themeProps} disabled={disabled}>
        <div className="slider__track" />
        <div ref={range} className="slider__range" />
      </Slider>
    </StyledDoubleRangeSlider>
  );
});

DoubleRangeSlider.defaultProps = {
  minValue: 10,
  maxValue: 20,
  min: 0,
  max: 100,
  disabled: false,
  //------------------
  onChange: () => {},
  //------------------
  className: "",
  style: {},
  size: "small",
  color: "primary",
};

DoubleRangeSlider.propTypes = {
  minValue: PropTypes.number,
  maxValue: PropTypes.number,
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  disabled: PropTypes.bool,
  //-----------------------------
  onChange: PropTypes.func.isRequired,
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

export default DoubleRangeSlider;
