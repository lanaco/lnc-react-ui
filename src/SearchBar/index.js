import React, { useState, useRef, useEffect } from "react";
import styled from "@emotion/styled";
import theme from "../_utils/theme";
import PropTypes from "prop-types";
import Bubble from "../Bubble";
import FadeIn from "../FadeIn/FadeIn";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import "./animation.css";

const Container = styled.div`
  display: inline-block;
  position: relative;
  box-sizing: border-box;
  border: 1.5px solid #bfbfbf;
  background-color: white;
  border-radius: 3px;
  width: 100%;
  transition: all 250ms ease;
`;

const ItemContainer = styled.div`
  padding: 4px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  flex-grow: 10;
  transition: all 250ms ease;

  scrollbar-width: none;
  &::-webkit-scrollbar {
    background: white;
    height: 0;
    width: 0;
  }
`;

const ItemWrapper = styled.div`
  display: inline-block;
  margin: 2px;
  flex-grow: 1;
  transition: all 250ms ease;

  & > div {
    width: 100%;
  }
`;

const InputContainer = styled.div`
  display: inline-block;
  box-sizing: border-box;
  margin: 2px;
  margin-left: 4px;
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
  padding: 6.5px;
  background-color: transparent;
  font-family: ${(props) => theme.typography.fontFamily};
  font-size: ${(props) => theme.typography["small"].fontSize};
  color: ${(props) => theme.palette["primary"].textDark};
  border-radius: 3px;
`;

const Inner = styled.div`
  display: flex;
  // align-items: center;
`;

const SearchIcon = styled.div`
  padding: 12px 8px 6px 8px;
  color: ${(props) => theme.palette["primary"].main};
  font-size: ${(props) => theme.typography["medium"].fontSize};
  background-color: whitesmoke;
  transition: all 250ms ease;
`;

const ClearIcon = styled.div`
  padding: 12px 8px 6px 8px;
  color: ${(props) => theme.palette["primary"].main};
  font-size: ${(props) => theme.typography["medium"].fontSize};
  background-color: whitesmoke;
  transition: all 250ms ease;
  cursor: pointer;
`;

const Content = styled.div`
  display: flex;
  position: absolute;
  background-color: white;
  z-index: 1;
  margin-top: 0.25rem;
  padding: 0.1875rem;
  width: 98.1%;
  border-radius: 0.15625rem;
  box-shadow: 0 0 0.375rem #bebebe;
  border: 0.125rem solid ${(props) => theme.palette["primary"].main};
  display: flex;
  flex-direction: column;
  transition: all 250ms ease;
`;

const ContentItem = styled.div`
  font-family: ${(props) => theme.typography.fontFamily};
  font-size: ${(props) => theme.typography["small"].fontSize};
  padding: 0.375rem;
  cursor: pointer;
  background-color: ${(props) => (props.hover ? "whitesmoke" : "inherit")};
  color: ${(props) =>
    props.hover ? theme.palette["primary"].main : "inherit"};

  &:hover {
    background-color: whitesmoke;
    color: ${(props) => theme.palette["primary"].main};
  }
`;

const SearchBar = (props) => {
  const {
    items,
    suggestions,
    onRemoveItem,
    onAddItem,
    onActivateItem,
    onDeactivateItem,
  } = props;

  const [value, setValue] = useState("");
  const [openSuggestions, setOpenSuggestions] = useState(true);
  let InputRef = React.createRef();

  const onKeyDown = (e) => {
    // let quickFilters = filterProps.filter((x) => x.showInQuickFilters === true);
    // if (e.keyCode === 38 && cursor > 0) {
    //   setCursor(cursor - 1);
    // }

    // if (e.keyCode === 40 && cursor < quickFilters.length - 1) {
    //   setCursor(cursor + 1);
    // }

    if (
      e.key === "Enter" &&
      suggestions.length === 0 &&
      value &&
      value.length > 0
    ) {
      onAddItem({
        id: 0,
        field: "mame",
        description: "Name",
        value: value,
        active: true,
      });
      setValue("");
    }

    if (e.key === "Backspace" && items.length > 0 && value === "") {
      onRemoveItem(items[items.length - 1]);
    }
  };

  const renderSuggestions = () => {
    if (openSuggestions) {
      return (
        <FadeIn>
          <Content>
            {suggestions.map((item, i) => {
              return (
                <ContentItem
                  key={i}
                  onMouseDown={() => console.log(item)}
                  hover={false}
                >
                  {item.description}
                </ContentItem>
              );
            })}
          </Content>
        </FadeIn>
      );
    }
  };

  return (
    <Container>
      <Inner>
        <SearchIcon>
          <i className="fas fa-search fa-fw"></i>
        </SearchIcon>
        <ItemContainer>
          <TransitionGroup component={null}>
            {items.map((x, key) => (
              <CSSTransition key={key} timeout={200} classNames="item">
                <ItemWrapper key={key} first={key === 0}>
                  <Bubble
                    id={x.id}
                    text={x.description}
                    additionalInfo={x.value}
                    inactive={!x.active}
                    onRemove={() => onRemoveItem(x)}
                    onClick={() => {
                      if (x.active) onDeactivateItem(x);
                      if (!x.active) onActivateItem(x);
                    }}
                  />
                </ItemWrapper>
              </CSSTransition>
            ))}
          </TransitionGroup>

          <InputContainer>
            <Input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={onKeyDown}
            />
          </InputContainer>
        </ItemContainer>

        <ClearIcon>
          <i className="fas fa-times fa-fw"></i>
        </ClearIcon>
      </Inner>

      {renderSuggestions()}
    </Container>
  );
};

export default SearchBar;
