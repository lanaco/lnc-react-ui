import { forwardRef, memo, useMemo } from "react";

import BlogCardItem from "../../../Landing Components/blog-components/blog-card-item";
import SuspenseBlogLarge from "../../../Landing Components/skeleton-components/blog-skeletons/suspense-large";
import { Wrapper } from "./style";

const MemoizedBlogCardItem = memo(BlogCardItem);

const BlogListSection = forwardRef(
  (
    {
      timeToReadText = "{0} min read",
      items,
      onSelectCard = () => {},
      onSelectTag = () => {},
      onShare = () => {},
      onBookmark = () => {},
      isLoading = false,
      getImage = () => {},
      isSeparated = true,
    },
    ref
  ) => {
    const memoizedBlogs = useMemo(() => {
      return items?.map((x, idx) => (
        <MemoizedBlogCardItem
          key={`blog-card-item__${idx + 1}`}
          title={x?.title}
          titleSlug={x?.titleSlug}
          tags={x?.tags}
          publishedAt={x?.publishedAt}
          timeToReadText={timeToReadText}
          timeToRead={x?.timeToRead}
          numberOfLikes={x?.numberOfLikes}
          numberOfComments={x?.numberOfComments}
          isSponsored={x?.isSponsored}
          onSelectCard={() => onSelectCard?.(x?.uuid, x?.titleSlug)}
          onSelectTag={(code) => onSelectTag?.(code)}
          onShare={() => onShare?.(x?.uuid)}
          onBookmark={() => onBookmark?.(x?.uuid)}
          imageUrl={getImage(x?.imageUrl, x?.uuid) || null}
        />
      ));
    }, [items]);

    return (
      <Wrapper className={isSeparated ? "separated" : ""}>
        <SuspenseBlogLarge
          isLoading={isLoading}
          limit={5}
          keyPrefix="blog-section"
        >
          {memoizedBlogs}
        </SuspenseBlogLarge>
      </Wrapper>
    );
  }
);

export default BlogListSection;
