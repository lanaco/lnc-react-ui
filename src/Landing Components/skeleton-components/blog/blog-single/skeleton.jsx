/* eslint-disable react/prop-types */
import { SkeletonRect } from "../../style";
import { Container } from "./style";

const SkeletonBlogSingle = ({ keyPrefix }) => {
  return (
    <Container>
      <SkeletonRect key={`${keyPrefix}-0`} width="100%" height="11.25rem" />
    </Container>
  );
};

export default SkeletonBlogSingle;
