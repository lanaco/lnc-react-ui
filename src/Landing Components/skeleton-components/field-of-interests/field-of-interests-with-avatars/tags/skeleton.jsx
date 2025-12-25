import { SkeletonCirclePlaceholder } from "../../../style";
import { Container } from "../style";

const SkeletonFieldOfInterestsWithAvatarsTag = ({ keyPrefix }) => {
  return (
    <Container className="skeleton__tags" justifyContent="center">
      <SkeletonCirclePlaceholder
        width="9.875rem"
        height="9.875rem"
        key={`${keyPrefix}-1`}
      />
      <SkeletonCirclePlaceholder
        width="9.875rem"
        height="9.875rem"
        key={`${keyPrefix}-2`}
      />
      <SkeletonCirclePlaceholder
        width="9.875rem"
        height="9.875rem"
        key={`${keyPrefix}-3`}
      />
      <SkeletonCirclePlaceholder
        width="9.875rem"
        height="9.875rem"
        key={`${keyPrefix}-4`}
      />
    </Container>
  );
};

export default SkeletonFieldOfInterestsWithAvatarsTag;
