/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import { forwardRef } from "react";
import { GridWrapper, MobileScrollWrapper } from "./style";
import useDetectMobile from "../../../_utils/useDetectMobile";
import TextBlockV1 from "../../../Landing Components/text-block-v1/index";

const ArrowRight = () => (
  <svg
    className="banner-grid-card__arrow"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <line x1="4" y1="12" x2="20" y2="12" />
    <polyline points="13 5 20 12 13 19" />
  </svg>
);

const BannerSectionGrid = forwardRef((props, ref) => {
  const {
    image1Url,
    image2Url,
    title1,
    title2,
    text1,
    text2,
    subtitle1,
    subtitle2,
    buttonText1,
    buttonText2,
    buttonLink1,
    buttonLink2,
    rowHeight = "12.65625rem",
    onButtonAction = () => {},
  } = props;

  const isMobile = useDetectMobile();

  // Mobile: clickable image cards with title/button overlaid, horizontally
  // scrollable (see design). Desktop layout below is left untouched.
  if (isMobile === true) {
    const cards = [
      {
        image: image1Url,
        title: title1,
        buttonText: buttonText1,
        buttonLink: buttonLink1,
      },
      {
        image: image2Url,
        title: title2,
        buttonText: buttonText2,
        buttonLink: buttonLink2,
      },
    ];

    return (
      <MobileScrollWrapper
        className="lp-section lp-bnr-section lp-banner-section-grid banner-section-grid-lnc banner-section-grid-mobile"
        ref={ref}
      >
        {cards.map((card, index) => (
          <a
            key={index}
            className="banner-grid-card"
            role="button"
            tabIndex={0}
            onClick={() => onButtonAction(card.buttonLink)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onButtonAction(card.buttonLink);
              }
            }}
          >
            <img
              className="banner-grid-card__img"
              src={card.image}
              alt={card.title || ""}
            />
            <div className="banner-grid-card__overlay">
              {card.title && (
                <div className="banner-grid-card__title">{card.title}</div>
              )}
              {card.buttonText && (
                <div className="banner-grid-card__action">
                  <span>{card.buttonText}</span>
                  <ArrowRight />
                </div>
              )}
            </div>
          </a>
        ))}
      </MobileScrollWrapper>
    );
  }

  return (
    <GridWrapper
      className="lp-section lp-bnr-section lp-banner-section-grid banner-section-grid-lnc"
      ref={ref}
      height={rowHeight}
    >
      <TextBlockV1
        className="text-item"
        title={title1}
        subtitle={subtitle1}
        description={text1}
        buttonText={buttonText1}
        buttonLink={buttonLink1}
        onButtonAction={onButtonAction}
      />
      <img className="img-item img-1" src={image1Url} />
      <img className="img-item img-2" src={image2Url} />
      <TextBlockV1
        className="text-item"
        title={title2}
        subtitle={subtitle2}
        description={text2}
        buttonText={buttonText2}
        buttonLink={buttonLink2}
        onButtonAction={onButtonAction}
      />
    </GridWrapper>
  );
});

export default BannerSectionGrid;
