/* eslint-disable react/prop-types */
import { SkeletonRect } from "../../style";
import { Container } from "./style";

const SkeletonBlogsSectionDetailed = ({ keyPrefix }) => {
  return (
    <Container>
      {[1, 2, 3]?.map((x) => (
        <SkeletonRect key={`${keyPrefix}-${x}`} width="100%" height="23rem" />
      ))}
    </Container>
  );
};

export default SkeletonBlogsSectionDetailed;
