import { SkeletonRowWrapper, SkeletonSquarePlaceholder } from "../../style";
import { Container } from "./style";

const SkeletonSkeletonSimpleCategories = ({ keyPrefix }) => {
  return (
    <Container>
      <SkeletonRowWrapper className="skeleton__cards">
        <SkeletonSquarePlaceholder key={`${keyPrefix}-1`} height="8.25rem" />
        <SkeletonSquarePlaceholder key={`${keyPrefix}-2`} height="8.25rem" />
        <SkeletonSquarePlaceholder key={`${keyPrefix}-3`} height="8.25rem" />
        <SkeletonSquarePlaceholder key={`${keyPrefix}-4`} height="8.25rem" />
        <SkeletonSquarePlaceholder key={`${keyPrefix}-5`} height="8.25rem" />
        <SkeletonSquarePlaceholder key={`${keyPrefix}-6`} height="8.25rem" />
      </SkeletonRowWrapper>
      <SkeletonRowWrapper>
        <SkeletonRowWrapper className="skeleton__cards">
          <SkeletonSquarePlaceholder key={`${keyPrefix}-7`} height="8.25rem" />
          <SkeletonSquarePlaceholder key={`${keyPrefix}-8`} height="8.25rem" />
          <SkeletonSquarePlaceholder key={`${keyPrefix}-9`} height="8.25rem" />
          <SkeletonSquarePlaceholder key={`${keyPrefix}-10`} height="8.25rem" />
          <SkeletonSquarePlaceholder key={`${keyPrefix}-11`} height="8.25rem" />
          <SkeletonSquarePlaceholder key={`${keyPrefix}-12`} height="8.25rem" />
        </SkeletonRowWrapper>
      </SkeletonRowWrapper>
    </Container>
  );
};

export default SkeletonSkeletonSimpleCategories;
