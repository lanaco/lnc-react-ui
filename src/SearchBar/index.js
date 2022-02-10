import React, { useState } from "react";
import styled from "@emotion/styled";
import theme from "../_utils/theme";
import PropTypes from "prop-types";
import Chip from "../Chip";
import FadeIn from "../FadeIn/FadeIn";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import "./animation.css";

const getIconFontSize = (props) => {
  if (props.size === "small") return props.theme.typography.medium.fontSize;
  if (props.size === "medium") return props.theme.typography.large.fontSize;
  if (props.size === "large") return "1.3125rem";
};

const inputPaddingBySize = (size) => {
  if (size === "small") return `0.40625rem 0.375rem`;
  if (size === "medium") return `0.46875rem 0.375rem`;
  if (size === "large") return `0.53125rem 0.375rem`;
};

const iconPaddingBySize = (size) => {
  if (size === "small") return "0.625rem 0.5rem 0.375rem 0.5rem";
  if (size === "medium") return "0.71875rem 0.5625rem 0.375rem 0.5625rem";
  if (size === "large") return "0.78125rem 0.625rem 0.375rem 0.625rem";
};

const Container = styled.div`
  display: inline-block;
  position: relative;
  box-sizing: border-box;
  border: 0.09375rem solid #bfbfbf;
  background-color: white;
  border-radius: 0.1875rem;
  width: 100%;
  transition: all 250ms ease;
`;

const ItemContainer = styled.div`
  padding: 0.15rem;
  transition: all 250ms ease;
  display: inline-block;
`;

const ItemWrapper = styled.div`
  display: inline-block;
  margin: 0.125rem;
  flex-grow: 1;
  transition: all 250ms ease;
  width: fit-content;
  & > div {
    width: 100%;
  }
`;

const InputContainer = styled.div`
  display: inline-block;
  box-sizing: border-box;
  margin: 0.125rem;
  margin-left: 0.25rem;
  flex-grow: 1;
  transition: all 250ms ease;
`;

const Input = styled.input`
  width: 100%;
  transition: all 250ms ease;
  text-decoration: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  box-sizing: border-box;
  outline: none;
  border: none;
  padding: ${(props) => inputPaddingBySize(props.size)};
  background-color: transparent;
  font-family: ${(props) => props.theme.typography.fontFamily};
  font-size: ${(props) => props.theme.typography[props.size].fontSize};
  color: ${(props) => props.theme.palette[props.color].textDark};
  border-radius: 0.1875rem;
`;

const Inner = styled.div`
  display: flex;
  width: 100%;
`;

const SearchIcon = styled.div`
  padding: ${(props) => iconPaddingBySize(props.size)};
  color: ${(props) => props.theme.palette[props.color].main};
  font-size: ${(props) => getIconFontSize(props)};
  background-color: whitesmoke;
  transition: all 250ms ease;
`;

const ClearIcon = styled.div`
  padding: ${(props) => iconPaddingBySize(props.size)};
  color: ${(props) => props.theme.palette[props.color].main};
  font-size: ${(props) => getIconFontSize(props)};
  background-color: whitesmoke;
  transition: all 250ms ease;
  cursor: pointer;
  margin-right: 0;
  margin-left: auto;
`;

const Content = styled.div`
  position: absolute;
  background-color: white;
  z-index: 1;
  margin-top: 0.25rem;
  padding: 0.1875rem;
  width: calc(100% - 0.625rem);
  border-radius: 0.15625rem;
  box-shadow: 0 0 0.375rem #bebebe;
  border: 0.125rem solid ${(props) => props.theme.palette[props.color].main};
  display: flex;
  flex-direction: column;
  transition: all 250ms ease;
`;

const ContentItem = styled.div`
  font-family: ${(props) => props.theme.typography.fontFamily};
  font-size: ${(props) => props.theme.typography[props.size].fontSize};
  padding: 0.375rem;
  cursor: pointer;
  background-color: ${(props) => (props.hover ? "whitesmoke" : "inherit")};
  color: ${(props) =>
    props.hover ? props.theme.palette[props.color].main : "inherit"};

  &:hover {
    background-color: whitesmoke;
    color: ${(props) => props.theme.palette[props.color].main};
  }
`;

const SearchBar = (props) => {
  const {
    items,
    suggestions,
    onChange,
    id,
    className,
    size,
    color,
    theme,
  } = props;

  const [value, setValue] = useState("");
  const [openSuggestions, setOpenSuggestions] = useState(false);
  const [cursor, setCursor] = useState(0);
  let InputRef = React.createRef();

  let themeProps = { size, color, theme };

  const getGuid = () => {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
      (
        c ^
        (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
      ).toString(16)
    );
  };

  const onKeyDown = (e) => {
    if (e.keyCode === 27) InputRef.current.blur();
    if (e.keyCode === 38 || e.keyCode === 40) e.preventDefault();

    if (e.keyCode === 38 && cursor > 0) setCursor(cursor - 1);

    if (e.keyCode === 40 && cursor < suggestions.length - 1)
      setCursor(cursor + 1);

    if (
      e.key === "Enter" &&
      suggestions.length > 0 &&
      value &&
      value.length > 0
    ) {
      suggestionSelected(suggestions[cursor]);
    }

    if (e.key === "Backspace" && items.length > 0 && value === "") {
      handleRemoveItem(items.length - 1);
    }
  };

  const suggestionSelected = (suggestion) => {
    handleAddItem({
      id: getGuid(),
      field: suggestion.field,
      description: suggestion.description,
      value: value,
      active: true,
      dataType: suggestion.dataType,
      operation: suggestion.operation,
      operationDescription: suggestion.operationDescription,
    });

    setValue("");
    setOpenSuggestions(false);
    setCursor(0);
  };

  const onInputBlur = () => {
    setOpenSuggestions(false);
  };

  const onInputChange = (e) => {
    setOpenSuggestions(true);
    setCursor(0);
    setValue(e.target.value);
  };

  const handleRemoveItem = (index) => {
    let removedItem = [...items].find((_, i) => i !== index);

    onChange(
      id,
      [...items].filter((_, i) => i !== index),
      removedItem
    );
  };

  const handleAddItem = (item) => {
    onChange(id, [...items, item], item);
  };

  const handleActiveInactive = (index) => {
    let copy = [...items];
    copy[index] = { ...copy[index], active: !copy[index].active };

    onChange(id, copy, copy[index]);
  };

  const renderSuggestions = () => {
    if (openSuggestions) {
      return (
        <FadeIn>
          <Content {...themeProps}>
            {suggestions.map((item, i) => {
              return (
                <ContentItem
                  {...themeProps}
                  key={i}
                  onMouseDown={() => suggestionSelected(item)}
                  hover={cursor === i}
                >
                  {`${item.description} - ${item.operationDescription}`}
                </ContentItem>
              );
            })}
          </Content>
        </FadeIn>
      );
    }
  };

  return (
    <Container className={className} {...themeProps}>
      <Inner {...themeProps}>
        <SearchIcon {...themeProps}>
          <i className="fas fa-search fa-fw"></i>
        </SearchIcon>
        <ItemContainer {...themeProps}>
          <TransitionGroup component={null}>
            {items.map((x, key) => (
              <CSSTransition key={key} timeout={200} classNames="item">
                <ItemWrapper
                  {...themeProps}
                  key={key}
                  first={key === 0}
                  title={`${x.description} - ${x.operationDescription}:  ${x.value}`}
                >
                  <Chip
                    {...themeProps}
                    id={x.id}
                    text={x.description}
                    additionalInfo={x.value}
                    inactive={!x.active}
                    onRemove={() => handleRemoveItem(key)}
                    onClick={() => handleActiveInactive(key)}
                  />
                </ItemWrapper>
              </CSSTransition>
            ))}
          </TransitionGroup>

          <InputContainer {...themeProps}>
            <Input
              {...themeProps}
              ref={InputRef}
              value={value}
              onBlur={onInputBlur}
              onChange={onInputChange}
              onKeyDown={onKeyDown}
            />
          </InputContainer>
        </ItemContainer>
        <ClearIcon {...themeProps}>
          <i className="fas fa-times fa-fw" onClick={() => onChange(id, [])} />
        </ClearIcon>
      </Inner>

      {renderSuggestions()}
    </Container>
  );
};

SearchBar.defaultProps = {
  id: "",
  onChange: () => {},
  items: [],
  suggestions: [],
  className: "",
  size: "small",
  color: "primary",
  theme: theme,
};

SearchBar.propTypes = {
  theme: PropTypes.object.isRequired,
  id: PropTypes.any,
  onChange: PropTypes.func,
  className: PropTypes.string,
  items: PropTypes.array,
  suggestions: PropTypes.array,
  size: PropTypes.oneOf(["small", "medium", "large"]),
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "success",
    "error",
    "warning",
    "gray",
    "background",
    "transparent",
  ]),
};

export default SearchBar;
