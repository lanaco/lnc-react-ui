/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import { forwardRef, memo, useMemo } from "react";
import { GridWrapper } from "./style";
import useDetectMobile from "../../../_utils/useDetectMobile";
import { isDefinedNotEmptyString } from "../../../_utils/utils";
import { RegulatTitleSectionWrapper } from "../../style";
import Button from "../../../General/Button/Button";

import BlogCardDetailed from "../../../Landing Components/blog-components/blog-card-detailed";
import SuspenseBlogDetailed from "../../../Landing Components/skeleton-components/blog-skeletons/suspense-detailed";

const MemoizedBlogCard = memo(BlogCardDetailed);

const BlogsSectionDetailed = forwardRef((props, ref) => {
  const {
    icon,
    title,
    onButtonAction,
    items,
    buttonText,
    timeToReadText,
    limit = 3,
    onSelectCard = () => {},
    isLoading = false,
    buttonLink,
    getImage = () => {},
    componentName,
  } = props;

  const isMobile = useDetectMobile();

  const memoizedProducts = useMemo(() => {
    return (
      <>
        {isMobile === true
          ? items?.map((x, index) => (
              <MemoizedBlogCard
                key={index}
                title={x?.title}
                text={x?.description}
                titleSlug={x?.titleSlug}
                numberOfLikes={x?.numberOfLikes}
                numberOfComments={x?.numberOfComments}
                publishedAt={x?.publishedAt}
                timeToRead={x?.timeToRead}
                timeToReadText={timeToReadText}
                tags={x?.tags}
                onCardClick={(e, cardRef) =>
                  onSelectCard(x?.titleSlug, cardRef)
                }
                imageUrl={getImage(x?.imageUrl, x?.uuid) || null}
                metadata={{ name: componentName, accessor: x?.accessor }}
              />
            ))
          : items
              ?.slice(0, limit)
              .map((x, index) => (
                <MemoizedBlogCard
                  key={index}
                  title={x?.title}
                  imageUrl={getImage(x?.imageUrl, x?.uuid) || null}
                  text={x?.description}
                  titleSlug={x?.titleSlug}
                  tags={x?.tags}
                  numberOfLikes={x?.numberOfLikes}
                  numberOfComments={x?.numberOfComments}
                  publishedAt={x?.publishedAt}
                  timeToRead={x?.timeToRead}
                  timeToReadText={timeToReadText}
                  onCardClick={(e, cardRef) =>
                    onSelectCard(x?.titleSlug, cardRef)
                  }
                  metadata={{ name: componentName, accessor: x?.accessor }}
                />
              ))}
      </>
    );
  }, [items, isMobile, limit, onSelectCard]);

  return (
    <RegulatTitleSectionWrapper ref={ref}>
      <div className="regular-title">
        <div className="regular-title-text">
          {isDefinedNotEmptyString(icon) && <i className={icon} />}
          <span>{title}</span>
        </div>
        {isDefinedNotEmptyString(buttonText) &&
          isDefinedNotEmptyString(buttonLink) && (
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
      <GridWrapper limit={limit}>
        <SuspenseBlogDetailed
          isLoading={isLoading}
          limit={limit}
          keyPrefix={"explore-landing"}
        >
          {memoizedProducts}
        </SuspenseBlogDetailed>
      </GridWrapper>
    </RegulatTitleSectionWrapper>
  );
});

export default BlogsSectionDetailed;
