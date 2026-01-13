/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import { forwardRef, memo, useMemo } from "react";

import { isDefinedNotEmptyString } from "../../../_utils/utils";
import BlogCardSponsored from "../../../Landing Components/blog-components/blog-card-sponsored";
import Button from "../../../General/Button/Button";
import { Wrapper } from "./style";
import SuspenseBlogCardsSponsored from "../../../Landing Components/skeleton-components/blog/blog-cards-sponsored";

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
      isLoading = false,
      getImage = () => {},
      componentName,
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
            onSelectCard={(e, cardRef) => onSelectCard?.(x, cardRef)}
            imageUrl={getImage(x?.imageUrl, x?.uuid) || null}
            metadata={{ name: componentName, accessor: x?.accessor }}
          />
        ));
    }, [items]);

    return (
      <Wrapper ref={ref}>
        <div className="wrapper__heading">
          <div className="wrapper__title">
            {title && (
              <div className="title__text">
                {isDefinedNotEmptyString(icon) && <i className={icon} />}
                <span>{title}</span>
              </div>
            )}
            {isDefinedNotEmptyString(buttonText) &&
              isDefinedNotEmptyString(buttonLink) &&
              !isLoading && (
                <Button
                  text={buttonText}
                  borderRadius="curved"
                  btnType="tinted"
                  className="title__action"
                  color="neutral"
                  onClick={(e) => {
                    e?.target?.blur();
                    onButtonAction?.(buttonLink);
                  }}
                />
              )}
          </div>
          {subtitle && <div className="wrapper__subtitle">{subtitle}</div>}
        </div>
        <SuspenseBlogCardsSponsored
          isLoading={isLoading}
          keyPrefix="blog-cards-sponsored-skeleton"
        >
          <div className="wrapper__cards">{memoizedBlogs}</div>
        </SuspenseBlogCardsSponsored>
      </Wrapper>
    );
  }
);

export default BlogCardsSponsoredSection;
