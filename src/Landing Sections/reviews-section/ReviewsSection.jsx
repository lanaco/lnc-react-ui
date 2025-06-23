import { forwardRef } from "react";
import { Container, GridWrapper } from "./style";
import useDetectMobile from "../../_utils/useDetectMobile";
import ReviewCard from "../../Landing Components/reviews-components/review-card/ReviewCard";

const ReviewsSection = forwardRef((props, ref) => {
  const {
    title = "Electronics reviews",
    items,
    limit = 3,
    onSelectCard = () => {},
  } = props;
  const isMobile = useDetectMobile();

  return (
    <Container>
      <div className="container-title">{title}</div>
      <GridWrapper limit={limit}>
        {isMobile === true
          ? items?.map((x, index) => (
              <ReviewCard
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
                <ReviewCard
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
      </GridWrapper>
    </Container>
  );
});

export default ReviewsSection;
