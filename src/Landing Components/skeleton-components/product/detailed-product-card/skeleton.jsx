import {
  SkeletonColumnContainer,
  SkeletonContainer,
  SkeletonRect,
  SkeletonSquare,
} from "../../style";
import { Container } from "./style";

const SkeletonDetailedProductCard = ({ keyPrefix }) => {
  return (
    <Container>
      {[1, 2, 3, 4, 5]?.map((x) => (
        <SkeletonColumnContainer key={`${keyPrefix}-${x}`} gap="0.5rem">
          <SkeletonSquare size="13.75rem" />
          <SkeletonRect width="100%" />
          <SkeletonContainer gap="0.5rem">
            <SkeletonRect width="100%" height="1rem" />
            <SkeletonRect width="100%" height="1rem" />
          </SkeletonContainer>
          <SkeletonRect width="100%" height="2rem" />
        </SkeletonColumnContainer>
      ))}
    </Container>
  );
};

export default SkeletonDetailedProductCard;
