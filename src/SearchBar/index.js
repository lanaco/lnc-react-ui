import React, { useState, useRef, useEffect } from "react";
import styled from "@emotion/styled";
import theme from "../_utils/theme";
import PropTypes from "prop-types";
import Bubble from "../Bubble";

function useHorizontalScroll() {
  const elRef = useRef();
  useEffect(() => {
    const el = elRef.current;
    if (el) {
      const onWheel = (e) => {
        if (e.deltaY == 0) return;
        e.preventDefault();
        el.scrollTo({
          left: el.scrollLeft + e.deltaY,
          behavior: "smooth",
        });
      };
      el.addEventListener("wheel", onWheel);
      return () => el.removeEventListener("wheel", onWheel);
    }
  }, []);
  return elRef;
}

const Container = styled.div`
  display: inline-block;
  box-sizing: border-box;
  border-bottom: 0.125rem solid ${(props) => theme.palette["primary"].main};
  background-color: ${(props) => theme.palette["primary"].lighter};
  border-radius: 2.5px;
`;

const ItemContainer = styled.div`
  width: 330px;
  padding: 4px;
  display: flex;
  align-items: center;
  flex-direction: row;
  flex-wrap: nowrap;
  overflow-x: auto;

  scrollbar-width: none;
  &::-webkit-scrollbar {
    background: white;
    height: 0;
    width: 0;
  }
`;

const InputContainer = styled.div`
  display: inline-block;
  margin-left: 4px;
`;

const ItemWrapper = styled.div`
  display: inline-block;
  margin: 0 0 0 4px;
`;

const Input = styled.input`
  min-width: 120px;
  max-width: 120px;
  text-decoration: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  outline: none;
  border: none;
  padding: 5px;
  background-color: transparent;
  font-family: ${(props) => theme.typography.fontFamily};
  font-size: ${(props) => theme.typography["small"].fontSize};
  color: ${(props) => theme.palette["primary"].textDark};
`;

const SearchIcon = styled.div`
  padding: 0 2px 0 8px;
  font-size: ${(props) => theme.typography["medium"].fontSize};
  color: ${(props) => theme.palette["primary"].main};
`;

const ClearIcon = styled.div``;

const Inner = styled.div`
  display: flex;
  align-items: center;
`;

const SearchBar = (props) => {
  const scrollRef = useHorizontalScroll();

  const {
    items = [
      { id: 1, text: "text 1" },
      { id: 2, text: "text 2" },
      { id: 3, text: "text 3" },
      { id: 4, text: "text 4" },
      { id: 5, text: "text 5" },
      { id: 6, text: "text 6" },
    ],
  } = props;

  return (
    <Container>
      <Inner>
        <SearchIcon>
          <i class="fas fa-search"></i>
        </SearchIcon>

        <ItemContainer ref={scrollRef}>
          {items.map((x) => (
            <ItemWrapper>
              <Bubble id={x.id} text={x.text} />
            </ItemWrapper>
          ))}

          <InputContainer>
            <Input />
          </InputContainer>
        </ItemContainer>
      </Inner>
    </Container>
  );
};

export default SearchBar;
