/* eslint-disable react/prop-types */
import { SkeletonRect } from "../../style";
import { Container } from "./style";

const SkeletonBannerSectionCarousel = ({ keyPrefix }) => {
  return (
    <Container>
      <SkeletonRect
        keyPrefix={`${keyPrefix}-0`}
        width="100%"
        height="22.5rem"
      />
    </Container>
  );
};

export default SkeletonBannerSectionCarousel;
