import { SkeletonLinePlaceholder } from "../../style";
import { Container } from "./style";

const SkeletonBrandHits = ({ keyPrefix }) => {
  return (
    <Container justifyContent="center" alignItems="center" gap="3rem">
      <SkeletonLinePlaceholder
        key={`${keyPrefix}-1`}
        height="4rem"
        width="7.5rem"
        borderRadius="0.75rem"
      />
      <SkeletonLinePlaceholder
        key={`${keyPrefix}-2`}
        height="4rem"
        width="7.5rem"
        borderRadius="0.75rem"
      />
      <SkeletonLinePlaceholder
        key={`${keyPrefix}-3`}
        height="4rem"
        width="7.5rem"
        borderRadius="0.75rem"
      />
      <SkeletonLinePlaceholder
        key={`${keyPrefix}-4`}
        height="4rem"
        width="7.5rem"
        borderRadius="0.75rem"
      />
      <SkeletonLinePlaceholder
        key={`${keyPrefix}-5`}
        height="4rem"
        width="7.5rem"
        borderRadius="0.75rem"
      />
    </Container>
  );
};

export default SkeletonBrandHits;
