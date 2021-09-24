import React from "react";
import styles from "./styles.module.css";
import TagItem from "./TagItem";

const TagSelector = (props) => {
  const emptyFunc = () => {};

  const {
    tagsData = [],
    toggleTagSelection = emptyFunc,
    selectedTags = [],
    disabled = false,
  } = props;

  const calculateSelectionForTag = (tagId) => {
    return selectedTags.find((item) => item === tagId) ? true : false;
  };

  const calculateTagItems = () => {
    return tagsData.map((tag, i) => (
      <TagItem
        key={i}
        text={tag.code}
        id={tag.id}
        toggleTagSelection={toggleTagSelection}
        selected={calculateSelectionForTag(tag.id)}
        disabled={disabled}
      />
    ));
  };

  return <div className={styles.tagSelector}>{calculateTagItems()}</div>;
};

export default TagSelector;
