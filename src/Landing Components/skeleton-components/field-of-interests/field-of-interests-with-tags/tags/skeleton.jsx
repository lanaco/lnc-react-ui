/* eslint-disable react/prop-types */
import { SkeletonColumnContainer, SkeletonRect } from "../../../style";
import { Container } from "../style";

const SkeletonFieldOfInterestsWithTagsTag = ({ keyPrefix }) => {
  return (
    <Container className="skeleton__tags">
      {[1, 2, 3, 4, 5]?.map((x) => (
        <SkeletonColumnContainer
          key={`${keyPrefix}-${x}`}
          alignItems="center"
          gap="0.5rem"
        >
          <SkeletonRect height="1.5rem" width="8rem" />
        </SkeletonColumnContainer>
      ))}
    </Container>
  );
};

export default SkeletonFieldOfInterestsWithTagsTag;
