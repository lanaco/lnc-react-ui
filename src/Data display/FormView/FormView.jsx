import React from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import FlexGrid from "../../Layout/FlexGrid/FlexGrid";
import FlexGridItem from "../../Layout/FlexGrid/FlexGridItem";
import Button from "../../General/Button/Button";
import IconButton from "../../General/IconButton/IconButton";
import TextInput from "../../Basic Inputs/TextInput/TextInput";
import CheckBoxInput from "../../Basic Inputs/CheckBoxInput/CheckBoxInput";
import RadioGroup from "../../Inputs/RadioGroup/RadioGroup";
import NumberInput from "../../Basic Inputs/NumberInput/NumberInput";
import DecimalInput from "../../Basic Inputs/DecimalInput/DecimalInput";
import PasswordInput from "../../Basic Inputs/PasswordInput/PasswordInput";
import TextAreaInput from "../../Basic Inputs/TextAreaInput/TextAreaInput";
import TimeInput from "../../Basic Inputs/TimeInput/TimeInput";
import ColorInput from "../../Basic Inputs/ColorInput/ColorInput";
import FileInput from "../../Basic Inputs/FileInput/FileInput";
import RangeSlider from "../../Basic Inputs/RangeSlider/RangeSlider";

import {
  getBorderRadiusValueWithUnits,
  getColorRgbaValue,
  getComponentPropValue,
} from "../../_utils/utils";
import { useTheme } from "@emotion/react";
import FormField from "../../Layout/FormField/FormField";

const StyledToolbar = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StyledFormView = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  box-shadow: ${(props) =>
    getComponentPropValue(
      props.theme,
      "Popover",
      props.color,
      "enabled",
      "boxShadow"
    )};
  border-radius: ${(props) =>
    getBorderRadiusValueWithUnits(props.theme, props.borderRadius)};
  border-top: 1px solid rgba(0, 0, 0, 0.04);
  padding: 12px;
  background-color: ${(props) =>
    getColorRgbaValue(props.theme, "Popover", "default", "enabled", "bg")};
`;

const getInput = (type, inputProps, accessor, value, color, size) => {
  switch (type || "") {
    case "text":
      return (
        <TextInput
          name={accessor}
          color={color}
          size={size}
          {...inputProps}
          defaultValue={value}
        />
      );
    case "checkbox":
      return (
        <CheckBoxInput
          color={color}
          size={size}
          name={accessor}
          {...inputProps}
        />
      );
    case "radioGroup":
      return (
        <RadioGroup
          color={color}
          size={size}
          value={value}
          radioProps={inputProps.radioProps}
          name={accessor}
          items={[
            ...inputProps.items?.map((o) => {
              return { value: o.value, label: o.label };
            }),
          ]}
        />
      );
    case "number":
      return (
        <NumberInput
          color={color}
          size={size}
          name={accessor}
          {...inputProps}
          defaultValue={value}
        />
      );
    case "decimal":
      return (
        <DecimalInput
          name={accessor}
          color={color}
          size={size}
          {...inputProps}
          defaultValue={value}
        />
      );
    case "file":
      return (
        <FileInput
          name={accessor}
          color={color}
          size={size}
          {...inputProps}
          defaultValue={value}
        />
      );
    case "password":
      return (
        <PasswordInput
          name={accessor}
          color={color}
          {...inputProps}
          defaultValue={value}
        />
      );
    case "textArea":
      return (
        <TextAreaInput
          name={accessor}
          color={color}
          size={size}
          {...inputProps}
          defaultValue={value}
        />
      );
    case "time":
      return (
        <TimeInput
          name={accessor}
          color={color}
          size={size}
          {...inputProps}
          defaultValue={value}
        />
      );
    case "color":
      return (
        <ColorInput
          name={accessor}
          color={color}
          size={size}
          {...inputProps}
          defaultValue={value}
        />
      );
    //DateInput doesen't work properly
    // case "date":
    //   return (
    //     <DateInput
    //       name={accessor}
    //       color={color}
    //       size={size}
    //       {...inputProps}
    //       defaultValue={value}
    //     />
    //   );
    case "range":
      return (
        <RangeSlider
          name={accessor}
          color={color}
          size={size}
          {...inputProps}
          defaultValue={value}
        />
      );
    default:
      return value;
  }
};

const FormView = React.forwardRef((props, ref) => {
  const {
    __TYPE__ = "FORM_VIEW",
    goToPreviousView,
    id,
    data,
    fields = [],
    errors = {},
    flexGridProps,
    goBackText = "Go back",
    backActive = true,
    nextActive = true,
    previousActive = true,
    editActive,
    disableGoBack = false,
    disableNext = false,
    disablePrevious = false,
    disableEdit,
    disableDiscard = false,
    disableSave = false,
    discardText = "Discard",
    saveText = "Save",
    //------------------
    goToNext = () => {},
    goToPrevious = () => {},
    onEdit = () => {},
    goBack = () => {},
    onSubmit = () => {},
    onDiscard = () => {},
    //------------------
    className = "",
    style = {},
    color = "primary",
    size = "small",
    children,
    ...rest
  } = props;
  const theme = useTheme();

  const handleGoBack = (e, data) => {
    if (goToPreviousView) goToPreviousView();

    goBack(e, data);
  };

  const renderChildren = () => {
    return (
      <>
        {children || (
          <FlexGrid spacing={10} {...flexGridProps}>
            {fields.map((item, i) => (
              <FlexGridItem key={i} {...item}>
                <FormField
                  key={i}
                  label={item.label}
                  text={errors[item.accessor]}
                  color={errors[item.accessor] ? "danger" : color}
                  size={size}
                >
                  {item.type == "custom"
                    ? item.element
                    : getInput(
                        item.type,
                        item.inputProps,
                        item.accessor,
                        data[item.accessor],
                        errors[item.accessor] ? "danger" : color,
                        size
                      )}
                </FormField>
              </FlexGridItem>
            ))}
          </FlexGrid>
        )}
      </>
    );
  };

  return (
    <StyledFormView
      ref={ref}
      theme={theme}
      color={color}
      borderRadius="regular"
      key={id}
      {...rest}
    >
      {backActive && (
        <Button
          key={0}
          leadingIcon={"arrow-circle-left"}
          text={goBackText}
          btnType={"outline"}
          style={{ width: "fit-content" }}
          onClick={(e) => handleGoBack(e, data)}
          disabled={disableGoBack}
          type="button"
        />
      )}
      {renderChildren()}
      <StyledToolbar>
        <div>
          {nextActive && (
            <>
              <IconButton
                btnType="outline"
                icon="angle-left"
                disabled={disablePrevious}
                onClick={(e) => goToPrevious(data, e)}
                type="button"
              />
              &nbsp;&nbsp;
            </>
          )}
          {previousActive && (
            <IconButton
              btnType="outline"
              icon="angle-right"
              disabled={disableNext}
              onClick={(e) => goToNext(data, e)}
              type="button"
            />
          )}
        </div>
        <div>
          <Button
            leadingIcon="eraser"
            btnType="outline"
            color="warning"
            text={discardText}
            disabled={disableDiscard}
            onClick={onDiscard}
            type="button"
          />
          &nbsp;&nbsp;
          <Button
            leadingIcon="floppy-disk"
            btnType="tinted"
            color="success"
            text={saveText}
            disabled={disableSave}
            onClick={onSubmit}
          />
        </div>
      </StyledToolbar>
    </StyledFormView>
  );
});

// TODO : type
// FormView.defaultProps = {
//   __TYPE__: "FORM_VIEW",
//   goBackText: "Go Back",
//   backActive: true,
//   nextActive: true,
//   previousActive: true,
//   disableGoBack: false,
//   disableNext: false,
//   disablePrevious: false,
//   disableDiscard: false,
//   disableSave: false,
//   discardText: "Discard",
//   saveText: "Save",
//   fields: [],
//   data: {},
//   errors: {},
//   //-----------------------
//   goToNext: () => {},
//   goToPrevious: () => {},
//   goBack: () => {},
//   onEdit: () => {},
//   onSubmit: () => {},
//   onDiscard: () => {},
//   //-----------------------
//   color: "primary",
//   style: {},
//   size: "small",
// };

FormView.propTypes = {
  __TYPE__: PropTypes.string,
  goBackText: PropTypes.string,
  fields: PropTypes.array,
  data: PropTypes.object,
  errors: PropTypes.object,
  backActive: PropTypes.bool,
  nextActive: PropTypes.bool,
  disableGoBack: PropTypes.bool,
  disableNext: PropTypes.bool,
  disablePrevious: PropTypes.bool,
  previousActive: PropTypes.bool,
  editActive: PropTypes.bool,
  flexGridProps: PropTypes.any,
  disableDiscard: PropTypes.bool,
  disableSave: PropTypes.bool,
  discardText: PropTypes.string,
  saveText: PropTypes.string,
  //-----------------------------------------------------------
  goToNext: PropTypes.func,
  goToPrevious: PropTypes.func,
  onEdit: PropTypes.func,
  goBack: PropTypes.func,
  onSubmit: PropTypes.func,
  //------------------------------------------------------------
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

export default FormView;

FormView.displayName = "FORM_VIEW";
