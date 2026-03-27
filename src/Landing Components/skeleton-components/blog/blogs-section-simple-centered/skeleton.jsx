/* eslint-disable react/prop-types */
import { SkeletonRect } from "../../style";
import { Container } from "./style";

const SuspenseBlogsSectionSimpleCentered = ({ keyPrefix }) => {
  return (
    <Container justifyContent="center" alignItems="center">
      {[1, 2, 3]?.map((x) => (
        <SkeletonRect
          key={`${keyPrefix}-${x}`}
          height="24.75rem"
          width="18.5rem"
        />
      ))}
    </Container>
  );
};

export default SuspenseBlogsSectionSimpleCentered;
