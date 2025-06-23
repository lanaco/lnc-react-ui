import { forwardRef, memo, useMemo } from "react";
import { GridWrapper } from "./style";
import useDetectMobile from "../../../_utils/useDetectMobile";
import { isDefinedNotEmptyString } from "../../../_utils/utils";
import { RegulatTitleSectionWrapper } from "../../style";
import Button from "../../../General/Button/Button";

import BlogCardDetailed from "../../../Landing Components/blog-components/blog-card-detailed";
import SuspenseBlogDetailed from "../../../Landing Components/skeleton-components/blog-skeletons/suspense-detailed";

const MemoizedProductCard = memo(BlogCardDetailed);

const BlogsSectionDetailed = forwardRef((props, ref) => {
  const {
    icon,
    title,
    onButtonAction,
    items,
    buttonText,
    limit = 3,
    onSelectCard = () => {},
    isLoading = false,
    onSectionClick = () => {},
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
                image={x?.image}
                text={x?.text}
                titleSlug={x?.titleSlug}
                numberOfLikes={x?.numberOfLikes}
                numberOfComments={x?.numberOfComments}
                datePublished={x?.date}
                readDuration={x?.readDuration}
                tags={x?.tags}
                onCardClick={() => onSelectCard(x?.uuid)}
              />
            ))
          : items
              ?.slice(0, limit)
              .map((x, index) => (
                <MemoizedProductCard
                  key={index}
                  title={x?.title}
                  image={x?.image}
                  text={x?.text}
                  titleSlug={x?.titleSlug}
                  tags={x?.tags}
                  numberOfLikes={x?.numberOfLikes}
                  numberOfComments={x?.numberOfComments}
                  datePublished={x?.date}
                  readDuration={x?.readDuration}
                  onCardClick={() => onSelectCard(x?.uuid)}
                />
              ))}
      </>
    );
  }, [items]);

  return (
    <RegulatTitleSectionWrapper>
      <div className="regular-title">
        <div className="regular-title-text">
          {isDefinedNotEmptyString(icon) && <i className={icon} />}
          <span>{title}</span>
        </div>
        {isDefinedNotEmptyString(onSectionClick) && (
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
        <SuspenseBlogDetailed
          isLoading={isLoading}
          itemsCount={limit}
          keyPrefix={"explore-landing"}
        >
          {memoizedProducts}
        </SuspenseBlogDetailed>
      </GridWrapper>
    </RegulatTitleSectionWrapper>
  );
});

export default BlogsSectionDetailed;
