import styled from "@emotion/styled";
import PropTypes from "prop-types";
import React, { useState, useEffect, useRef, useMemo } from "react";
import { useTheme } from "@emotion/react";
import useStateWithCallback, {
  useStateWithCallbackLazy,
} from "use-state-with-callback";

const Wrapper = styled.div`
  font-family: ${(props) => props.theme.typography.fontFamily};
  font-size: ${(props) => props.theme.typography[props.size].fontSize};
  width: 100%;
`;

const Container = styled.div`
  width: 100%;
  position: relative;
`;

const getBorderColor = (props, focus = false) => {
  if (focus) return props.theme.test_palette[props.color][400];

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

  &:focus {
    ${(props) => {
      if (!props.disabled) {
        return `
          border-top: 0.09375rem solid ${getBorderColor(props, true)};
          border-right: 0.09375rem solid ${getBorderColor(props, true)};
          border-left: 0.09375rem solid ${getBorderColor(props, true)};
          border-bottom: ${
            props.open
              ? "0.09375rem solid transparent"
              : `0.09375rem solid ${getBorderColor(props, true)}`
          };
        `;
      }
    }}
  }

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
  z-index: 15;
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
  max-height: 60vh;
  overflow: auto;

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
  // position: relative;
  padding: ${(props) => listItemPadding[props.size]};
  margin: 0.09375rem 0.0625rem;
  cursor: pointer;
  color: ${(props) => props.theme.test_palette[props.color][400]};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: all 130ms ease;
  background-color: ${(props) => props.theme.test_palette.light[100]};

  ${(props) =>
    props.active
      ? `
          color: white;
          background-color: ${props.theme.test_palette[props.color][300]};
        `
      : ""};
`;

const DropDown = React.forwardRef((props, ref) => {
  //

  const theme = useTheme();
  const {
    id,
    value,
    disabled,
    readOnly,
    tabIndex,
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
    ...rest
  } = props;

  //========================== STATE AND REFS =========================================

  const [isOptionsOpen, setIsOptionsOpen] = useStateWithCallback(
    false,
    (value) => {
      if (value) adjustScroll(activeOption);
    }
  );
  const [selectedOption, setSelectedOption] = useStateWithCallbackLazy(-1);
  const [activeOption, setActiveOption] = useStateWithCallbackLazy(-1);
  var moveMouse = useRef(true);
  var selectRef = useRef();
  const WrapperRef = useRef();

  //========================== USE-EFFECT =============================================

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (
        isOptionsOpen &&
        WrapperRef.current &&
        !WrapperRef.current.contains(e.target)
      ) {
        setIsOptionsOpen(false);
      }
    };

    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [isOptionsOpen]);

  useEffect(() => {
    if (value !== selectedOption) {
      setSelectedOption(value);
      setActiveOption(value);
    }
  }, [value]);

  //========================== FUNCTIONS =============================================

  const toggleOptions = () => {
    if (disabled || readOnly) return;
    setIsOptionsOpen(!isOptionsOpen);
    var activeOption = -1;

    if (selectedOption !== -1) activeOption = selectedOption;
    else if (items && items.length > 0) {
      activeOption = items[0][mapId];
    }

    setActiveOption(activeOption);
  };

  const select = (e, itemId) => {
    setSelectedOption(itemId);
    setActiveOption(itemId);
    setIsOptionsOpen(false);
    if (onChange) onChange(e, itemId);
  };

  const getSelectedOptionText = () => {
    var selected = items.find((x) => x[mapId] === selectedOption);
    if (selected) return selected[mapValue];
    return emptySelectText;
  };

  const adjustScroll = (itemId) => {
    if (itemId === -1) return;

    var itemElement = document.querySelector(`[data-id="${id}-${itemId}"]`);
    console.error("scrollIntoView");

    moveMouse.current = false;
    itemElement.scrollIntoView();
  };

  const scrollUp = (itemId) => {
    var listElement = document.querySelector(`[data-id="${id}"]`);
    var itemElement = document.querySelector(`[data-id="${id}-${itemId}"]`);

    var itemPosition =
      itemElement.offsetTop -
      listElement.scrollTop +
      itemElement.getBoundingClientRect().height;

    if (itemPosition < itemElement.getBoundingClientRect().height) {
      moveMouse.current = false;
      listElement.scroll({
        top:
          listElement.scrollTop -
          (itemElement.getBoundingClientRect().height - itemPosition),
        left: 0,
        behavior: "smooth",
      });
    }
  };

  const scrollDown = (itemId) => {
    var listElement = document.querySelector(`[data-id="${id}"]`);
    var listRect = listElement.getBoundingClientRect();
    var itemElement = document.querySelector(`[data-id="${id}-${itemId}"]`);

    var itemPosition =
      itemElement.offsetTop -
      listElement.scrollTop +
      itemElement.getBoundingClientRect().height;

    if (itemPosition > listRect.height) {
      moveMouse.current = false;

      listElement.scroll({
        top: listElement.scrollTop + (itemPosition - listRect.height),
        left: 0,
        behavior: "smooth",
      });
    }
  };

  //========================== EVENTS =============================================

  const handleItemEnter = (e, itemId) => {
    if (moveMouse.current) setActiveOption(itemId);
    else {
      moveMouse.current = true;
    }
  };

  const handleSelectBlur = (e) => {
    if (onBlur) onBlur(e);
  };

  const handleInputKeyDown = (e) => {
    if (e.keyCode === 32) {
      e.preventDefault();
      toggleOptions();
    }

    if (e.keyCode === 13) {
      e.preventDefault();
      select(e, activeOption);
    }

    if (e.keyCode === 40) {
      e.preventDefault();

      if (activeOption === -1) {
        // setActiveOption(items[0][mapId]);
        setActiveOption(items[0][mapId]);

        if (!isOptionsOpen) setSelectedOption(items[0][mapId]);
      } else {
        var currentActiveIndex = items
          .map((x) => x[mapId])
          .indexOf(activeOption);

        if (currentActiveIndex < items.length - 1) {
          var itemId = items[currentActiveIndex + 1][mapId];

          // setActiveOption(itemId)
          setActiveOption(itemId);
          scrollDown(itemId);

          if (!isOptionsOpen) setSelectedOption(itemId);
        }
      }
    }

    if (e.keyCode === 38) {
      e.preventDefault();

      if (activeOption !== -1) {
        var currentActiveIndex = items
          .map((x) => x[mapId])
          .indexOf(activeOption);

        if (currentActiveIndex > 0) {
          var itemId = items[currentActiveIndex - 1][mapId];
          // setActiveOption(itemId);
          setActiveOption(itemId);
          scrollUp(itemId);

          if (!isOptionsOpen) setSelectedOption(itemId);
        }
      }
    }
  };

  //========================== RENDER =============================================

  const themeProps = { color, size, theme, readOnly, disabled, isOptionsOpen };

  return (
    <>
      <Wrapper
        id={id}
        {...themeProps}
        className={className}
        style={style}
        ref={WrapperRef}
        {...rest}
      >
        <Container {...themeProps}>
          <Select
            {...themeProps}
            ref={selectRef}
            type="text"
            tabIndex={tabIndex}
            aria-haspopup="listbox"
            aria-expanded={isOptionsOpen}
            open={isOptionsOpen}
            onClick={toggleOptions}
            onChange={() => {}}
            onKeyDown={(e) => handleInputKeyDown(e)}
            onBlur={handleSelectBlur}
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
            data-id={id}
            aria-activedescendant={items.find(
              (x) => x[mapId] === selectedOption
            )}
            optionsCount={items.length}
            onScroll={(e) => {
              selectRef.current.focus();
            }}
          >
            {items.map((item, index) => (
              <Item
                {...themeProps}
                key={index}
                data-id={`${id}-${item[mapId]}`}
                tabIndex={-1}
                role="option"
                active={activeOption === item[mapId]}
                aria-selected={selectedOption === item[mapId]}
                onMouseEnter={(e) => handleItemEnter(e, item[mapId])}
                onClick={(e) => select(e, item[mapId])}
              >
                {item[mapValue]}
              </Item>
            ))}
          </List>
        </Container>
      </Wrapper>
    </>
  );
});

DropDown.defaultProps = {
  id: "",
  value: 0,
  disabled: false,
  readOnly: false,
  tabIndex: 0,
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
  tabIndex: PropTypes.number,
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
