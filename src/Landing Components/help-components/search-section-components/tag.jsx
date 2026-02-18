/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import { forwardRef } from "react";


import Chip from "../../../Data display/Chip/Chip";
import { TagsContainer } from "./style";

const SearchSectionTags = forwardRef(
  ({ tags = [], selectedTagCode = null, onSelectTag = () => {} }, ref) => {
    return (
      <TagsContainer ref={ref}>
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

export default SearchSectionTags;
