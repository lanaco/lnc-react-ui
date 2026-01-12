import { SkeletonLinePlaceholder } from "../../../style";
import { Container } from "../style";

const SkeletonFieldOfInterestsWithTagsCard = ({ keyPrefix }) => {
  return (
    <Container className="skeleton__cards">
      <SkeletonLinePlaceholder height="13.75rem" key={`${keyPrefix}-1`} />
      <SkeletonLinePlaceholder height="13.75rem" key={`${keyPrefix}-2`} />
      <SkeletonLinePlaceholder height="13.75rem" key={`${keyPrefix}-3`} />
    </Container>
  );
};

export default SkeletonFieldOfInterestsWithTagsCard;
