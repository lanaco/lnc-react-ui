/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import { forwardRef, useState } from "react";
import ToggleSectionOptions from "../../Landing Components/help-components/toggle-section-components/option";
import ToggleSectionItems from "../../Landing Components/help-components/toggle-section-components/item";
import { Container } from "./style";

const ToggleSection = forwardRef(
  (
    {
      title,
      description,
      showMoreText = "Show more",
      learnMoreText = "Learn more",
      options = [],
      items = [],
      onSelectItem = () => {},
      LinkComponent,
    },
    ref
  ) => {
    const [selectedOptionCode, setSelectedOptionCode] = useState(0);

    const handleSelectOption = (optionIdx) => {
      setSelectedOptionCode(optionIdx);
    };

    return (
      <Container ref={ref}>
        <div className="section__heading">
          {title && <div className="section__title">{title}</div>}
          {description && (
            <div className="section__description">{description}</div>
          )}
        </div>
        <ToggleSectionOptions
          options={options}
          selectedOptionCode={selectedOptionCode}
          onSelectOption={handleSelectOption}
          LinkComponent={LinkComponent}
        />
        <ToggleSectionItems
          key={`toggle-section-items__${selectedOptionCode}`}
          items={items?.[selectedOptionCode]}
          showMoreText={showMoreText}
          learnMoreText={learnMoreText}
          onSelectItem={onSelectItem}
          LinkComponent={LinkComponent}
        />
      </Container>
    );
  }
);

export default ToggleSection;
