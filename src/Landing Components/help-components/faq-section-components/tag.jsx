/* eslint-disable react/display-name */
import { forwardRef } from "react";

import PropTypes from "prop-types";

import Chip from "../../../Data display/Chip/Chip";
import { TagsContainer } from "./style";

const FaqSectionTags = forwardRef(
  (
    { tags = [], allTagText, selectedTagCode = null, onSelectTag = () => {} },
    ref
  ) => {
    return (
      <TagsContainer ref={ref} className="section__tags">
        {[{ name: allTagText, code: null }, ...tags]?.map((tag, idx) => (
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
  allTagText: PropTypes.string,
  onSelectTag: PropTypes.func,
};

export default FaqSectionTags;
