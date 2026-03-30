/* eslint-disable react/prop-types */
import { SkeletonRect } from "../../style";
import { Container } from "./style";

const SkeletonBlogsSectionLarge = ({ keyPrefix }) => {
  return (
    <Container>
      {[1, 2]?.map((x) => (
        <SkeletonRect
          key={`${keyPrefix}-${x}`}
          width="100%"
          height="11.25rem"
        />
      ))}
    </Container>
  );
};

export default SkeletonBlogsSectionLarge;
