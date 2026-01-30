/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import { forwardRef } from "react";
import useDetectMobile from "../../../_utils/useDetectMobile";
import { RegulatTitleSectionWrapper } from "../../style";
import { isDefinedNotEmptyString } from "../../../_utils/utils";
import Button from "../../../General/Button/Button";
import { GridWrapper } from "./style";
import GiftCard from "../../../Landing Components/gift-components/gift-card";
import SuspenseGiftCards from "../../../Landing Components/skeleton-components/general/gift-cards";

const GiftsSection = forwardRef((props, ref) => {
  const {
    icon,
    title,
    buttonLink,
    items,
    isLoading = false,
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
        {isDefinedNotEmptyString(buttonText) &&
          isDefinedNotEmptyString(buttonLink) &&
          !isLoading && (
            <Button
              type="button"
              btnType="tinted"
              color="neutral"
              onClick={(e) => {
                e?.target?.blur();
                onButtonAction(buttonLink);
              }}
              borderRadius="curved"
              className="button-link"
            >
              {buttonText}
            </Button>
          )}
      </div>
      <SuspenseGiftCards isLoading={isLoading} keyPrefix="gift-cards-skeleton">
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
                  selectAction={x?.selectAction}
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
                    selectAction={x?.selectAction}
                    onSelectGiftCard={(uuid) => onSelectCard(x)}
                  />
                ))}
        </GridWrapper>
      </SuspenseGiftCards>
    </RegulatTitleSectionWrapper>
  );
});

export default GiftsSection;
