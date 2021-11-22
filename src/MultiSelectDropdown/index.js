import React, { useState } from "react";
import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";
import theme from "../_utils/theme";
import PropTypes from "prop-types";
import Item from "./Item";
import FadeIn from "../FadeIn/FadeIn";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import "./animation.css";

const spin = keyframes`
    100% {
      transform: rotate(360deg);
    }

    0% {
      transform: rotate(0deg);
    }
`;

const getIconFontSize = (props) => {
  if (props.size === "small") return props.theme.typography.small.fontSize;
  if (props.size === "medium") return props.theme.typography.medium.fontSize;
  if (props.size === "large") return props.theme.typography.large.fontSize;
};

const inputPaddingBySize = (size) => {
  if (size === "small") return `0.25rem 0.375rem 0.125rem 0.375rem`;
  if (size === "medium") return `0.25rem 0.375rem 0.15rem 0.375rem`;
  if (size === "large") return `0.35rem 0.375rem 0.15rem 0.375rem`;
};

const iconPaddingBySize = (size) => {
  if (size === "small") return "0.3625rem 0.2rem 0.1625rem 0.1rem";
  if (size === "medium") return "0.45625rem 0.3rem 0.19375rem 0.3rem";
  if (size === "large") return "0.56875rem 0.4rem 0.25625rem 0.4rem";
};

const containerColor = (props) => {
  if (props.disable) return props.theme.palette.gray[200];

  if (props.focus) return "white";

  return props.theme.palette[props.color].lighter;
};

const Container = styled.div`
  display: inline-block;
  position: relative;
  box-sizing: border-box;
  border-bottom: 0.125rem solid
    ${(props) =>
      props.disabled
        ? props.theme.palette.gray[900]
        : props.theme.palette[props.color].main};
  background-color: ${(props) => containerColor(props)};
  border-radius: 0.125rem;
  width: 100%;
  transition: all 250ms ease;
`;

const Inner = styled.div``;

const ItemContainer = styled.div`
  display: flex;
  flex: 1 0 auto;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-content: flex-start;
  align-items: flex-start;
  transition: all 250ms ease;
  padding: 0.06875rem;
`;

const ItemWrapper = styled.div`
  margin: 0.05625rem;
  transition: all 250ms ease;

  order: 0;
  flex: 0 1 auto;
  align-self: auto;

  & > div {
    width: 100%;
  }
`;

const InputContainer = styled.div`
  box-sizing: border-box;
  margin: 0.0625rem;
  margin-left: 0.25rem;
  transition: all 250ms ease;
  order: 0;
  flex: 1 0 auto;
  align-self: auto;
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
  border-radius: 0.125rem;
`;

const Content = styled.div`
  display: flex;
  position: absolute;
  background-color: white;
  z-index: 1;
  margin-top: 0.25rem;
  padding: 0.1875rem;
  width: calc(100% - 0.625rem);
  border-radius: 0.15625rem;
  box-shadow: 0 0 0.375rem #bebebe;
  border: 0.125rem solid ${(props) => props.theme.palette[props.color].main};
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

const OpenClosedIcon = styled.div`
  padding: ${(props) => iconPaddingBySize(props.size)};
  color: ${(props) =>
    props.disabled
      ? props.theme.palette.gray.textLight
      : props.theme.palette[props.color].main};
  font-size: ${(props) => getIconFontSize(props)};
  transition: all 250ms ease;
  cursor: pointer;
  margin: 0.0625rem;
  cursor: ${(props) => (props.clickable ? "pointer" : "inherit")};
`;

const ClearIcon = styled.div`
  padding: ${(props) => iconPaddingBySize(props.size)};
  color: ${(props) =>
    props.disabled
      ? props.theme.palette.gray.textLight
      : props.theme.palette[props.color].main};
  font-size: ${(props) => getIconFontSize(props)};
  transition: all 250ms ease;
  cursor: pointer;
  margin: 0.0625rem;
`;

const LoadingIcon = styled.div`
  margin-left: auto;
  display: flex;

  align-items: center;
  justify-content: center;
  transition: all 250ms ease;
  font-size: 12px;
  color: ${(props) =>
    props.disabled
      ? props.theme.palette.gray.textLight
      : props.theme.palette[props.color].main};
  padding: ${(props) => iconPaddingBySize(props.size)};
  margin: 0.0625rem;
  animation: ${spin} 0.7s ease-in-out infinite;
`;

const InnerContainer = styled.div`
  display: flex;
  flex-wrap: no-wrap;
  align-items: stretch;
`;

const ItemsContent = styled.div`
  flex-grow: 1;
`;

const Controls = styled.div`
  display: flex;
`;

const MultiSelectDropdown = (props) => {
  const {
    items,
    options,
    load,
    onChange,
    clearOptions,
    loading,
    notItemsFoundText,
    disabled,
    id,
    className,
    size,
    color,
    theme,
  } = props;

  const [inFocus, setInFocus] = useState(false);
  const [value, setValue] = useState("");
  const [inputFocus, setInputFocus] = useState(false);
  const [cursor, setCursor] = useState(0);
  let InputRef = React.createRef();

  let themeProps = { size, color, theme, disabled };

  const onInputFocus = () => {
    setInputFocus(true);
  };

  const onKeyDown = (e) => {
    if (e.keyCode === 27) InputRef.current.blur();
    if (e.keyCode === 38 || e.keyCode === 40) e.preventDefault();

    if (e.keyCode === 38 && cursor > 0) setCursor(cursor - 1);

    if (e.keyCode === 40 && cursor < options.length - 1) setCursor(cursor + 1);

    if (e.key === "Enter" && options.length > 0 && value && value.length > 0) {
      optionSelected([...items, options[cursor]]);
    }

    let empty = options === null || (options !== null && options.length === 0);
    if (
      e.key === "Enter" &&
      inFocus &&
      empty &&
      loading === false &&
      value !== ""
    ) {
      onInputBlur();
    }

    if (e.key === "Backspace" && items.length > 0 && value === "") {
      handleRemoveItem(items.length - 1);
    }
  };

  const optionSelected = (items) => {
    onChange(id, items);
    setValue("");
    clearOptions(id);
    setInFocus(false);
    setCursor(0);
  };

  const onInputBlur = () => {
    setInFocus(false);
    setInputFocus(false);
    clearOptions(id);
  };

  const onInputChange = (e) => {
    setInFocus(true);
    setCursor(0);
    load(e.target.value);
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

  const getIcon = () => {
    return options !== null && options.length !== 0
      ? "chevron-down"
      : "chevron-left";
  };

  const renderOptions = () => {
    if (options !== null && options.length > 0 && inFocus) {
      return (
        <FadeIn>
          <Content {...themeProps}>
            {options.map((item, i) => {
              return (
                <ContentItem
                  {...themeProps}
                  key={i}
                  onMouseDown={() => optionSelected([...items, item])}
                  hover={cursor === i}
                >
                  {item.value}
                </ContentItem>
              );
            })}
          </Content>
        </FadeIn>
      );
    }

    let empty = options === null || (options !== null && options.length === 0);

    if (inFocus && empty && loading === false && value !== "") {
      return (
        <FadeIn>
          <Content {...themeProps} key={0}>
            <ContentItem
              {...themeProps}
              key={0}
              hover={true}
              onMouseDown={onInputBlur}
            >
              {notItemsFoundText}
            </ContentItem>
          </Content>
        </FadeIn>
      );
    }
  };

  return (
    <Container className={className} {...themeProps} focus={inputFocus}>
      <InnerContainer>
        <ItemsContent>
          <Inner {...themeProps}>
            <ItemContainer {...themeProps}>
              <TransitionGroup component={null}>
                {items.map((x, key) => (
                  <CSSTransition key={key} timeout={200} classNames="option-">
                    <ItemWrapper
                      {...themeProps}
                      key={key}
                      first={key === 0}
                      title={x.value}
                    >
                      <Item
                        {...themeProps}
                        id={x.id}
                        text={x.value}
                        onRemove={() => handleRemoveItem(key)}
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
                  onFocus={onInputFocus}
                  onBlur={onInputBlur}
                  onChange={onInputChange}
                  onKeyDown={onKeyDown}
                />
              </InputContainer>
            </ItemContainer>
          </Inner>
        </ItemsContent>

        <Controls>
          {items !== null && items.length > 0 && (
            <div>
              <ClearIcon {...themeProps}>
                <i
                  className="fas fa-times fa-fw"
                  onClick={() => onChange(id, [])}
                />
              </ClearIcon>
            </div>
          )}

          <div>
            {loading && (
              <LoadingIcon {...themeProps}>
                <i className={`fas fa-redo fa-fw`} />
              </LoadingIcon>
            )}

            {!loading && (
              <OpenClosedIcon
                {...themeProps}
                clickable={options == null || options.length === 0}
                onClick={() => {
                  if (options == null || options.length === 0) {
                    InputRef.current.focus();
                    setInFocus(true);
                    load(value);
                  }
                }}
              >
                <i className={`fas fa-${getIcon()} fa-fw`} />
              </OpenClosedIcon>
            )}
          </div>
        </Controls>
      </InnerContainer>

      {renderOptions()}
    </Container>
  );
};

MultiSelectDropdown.defaultProps = {
  id: "",
  disabled: false,
  load: () => {},
  onChange: () => {},
  clearOptions: () => {},
  items: [],
  options: [],
  className: "",
  size: "small",
  color: "primary",
  notItemsFoundText: "No items found...",
  theme: theme,
};

MultiSelectDropdown.propTypes = {
  theme: PropTypes.object.isRequired,
  id: PropTypes.any,
  disabled: PropTypes.bool,
  load: PropTypes.func,
  onChange: PropTypes.func,
  clearOptions: PropTypes.func,
  className: PropTypes.string,
  items: PropTypes.array,
  options: PropTypes.array,
  notItemsFoundText: PropTypes.string,
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

export default MultiSelectDropdown;
