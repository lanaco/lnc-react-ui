import React, { useState, useEffect, useRef, createRef } from "react";
import theme from "../_utils/theme";
import styled from "@emotion/styled";
import PropTypes from "prop-types";
import { keyframes } from "@emotion/react";
import FadeIn from "../FadeIn/FadeIn";

const paddingBySize = (size) => {
  if (size === "small") return "0.325rem 0.375rem";
  if (size === "medium") return "0.3875rem 0.375rem";
  if (size === "large") return "0.422375rem 0.375rem";
};

const heightBySize = (size) => {
  if (size === "small") return `1.5rem`;
  if (size === "medium") return `1.875rem`;
  if (size === "large") return `2.25rem`;
};

const spin = keyframes`
    100% {
      transform: rotate(360deg);
    }

    0% {
      transform: rotate(0deg);
    }
`;

const Container = styled.div`
  display: inline-block;
  position: relative;
  margin: 0;
  padding: 0;
  width: 100%;
  border-bottom: 0.125rem solid
    ${(props) => props.theme.palette["primary"].main};
  min-height: ${(props) => heightBySize(props.size)};
  max-height: ${(props) => heightBySize(props.size)};
  transition: all 250ms ease;
  border-radius: 0.125rem;
  background-color: ${(props) => props.theme.palette["primary"].lighter};
`;

const Inner = styled.div`
  display: flex;
`;

const InputContainer = styled.div`
  flex-grow: 1;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ButtonContainer = styled.div`
  margin-left: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 250ms ease;
  color: ${(props) => props.theme.palette[props.color].main};
  padding: 0 0.1875rem;
`;

const TimesButtonContainer = styled.div`
  margin-left: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 250ms ease;
  color: ${(props) => props.theme.palette[props.color].main};
  padding: 0 0.1875rem;
  cursor: pointer;
`;

const LoadingButtonContainer = styled.div`
  margin-left: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 250ms ease;
  color: ${(props) => props.theme.palette[props.color].main};
  padding: 0 0.1875rem;

  animation: ${spin} 0.7s ease-in-out infinite;
`;

const Input = styled.input`
  width: 100%;
  //   height: 100%;
  box-sizing: border-box;
  appearance: none;
  outline: none;
  border: none;
  transition: all 250ms ease;
  font-family: ${(props) => props.theme.typography.fontFamily};
  font-size: ${(props) => props.theme.typography[props.size].fontSize};
  background-color: ${(props) => props.theme.palette[props.color].lighter};
  color: ${(props) => props.theme.palette[props.color].textDark};
  padding: ${(props) => paddingBySize(props.size)};

  &:focus {
    background-color: white;
  }
`;

const Content = styled.div`
  display: flex;
  position: absolute;
  background-color: white;
  z-index: 1;
  margin-top: 0.0625rem;
  padding: 0.1875rem;
  width: 99%;
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

const usePrevious = (value) => {
  const ref = useRef();

  useEffect(() => {
    ref.current = value;
  });

  return ref.current;
};

const DropdownLookup = (props) => {
  const {
    initialValue,
    options,
    load,
    onChange,
    clear,
    loading,
    notItemsFoundText,
    disabled,
    tooltip,
    id,
    theme,
    size,
    color,
  } = props;

  const [inFocus, setInFocus] = useState(false);
  const [value, setValue] = useState("");
  const [selectedOption, setSelectedOption] = useState({});

  const previousInitialValue = usePrevious(initialValue);
  const [cursor, setCursor] = useState(0);
  let InputRef = createRef();

  const themeProps = {
    theme,
    color,
    size,
    disabled,
  };

  useEffect(() => {
    updateSelectedValue(initialValue);
  }, []);

  useEffect(() => {
    if (previousInitialValue === undefined)
      updateSelectedValue(initialValue, true);

    if (previousInitialValue && previousInitialValue.key !== initialValue.key)
      updateSelectedValue(initialValue, true);

    if (initialValue.key === "" && !inFocus) setValue("");
  }, [initialValue]);

  useEffect(() => {
    if (selectedOption && options.lenght === 0) {
      setValue(selectedOption.value);
    }
  }, [selectedOption]);

  const updateSelectedValue = (data, updateText = false) => {
    if (data && data.key) {
      setSelectedOption(data);
      if (updateText) setValue(data.value);
    } else {
      setSelectedOption({ key: "", value: "" });
      if (updateText) setValue("");
    }
  };

  const onTextChange = (e) => {
    setValue(e.target.value);
    setInFocus(true);
    load(e.target.value);
    setCursor(0);
  };

  const suggestionSelected = (item) => {
    updateSelectedValue(item, true);
    onChange(id, item);
    clear();
    setInFocus(false);
    setCursor(0);
  };

  const onBlur = () => {
    setInFocus(false);

    if (
      selectedOption &&
      selectedOption.key &&
      value !== selectedOption.value
    ) {
      setValue(selectedOption.value);
      clear();
    }

    if (!selectedOption || !selectedOption.key) {
      onClearSelection();
    }
  };

  const onClearSelection = () => {
    clear();
    setValue("");
    setSelectedOption({ key: "", value: "" });
    onChange(id, { key: "", value: "" });
    setCursor(0);
  };

  const onKeyDown = (e) => {
    if (e.keyCode === 27) {
      InputRef.current.blur();
    }

    if (options !== null && options.length !== 0 && inFocus) {
      if (e.keyCode === 38 && cursor > 0) {
        setCursor(cursor - 1);
      }

      //TODO: comment
      if (e.keyCode === 40 && cursor < options.length - 1) {
        setCursor(cursor + 1);
      }

      if (e.keyCode === 13) {
        suggestionSelected(options[cursor]);
      }
    } else if (e.keyCode === 40) {
      setInFocus(true);
      load(value);
    }
  };

  const getIcon = () => {
    return options !== null && options.length !== 0
      ? "chevron-down"
      : "chevron-left";
  };

  const renderSuggestions = () => {
    if (options !== null && options.length !== 0 && inFocus) {
      return (
        <FadeIn>
          <Content {...themeProps}>
            {options.map((item, i) => {
              return (
                <ContentItem
                  {...themeProps}
                  key={i}
                  onMouseDown={() => suggestionSelected(item)}
                  hover={i === cursor}
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
          <Content {...themeProps}>
            <Content {...themeProps} key={0} hover={true} onMouseDown={onBlur}>
              {notItemsFoundText}
            </Content>
          </Content>
        </FadeIn>
      );
    }
  };

  return (
    <Container {...themeProps}>
      <Inner {...themeProps}>
        <InputContainer {...themeProps}>
          <Input
            {...themeProps}
            ref={InputRef}
            autoComplete="off"
            id={id}
            type={"text"}
            value={value ?? ""}
            onChange={onTextChange}
            title={tooltip}
            onBlur={onBlur}
            onKeyDown={onKeyDown}
            onFocus={clear}
          />
        </InputContainer>

        {selectedOption && selectedOption.key && (
          <TimesButtonContainer {...themeProps} onClick={onClearSelection}>
            <i className={"fas fa-times fa-fw"} />
          </TimesButtonContainer>
        )}

        {loading && (
          <LoadingButtonContainer {...themeProps}>
            <i className={`fas fa-redo fa-fw`} />
          </LoadingButtonContainer>
        )}

        {!loading && (
          <ButtonContainer {...themeProps}>
            <i className={`fas fa-${getIcon()} fa-fw`} />
          </ButtonContainer>
        )}
      </Inner>

      {renderSuggestions()}
    </Container>
  );
};

DropdownLookup.defaultProps = {
  loading: false,
  initialValue: { key: 0, value: "" },
  options: [],
  id: "",
  theme: theme,
  disabled: false,
  load: () => {},
  onChange: () => {},
  load: () => {},
  clear: () => {},
  className: "",
  size: "small",
  color: "primary",
  value: "",
  notItemsFoundText: "No items found...",
};

DropdownLookup.propTypes = {
  theme: PropTypes.object.isRequired,
  id: PropTypes.string,
  loading: PropTypes.bool,
  options: PropTypes.array,
  disabled: PropTypes.bool,
  load: PropTypes.func,
  onChange: PropTypes.func,
  load: PropTypes.func,
  clear: PropTypes.func,
  className: PropTypes.string,
  initialValue: PropTypes.object,
  notItemsFoundText: PropTypes.string,
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

export default DropdownLookup;
