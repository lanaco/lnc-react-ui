/* eslint-disable react/prop-types */
import { SkeletonColumnContainer, SkeletonRect } from "../../style";
import { Container } from "./style";

const SkeletonGiftCards = ({ keyPrefix }) => {
  return (
    <Container>
      {[1, 2, 3, 4]?.map((x) => (
        <SkeletonColumnContainer key={`${keyPrefix}-${x}`} alignItems="center">
          <SkeletonRect width="100%" height="11rem" borderRadius="0.75rem" />
          <SkeletonRect height="1.25rem" borderRadius="0.75rem" width="5rem" />
        </SkeletonColumnContainer>
      ))}
    </Container>
  );
};

export default SkeletonGiftCards;
