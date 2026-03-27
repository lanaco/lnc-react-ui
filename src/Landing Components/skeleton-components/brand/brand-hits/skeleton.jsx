/* eslint-disable react/prop-types */
import { SkeletonRect } from "../../style";
import { Container } from "./style";

const SkeletonBrandHits = ({ keyPrefix }) => {
  return (
    <Container justifyContent="center" alignItems="center" gap="3rem">
      {[1, 2, 3, 4, 5]?.map((x) => (
        <SkeletonRect key={`${keyPrefix}-${x}`} height="4rem" width="7.5rem" />
      ))}
    </Container>
  );
};

export default SkeletonBrandHits;
