/* eslint-disable react/prop-types */
import { SkeletonLinePlaceholder } from "../../../style";
import { Container } from "../style";

const SkeletonFieldOfInterestsMasonryCard = ({ keyPrefix }) => {
  return (
    <Container className="skeleton__cards">
      <SkeletonLinePlaceholder height="13.75rem" key={`${keyPrefix}-1`} />
      <SkeletonLinePlaceholder height="13.75rem" key={`${keyPrefix}-2`} />
      <SkeletonLinePlaceholder height="13.75rem" key={`${keyPrefix}-3`} />
    </Container>
  );
};

export default SkeletonFieldOfInterestsMasonryCard;
