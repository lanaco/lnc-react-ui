/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import { useCallback, useEffect, useRef, useState, forwardRef } from "react";
import styled from "@emotion/styled";
import { useTheme } from "@emotion/react";
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
    pointer-events: all;
  }

  /* For Firefox browsers */
  & > .thumb::-moz-range-thumb {
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
    background-color: ${(props) =>
      getColorRgbaValue(
        props.theme,
        "Range",
        props.color,
        "enabled",
        "unfilled"
      )};
    width: 100%;
    z-index: 1;
    border-radius: ${(props) =>
      getBorderRadiusValueWithUnits(props.theme, "regular")};
  }

  & > .slider__range {
    border-radius: ${(props) =>
      getBorderRadiusValueWithUnits(props.theme, "regular")};
    background-color: ${(props) =>
      getColorRgbaValue(
        props.theme,
        "Range",
        props.color,
        props.disabled === true ? "disabled" : "enabled",
        "background"
      )};
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
  top: ${(props) => "calc(-" + ThumbSize[props.size] + ")"};
  transform: translateX(-50%);
  ${(props) =>
    getComponentTypographyCss(props.theme, "Range", props.size, "enabled")};
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
        background-color: ${(props) =>
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

const DoubleRangeSlider = forwardRef((props, ref) => {
  const {
    minValue = null,
    maxValue = null,
    min = 0,
    max = 100,
    disabled = false,
    onChange = () => {},
    color = "primary",
    size = "small",
    ...rest
  } = props;
  const theme = useTheme();
  const themeProps = { theme, size, color };

  const [showPopover, setShowPopover] = useState();

  const [minVal, setMinVal] = useState(minValue);
  const [maxVal, setMaxVal] = useState(maxValue);
  useEffect(() => {
    setMinVal(minValue);
    setMaxVal(maxValue);
  }, [minValue, maxValue]);
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
          <Popover
            {...themeProps}
            inputValue={getPercent(minVal)}
            disabled={disabled}
          >
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
          <Popover
            {...themeProps}
            inputValue={getPercent(maxVal)}
            disabled={disabled}
          >
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
        value={minVal | ""}
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
        value={maxVal | ""}
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

// DoubleRangeSlider.defaultProps = {
//   minValue: null,
//   maxValue: null,
//   min: 0,
//   max: 100,
//   disabled: false,
//   //------------------
//   onChange: () => {},
//   //------------------
//   className: "",
//   style: {},
//   size: "small",
//   color: "primary",
// };

export default DoubleRangeSlider;
