/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import { forwardRef } from "react";
import BlogCardLarge from "../../../Landing Components/blog-components/blog-card-large";
import SuspenseBlogSingle from "../../../Landing Components/skeleton-components/blog/blog-single";

const BlogsSectionLarge = forwardRef((props, ref) => {
  const {
    isLoading,
    item,
    onSelectCard = () => {},
    getImage = () => {},
    LinkComponent
  } = props;

  return (
    <SuspenseBlogSingle isLoading={isLoading} keyPrefix="blogs-single-skeleton">
      <BlogCardLarge
        ref={ref}
        title={item?.title}
        imageUrl={getImage(item?.imageUrl, item?.uuid) || null}
        text={item?.description}
        titleSlug={item?.titleSlug}
        buttonText={item?.buttonText}
        onCardClick={() => onSelectCard(item?.titleSlug)}
        LinkComponent={LinkComponent}
      />
    </SuspenseBlogSingle>
  );
});

export default BlogsSectionLarge;
