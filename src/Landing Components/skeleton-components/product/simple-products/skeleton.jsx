/* eslint-disable react/prop-types */
import { SkeletonContainer, SkeletonRect, SkeletonSquare } from "../../style";
import { Container } from "./style";

const SkeletonSimpleProducts = ({ keyPrefix }) => {
  return (
    <Container>
      {[1, 2]?.map((x) => (
        <SkeletonContainer
          className="skeleton__cards"
          key={`${keyPrefix}-${x}`}
        >
          <SkeletonRect width="100%" height="11.125rem" />
          <SkeletonSquare size="11.125rem" />
          <SkeletonSquare size="11.125rem" />
          <SkeletonSquare size="11.125rem" />
        </SkeletonContainer>
      ))}
    </Container>
  );
};

export default SkeletonSimpleProducts;
