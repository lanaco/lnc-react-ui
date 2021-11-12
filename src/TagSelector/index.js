import React from "react";
import TagItem from "./TagItem";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import theme from "../_utils/theme";

const Container = styled.div`
  display: flex;
  width: fit-content;
  flex-direction: row;
  padding: 3px;
  border: 1.5px solid #bfbfbf80;
  border-radius: 2px;
  flex-wrap: wrap;
  justify-content: flex-start;
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
  } = props;

  const calculateSelectionForTag = (tagId) => {
    return selectedTags.find((item) => item === tagId) ? true : false;
  };

  const renderTags = () => {
    return tags.map((tag, i) => {
      console.log("tag[mapId]", tag[mapId], mapId);

      return (
        <TagItem
          key={i}
          text={tag[mapName]}
          id={tag[mapId]}
          toggleTagSelection={(id) => {
            console.log("id", id);
            toggleTagSelection(id);
          }}
          selected={calculateSelectionForTag(tag[mapId])}
          disabled={disabled}
          size={size}
          color={color}
          theme={theme}
        />
      );
    });
  };

  return (
    <Container {...{ size, color, theme }} className={className}>
      {renderTags()}
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
