/* eslint-disable react/prop-types */
import { SkeletonCircle } from "../../../style";
import { Container } from "../style";

const SkeletonFieldOfInterestsWithAvatarsTag = ({ keyPrefix }) => {
  return (
    <Container className="skeleton__tags" justifyContent="center">
      {[1, 2, 3, 4]?.map((x) => (
        <SkeletonCircle size="9.875rem" key={`${keyPrefix}-${x}`} />
      ))}
    </Container>
  );
};

export default SkeletonFieldOfInterestsWithAvatarsTag;
