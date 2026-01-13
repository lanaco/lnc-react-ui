import { SkeletonLinePlaceholder } from "../../style";
import { Container } from "./style";

const SkeletonSkeletonShopCards = ({ keyPrefix }) => {
  return (
    <Container>
      <SkeletonLinePlaceholder
        key={`${keyPrefix}-1`}
        height="18rem"
        borderRadius="0.75rem"
      />
      <SkeletonLinePlaceholder
        key={`${keyPrefix}-2`}
        height="18rem"
        borderRadius="0.75rem"
      />
      <SkeletonLinePlaceholder
        key={`${keyPrefix}-3`}
        height="18rem"
        borderRadius="0.75rem"
      />
      <SkeletonLinePlaceholder
        key={`${keyPrefix}-4`}
        height="18rem"
        borderRadius="0.75rem"
      />
    </Container>
  );
};

export default SkeletonSkeletonShopCards;
