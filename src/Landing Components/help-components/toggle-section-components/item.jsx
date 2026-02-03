/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import { forwardRef, useMemo, useState } from "react";
import useDetectMobile from "../../../_utils/useDetectMobile";
import Button from "../../../General/Button/Button";
import { ItemContainer, ItemsContainer } from "./style";

const ToggleSectionItem = ({
  title,
  description,
  image,
  learnMoreText,
  onSelectItem = () => {},
  LinkComponent,
  link
}) => {
  const Component = LinkComponent || "a";

  return (
    <ItemContainer
      onClick={onSelectItem}
      as={Component}
      {...(LinkComponent
        ? { to: `/${link}` }
        : { href: `/${link}` })}
    >
      <div className="card__content">
        <img src={image} alt={`Card ${title}`} className="card__image" />
        <div className="card__text">
          <div className="card__title">{title}</div>
          <div className="card__divider"></div>
          <div className="card__description">{description}</div>
        </div>
      </div>
      <Button
        text={learnMoreText}
        btnType="basic"
        color="neutral"
        className="section__show-more learn-more"
      />
    </ItemContainer>
  );
};

const ToggleSectionItems = forwardRef(
  (
    {
      items = [],
      showMoreText,
      learnMoreText,
      onSelectItem = () => {},
      LinkComponent,
    },
    ref,
  ) => {
    const isMobile = useDetectMobile();

    const [showMore, setShowMore] = useState(false);

    const handleShowMore = () => {
      setShowMore((prev) => !prev);
    };

    const memoizedItems = useMemo(() => {
      return items?.map((item, idx) => (
        <ToggleSectionItem
          key={`toggle-section-item__${idx + 1}`}
          title={item?.title}
          description={item?.description}
          image={item?.image}
          learnMoreText={learnMoreText}
          onSelectItem={() => onSelectItem(item)}
          LinkComponent={LinkComponent}
          link={item?.link}
        />
      ));
    }, [items]);

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
  },
);

export default ToggleSectionItems;
