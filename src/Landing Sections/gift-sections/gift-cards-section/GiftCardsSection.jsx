/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import { forwardRef } from "react";
import useDetectMobile from "../../../_utils/useDetectMobile";
import { RegulatTitleSectionWrapper } from "../../style";
import { isDefinedNotEmptyString } from "../../../_utils/utils";
import Button from "../../../General/Button/Button";
import { GridWrapper } from "./style";
import GiftCard from "../../../Landing Components/gift-components/gift-card";

const GiftsSection = forwardRef((props, ref) => {
  const {
    icon,
    title,
    buttonLink,
    items,
    buttonText,
    limit = 4,
    onSelectCard = () => {},
    onButtonAction = () => {},
  } = props;

  const isMobile = useDetectMobile();

  return (
    <RegulatTitleSectionWrapper ref={ref}>
      <div className="regular-title">
        <div className="regular-title-text">
          {isDefinedNotEmptyString(icon) && <i className={icon} />}
          <span>{title}</span>
        </div>
        {isDefinedNotEmptyString(buttonLink) && (
          <Button
            type="button"
            btnType="tinted"
            color="gray"
            onClick={(e) => {
              e?.target?.blur();
              onButtonAction(buttonLink);
            }}
            borderRadius="curved"
          >
            {buttonText}
          </Button>
        )}
      </div>
      <GridWrapper limit={limit}>
        {isMobile === true
          ? items?.map((x, index) => (
              <GiftCard
                key={index}
                text={x?.text}
                price={x?.priceTo}
                currency={x?.currencyIsoCode}
                image={x?.imageUrl}
                uuid={x?.uuid}
                onSelectGiftCard={(uuid) => onSelectCard(x)}
              />
            ))
          : items
              ?.slice(0, limit)
              .map((x, index) => (
                <GiftCard
                  key={index}
                  text={x?.text}
                  price={x?.priceTo}
                  currency={x?.currencyIsoCode}
                  image={x?.imageUrl}
                  uuid={x?.uuid}
                  onSelectGiftCard={(uuid) => onSelectCard(x)}
                />
              ))}
      </GridWrapper>
    </RegulatTitleSectionWrapper>
  );
});

export default GiftsSection;
