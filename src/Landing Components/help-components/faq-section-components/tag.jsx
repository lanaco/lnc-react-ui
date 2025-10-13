import { forwardRef } from "react";

import PropTypes from "prop-types";

import Chip from "../../../Data display/Chip/Chip";
import { TagsContainer } from "./style";

const FaqSectionTags = forwardRef(
  ({ tags = [], selectedTagCode = null, onSelectTag = () => {} }, ref) => {
    return (
      <TagsContainer>
        {tags?.map((tag, idx) => (
          <Chip
            key={`faq-section-tag__${idx + 1}`}
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

FaqSectionTags.propTypes = {
  tags: PropTypes.array,
  onSelectTag: PropTypes.func,
};

export default FaqSectionTags;
