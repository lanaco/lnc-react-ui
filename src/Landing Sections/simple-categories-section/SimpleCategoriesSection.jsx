/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import { forwardRef, memo, useMemo } from "react";
import { GridWrapper, SectionWrapper } from "./style";
import useDetectMobile from "../../_utils/useDetectMobile";
import { isDefinedNotEmptyString } from "../../_utils/utils";
import Button from "../../General/Button/Button";
import CategorySimpleCard from "../../Landing Components/category-components/category-simple-card/CategorySimpleCard";
import SuspenseSimpleCategories from "../../Landing Components/skeleton-components/general/simple-categories";

const MemoizedCategoryCard = memo(CategorySimpleCard);

const SimpleCategoriesSection = forwardRef((props, ref) => {
  const {
    icon,
    iconColor = "var(--danger-600, #e53a35)",
    badge,
    showMoreAtEnd = false,
    title = "Shop by category",
    items,
    buttonText = "Shop now",
    buttonLink,
    limit = 12,
    onButtonAction = () => {},
    onSelectCard = () => {},
    isLoading = false,
    getImage = () => {},
    LinkComponent,
  } = props;

  const isMobile = useDetectMobile();
  const hasButton =
    isDefinedNotEmptyString(buttonText) && isDefinedNotEmptyString(buttonLink);
  const hasEndCta = showMoreAtEnd && hasButton;
  const EndCtaComponent = LinkComponent || "a";

  const memoizedProducts = useMemo(() => {
    return (
      <>
        {isMobile === true
          ? items?.map((x, index) => (
              <MemoizedCategoryCard
                {...x}
                key={index}
                uuid={x?.uuid}
                image={getImage(x?.image) || null}
                name={x?.name}
                code={x?.code}
                onSelectCard={() => onSelectCard?.(x?.uuid)}
                LinkComponent={LinkComponent}
              />
            ))
          : items
              ?.slice(0, limit)
              .map((x, index) => (
                <MemoizedCategoryCard
                  {...x}
                  key={index}
                  uuid={x?.uuid}
                  image={getImage(x?.image) || null}
                  name={x?.name}
                  code={x?.code}
                  onSelectCard={() => onSelectCard?.(x?.uuid)}
                  LinkComponent={LinkComponent}
                />
              ))}
      </>
    );
  }, [items, isMobile, limit]);

  return (
    <SectionWrapper ref={ref} className="lp-section lp-simple-categories-section">
      <div className="regular-title">
        <div className="regular-title-text">
          {isDefinedNotEmptyString(icon) && (
            <i className={icon} style={{ color: iconColor }} />
          )}
          {isDefinedNotEmptyString(title) && (
            <span className="section__title">{title}</span>
          )}
          {isDefinedNotEmptyString(badge) && (
            <span className="title-badge">
              <i className="mng-lnc-percentage" />
              {badge}
            </span>
          )}
        </div>
        {hasButton &&
          !showMoreAtEnd &&
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
        <GridWrapper limit={limit}>
          {memoizedProducts}
          {hasEndCta && (
            <EndCtaComponent
              className="end-cta"
              onClick={() => onButtonAction(buttonLink)}
              {...(LinkComponent
                ? { to: `/${buttonLink}` }
                : { href: `/${buttonLink}` })}
            >
              <span>{buttonText}</span>
              <span className="end-cta__icon">
                <i className="mng-lnc-arrow--right" />
              </span>
            </EndCtaComponent>
          )}
        </GridWrapper>
      </SuspenseSimpleCategories>
    </SectionWrapper>
  );
});

export default SimpleCategoriesSection;
