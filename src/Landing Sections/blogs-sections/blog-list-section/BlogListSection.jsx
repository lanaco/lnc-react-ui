/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import { forwardRef, memo, useMemo } from "react";

import BlogCardItem from "../../../Landing Components/blog-components/blog-card-item";
import { Wrapper } from "./style";
import SuspenseBlogList from "../../../Landing Components/skeleton-components/blog/blog-list";

const MemoizedBlogCardItem = memo(BlogCardItem);

const BlogListSection = forwardRef(
  (
    {
      timeToReadText = "{0} min read",
      items,
      isLoading = false,
      onSelectCard = () => {},
      onShare = () => {},
      onBookmark = () => {},
      getImage = () => {},
      isSeparated = true,
      bookmarkComponent = <></>,
      componentName,
      LinkComponent
    },
    ref
  ) => {
    const memoizedBlogs = useMemo(() => {
      return items?.map((x, idx) => (
        <MemoizedBlogCardItem
          key={`blog-card-item__${idx + 1}__${x?.isBookmarked?.toString()}`}
          blogUuid={x?.uuid}
          title={x?.title}
          titleSlug={x?.titleSlug}
          options={x?.options}
          publishedAt={x?.publishedAt}
          timeToReadText={timeToReadText}
          timeToRead={x?.timeToRead}
          numberOfLikes={x?.numberOfLikes}
          numberOfComments={x?.numberOfComments}
          isSponsored={x?.isSponsored}
          isBookmarked={x?.isBookmarked}
          onSelectCard={(e, cardRef) => onSelectCard?.(x, cardRef)}
          onShare={() => onShare?.(x)}
          onBookmark={onBookmark}
          imageUrl={getImage(x?.imageUrl, x?.uuid) || null}
          bookmarkComponent={bookmarkComponent}
          metadata={{ name: componentName, accessor: x?.accessor }}
          LinkComponent={LinkComponent}
        />
      ));
    }, [items]);

    return (
      <SuspenseBlogList isLoading={isLoading} keyPrefix="blog-list-skeleton">
        <Wrapper ref={ref} className={isSeparated ? "separated" : ""}>
          {memoizedBlogs}
        </Wrapper>
      </SuspenseBlogList>
    );
  }
);

export default BlogListSection;
