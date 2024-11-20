import PropTypes from "prop-types";
import React, { useCallback } from "react";
import customStyles from "../Dropdown/CustomStyles";
import { useTheme } from "@emotion/react";
import debounce from "lodash.debounce";
import Dropdown from "../Dropdown/Dropdown";

const MultiSelectDropdown = React.forwardRef((props, ref) => {
  const {
    // options,
    styles,
    debounceTime = 180,
    // name,
    // hideSelectedOptions,
    // id,
    // inputId,
    // value,
    // readOnly,
    // tabIndex,
    isSearchable = true,
    isClearable = true,
    // isLoading,
    // isRtl,
    // isDisabled,
    // closeMenuOnSelect,
    // closeMenuOnScroll,
    // escapeClearsValue,
    // filterOption,
    // formatGroupLabel,
    // formatOptionLabel,
    // getOptionLabel,
    // getOptionValue,
    // isOptionDisabled,
    // isOptionSelected,
    // loadingMessage,
    // minMenuHeight,
    // maxMenuHeight,
    // menuPlacement,
    // menuPosition,
    // menuShouldBlockScroll,
    // menuShouldScrollIntoView,
    // openMenuOnFocus,
    // openMenuOnClick,
    // autoFocus,
    // placeholder,
    // noOptionsMessage,
    // menuIsOpen,
    // components,
    // defaultValue,
    // defaultInputValue,
    // defaultMenuIsOpen,
    // delimiter,
    // onChange,
    onInputChange,
    // onMenuOpen,
    // onMenuClose,
    // onBlur,
    // onFocus,
    // onKeyDown,
    size = "small",
    color = "primary",
    className = "",
    style = {},
    // children,
    ...rest
  } = props;

  const theme = useTheme();

  const handleOnInput = useCallback(
    debounce((inputValue, meta) => {
      onInputChange?.(inputValue, meta);
    }, debounceTime)
  );

  return (
    <Dropdown
      isMulti={true}
      ref={ref}
      // components={components}
      // options={options}
      styles={styles ? styles : customStyles}
      size={size}
      color={color}
      theme={theme}
      // name={name}
      // hideSelectedOptions={hideSelectedOptions}
      // id={id}
      // inputId={inputId}
      // value={value}
      // readOnly={readOnly}
      // tabIndex={tabIndex}
      isSearchable={isSearchable}
      isClearable={isClearable}
      // isLoading={isLoading}
      // isRtl={isRtl}
      // isDisabled={isDisabled}
      // closeMenuOnSelect={closeMenuOnSelect}
      // closeMenuOnScroll={closeMenuOnScroll}
      // escapeClearsValue={escapeClearsValue}
      // filterOption={filterOption}
      // formatGroupLabel={formatGroupLabel}
      // formatOptionLabel={formatOptionLabel}
      // getOptionLabel={getOptionLabel}
      // getOptionValue={getOptionValue}
      // isOptionDisabled={isOptionDisabled}
      // isOptionSelected={isOptionSelected}
      // loadingMessage={loadingMessage}
      // minMenuHeight={minMenuHeight}
      // maxMenuHeight={maxMenuHeight}
      // menuPlacement={menuPlacement}
      // menuPosition={menuPosition}
      // menuShouldBlockScroll={menuShouldBlockScroll}
      // menuShouldScrollIntoView={menuShouldScrollIntoView}
      // openMenuOnFocus={openMenuOnFocus}
      // openMenuOnClick={openMenuOnClick}
      // autoFocus={autoFocus}
      // placeholder={placeholder}
      // noOptionsMessage={noOptionsMessage}
      // menuIsOpen={menuIsOpen}
      // defaultValue={defaultValue}
      // defaultInputValue={defaultInputValue}
      // defaultMenuIsOpen={defaultMenuIsOpen}
      // delimiter={delimiter}
      // onChange={onChange}
      onInputChange={handleOnInput}
      // onMenuOpen={onMenuOpen}
      // onMenuClose={onMenuClose}
      // onBlur={onBlur}
      // onFocus={onFocus}
      className={className}
      style={style}
      // onKeyDown={onKeyDown}
      {...rest}
    />
  );
});

// MultiSelectDropdown.defaultProps = {
//   readOnly: false,
//   isDisabled: false,
//   isSearchable: true,
//   isClearable: true,
//   autoFocus: false,
//   components: {},
//   debounceTime: 180,
//   //-------------------------
//   onChange: () => {},
//   onInputChange: () => {},
//   onMenuOpen: () => {},
//   onMenuClose: () => {},
//   onFocus: () => {},
//   onBlur: () => {},
//   onKeyDown: () => {},
//   //-------------------------
//   style: {},
//   className: "",
//   color: "primary",
//   size: "small",
// };

MultiSelectDropdown.propTypes = {
  options: PropTypes.array,
  styles: PropTypes.object,
  debounceTime: PropTypes.number,
  name: PropTypes.string,
  value: PropTypes.any,
  /**
   * Sets the tabIndex attribute on the input
   */
  tabIndex: PropTypes.number,
  /**
   * Whether to enable search functionality
   */
  isSearchable: PropTypes.bool,
  isClearable: PropTypes.bool,
  /**
   * Is the select in a state of loading (async)
   */
  isLoading: PropTypes.bool,
  /**
   * Is the select direction right-to-left
   */
  isRtl: PropTypes.bool,
  isDisabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  /**
   * Close the select menu when the user selects an option
   */
  closeMenuOnSelect: PropTypes.bool,
  /**
   * If true, close the select menu when the user scrolls the document/body.
   * If a function, takes a standard javascript ScrollEvent you return a boolean:
   * true => The menu closes
   * false => The menu stays open
   * This is useful when you have a scrollable modal and want to portal the menu out, but want to avoid graphical issues.
   */
  closeMenuOnScroll: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  /**
   * Clear all values when the user presses escape AND the menu is closed
   */
  escapeClearsValue: PropTypes.bool,
  /**
   * Custom method to filter whether an option should be displayed in the menu. Type: `null` or `() => boolean`
   */
  filterOption: PropTypes.func,
  /**
   * Formats group labels in the menu as React components
   */
  formatGroupLabel: PropTypes.func,
  /**
   * Formats option labels in the menu and control as React components
   */
  formatOptionLabel: PropTypes.func,
  /**
   * Resolves option data to a string to be displayed as the label by components
   * Note: Failure to resolve to a string type can interfere with filtering and screen reader support.
   */
  getOptionLabel: PropTypes.func,
  /**
   * Resolves option data to a string to compare options and specify value attributes
   */
  getOptionValue: PropTypes.func,
  /**
   * Hide the selected option from the menu
   */
  hideSelectedOptions: PropTypes.bool,
  /**
   * The id to set on the SelectContainer component
   */
  id: PropTypes.string,
  /**
   * The id of the search input
   */
  inputId: PropTypes.string,
  /**
   * Override the built-in logic to detect whether an option is disabled. `(...) => boolean`
   */
  isOptionDisabled: PropTypes.func,
  /**
   * Override the built-in logic to detect whether an option is selected. `(...) => boolean`
   */
  isOptionSelected: PropTypes.func,
  /**
   * Async: Text to display when loading options `(...) => ...`
   */
  loadingMessage: PropTypes.func,
  /**
   * Minimum height of the menu before flipping
   */
  minMenuHeight: PropTypes.number,
  /**
   * Maximum height of the menu before flipping
   */
  maxMenuHeight: PropTypes.number,
  /**
   * Default placement of the menu in relation to the control. 'auto' will flip when there isn't enough space below the control.
   */
  menuPlacement: PropTypes.oneOf(["bottom", "auto", "top"]),
  /**
   *The CSS position value of the menu, when "fixed" extra layout management is required.
   */
  menuPosition: PropTypes.oneOf(["absolute", "fixed"]),
  /**
   * Whether to block scroll events when the menu is open
   */
  menuShouldBlockScroll: PropTypes.bool,
  /**
   * Whether the menu should be scrolled into view when it opens
   */
  menuShouldScrollIntoView: PropTypes.bool,
  /**
   * Allows control of whether the menu is opened when the Select is focused
   */
  openMenuOnFocus: PropTypes.bool,
  /**
   * Allows control of whether the menu is opened when the Select is clicked
   */
  openMenuOnClick: PropTypes.bool,
  //----
  autoFocus: PropTypes.bool,
  placeholder: PropTypes.any,
  noOptionsMessage: PropTypes.string,
  menuIsOpen: PropTypes.bool,
  /**
   *  This complex object includes all the compositional components that are used in react-select. If you wish to overwrite a component, pass in an object with the appropriate namespace.
   *  If you only wish to restyle a component, we recommend using the styles prop instead.
   */
  components: PropTypes.object,
  /**
   * initial value of the control
   */
  defaultValue: PropTypes.string,
  /**
   * initial value of the search input
   */
  defaultInputValue: PropTypes.string,
  /**
   * initial open value of the menu
   */
  defaultMenuIsOpen: PropTypes.bool,
  /**
   * Delimiter used to join multiple values into a single HTML Input value
   */
  delimiter: PropTypes.string,
  //---------------------------------------------------------------
  onChange: PropTypes.func,
  /**
   * control the value of the search input (changing this will update the available options)
   */
  onInputChange: PropTypes.func,
  onMenuOpen: PropTypes.func,
  onMenuClose: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onKeyDown: PropTypes.func,
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
    "gray",
  ]),
  size: PropTypes.oneOf(["small", "medium", "large"]),
};

export default MultiSelectDropdown;
