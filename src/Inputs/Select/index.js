import PropTypes from "prop-types";
import React, { useCallback, useEffect, useRef } from "react";
import ReactSelect from "react-select";
import AsyncReactSelect from 'react-select/async';
import { components, OptionProps } from 'react-select';
import customStyles from './CustomStyles';
import { useTheme } from "@emotion/react";
import debounce from "lodash.debounce";


const Select = React.forwardRef((props, ref) => {
  const {
    name,
    asyncSelect,
    value,
    readOnly,
    disabled,
    isSearchable,
    isMulti,
    autoFocus,
    placeholder,
    noOptionsMessage,
    inputValue,
    menuIsOpen,
    isClearable,
    show,
    styles,
    components,
    defaultValue,
    defaultInputValue,
    defaultMenuIsOpen,
    debounceTime,
    options,
    onChange,
    onInputChange,
    onMenuOpen,
    onMenuClose,
    size,
    color,
    className,
    style,
    ...rest
  } = props;
  const theme = useTheme();
  const optionsArrayCallbackFnRef = useRef();

  useEffect(() => {
    if (optionsArrayCallbackFnRef.current)
      optionsArrayCallbackFnRef.current(options);
  }, [options])


  const loadOptions = (inputValue, callback) => {
    optionsArrayCallbackFnRef.current = callback;
  };

  const handleOnInput = useCallback(
    debounce((inputValue, meta) => {
      // if (meta?.action == 'menu-close')
      // return;

      onInputChange(inputValue);
    }, debounceTime),
  )

  return  asyncSelect ?
      <AsyncReactSelect
        ref={ref}
        components={components}
        styles={styles ? styles : customStyles}
        size={size}
        color={color}
        theme={theme}
        readOnly={readOnly}
        isDisabled={disabled}
        isMulti={isMulti}
        autoFocus={autoFocus}
        placeholder={placeholder}
        noOptionsMessage={noOptionsMessage}
        menuIsOpen={menuIsOpen}
        isClearable={isClearable}
        show={show}
        cacheOptions
        defaultValue
        defaultInputValue={defaultInputValue}
        defaultMenuIsOpen={defaultMenuIsOpen}
        defaultOptions={true}
        loadOptions={loadOptions}
        onChange={onChange}
        onInputChange={handleOnInput}
        onMenuOpen={onMenuOpen}
        onMenuClose={onMenuClose}
        {...rest}
      />
      :
      <ReactSelect
        ref={ref}
        components={components}
        styles={styles ? styles : customStyles}
        size={size}
        color={color}
        theme={theme}
        readOnly={readOnly}
        isDisabled={disabled}
        isSearchable={isSearchable}
        isMulti={isMulti}
        autoFocus={autoFocus}
        placeholder={placeholder}
        noOptionsMessage={noOptionsMessage}
        menuIsOpen={menuIsOpen}
        isClearable={isClearable}
        show={show}
        defaultValue
        defaultInputValue={defaultInputValue}
        defaultMenuIsOpen={defaultMenuIsOpen}
        options={options}
        onChange={onChange}
        onInputChange={handleOnInput}
        onMenuOpen={onMenuOpen}
        onMenuClose={onMenuClose}
        {...rest}
      />;

});

Select.defaultProps = {
  asyncSelect: false,
  readOnly: false,
  disabled: false,
  isSearchable: true,
  isMutli: false,
  autoFocus: false,
  isClearable: true,
  show: false,
  components: {},
  debounceTime: 180,
  //-------------------------
  onChange: () => { },
  onInputChange: () => { },
  onMenuOpen: () => { },
  onMenuClose: () => { },
  onFocus: () => { },
  onBlur: () => { },
  //-------------------------
  style: {},
  className: "",
  color: "primary",
  size: "small",
};

Select.propTypes = {
  name: PropTypes.string,
  asyncSelect: PropTypes.bool,
  value: PropTypes.any,
  readOnly: PropTypes.bool,
  disabled: PropTypes.bool,
  /**
   * Enable search, only applicable when `async=false`
   */
  isSearchable: PropTypes.bool,
  isMulti: PropTypes.bool,
  autoFocus: PropTypes.bool,
  placeholder: PropTypes.string,
  noOptionsMessage: PropTypes.string,
  menuIsOpen: PropTypes.bool,
  isClearable: PropTypes.bool,
  show: PropTypes.bool,
  /**
   *  Enables replacement of the default components with your own
   */
  components: PropTypes.object,
  /**
   * control the value of the search input (changing this will update the available options)
   */
  inputValue: PropTypes.string,
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
  deaultMenuIsOpen: PropTypes.bool,
  options: PropTypes.array,
  styles: PropTypes.object,
  debounceTime: PropTypes.number,
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
  ]),
  size: PropTypes.oneOf(["small", "medium", "large"]),
};

export default Select;
export { components };