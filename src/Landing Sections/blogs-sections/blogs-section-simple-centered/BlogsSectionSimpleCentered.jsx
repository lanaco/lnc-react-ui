/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import { forwardRef, memo, useMemo } from "react";
import { GridWrapper } from "./style";
import useDetectMobile from "../../../_utils/useDetectMobile";
import SimpleBlogCardCentered from "../../../Landing Components/blog-components/simple-blog-card-centered";
import SuspenseBlogSimpleCentered from "../../../Landing Components/skeleton-components/blog-skeletons/suspense-simple-centered";

const BlogsSectionSimpleCentered = forwardRef((props, ref) => {
  const {
    items,
    limit = 3,
    onSelectCard = () => {},
    isLoading = false,
    getImage = () => {},
  } = props;

  const isMobile = useDetectMobile();

  return (
    <GridWrapper ref={ref} limit={limit}>
      <SuspenseBlogSimpleCentered
        isLoading={isLoading}
        limit={limit}
        keyPrefix={"explore-landing"}
      >
        {
          <>
            {isMobile === true
              ? items?.map((x, index) => (
                  <SimpleBlogCardCentered
                    key={index}
                    title={x?.title}
                    imageUrl={getImage(x?.imageUrl, x?.uuid) || null}
                    text={x?.description}
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
                      imageUrl={getImage(x?.imageUrl, x?.uuid) || null}
                      text={x?.description}
                      titleSlug={x?.titleSlug}
                      buttonText={x?.buttonText}
                      onCardClick={() => onSelectCard(x?.uuid)}
                    />
                  ))}
          </>
        }
      </SuspenseBlogSimpleCentered>
    </GridWrapper>
  );
});

export default BlogsSectionSimpleCentered;
