/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import { forwardRef, memo, useMemo } from "react";
import { GridWrapper } from "./style";
import useDetectMobile from "../../_utils/useDetectMobile";
import { isDefinedNotEmptyString } from "../../_utils/utils";
import { RegulatTitleSectionWrapper } from "../style";
import Button from "../../General/Button/Button";
import CategorySimpleCard from "../../Landing Components/category-components/category-simple-card/CategorySimpleCard";
import SuspenseSimpleCategories from "../../Landing Components/skeleton-components/general/simple-categories";

const MemoizedCategoryCard = memo(CategorySimpleCard);

const SimpleCategoriesSection = forwardRef((props, ref) => {
  const {
    icon,
    title = "Shop by category",
    items,
    buttonText = "Shop now",
    buttonLink,
    limit = 12,
    onButtonAction = () => {},
    onSelectCard = () => {},
    isLoading = false,
    getImage = () => {},
  } = props;

  const isMobile = useDetectMobile();

  const memoizedProducts = useMemo(() => {
    return (
      <>
        {isMobile === true
          ? items?.map((x, index) => (
              <MemoizedCategoryCard
                key={index}
                uuid={x?.uuid}
                image={getImage(x?.image) || null}
                name={x?.name}
                onSelectCard={() => onSelectCard?.(x?.uuid)}
              />
            ))
          : items
              ?.slice(0, limit)
              .map((x, index) => (
                <MemoizedCategoryCard
                  key={index}
                  uuid={x?.uuid}
                  image={getImage(x?.image) || null}
                  name={x?.name}
                  onSelectCard={() => onSelectCard?.(x)}
                />
              ))}
      </>
    );
  }, [items]);

  return (
    <RegulatTitleSectionWrapper ref={ref}>
      <div className="regular-title">
        <div className="regular-title-text">
          {isDefinedNotEmptyString(icon) && <i className={icon} />}
          <span>{title}</span>
        </div>
        {isDefinedNotEmptyString(buttonText) &&
          isDefinedNotEmptyString(buttonLink) &&
          !isLoading && (
            <Button
              type="button"
              btnType="tinted"
              color="neutral"
              onClick={(e) => {
                e?.target?.blur();
                onButtonAction(buttonLink);
              }}
              borderRadius="curved"
              className="button-link"
            >
              {buttonText}
            </Button>
          )}
      </div>
      <SuspenseSimpleCategories
        isLoading={isLoading}
        keyPrefix="simple-categories-skeleton"
      >
        <GridWrapper limit={limit}>{memoizedProducts}</GridWrapper>
      </SuspenseSimpleCategories>
    </RegulatTitleSectionWrapper>
  );
});

export default SimpleCategoriesSection;
