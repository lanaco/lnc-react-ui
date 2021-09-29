import React, { useState, useRef, useEffect } from "react";
import styled from "@emotion/styled";
import theme from "../_utils/theme";
import PropTypes from "prop-types";
import Bubble from "../Bubble";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import "./animation.css";

const Container = styled.div`
  display: inline-block;
  box-sizing: border-box;
  border: 1.5px solid #bfbfbf80;
  background-color: white;
  border-radius: 3px;
`;

const ItemContainer = styled.div`
  padding: 4px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

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
`;

const Input = styled.input`
  width: 100%;
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
  align-items: center;
`;

const SearchBar = (props) => {
  const {
    items,
    suggestions = [{}],
    onRemoveItem,
    onAddItem,
    onActivateItem,
    onDeactivateItem,
  } = props;

  const [value, setValue] = useState("");

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
      onAddItem({ id: 0, text: value, active: true });
      setValue("");
    }

    if (e.key === "Backspace" && items.length > 0 && value === "") {
      onRemoveItem(items[items.length - 1]);
    }
  };

  return (
    <Container>
      <Inner>
        <ItemContainer>
          <TransitionGroup component={null}>
            {items.map((x, key) => (
              <CSSTransition key={key} timeout={200} classNames="item">
                <ItemWrapper key={key} first={key === 0}>
                  <Bubble
                    id={x.id}
                    text={x.text}
                    inactive={!x.active}
                    onClick={() => {
                      if (x.active) onDeactivateItem(x);
                      if (!x.active) onActivateItem(x);
                    }}
                    onRemove={() => onRemoveItem(x)}
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
      </Inner>
    </Container>
  );
};

export default SearchBar;
