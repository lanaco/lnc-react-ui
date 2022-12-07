import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import PropTypes from "prop-types";
import React, { createRef, useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import FadeIn from "../FadeIn/FadeIn";
import theme from "../_utils/theme";

const paddingBySize = (size) => {
  if (size === "small") return "0.325rem 0.375rem";
  if (size === "medium") return "0.3875rem 0.375rem";
  if (size === "large") return "0.422375rem 0.375rem";
};

const heightBySize = (size, coefficient = 1) => {
  if (size === "small") return `${coefficient * 1.5}rem`;
  if (size === "medium") return `${coefficient * 1.875}rem`;
  if (size === "large") return `${coefficient * 2.25}rem`;
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
    ${(props) =>
    props.disabled
      ? props.theme.palette.gray[900]
      : props.theme.palette[props.color].main};
  min-height: ${(props) => heightBySize(props.size)};
  max-height: ${(props) => heightBySize(props.size)};
  transition: all 250ms ease;
  border-radius: 0.125rem;
  background-color: ${(props) =>
    props.disabled
      ? props.theme.palette.gray[200]
      : props.theme.palette[props.color].lighter};
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
  color: ${(props) =>
    props.disabled
      ? props.theme.palette.gray.textLight
      : props.theme.palette[props.color].main};
  padding: 0 0.1875rem;
  cursor: ${(props) => (props.clickable ? "pointer" : "inherit")};
`;

const TimesButtonContainer = styled.div`
  margin-left: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 250ms ease;
  color: ${(props) =>
    props.disabled
      ? props.theme.palette.gray.textLight
      : props.theme.palette[props.color].main};
  padding: 0 0.1875rem;
  cursor: pointer;
`;

const LoadingButtonContainer = styled.div`
  margin-left: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 250ms ease;
  color: ${(props) =>
    props.disabled
      ? props.theme.palette.gray.textLight
      : props.theme.palette[props.color].main};
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

  background-color: ${(props) =>
    props.disabled
      ? props.theme.palette.gray[200]
      : props.theme.palette[props.color].lighter};

  color: ${(props) =>
    props.disabled
      ? props.theme.palette.gray.textLight
      : props.theme.palette[props.color].textDark};
  padding: ${(props) => paddingBySize(props.size)};

  &:focus {
    background-color: white;
  }
`;

const Content = styled.div`
  display: flex;
  position: fixed;
  background-color: white;
  z-index: 1;
  margin-top: 0.0625rem;
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
    targetID
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

  useEffect(() => {

    const wheelListener = (e) => {
      setInFocus(false);
    };

    if (inFocus) {
      window.addEventListener("wheel", wheelListener);
    }
    else {
      window.removeEventListener("wheel", wheelListener);
    }
  }, [inFocus]);

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
    if (e.keyCode === 38 || e.keyCode === 40) e.preventDefault();

    if (e.keyCode === 27) {
      InputRef.current.blur();
      return;
    }

    if (options !== null && options.length !== 0 && inFocus) {
      if (e.keyCode === 38 && cursor > 0) setCursor(cursor - 1);

      if (e.keyCode === 40 && cursor < options.length - 1)
        setCursor(cursor + 1);

      if (e.keyCode === 13) suggestionSelected(options[cursor]);

      return;
    }

    if (e.keyCode === 40) {
      setInFocus(true);
      load(value);
    }

    if (e.keyCode === 13) {
      onBlur();
    }
  };

  const getIcon = () => {
    return options !== null && options.length !== 0
      ? "chevron-down"
      : "chevron-left";
  };

  const renderSuggestions = () => {

    const target = (targetID === undefined || targetID === null || targetID === "#" || targetID === "") ?
      null :
      ((targetID.startsWith('#')) ? document.querySelector(targetID) : document.querySelector("#" + targetID));

    if (!inFocus) {
      if (target !== null) {
        target.innerHTML = "";
      }
      return;
    }
    const el = document.createElement("div");

    const ddlContainerDOMRect = document.querySelector("#ddl_container" + id).getBoundingClientRect();
    const calculatedWidth = "" + ddlContainerDOMRect.width + "px";
    const calculatedLeft = "" + ddlContainerDOMRect.left + "px";
    const calculatedTop = "" + ddlContainerDOMRect.top + "px";
    el.style = `position: fixed;
    background-color: white;
    z-index: 2147483647 !important;
    transform: translateY( ${heightBySize(size)});
    left: ${calculatedLeft} !important;
    top: ${calculatedTop} !important;
    width: ${calculatedWidth};
    min-height: ${heightBySize(size)}`;

    if (options !== null && options.length > 0 && inFocus) {



      el.style = `position: fixed;
                  background-color: white;
                  z-index: 2147483647 !important;
                  transform: translateY( ${heightBySize(size)});
                  overflow: auto;
                  left: ${calculatedLeft} !important;
                  top: ${calculatedTop} !important;
                  width: ${calculatedWidth};
                  min-height: ${options.length > 5 ? heightBySize(size, 5) : heightBySize(size, options.length + 1)}`;

      if (target !== null) {
        target.appendChild(el);
      }

      return (
        ReactDOM.createPortal(
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
          </FadeIn>, el)
      );
    }

    let empty = options === null || (options !== null && options.length === 0);

    if (inFocus && empty && loading === false && value !== "") {
      if (target !== null) {
        target.appendChild(el);
      };
      return (
        ReactDOM.createPortal(
          <FadeIn>
            <Content {...themeProps} key={0}>
              <ContentItem
                {...themeProps}
                key={0}
                hover={true}
                onMouseDown={onBlur}
              >
                {notItemsFoundText}
              </ContentItem>
            </Content>
          </FadeIn>, el)
      );
    }
  };

  return (
    <Container id={"ddl_container" + id}{...themeProps}>
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

        {!loading && disabled ? '' : (
          <ButtonContainer
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
  load: () => { },
  onChange: () => { },
  clear: () => { },
  className: "",
  size: "small",
  color: "primary",
  value: "",
  notItemsFoundText: "No items found...",
  targetID: ""
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
  targetID: PropTypes.string
};

export default DropdownLookup;
