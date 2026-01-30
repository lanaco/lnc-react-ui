/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import { forwardRef, memo, useMemo } from "react";
import { Container, GridWrapper } from "./style";
import useDetectMobile from "../../_utils/useDetectMobile";
import ReviewCard from "../../Landing Components/reviews-components/review-card/ReviewCard";
import SuspenseReviews from "../../Landing Components/skeleton-components/general/review";

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
                link={x?.link}
                rating={x?.ratingArithmeticMean}
                onSelectCard={() => onSelectCard(x)}
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
                  link={x?.link}
                  rating={x?.ratingArithmeticMean}
                  onSelectCard={() => onSelectCard(x)}
                />
              ))}
      </>
    );
  }, [items, isMobile, limit]);

  return (
    <Container ref={ref}>
      <div className="container-title">{title}</div>
      <SuspenseReviews isLoading={isLoading} keyPrefix="reviews-skeleton">
        <GridWrapper limit={limit}>{memoizedProducts}</GridWrapper>
      </SuspenseReviews>
    </Container>
  );
});

export default ReviewsSection;
