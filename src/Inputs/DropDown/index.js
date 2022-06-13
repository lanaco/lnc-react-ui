import styled from "@emotion/styled";
import PropTypes from "prop-types";
import React, { useState } from "react";
import theme from "../../_utils/theme";
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

const Input = styled.span`
  appearance: none;
  outline: none;
  color: ${(props) => props.theme.test_palette.dark[100]};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
  display: inline-block;
  box-sizing: border-box;

  border-top: 1.5px solid
    ${(props) => props.theme.test_palette[props.color][400]};
  border-right: 1.5px solid
    ${(props) => props.theme.test_palette[props.color][400]};
  border-left: 1.5px solid
    ${(props) => props.theme.test_palette[props.color][400]};
  border-bottom: ${(props) =>
    props.open
      ? "none"
      : `1.5px solid ${props.theme.test_palette[props.color][400]}`};

  border-radius: ${(props) => (props.open ? "6px 6px 0 0" : "6px")};
  padding: 4.7px;
  font-family: inherit;
  font-size: inherit;
`;

const List = styled.ul`
  z-index: 200;
  width: 100%;
  position: absolute;
  margin: 0;
  appearance: none;
  outline: none;
  list-style-type: none;
  padding: 2px;
  padding-top: 0;
  box-sizing: border-box;
  background-color: white;

  border-bottom: 1.5px solid
    ${(props) => props.theme.test_palette[props.color][400]};
  border-right: 1.5px solid
    ${(props) => props.theme.test_palette[props.color][400]};
  border-left: 1.5px solid
    ${(props) => props.theme.test_palette[props.color][400]};
  border-top: ${(props) =>
    props.show
      ? "none"
      : `1.5px solid ${props.theme.test_palette[props.color][400]}`};

  border-radius: ${(props) => (props.show ? "0 0 6px 6px " : "6px")};

  display: ${(props) => (props.show ? "block" : "none")};
  font-family: inherit;
  font-size: inherit;

  & > li {
    margin: 1.5px 1px;
  }

  & > li:first-of-type {
    margin: 0 1px 1.5px 1px;
    border-radius: ${(props) =>
      props.optionsCount === 1 ? "3px" : "3px 3px 0 0"};
  }

  & > li:last-of-type {
    border-radius: ${(props) =>
      props.optionsCount === 1 ? "3px" : "0 0 3px 3px"};
  }
`;

const Item = styled.li`
  padding: 5px 8px;
  margin: 1.5px 1px;
  cursor: pointer;
  color: ${(props) => props.theme.test_palette[props.color][400]};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: all 130ms ease;
  background-color: ${(props) => props.theme.test_palette[props.color][10]};

  &:hover {
    color: white;
    background-color: ${(props) => props.theme.test_palette[props.color][300]};
  }
`;

const DropDown = React.forwardRef((props, ref) => {
  //
  const theme = useTheme();
  const { color, size } = props;

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

  const themeProps = { color, size, theme };

  return (
    <Wrapper {...themeProps} className="wrapper">
      <Container {...themeProps} className="container">
        <Input
          {...themeProps}
          type="text"
          tabIndex={0}
          aria-haspopup="listbox"
          aria-expanded={isOptionsOpen}
          open={isOptionsOpen}
          onClick={toggleOptions}
          onChange={() => {}}
          onKeyDown={(e) => handleInputKeyDown(e)}
          // value={optionsList[selectedOption]}
          onBlur={(e) => {
            if (
              e.relatedTarget === null ||
              (e.relatedTarget && e.relatedTarget.nodeName !== "LI")
            )
              setIsOptionsOpen(true);
          }}
        >
          {optionsList[selectedOption]}
        </Input>

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
  disabled: false,
  tooltip: "",
  onChange: () => {},
  className: "",
  preventDefault: true,
  size: "small",
  color: "primary",
  theme: theme,
  items: [],
  withoutEmpty: false,
  mapValueTo: "value",
  mapNameTo: "name",
};

DropDown.propTypes = {
  theme: PropTypes.object.isRequired,
  id: PropTypes.string,
  disabled: PropTypes.bool,
  tooltip: PropTypes.string,
  onChange: PropTypes.func,
  className: PropTypes.string,
  preventDefault: PropTypes.bool,
  withoutEmpty: PropTypes.bool,
  mapValueTo: PropTypes.string,
  mapNameTo: PropTypes.string,
  size: PropTypes.oneOf(["small", "medium", "large"]),
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "success",
    "error",
    "warning",
    "gray",
  ]),
};

export default DropDown;
