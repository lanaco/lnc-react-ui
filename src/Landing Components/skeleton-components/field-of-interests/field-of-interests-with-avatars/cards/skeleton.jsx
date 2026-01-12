import { SkeletonLinePlaceholder } from "../../../style";
import { Container } from "../style";

const SkeletonFieldOfInterestsWithAvatarsCard = ({ keyPrefix }) => {
  return (
    <Container className="skeleton__cards" justifyContent="center">
      <SkeletonLinePlaceholder height="13.75rem" key={`${keyPrefix}-1`} />
      <SkeletonLinePlaceholder height="13.75rem" key={`${keyPrefix}-2`} />
      <SkeletonLinePlaceholder height="13.75rem" key={`${keyPrefix}-3`} />
      <SkeletonLinePlaceholder height="13.75rem" key={`${keyPrefix}-3`} />
    </Container>
  );
};

export default SkeletonFieldOfInterestsWithAvatarsCard;
