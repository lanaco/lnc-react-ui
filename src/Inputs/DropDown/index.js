import styled from "@emotion/styled";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { useTheme } from "@emotion/react";

const Wrapper = styled.div`
  font-family: ${(props) => props.theme.typography.fontFamily};
  font-size: ${(props) => props.theme.typography[props.size].fontSize};
  width: 100%;
`;

const Container = styled.div`
  width: 100%;
  position: relative;
`;

const getBorderColor = (props) => {
  if (props.disabled) return props.theme.test_palette.light[400];
  if (props.isOptionsOpen) return props.theme.test_palette[props.color][400];

  return props.theme.test_palette.light[500];
};

const getSelectHover = (props) => {
  if (props.disabled) return "";

  return `
  border-top: 0.09375rem solid
      ${props.theme.test_palette[props.color][400]};
    border-right: 0.09375rem solid
      ${props.theme.test_palette[props.color][400]};
    border-left: 0.09375rem solid
      ${props.theme.test_palette[props.color][400]};
    border-bottom: ${
      props.open
        ? "none"
        : `0.09375rem solid ${props.theme.test_palette[props.color][400]}`
    };
  `;
};

const selectPadding = {
  small: "0.41875rem 0.5rem",
  medium: "0.54375rem 0.625rem",
  large: "0.56875rem 0.75rem",
};

const listItemPadding = {
  small: "0.3125rem 0.5rem",
  medium: "6px 9px",
  large: "7px 10px",
};

const Select = styled.span`
  appearance: none;
  outline: none;
  color: ${(props) =>
    props.disabled
      ? props.theme.test_palette.light[400]
      : props.theme.test_palette.dark[100]};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
  display: flex;
  align-items: center;
  box-sizing: border-box;

  border-top: 0.09375rem solid ${(props) => getBorderColor(props)};
  border-right: 0.09375rem solid ${(props) => getBorderColor(props)};
  border-left: 0.09375rem solid ${(props) => getBorderColor(props)};
  border-bottom: ${(props) =>
    props.open ? "none" : `0.09375rem solid ${getBorderColor(props)}`};

  border-radius: ${(props) =>
    props.open ? "0.375rem 0.375rem 0 0" : "0.375rem"};
  padding: ${(props) => selectPadding[props.size]};
  font-family: inherit;
  font-size: inherit;

  &:hover {
    ${(props) => getSelectHover(props)}
  }
`;

const SelectedOption = styled.span``;

const Icon = styled.i`
  margin-left: auto;
  font-size: ${(props) => props.theme.typography[props.size].fontSize};

  color: ${(props) =>
    props.disabled
      ? props.theme.test_palette.light[500]
      : props.theme.test_palette.dark[100]};
`;

const List = styled.ul`
  z-index: 200;
  width: 100%;
  position: absolute;
  margin: 0;
  appearance: none;
  outline: none;
  list-style-type: none;
  padding: 0.125rem;
  padding-top: 0;
  box-sizing: border-box;
  background-color: white;

  border-bottom: 0.09375rem solid
    ${(props) => props.theme.test_palette[props.color][400]};
  border-right: 0.09375rem solid
    ${(props) => props.theme.test_palette[props.color][400]};
  border-left: 0.09375rem solid
    ${(props) => props.theme.test_palette[props.color][400]};
  border-top: ${(props) =>
    props.show
      ? "none"
      : `0.09375rem solid ${props.theme.test_palette[props.color][400]}`};

  border-radius: ${(props) =>
    props.show ? "0 0 0.375rem 0.375rem " : "0.375rem"};

  display: ${(props) => (props.show ? "block" : "none")};
  font-family: inherit;
  font-size: inherit;

  & > li {
    margin: 0.09375rem 0.0625rem;
  }

  & > li:first-of-type {
    margin: 0 0.0625rem 0.09375rem 0.0625rem;
    border-radius: ${(props) =>
      props.optionsCount === 1 ? "0.1875rem" : "0.1875rem 0.1875rem 0 0"};
  }

  & > li:last-of-type {
    border-radius: ${(props) =>
      props.optionsCount === 1 ? "0.1875rem" : "0 0 0.1875rem 0.1875rem"};
  }
`;

const Item = styled.li`
  padding: ${(props) => listItemPadding[props.size]};
  margin: 0.09375rem 0.0625rem;
  cursor: pointer;
  color: ${(props) => props.theme.test_palette[props.color][400]};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: all 130ms ease;
  background-color: ${(props) => props.theme.test_palette.light[100]};

  &:hover {
    color: white;
    background-color: ${(props) => props.theme.test_palette[props.color][300]};
  }
`;

const DropDown = React.forwardRef((props, ref) => {
  //
  const theme = useTheme();
  const {
    id,
    value,
    disabled,
    readOnly,
    items,
    mapId,
    mapValue,
    emptySelectText,
    //----------------
    onChange,
    onBlur,
    onFocus,
    //----------------
    className,
    style,
    size,
    color,
  } = props;

  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(0);

  const optionsList = [
    "Option 1",
    "Option 2",
    "Option 3",
    "Option 4",
    "Option 5",
  ];

  const toggleOptions = () => {
    if (disabled || readOnly) return;
    setIsOptionsOpen(!isOptionsOpen);
  };

  const handleInputKeyDown = (e) => {
    if (e.keyCode === 32) {
      e.preventDefault();
      setIsOptionsOpen(!isOptionsOpen);
    }

    if (e.keyCode === 40) {
      e.preventDefault();
    }
  };

  // Event handler for keydowns
  const handleKeyDown = (e, index) => {
    switch (e.keyCode) {
      case 13:
        e.preventDefault();
        setSelectedOption(index);
        setIsOptionsOpen(false);
        break;

      //down
      case 40:
        e.preventDefault();
        break;

      //up
      case 38:
        e.preventDefault();
        break;

      default:
        break;
    }
  };

  const themeProps = { color, size, theme, readOnly, disabled, isOptionsOpen };

  return (
    <Wrapper {...themeProps} className={className} style={style} ref={ref}>
      <Container {...themeProps}>
        <Select
          {...themeProps}
          type="text"
          tabIndex={0}
          aria-haspopup="listbox"
          aria-expanded={isOptionsOpen}
          open={isOptionsOpen}
          onClick={toggleOptions}
          onChange={() => {}}
          onKeyDown={(e) => handleInputKeyDown(e)}
          onBlur={(e) => {
            if (
              e.relatedTarget === null ||
              (e.relatedTarget && e.relatedTarget.nodeName !== "LI")
            )
              setIsOptionsOpen(false);
          }}
        >
          <SelectedOption {...themeProps}>
            {optionsList[selectedOption]}
          </SelectedOption>
          <Icon {...themeProps} className="fas fa-chevron-down" />
        </Select>

        <List
          {...themeProps}
          show={isOptionsOpen}
          tabIndex={-1}
          role="listbox"
          aria-activedescendant={optionsList[selectedOption]}
          optionsCount={optionsList.length}
        >
          {optionsList.map((option, index) => (
            <Item
              {...themeProps}
              key={index}
              tabIndex={0}
              role="option"
              aria-selected={selectedOption === index}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onClick={() => {
                setSelectedOption(index);
                setIsOptionsOpen(false);
              }}
            >
              {option}
            </Item>
          ))}
        </List>
      </Container>
    </Wrapper>
  );
});

DropDown.defaultProps = {
  id: "",
  value: 0,
  disabled: false,
  readOnly: false,
  items: [],
  mapId: "id",
  mapValue: "value",
  emptySelectText: "Select...",
  //----------------
  onChange: () => {},
  onBlur: () => {},
  onFocus: () => {},
  //----------------
  className: "",
  style: {},
  size: "small",
  color: "primary",
};

DropDown.propTypes = {
  id: PropTypes.string,
  value: PropTypes.number,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  items: PropTypes.arrayOf(PropTypes.object),
  mapId: PropTypes.string,
  mapValue: PropTypes.string,
  emptySelectText: PropTypes.string,
  //----------------
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  //----------------
  className: PropTypes.string,
  style: PropTypes.object,
  size: PropTypes.oneOf(["small", "medium", "large"]),
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "success",
    "danger",
    "warning",
    "info",
  ]),
};

export default DropDown;
