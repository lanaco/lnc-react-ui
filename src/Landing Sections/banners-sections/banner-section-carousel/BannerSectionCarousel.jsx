import { forwardRef } from "react";

import Carousel from "react-multi-carousel";

import "react-multi-carousel/lib/styles.css";

import PropTypes from "prop-types";

import Button from "../../../General/Button/Button";
import useDetectMobile from "../../../_utils/useDetectMobile";
import { Container } from "./style";

const BannerSectionCarousel = forwardRef(
  ({ items = [], onSelectItem = () => {}, onButtonAction = () => {} }, ref) => {
    const responsive = {
      desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 1,
        partialVisibilityGutter: 0,
      },
      tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 1,
        partialVisibilityGutter: 0,
      },
      mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
        partialVisibilityGutter: 48,
      },
    };

    const isMobile = useDetectMobile();

    return (
      <Container key={`banner-section-carousel__${isMobile}`} ref={ref}>
        <Carousel
          responsive={responsive}
          removeArrowOnDeviceType="mobile"
          infinite={!isMobile}
          keyBoardControl={true}
          autoPlay={true}
          partialVisible={true}
          sliderClass="carousel-slider"
          itemClass="carousel-item"
          containerClass="carousel-container"
        >
          {items?.map((item, idx) => (
            <div
              key={`banner-section-carousel-item__${idx + 1}`}
              className="section__card"
              onClick={() => onSelectItem(item)}
            >
              <img
                src={item?.imageUrl}
                alt={`Slide ${idx + 1}`}
                className="section__image"
              />
              <div className="card__content">
                <div className="card__text">
                  {item?.title && (
                    <div className="card__title">{item?.title}</div>
                  )}
                  {item?.title && (
                    <div className="card__description">{item?.description}</div>
                  )}
                </div>
                {item?.buttonText && (
                  <Button
                    text={item?.buttonText}
                    className="card__action"
                    size="medium"
                    onClick={(e) => {
                      e?.stopPropagation();

                      onButtonAction(item);
                    }}
                  />
                )}
              </div>
            </div>
          ))}
        </Carousel>
      </Container>
    );
  }
);

BannerSectionCarousel.propTypes = {
  items: PropTypes.array,
  onSelectItem: PropTypes.func,
  onButtonAction: PropTypes.func,
};

export default BannerSectionCarousel;
