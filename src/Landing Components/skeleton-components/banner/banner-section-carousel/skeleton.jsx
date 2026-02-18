/* eslint-disable react/prop-types */
import { SkeletonLinePlaceholder } from "../../style";
import { Container } from "./style";

const SkeletonBannerSectionCarousel = ({ keyPrefix }) => {
  return (
    <Container noGradient={true}>
      <SkeletonLinePlaceholder keyPrefix={`${keyPrefix}-1`} height="22.5rem" />
    </Container>
  );
};

export default SkeletonBannerSectionCarousel;
