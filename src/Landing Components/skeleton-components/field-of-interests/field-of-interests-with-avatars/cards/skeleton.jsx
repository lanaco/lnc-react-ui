/* eslint-disable react/prop-types */
import { SkeletonRect } from "../../../style";
import { Container } from "../style";

const SkeletonFieldOfInterestsWithAvatarsCard = ({ keyPrefix }) => {
  return (
    <Container className="skeleton__cards" justifyContent="center">
      {[1, 2, 3, 4]?.map((x) => (
        <SkeletonRect
          width="100%"
          height="13.75rem"
          key={`${keyPrefix}-${x}`}
        />
      ))}
    </Container>
  );
};

export default SkeletonFieldOfInterestsWithAvatarsCard;
