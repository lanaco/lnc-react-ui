import styled from "@emotion/styled";
import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
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
        ? "0.09375rem solid transparent"
        : `0.09375rem solid ${props.theme.test_palette[props.color][400]}`
    };
  `;
};

const selectPadding = {
  small: "0.41875rem 0.5rem",
  medium: "0.48125rem 0.625rem",
  large: "0.56875rem 0.75rem",
};

const listItemPadding = {
  small: "0.3125rem 0.5rem",
  medium: "0.375rem 0.5625rem",
  large: "0.4375rem 0.625rem",
};

const heights = ({ theme, size }) => {
  var height = { small: "1.875rem", medium: "2.25rem", large: "2.625rem" }[
    size
  ];

  return `
    min-height: ${height};
    max-height: ${height};
  `;
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
  ${(props) => heights(props)}

  border-top: 0.09375rem solid ${(props) => getBorderColor(props)};
  border-right: 0.09375rem solid ${(props) => getBorderColor(props)};
  border-left: 0.09375rem solid ${(props) => getBorderColor(props)};
  border-bottom: ${(props) =>
    props.open
      ? "0.09375rem solid transparent"
      : `0.09375rem solid ${getBorderColor(props)}`};

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
      ? ""
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
    //----------------
    className,
    style,
    size,
    color,
  } = props;

  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(-1);

  useEffect(() => {
    if (value !== selectedOption) setSelectedOption(value);
  }, [value]);

  const toggleOptions = () => {
    if (disabled || readOnly) return;
    setIsOptionsOpen(!isOptionsOpen);
  };

  const select = (e, itemId) => {
    setSelectedOption(itemId);
    setIsOptionsOpen(false);
    if (onChange) onChange(e, itemId);
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
  const handleKeyDown = (e, itemId) => {
    switch (e.keyCode) {
      case 13:
        e.preventDefault();
        select(e, itemId);
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

  const getSelectedOptionText = () => {
    var selected = items.find((x) => x[mapId] === selectedOption);

    if (selected) return selected[mapValue];

    return emptySelectText;
  };

  const themeProps = { color, size, theme, readOnly, disabled, isOptionsOpen };

  return (
    <Wrapper
      id={id}
      {...themeProps}
      className={className}
      style={style}
      ref={ref}
    >
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
              setIsOptionsOpen(true);

            if (onBlur) onBlur(e);
          }}
        >
          <SelectedOption {...themeProps}>
            {getSelectedOptionText()}
          </SelectedOption>
          <Icon {...themeProps} className="fas fa-chevron-down" />
        </Select>

        <List
          {...themeProps}
          show={isOptionsOpen}
          tabIndex={-1}
          role="listbox"
          aria-activedescendant={items.find((x) => x[mapId] === selectedOption)}
          optionsCount={items.length}
        >
          {items.map((item, index) => (
            <Item
              {...themeProps}
              key={index}
              tabIndex={0}
              role="option"
              aria-selected={selectedOption === item[mapId]}
              onKeyDown={(e) => handleKeyDown(e, item[mapId])}
              onClick={(e) => {
                select(e, item[mapId]);
              }}
            >
              {item[mapValue]}
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
