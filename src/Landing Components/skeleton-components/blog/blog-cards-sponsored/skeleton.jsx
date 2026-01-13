import { SkeletonRowWrapper, SkeletonLinePlaceholder } from "../../style";
import { Container } from "./style";

const SkeletonBlogCardsSponsored = ({ keyPrefix }) => {
  return (
    <Container>
      <SkeletonRowWrapper>
        <SkeletonLinePlaceholder key={`${keyPrefix}-1`} height="11.25rem" />
        <SkeletonLinePlaceholder key={`${keyPrefix}-2`} height="11.25rem" />
      </SkeletonRowWrapper>
      <SkeletonRowWrapper>
        <SkeletonLinePlaceholder key={`${keyPrefix}-3`} height="11.25rem" />
        <SkeletonLinePlaceholder key={`${keyPrefix}-4`} height="11.25rem" />
      </SkeletonRowWrapper>
    </Container>
  );
};

export default SkeletonBlogCardsSponsored;
