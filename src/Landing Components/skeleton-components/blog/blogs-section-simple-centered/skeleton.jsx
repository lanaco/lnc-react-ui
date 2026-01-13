import { SkeletonLinePlaceholder } from "../../style";
import { Container } from "./style";

const SuspenseBlogsSectionSimpleCentered = ({ keyPrefix }) => {
  return (
    <Container justifyContent="center" alignItems="center">
      <SkeletonLinePlaceholder
        key={`${keyPrefix}-1`}
        height="24.75rem"
        width="18.5rem"
        borderRadius="0.75rem"
      />
      <SkeletonLinePlaceholder
        key={`${keyPrefix}-2`}
        height="24.75rem"
        width="18.5rem"
        borderRadius="0.75rem"
      />
      <SkeletonLinePlaceholder
        key={`${keyPrefix}-3`}
        height="24.75rem"
        width="18.5rem"
        borderRadius="0.75rem"
      />
    </Container>
  );
};

export default SuspenseBlogsSectionSimpleCentered;
