import { forwardRef } from "react";
import { GridWrapper } from "./style";
import useDetectMobile from "../../../_utils/useDetectMobile";
import BlogCardLarge from "../../../Landing Components/blog-components/blog-card-large";

const BlogsSectionLarge = forwardRef((props, ref) => {
  const { items, onButtonClick, limit = 2 } = props;

  const isMobile = useDetectMobile();

  return (
    <GridWrapper limit={limit}>
      {isMobile === true
        ? items?.map((x, index) => (
            <BlogCardLarge
              key={index}
              title={x?.title}
              image={x?.image}
              text={x?.text}
              titleSlug={x?.titleSlug}
              buttonText={x?.buttonText}
              onCardClick={() => onButtonClick(x)}
            />
          ))
        : items
            ?.slice(0, limit)
            .map((x, index) => (
              <BlogCardLarge
                key={index}
                title={x?.title}
                image={x?.image}
                text={x?.text}
                titleSlug={x?.titleSlug}
                buttonText={x?.buttonText}
                onCardClick={() => onButtonClick(x)}
              />
            ))}
    </GridWrapper>
  );
});

export default BlogsSectionLarge;
