import { forwardRef, memo, useMemo } from "react";

import { isDefinedNotEmptyString } from "../../../_utils/utils";
import BlogCardSponsored from "../../../Landing Components/blog-components/blog-card-sponsored";
import SuspenseBlogLarge from "../../../Landing Components/skeleton-components/blog-skeletons/suspense-large";
import Button from "../../../General/Button/Button";
import { Wrapper } from "./style";

const MemoizedBlogCardSponsored = memo(BlogCardSponsored);

const BlogCardsSponsoredSection = forwardRef(
  (
    {
      title,
      subtitle,
      icon,
      buttonText,
      buttonLink,
      timeToReadText = "{0} min read",
      items,
      onButtonAction = () => {},
      onSelectCard = () => {},
      onSelectOption = () => {},
      isLoading = false,
      getImage = () => {},
      limitCards = 2,
      limitCardsForMobile = 1,
    },
    ref
  ) => {
    const memoizedBlogs = useMemo(() => {
      return items
        ?.slice(0, 4)
        ?.map((x, idx) => (
          <MemoizedBlogCardSponsored
            key={`blog-card-sponsored__${idx + 1}`}
            title={x?.title}
            titleSlug={x?.titleSlug}
            options={x?.options}
            publishedAt={x?.publishedAt}
            timeToReadText={timeToReadText}
            timeToRead={x?.timeToRead}
            numberOfLikes={x?.numberOfLikes}
            numberOfComments={x?.numberOfComments}
            isSponsored={x?.isSponsored}
            onSelectCard={() => onSelectCard?.(x?.uuid, x?.titleSlug)}
            onSelectOption={(code) => onSelectOption?.(code)}
            imageUrl={getImage(x?.imageUrl, x?.uuid) || null}
          />
        ));
    }, [items]);

    return (
      <Wrapper
        limitCards={limitCards}
        limitCardsForMobile={limitCardsForMobile}
      >
        <div className="wrapper__heading">
          <div className="wrapper__title">
            {title && (
              <div className="title__text">
                {isDefinedNotEmptyString(icon) && <i className={icon} />}
                <span>{title}</span>
              </div>
            )}
            {onButtonAction && (
              <Button
                text={buttonText}
                borderRadius="curved"
                btnType="tinted"
                className="title__action"
                onClick={() => onButtonAction?.(buttonLink)}
              />
            )}
          </div>
          {subtitle && <div className="wrapper__subtitle">{subtitle}</div>}
        </div>
        <div className="wrapper__cards">
          <SuspenseBlogLarge
            isLoading={isLoading}
            limit={4}
            keyPrefix="blog-section"
          >
            {memoizedBlogs}
          </SuspenseBlogLarge>
        </div>
      </Wrapper>
    );
  }
);

export default BlogCardsSponsoredSection;
