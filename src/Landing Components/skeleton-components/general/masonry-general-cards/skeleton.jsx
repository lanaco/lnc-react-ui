/* eslint-disable react/prop-types */
import {
  SkeletonColumnContainer,
  SkeletonRect,
  SkeletonContainer,
} from "../../style";
import { Container } from "./style";

const SkeletonMasonryGeneralCards = ({ keyPrefix }) => {
  return (
    <Container>
      <SkeletonColumnContainer>
        <SkeletonRect
          key={`${keyPrefix}-1`}
          height="31.25rem"
          className="skeleton__big"
          width="100%"
        />
      </SkeletonColumnContainer>
      <SkeletonColumnContainer>
        <SkeletonContainer>
          <SkeletonRect key={`${keyPrefix}-2`} width="100%" height="15rem" />
          <SkeletonRect key={`${keyPrefix}-3`} width="100%" height="15rem" />
        </SkeletonContainer>
        <SkeletonContainer>
          <SkeletonRect key={`${keyPrefix}-4`} width="100%" height="15rem" />
          <SkeletonRect key={`${keyPrefix}-5`} width="100%" height="15rem" />
        </SkeletonContainer>
      </SkeletonColumnContainer>
    </Container>
  );
};

export default SkeletonMasonryGeneralCards;
