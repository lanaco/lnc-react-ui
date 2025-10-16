import { forwardRef, useState } from "react";

import PropTypes from "prop-types";

import FaqSectionTags from "../../Landing Components/help-components/faq-section-components/tag";
import FaqSectionItems from "../../Landing Components/help-components/faq-section-components/item";
import { Container } from "./style";

const FaqSection = forwardRef(
  (
    {
      title,
      description,
      questionText = "What do you think about this answer?",
      feedbackText = "Thank you for feedback!",
      showMoreText = "Show more",
      allTagText = "All",
      impressions = false,
      tags = [],
      items = [],
      onSelectItem = () => {},
      onImpressed = () => {},
    },
    ref
  ) => {
    const [selectedTagCode, setSelectedTagCode] = useState(null);

    const handleSelectTag = (tag) => {
      setSelectedTagCode(tag?.code);
    };

    return (
      <Container ref={ref}>
        <div className="section__heading">
          {title && <div className="section__title">{title}</div>}
          {description && (
            <div className="section__description">{description}</div>
          )}
        </div>
        <FaqSectionTags
          tags={tags}
          allTagText={allTagText}
          selectedTagCode={selectedTagCode}
          onSelectTag={handleSelectTag}
        />
        <FaqSectionItems
          key={`faq-section-items__${selectedTagCode}`}
          items={
            selectedTagCode === null
              ? items
              : items?.filter((x) => x?.tagCode === selectedTagCode)
          }
          questionText={questionText}
          feedbackText={feedbackText}
          showMoreText={showMoreText}
          impressions={impressions}
          onSelectItem={onSelectItem}
          onImpressed={onImpressed}
        />
      </Container>
    );
  }
);

FaqSection.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  tags: PropTypes.array,
  items: PropTypes.array,
  questionText: PropTypes.string,
  feedbackText: PropTypes.string,
  showMoreText: PropTypes.string,
  allTagText: PropTypes.string,
  impressions: PropTypes.bool,
  onSelectItem: PropTypes.func,
  onImpressed: PropTypes.func,
};

export default FaqSection;
