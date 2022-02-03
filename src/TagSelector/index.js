import React, { useState } from "react";
import TagItem from "./TagItem";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import theme from "../_utils/theme";
import Button from "../Button/index.js";

const Container = styled.div`
  display: flex;
  width: fit-content;
  flex-direction: row;
  padding: 3px;
  border: 1.5px solid #bfbfbf80;
  border-radius: 2px;
  flex-wrap: wrap;
  justify-content: flex-start;
  font-family: ${theme.typography.fontFamily};
`;

const ButtonContainer = styled.div`
  margin: 3px;
`;

const PageNumber = styled.div`
  font-size: calc(
    ${(props) => props.theme.typography[props.size].fontSize} + 3px
  );
  margin: 3px 5px;
`;

const Table = styled.div`
  display: flex;
  flex-direction: column;
`;

const FooterRow = styled.div`
  display: flex;
  // flex-direction: row;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;

  border: 1.7px solid #80808060;
  background-color: whitesmoke;
  border-radius: 0.175rem;
  padding: 3px;

  margin-top: 8px;
`;

const Body = styled.div`
  display: flex;
  flex-direction: row;
  &::-webkit-scrollbar {
    background: white;
    height: 0;
    width: 0;
  }
  overflow: auto;
  height: ${(props) =>
    props.height && props.height !== "" ? props.height : "auto"};
`;

const TagSelector = (props) => {
  const {
    tags = [],
    selectedTags = [],
    toggleTagSelection,
    disabled = false,
    size,
    color,
    theme,
    mapId,
    mapName,
    className,
    pagination,
    height,
    width,
    displayedItemsCount,
  } = props;

  let themeProps = { theme, size, color, height, width };
  const [page, setPage] = useState(1);
  const pageCount = Math.floor(tags.length / displayedItemsCount) + 1;

  let _tags = pagination
    ? tags.slice((page - 1) * displayedItemsCount, page * displayedItemsCount)
    : tags;

  const calculateSelectionForTag = (tagId) => {
    return selectedTags.find((item) => item === tagId) ? true : false;
  };

  const renderTags = () => {
    return (
      <Body {...themeProps}>
        {_tags.map((tag, i) => (
          <TagItem
            {...themeProps}
            key={i}
            text={tag[mapName]}
            id={tag[mapId]}
            toggleTagSelection={toggleTagSelection}
            selected={calculateSelectionForTag(tag[mapId])}
            disabled={disabled}
            size={size}
            color={color}
            theme={theme}
          />
        ))}
      </Body>
    );
  };

  return (
    <Container {...themeProps} className={className}>
      <Table>
        {renderTags()}
        {pagination && (
          <FooterRow>
            <ButtonContainer>
              <Button
                {...themeProps}
                icon="angle-double-left"
                onClick={() => setPage(1)}
                disabled={page === 1 || disabled}
              />
            </ButtonContainer>

            <ButtonContainer>
              <Button
                {...themeProps}
                icon="angle-left"
                onClick={() => setPage(page - 1)}
                disabled={page === 1 || disabled}
              />
            </ButtonContainer>

            <PageNumber {...themeProps}>{`${page}/${pageCount}`}</PageNumber>

            <ButtonContainer>
              <Button
                {...themeProps}
                icon="angle-right"
                onClick={() => setPage(page + 1)}
                disabled={page === pageCount || disabled}
              />
            </ButtonContainer>

            <ButtonContainer>
              <Button
                {...themeProps}
                icon="angle-double-right"
                onClick={() => setPage(pageCount)}
                disabled={page === pageCount || disabled}
              />
            </ButtonContainer>
          </FooterRow>
        )}
      </Table>
    </Container>
  );
};

TagSelector.defaultProps = {
  id: "",
  disabled: false,
  className: "",
  size: "small",
  color: "primary",
  theme: theme,
  tags: [],
  selectedTags: [],
  toggleTagSelection: () => {},
  mapId: "id",
  mapName: "name",
  displayedItemsCount: 7,
  pagination: true,
};

TagSelector.propTypes = {
  theme: PropTypes.object.isRequired,
  id: PropTypes.string,
  tags: PropTypes.array,
  selectedTags: PropTypes.array,
  toggleTagSelection: PropTypes.func,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  mapId: PropTypes.string,
  mapName: PropTypes.string,
  displayedItemsCount: PropTypes.number,
  pagination: PropTypes.bool,
  size: PropTypes.oneOf(["small", "medium", "large"]),
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "success",
    "error",
    "warning",
    "gray",
    "background",
  ]),
};

export default TagSelector;
