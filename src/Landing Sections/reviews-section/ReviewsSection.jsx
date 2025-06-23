import { forwardRef, memo, useMemo } from "react";
import { Container, GridWrapper } from "./style";
import useDetectMobile from "../../_utils/useDetectMobile";
import ReviewCard from "../../Landing Components/reviews-components/review-card/ReviewCard";
import SuspenseReviewCard from "../../Landing Components/skeleton-components/review-skeletons/suspense-reviews-card";

const MemoizedReviewCard = memo(ReviewCard);

const ReviewsSection = forwardRef((props, ref) => {
  const {
    title = "Electronics reviews",
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
              <MemoizedReviewCard
                key={index}
                text={x?.text}
                title={x?.title}
                image={x?.image}
                uuid={x?.uuid}
                rating={x?.ratingArithmeticMean}
                productUuid={x?.productUuid}
                onSelectReview={(uuid) => onSelectCard(uuid)}
              />
            ))
          : items
              ?.slice(0, limit)
              .map((x, index) => (
                <MemoizedReviewCard
                  key={index}
                  text={x?.text}
                  title={x?.title}
                  image={x?.image}
                  uuid={x?.uuid}
                  rating={x?.ratingArithmeticMean}
                  productUuid={x?.productUuid}
                  onSelectReview={(uuid) => onSelectCard(uuid)}
                />
              ))}
      </>
    );
  }, [items]);

  return (
    <Container>
      <div className="container-title">{title}</div>
      <GridWrapper limit={limit}>
        <SuspenseReviewCard
          isLoading={isLoading}
          itemsCount={limit}
          keyPrefix={"explore-landing"}
        >
          {memoizedProducts}
        </SuspenseReviewCard>
      </GridWrapper>
    </Container>
  );
});

export default ReviewsSection;
