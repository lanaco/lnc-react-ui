/* eslint-disable react/prop-types */
import { SkeletonRect } from "../../style";
import { Container } from "./style";

const SkeletonSkeletonShopCards = ({ keyPrefix }) => {
  return (
    <Container>
      {[1, 2, 3, 4]?.map((x) => (
        <SkeletonRect key={`${keyPrefix}-${x}`} height="18rem" width="100%" />
      ))}
    </Container>
  );
};

export default SkeletonSkeletonShopCards;
