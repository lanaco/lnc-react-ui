/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import { forwardRef } from "react";
import { Carousel } from "react-responsive-carousel";
import PropTypes from "prop-types";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import useDetectMobile from "../../../_utils/useDetectMobile";
import { Wrapper, Banner, BannerOverlay } from "./style";
import Button from "../../../General/Button/Button";
import { isDefined } from "../../../_utils/utils";

const BannerSectionCarousel = forwardRef(
  (
    { carouselItems = [], onSelectItem = () => {}, onButtonAction = () => {} },
    ref
  ) => {
    const isMobile = useDetectMobile();

    return (
      <Wrapper ref={ref}>
        <Carousel
          autoPlay={true}
          infiniteLoop={true}
          showArrows={false}
          showStatus={false}
          showThumbs={false}
          transitionTime={500}
          onClickItem={(idx) => {
            if (!isMobile) {
              onSelectItem?.(carouselItems?.at(idx), idx);
            }
          }}
        >
          {carouselItems &&
            carouselItems?.map((b, idx) => (
              <Banner
                key={`banner-${idx + 1}`}
                backgroundColor={b?.backgroundColor}
              >
                <img loading="lazy" src={b.imageUrl} />
                <BannerOverlay backgroundColor={b?.backgroundColor}>
                  <div className="banner-content">
                    <div className="banner-text">
                      <div className="banner-title">{b.title}</div>
                      {b.description}
                    </div>
                    {isDefined(b?.buttonText) && (
                      <Button
                        color="neutral"
                        trailingIcon="arrow-right"
                        onClick={() => onButtonAction(b)}
                      >
                        {b.buttonText}
                      </Button>
                    )}
                  </div>
                </BannerOverlay>
              </Banner>
            ))}
        </Carousel>
      </Wrapper>
    );
  }
);

BannerSectionCarousel.propTypes = {
  items: PropTypes.array,
  handleClick: PropTypes.func,
};

export default BannerSectionCarousel;
