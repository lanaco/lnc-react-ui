/* eslint-disable react/display-name */
import { forwardRef } from "react";

import PropTypes from "prop-types";

import Chip from "../../../Data display/Chip/Chip";
import { TagsContainer } from "./style";

const SearchSectionTags = forwardRef(
  ({ tags = [], selectedTagCode = null, onSelectTag = () => {} }, ref) => {
    return (
      <TagsContainer>
        {tags?.map((tag, idx) => (
          <Chip
            key={`search-section-tag__${idx + 1}`}
            label={tag?.name}
            borderRadius="curved"
            color="neutral"
            className={`tags__item ${
              selectedTagCode === tag?.code ? "active" : ""
            }`}
            onClick={() => {
              onSelectTag(tag);
            }}
          />
        ))}
      </TagsContainer>
    );
  }
);

SearchSectionTags.propTypes = {
  tags: PropTypes.array,
  onSelectTag: PropTypes.func,
};

export default SearchSectionTags;
