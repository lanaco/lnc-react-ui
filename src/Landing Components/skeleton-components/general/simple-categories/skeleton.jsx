/* eslint-disable react/prop-types */
import { SkeletonContainer, SkeletonSquare } from "../../style";
import { Container } from "./style";

const SkeletonSkeletonSimpleCategories = ({ keyPrefix }) => {
  return (
    <Container>
      {[1, 2]?.map((x) => (
        <SkeletonContainer
          key={`${keyPrefix}-${x}`}
          className="skeleton__cards"
        >
          <SkeletonSquare size="8.25rem" />
          <SkeletonSquare size="8.25rem" />
          <SkeletonSquare size="8.25rem" />
          <SkeletonSquare size="8.25rem" />
          <SkeletonSquare size="8.25rem" />
          <SkeletonSquare size="8.25rem" />
        </SkeletonContainer>
      ))}
    </Container>
  );
};

export default SkeletonSkeletonSimpleCategories;
