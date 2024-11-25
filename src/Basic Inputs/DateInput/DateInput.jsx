/* eslint-disable react/display-name */
import { forwardRef } from "react";
import PropTypes from "prop-types";
import { useTheme } from "@emotion/react";
import Icon from "../../General/Icon/Icon";
import { Styled_DatePickerWrapper } from "./styledComponents";
import ReactDatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TextInput from "../TextInput/TextInput";

const DateInput = forwardRef((props) => {
  const {
    size = "small",
    color = "primary",
    className = "",
    style = {},
    disabled,
    readOnly,
    onFocus,
    onBlur,
    // value,
    dateFormat = "yyyy-MM-dd",
    monthsShown = 1,
    selectsRange = false,
    withPortal = false,
    shouldCloseOnOpen,
    showTimeInput = false,
    showTimeSelect = false,
    onChange = () => {},
    ...rest
  } = props;

  const theme = useTheme();

  //=============== RENDER ============================================================

  var themeProps = { theme, size, color, disabled, readOnly };

  return (
    <Styled_DatePickerWrapper
      {...themeProps}
      className={className}
      style={style}
      monthsShown={monthsShown}
      withPortal={withPortal}
    >
      <ReactDatePicker
        {...rest}
        onChange={onChange}
        selectsRange={selectsRange}
        readOnly={readOnly}
        showYearDropdown
        scrollableMonthYearDropdown={true}
        yearDropdownItemNumber={12}
        showMonthDropdown={true}
        showPopperArrow={false}
        dateFormat={dateFormat}
        disabled={disabled}
        showTimeInput={showTimeInput}
        showTimeSelect={showTimeSelect}
        shouldCloseOnSelect={shouldCloseOnOpen}
        customInput={
          <TextInput {...themeProps} prefix={<Icon icon="calendar" />} />
        }
        monthsShown={monthsShown}
        withPortal={withPortal}
        onFocus={(e) => onFocus?.(e)}
        onBlur={() => onBlur?.()}
      />
    </Styled_DatePickerWrapper>
  );
});

// DateInput.defaultProps = {
//   value: "",
//   disabled: false,
//   readOnly: false,
//   dateFormat: "yyyy-MM-dd",
//   tabIndex: 0,
//   monthsShown: 1,
//   withPortal: false,
//   disabled: false,
//   selectsRange: false,
//   shouldCloseOnOpen: false,
//   showTimeInput: false,
//   showTimeSelect: false,
//   //------------------------------
//   onChange: (date) => {},
//   onFocus: () => {},
//   onBlur: () => {},
//   //------------------------------
//   className: "",
//   style: {},
//   size: "small",
//   color: "primary",
// };

DateInput.propTypes = {
  value: PropTypes.string,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  dateFormat: PropTypes.string,
  tabIndex: PropTypes.number,

  monthsShown: PropTypes.number,
  withPortal: PropTypes.bool,
  selectsRange: PropTypes.bool,
  shouldCloseOnOpen: PropTypes.bool,
  showTimeInput: PropTypes.bool,
  showTimeSelect: PropTypes.bool,

  startDate: PropTypes.any,
  endDate: PropTypes.any,
  selected: PropTypes.any,
  locale: PropTypes.string,
  //-----------------------------------------------------------
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  //-----------------------------------------------------------
  className: PropTypes.string,
  style: PropTypes.object,
  size: PropTypes.oneOf(["small", "medium", "large"]),
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "success",
    "danger",
    "warning",
    "information",
    "neutral",
    "gray",
  ]),
};

export default DateInput;
export { registerLocale };
