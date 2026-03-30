/* eslint-disable react/prop-types */
import {
  SkeletonCircle,
  SkeletonColumnContainer,
  SkeletonRect,
} from "../../../style";
import { Container } from "../style";

const SkeletonFieldOfInterestsMasonryTag = ({ keyPrefix }) => {
  return (
    <Container className="skeleton__tags">
      {[1, 2, 3, 4, 5]?.map((x) => (
        <SkeletonColumnContainer
          key={`${keyPrefix}-tag-${x}`}
          alignItems="center"
          gap="0.5rem"
        >
          <SkeletonCircle size="2.75rem" />
          <SkeletonRect height="1.5rem" width="8rem" />
        </SkeletonColumnContainer>
      ))}
    </Container>
  );
};

export default SkeletonFieldOfInterestsMasonryTag;
