import { SkeletonLinePlaceholder } from "../../style";
import { Container } from "./style";

const SkeletonSelectBar = ({ keyPrefix }) => {
  return (
    <Container>
      <SkeletonLinePlaceholder
        key={`${keyPrefix}-1`}
        width="5rem"
        borderRadius="0.75rem"
      />
      <SkeletonLinePlaceholder
        key={`${keyPrefix}-2`}
        width="5rem"
        borderRadius="0.75rem"
      />
      <SkeletonLinePlaceholder
        key={`${keyPrefix}-3`}
        width="5rem"
        borderRadius="0.75rem"
      />
    </Container>
  );
};

export default SkeletonSelectBar;
