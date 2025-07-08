/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import { forwardRef } from "react";
import BlogCardLarge from "../../../Landing Components/blog-components/blog-card-large";

const BlogsSectionLarge = forwardRef((props, ref) => {
  const { item, onSelectCard = () => {}, getImage = () => {} } = props;

  return (
    <BlogCardLarge
      ref={ref}
      title={item?.title}
      imageUrl={getImage(item?.imageUrl, item?.uuid) || null}
      text={item?.description}
      titleSlug={item?.titleSlug}
      buttonText={item?.buttonText}
      onCardClick={() => onSelectCard(item?.titleSlug)}
    />
  );
});

export default BlogsSectionLarge;
