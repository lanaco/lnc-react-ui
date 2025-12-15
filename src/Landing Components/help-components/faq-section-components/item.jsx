import { forwardRef, useMemo, useState } from "react";

import PropTypes from "prop-types";

import useDetectMobile from "../../../_utils/useDetectMobile";
import Icon from "../../../General/Icon/Icon";
import IconButton from "../../../General/IconButton/IconButton";
import Button from "../../../General/Button/Button";
import { ItemContainer, ItemsContainer } from "./style";

const FaqSectionItem = ({
  title,
  description,
  questionText,
  feedbackText,
  impressions = false,
  onSelectItem = () => {},
  onImpressed = () => {},
}) => {
  const [expanded, setExpanded] = useState(false);
  const [impressed, setImpressed] = useState(false);

  const handleExpanded = () => {
    setExpanded((value) => !value);

    onSelectItem();
  };

  const handleImppressed = (e, value) => {
    e?.stopPropagation();

    setImpressed(true);

    onImpressed(value);
  };

  return (
    <ItemContainer
      className={expanded ? "expanded" : ""}
      onClick={handleExpanded}
    >
      <div className="card__heading">
        <div className="card__title">{title}</div>
        <Icon
          icon={expanded ? " mng-lnc-subtract" : " mng-lnc-add"}
          sizeInUnits="1.25rem"
          className="card__icon"
        />
      </div>
      {expanded && (
        <>
          <div className="card__description">{description}</div>
          {impressions && (
            <>
              {impressed ? (
                <div className="card__impression feedback">
                  <Icon
                    icon=" mng-lnc-checkmark--outline"
                    sizeInUnits="1.25rem"
                    color="success"
                  />
                  <div className="imppression__question">{feedbackText}</div>
                </div>
              ) : (
                <div className="card__impression">
                  <div className="imppression__question">{questionText}</div>
                  <div className="impression__actions">
                    <IconButton
                      icon=" mng-lnc-thumbs-up"
                      borderRadius="curved"
                      btnType="outline"
                      onClick={(e) => handleImppressed(e, true)}
                    />
                    <IconButton
                      icon=" mng-lnc-thumbs-down"
                      borderRadius="curved"
                      btnType="outline"
                      onClick={(e) => handleImppressed(e, false)}
                    />
                  </div>
                </div>
              )}
            </>
          )}
        </>
      )}
    </ItemContainer>
  );
};

const FaqSectionItems = forwardRef(
  (
    {
      items = [],
      questionText,
      feedbackText,
      showMoreText,
      impressions = false,
      onSelectItem = () => {},
      onImpressed = () => {},
    },
    ref
  ) => {
    const isMobile = useDetectMobile();

    const [showMore, setShowMore] = useState(false);

    const handleShowMore = () => {
      setShowMore((prev) => !prev);
    };

    const memoizedItems = useMemo(() => {
      if (isMobile) {
        return items?.map((item, idx) => (
          <FaqSectionItem
            key={`faq-section-item__${idx + 1}`}
            title={item?.title}
            description={item?.description}
            questionText={questionText}
            feedbackText={feedbackText}
            impressions={impressions}
            onSelectItem={() => onSelectItem(item)}
            onImpressed={(value) => onImpressed(item, value)}
          />
        ));
      }

      const leftItems = [];
      const rightItems = [];

      items?.forEach((item, idx) => {
        if (idx % 2 === 0) {
          leftItems.push(
            <FaqSectionItem
              key={`faq-section-item__${idx + 1}`}
              title={item?.title}
              description={item?.description}
              questionText={questionText}
              feedbackText={feedbackText}
              impressions={impressions}
              onSelectItem={() => onSelectItem(item)}
              onImpressed={(value) => onImpressed(item, value)}
            />
          );
        } else {
          rightItems.push(
            <FaqSectionItem
              key={`faq-section-item__${idx + 1}`}
              title={item?.title}
              description={item?.description}
              questionText={questionText}
              feedbackText={feedbackText}
              impressions={impressions}
              onSelectItem={() => onSelectItem(item)}
              onImpressed={(value) => onImpressed(item, value)}
            />
          );
        }
      });

      return (
        <>
          <div className="section__column">{leftItems}</div>
          <div className="section__column">{rightItems}</div>
        </>
      );
    }, [items, isMobile]);

    return (
      <ItemsContainer ref={ref}>
        {isMobile ? (
          showMore ? (
            memoizedItems
          ) : (
            <>
              {memoizedItems?.slice(0, 4)}
              {memoizedItems?.length > 4 && (
                <Button
                  text={showMoreText}
                  btnType="basic"
                  color="neutral"
                  className="section__show-more"
                  onClick={handleShowMore}
                />
              )}
            </>
          )
        ) : (
          memoizedItems
        )}
      </ItemsContainer>
    );
  }
);

FaqSectionItem.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  questionText: PropTypes.string,
  feedbackText: PropTypes.string,
  showMoreText: PropTypes.string,
  impressions: PropTypes.bool,
  onSelectItem: PropTypes.func,
  onImpressed: PropTypes.func,
};

FaqSectionItems.propTypes = {
  items: PropTypes.array,
  questionText: PropTypes.string,
  feedbackText: PropTypes.string,
  showMoreText: PropTypes.string,
  impressions: PropTypes.bool,
  onSelectItem: PropTypes.func,
  onImpressed: PropTypes.func,
};

export default FaqSectionItems;
