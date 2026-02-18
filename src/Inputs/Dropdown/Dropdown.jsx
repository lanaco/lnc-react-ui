/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import { forwardRef, useCallback } from "react";
import ReactSelect from "react-select";
import { components } from "react-select";
import customStyles from "./CustomStyles";
import { useTheme } from "@emotion/react";
import debounce from "lodash.debounce";

const Dropdown = forwardRef((props, ref) => {
  const {
    // options,
    styles,
    debounceTime = 0,

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
    // onInputChange,
    // onMenuOpen,
    // onMenuClose,
    // onBlur,
    // onFocus,
    size = "small",
    color = "primary",
    className = "",
    style = {},
    // children,
    ...rest
  } = props;

  const theme = useTheme();

  const inputChange = useCallback(
    debounce((inputValue, meta) => {
      handleOnInput?.(inputValue, meta);
    }, debounceTime),
  );

  const handleOnInput = (inputValue, meta) => {
    inputChange(inputValue, meta);
  };

  return (
    <ReactSelect
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
      // defaultInputValue={defaultValue ? defaultValue : defaultInputValue}
      // defaultMenuIsOpen={defaultMenuIsOpen}
      // delimiter={delimiter}
      // onChange={onChange}
      // onInputChange={handleOnInput}
      // onMenuOpen={onMenuOpen}
      // onMenuClose={onMenuClose}
      // onBlur={onBlur}
      // onFocus={onFocus}
      className={className}
      style={style}
      {...rest}
    />
  );
});

// Dropdown.defaultProps = {
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
//   //-------------------------
//   style: {},
//   className: "",
//   color: "primary",
//   size: "small",
// };

export default Dropdown;
export { components };
