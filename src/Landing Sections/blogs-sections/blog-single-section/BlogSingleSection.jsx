/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import { forwardRef } from "react";
import BlogCardLarge from "../../../Landing Components/blog-components/blog-card-large";
import SuspenseBlogSingle from "../../../Landing Components/skeleton-components/blog-skeletons/suspense-single";

const BlogsSectionLarge = forwardRef((props, ref) => {
  const {
    isLoading,
    item,
    onSelectCard = () => {},
    getImage = () => {},
  } = props;

  return (
    <SuspenseBlogSingle
      isLoading={isLoading}
      limit={1}
      keyPrefix={"explore-landing"}
    >
      <BlogCardLarge
        ref={ref}
        title={item?.title}
        imageUrl={getImage(item?.imageUrl, item?.uuid) || null}
        text={item?.description}
        titleSlug={item?.titleSlug}
        buttonText={item?.buttonText}
        onCardClick={() => onSelectCard(item?.titleSlug)}
      />
    </SuspenseBlogSingle>
  );
});

export default BlogsSectionLarge;
