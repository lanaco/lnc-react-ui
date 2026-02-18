/* eslint-disable react/prop-types */
import { SkeletonLinePlaceholder, SkeletonRowWrapper } from "../../style";
import { Container } from "./style";

const SkeletonBlogsSectionWithFilters = ({ keyPrefix }) => {
  return (
    <Container>
      <SkeletonRowWrapper className="skeleton__tags">
        <SkeletonLinePlaceholder
          key={`${keyPrefix}-1`}
          height="2.25rem"
          width="128px"
          borderRadius="1rem"
        />
        <SkeletonLinePlaceholder
          key={`${keyPrefix}-2`}
          height="2.25rem"
          width="128px"
          borderRadius="1rem"
        />
        <SkeletonLinePlaceholder
          key={`${keyPrefix}-3`}
          height="2.25rem"
          width="128px"
          borderRadius="1rem"
        />
      </SkeletonRowWrapper>
      <SkeletonRowWrapper className="skeleton__cards">
        <SkeletonLinePlaceholder
          key={`${keyPrefix}-4`}
          height="10.375rem"
          borderRadius="0.75rem"
        />
        <SkeletonLinePlaceholder
          key={`${keyPrefix}-5`}
          height="10.375rem"
          borderRadius="0.75rem"
        />
        <SkeletonLinePlaceholder
          key={`${keyPrefix}-6`}
          height="10.375rem"
          borderRadius="0.75rem"
        />
      </SkeletonRowWrapper>
    </Container>
  );
};

export default SkeletonBlogsSectionWithFilters;
