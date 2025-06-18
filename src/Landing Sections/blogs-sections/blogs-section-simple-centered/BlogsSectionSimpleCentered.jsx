import { forwardRef } from "react";
import { GridWrapper } from "./style";
import useDetectMobile from "../../../_utils/useDetectMobile";
import SimpleBlogCardCentered from "../../../Landing Components/blog-components/simple-blog-card-centered";

const BlogsSectionSimpleCentered = forwardRef((props, ref) => {
  const { items, limit = 3, onSelectCard = () => {} } = props;

  const isMobile = useDetectMobile();

  return (
    <GridWrapper limit={limit}>
      {isMobile === true
        ? items?.map((x, index) => (
            <SimpleBlogCardCentered
              key={index}
              title={x?.title}
              image={x?.image}
              text={x?.text}
              titleSlug={x?.titleSlug}
              buttonText={x?.buttonText}
              onCardClick={() => onSelectCard(x?.uuid)}
            />
          ))
        : items
            ?.slice(0, limit)
            .map((x, index) => (
              <SimpleBlogCardCentered
                key={index}
                title={x?.title}
                image={x?.image}
                text={x?.text}
                titleSlug={x?.titleSlug}
                buttonText={x?.buttonText}
                onCardClick={() => onSelectCard(x?.uuid)}
              />
            ))}
    </GridWrapper>
  );
});

export default BlogsSectionSimpleCentered;
