/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import { forwardRef, memo, useMemo } from "react";
import { GridWrapper } from "./style";
import useDetectMobile from "../../../_utils/useDetectMobile";
import { isDefinedNotEmptyString } from "../../../_utils/utils";
import { RegulatTitleSectionWrapper } from "../../style";
import Button from "../../../General/Button/Button";
import SimpleBlogCard from "../../../Landing Components/blog-components/simple-blog-card";
import SuspenseBlogSimple from "../../../Landing Components/skeleton-components/blog-skeletons/suspense-simple";

const MemoizedProductCard = memo(SimpleBlogCard);

const BlogsSectionSimple = forwardRef((props, ref) => {
  const {
    icon,
    title,
    onButtonAction = () => {},
    onSelectCard = () => {},
    buttonLink,
    items,
    buttonText,
    limit = 3,
    isLoading = false,
    getImage = () => {}
  } = props;

  const isMobile = useDetectMobile();
  const memoizedProducts = useMemo(() => {
    return (
      <>
        {isMobile === true
          ? items?.map((x, index) => (
              <MemoizedProductCard
                key={index}
                title={x?.title}
                imageUrl={getImage(x?.imageUrl, x?.uuid) || null}
                text={x?.description}
                titleSlug={x?.titleSlug}
                onCardClick={() => onSelectCard(x?.titleSlug)}
              />
            ))
          : items
              ?.slice(0, limit)
              .map((x, index) => (
                <MemoizedProductCard
                  key={index}
                  title={x?.title}
                  imageUrl={getImage(x?.imageUrl, x?.uuid) || null}
                  text={x?.description}
                  titleSlug={x?.titleSlug}
                  onCardClick={() => onSelectCard(x?.titleSlug)}
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
        {isDefinedNotEmptyString(buttonLink) && (
          <Button
            type="button"
            btnType="tinted"
            color="gray"
            onClick={() => onButtonAction(buttonLink)}
            borderRadius="curved"
          >
            {buttonText}
          </Button>
        )}
      </div>
      <GridWrapper limit={limit}>
        <SuspenseBlogSimple
          isLoading={isLoading}
          limit={limit}
          keyPrefix={"explore-landing"}
        >
          {memoizedProducts}
        </SuspenseBlogSimple>
      </GridWrapper>
    </RegulatTitleSectionWrapper>
  );
});

export default BlogsSectionSimple;
