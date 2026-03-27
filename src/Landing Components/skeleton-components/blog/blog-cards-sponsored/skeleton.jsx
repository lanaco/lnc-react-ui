/* eslint-disable react/prop-types */
import { SkeletonContainer, SkeletonRect } from "../../style";
import { Container } from "./style";

const SkeletonBlogCardsSponsored = ({ keyPrefix }) => {
  return (
    <Container>
      {[1, 2]?.map((x) => (
        <SkeletonContainer key={`${keyPrefix}-${x}`}>
          <SkeletonRect width="100%" height="11.25rem" />
          <SkeletonRect width="100%" height="11.25rem" />
        </SkeletonContainer>
      ))}
    </Container>
  );
};

export default SkeletonBlogCardsSponsored;
