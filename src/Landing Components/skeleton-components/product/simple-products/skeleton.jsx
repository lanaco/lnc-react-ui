/* eslint-disable react/prop-types */
import {
  SkeletonLinePlaceholder,
  SkeletonRowWrapper,
  SkeletonSquarePlaceholder,
} from "../../style";
import { Container } from "./style";

const SkeletonSimpleProducts = ({ keyPrefix }) => {
  return (
    <Container>
      <SkeletonRowWrapper className="skeleton__cards">
        <SkeletonLinePlaceholder
          width="100%"
          height="11.125rem"
          key={`${keyPrefix}-1`}
        />
        <SkeletonSquarePlaceholder
          key={`${keyPrefix}-2`}
          height="11.125rem"
          width="11.125rem"
        />
        <SkeletonSquarePlaceholder
          key={`${keyPrefix}-3`}
          height="11.125rem"
          width="11.125rem"
        />
        <SkeletonSquarePlaceholder
          key={`${keyPrefix}-4`}
          height="11.125rem"
          width="11.125rem"
        />
      </SkeletonRowWrapper>
      <SkeletonRowWrapper className="skeleton__cards">
        <SkeletonSquarePlaceholder
          key={`${keyPrefix}-5`}
          height="11.125rem"
          width="11.125rem"
        />
        <SkeletonSquarePlaceholder
          key={`${keyPrefix}-6`}
          height="11.125rem"
          width="11.125rem"
        />
        <SkeletonSquarePlaceholder
          key={`${keyPrefix}-7`}
          height="11.125rem"
          width="11.125rem"
        />
        <SkeletonSquarePlaceholder
          key={`${keyPrefix}-8`}
          height="11.125rem"
          width="11.125rem"
        />
        <SkeletonSquarePlaceholder
          key={`${keyPrefix}-9`}
          height="11.125rem"
          width="11.125rem"
        />
        <SkeletonSquarePlaceholder
          key={`${keyPrefix}-10`}
          height="11.125rem"
          width="11.125rem"
        />
      </SkeletonRowWrapper>
    </Container>
  );
};

export default SkeletonSimpleProducts;
