/* eslint-disable react/prop-types */
import { SkeletonLinePlaceholder } from "../../style";
import { Container } from "./style";

const SkeletonBlogSingle = ({ keyPrefix }) => {
  return (
    <Container>
      <SkeletonLinePlaceholder
        key={`${keyPrefix}-1`}
        height="11.25rem"
        borderRadius="0.75rem"
      />
    </Container>
  );
};

export default SkeletonBlogSingle;
