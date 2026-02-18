/* eslint-disable react/prop-types */
import { SkeletonLinePlaceholder } from "../../style";
import { Container } from "./style";

const SkeletonBlogsSectionDetailed = ({ keyPrefix }) => {
  return (
    <Container>
      <SkeletonLinePlaceholder
        key={`${keyPrefix}-1`}
        height="23rem"
        borderRadius="0.75rem"
      />
      <SkeletonLinePlaceholder
        key={`${keyPrefix}-2`}
        height="23rem"
        borderRadius="0.75rem"
      />
      <SkeletonLinePlaceholder
        key={`${keyPrefix}-3`}
        height="23rem"
        borderRadius="0.75rem"
      />
    </Container>
  );
};

export default SkeletonBlogsSectionDetailed;
