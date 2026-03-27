/* eslint-disable react/prop-types */
import { SkeletonRect } from "../../style";
import { Container } from "./style";

const SkeletonSelectBar = ({ keyPrefix }) => {
  return (
    <Container>
      {[1, 2, 3]?.map((x) => (
        <SkeletonRect
          key={`${keyPrefix}-${x}`}
          width="5rem"
          borderRadius="0.75rem"
        />
      ))}
    </Container>
  );
};

export default SkeletonSelectBar;
