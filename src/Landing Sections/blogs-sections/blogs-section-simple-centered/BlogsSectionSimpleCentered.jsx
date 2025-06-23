import { forwardRef, memo, useMemo } from "react";
import { GridWrapper } from "./style";
import useDetectMobile from "../../../_utils/useDetectMobile";
import SimpleBlogCardCentered from "../../../Landing Components/blog-components/simple-blog-card-centered";
import SuspenseBlogSimpleCentered from "../../../Landing Components/skeleton-components/blog-skeletons/suspense-simple-centered";

const MemoizedProductCard = memo(SimpleBlogCardCentered);

const BlogsSectionSimpleCentered = forwardRef((props, ref) => {
  const {
    items,
    limit = 3,
    onSelectCard = () => {},
    isLoading = false,
  } = props;

  const isMobile = useDetectMobile();

  const memoizedProducts = useMemo(() => {
    return (
      <>
        {isMobile === true
          ? items?.map((x, index) => (
              <MemoizedProductCard
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
                <MemoizedProductCard
                  key={index}
                  title={x?.title}
                  image={x?.image}
                  text={x?.text}
                  titleSlug={x?.titleSlug}
                  buttonText={x?.buttonText}
                  onCardClick={() => onSelectCard(x?.uuid)}
                />
              ))}
      </>
    );
  }, [items]);

  return (
    <GridWrapper limit={limit}>
      <SuspenseBlogSimpleCentered
        isLoading={isLoading}
        itemsCount={limit}
        keyPrefix={"explore-landing"}
      >
        {memoizedProducts}
      </SuspenseBlogSimpleCentered>
    </GridWrapper>
  );
});

export default BlogsSectionSimpleCentered;
