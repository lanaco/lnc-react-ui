import { SkeletonLinePlaceholder } from "../../style";
import { Container } from "./style";

const SkeletonBlogsSectionLarge = ({ keyPrefix }) => {
  return (
    <Container>
      <SkeletonLinePlaceholder
        key={`${keyPrefix}-1`}
        height="11.25rem"
        borderRadius="0.75rem"
      />
      <SkeletonLinePlaceholder
        key={`${keyPrefix}-2`}
        height="11.25rem"
        borderRadius="0.75rem"
      />
    </Container>
  );
};

export default SkeletonBlogsSectionLarge;
