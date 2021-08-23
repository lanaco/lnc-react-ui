import React from "react";
import CheckBox from "../CheckBox/index.js";
import Button from "../Button/index.js";
import ToggleSwitch from "../ToggleSwitch/index.js";
import styled from "@emotion/styled";
import theme from "../_utils/theme";
import PropTypes from "prop-types";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  border: 0.125rem solid ${(props) => props.theme.palette[props.color].main};
  border-radius: 0.125rem;
  padding: 0.4rem;
  width: fit-content;
`;

const Header = styled.div`
  padding: 0.125rem 0 0.4rem 0;
  border-bottom: 0.1rem solid ${(props) => props.theme.palette.gray[300]};
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.2rem 0 0 0;
`;

const ControlContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding: 0.125rem 0;
`;

const CheckboxLookup = (props) => {
  const {
    onChange,
    selectedOptions,
    onSelectDeselectAll,
    options,
    theme,
    size,
    color,
    style,
    disabled,
    value,
    itemId,
    itemText,
    className,
    localization,
  } = props;

  let themeProps = { theme, size, color };

  const handleCheckboxChange = (_id, _value) => {
    let selectedItems = [...selectedOptions];

    if (_value) {
      selectedItems.push(
        options.filter((item) => {
          return item[itemId] === _id;
        })[0]
      );
    } else {
      selectedItems = selectedItems.filter((item) => {
        return item[itemId] !== _id;
      });
    }
    onChange(id, selectedItems);
  };

  var label =
    options.length === selectedOptions.length
      ? localization.DeselectAll || "Deselect all"
      : localization.SelectAll || "Select all";

  return (
    <>
      <Container {...themeProps} className={className}>
        <Header {...themeProps}>
          <Button
            theme={theme}
            color={color}
            tooltip={label}
            text={label}
            icon={"check-square"}
            iconStyle={
              options.length === selectedOptions.length ? "regular" : "solid"
            }
            iconLocation={"left"}
            onClick={() =>
              onSelectDeselectAll(
                options.length === selectedOptions.length ? false : true
              )
            }
            size={size}
            disabled={false}
          />
        </Header>
        <Content>
          {options.map((x, i) => {
            let isChecked = false;

            if (selectedOptions) {
              selectedOptions.forEach((element) => {
                if (element[itemId] === x[props.itemId]) {
                  isChecked = true;
                }
              });
            }

            return (
              <ControlContainer key={i} {...themeProps}>
                {style === "regular" ? (
                  <CheckBox
                    {...{
                      id: x[itemId],
                      disabled: disabled,
                      checked: isChecked,
                      onChange: handleCheckboxChange,
                      color: color,
                      size: size,
                      theme: theme,
                      label: x[itemText],
                    }}
                  />
                ) : (
                  <ToggleSwitch
                    {...{
                      id: x[itemId],
                      disabled: disabled,
                      value: isChecked,
                      onChange: handleCheckboxChange,
                      color: color,
                      size: size,
                      theme: theme,
                      label: x[itemText],
                    }}
                  />
                )}
              </ControlContainer>
            );
          })}
        </Content>
      </Container>
    </>
  );
};

CheckboxLookup.defaultProps = {
  theme: theme,
  id: "",
  disabled: false,
  onChange: () => {},
  onSelectDeselectAll: () => {},
  selectedOptions: [],
  options: [],
  className: "",
  preventDefault: true,
  size: "small",
  label: "",
  color: "primary",
  style: "regular",
  itemId: "id",
  itemText: "code",
  localization: {
    SelectAll: "Select all",
    DeselectAll: "Deselect all",
  },
};

CheckboxLookup.propTypes = {
  localization: PropTypes.object,
  theme: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
  options: PropTypes.arrayOf({}),
  selectedOptions: PropTypes.arrayOf({}),
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  onSelectDeselectAll: PropTypes.func,
  className: PropTypes.string,
  itemId: PropTypes.string,
  itemText: PropTypes.string,
  preventDefault: PropTypes.bool,
  size: PropTypes.oneOf(["small", "medium", "large"]),
  style: PropTypes.oneOf(["regular", "toggle"]),
  label: PropTypes.string,
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "success",
    "error",
    "warning",
    "gray",
  ]),
};

export default CheckboxLookup;
