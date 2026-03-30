/* eslint-disable react/prop-types */
import { SkeletonContainer, SkeletonRect } from "../../style";
import { Container } from "./style";

const SkeletonBlogsSectionWithFilters = ({ keyPrefix }) => {
  return (
    <Container>
      <SkeletonContainer className="skeleton__tags">
        {[1, 2, 3]?.map((x) => (
          <SkeletonRect
            key={`${keyPrefix}-tab-${x}`}
            height="2.25rem"
            width="8rem"
            borderRadius="1rem"
          />
        ))}
      </SkeletonContainer>
      <SkeletonContainer className="skeleton__cards">
        {[1, 2, 3]?.map((x) => (
          <SkeletonRect
            key={`${keyPrefix}-card-${x}`}
            height="10.375rem"
            width="100%"
            borderRadius="1rem"
          />
        ))}
      </SkeletonContainer>
    </Container>
  );
};

export default SkeletonBlogsSectionWithFilters;
