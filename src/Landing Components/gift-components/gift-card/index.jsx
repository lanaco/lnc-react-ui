/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import { forwardRef } from "react";
import { CardWrapper, ExternalWrapper } from "./style";
import { formatPrice, GetCurrencySymbol } from "../../../_utils/utils";

const GiftCard = forwardRef((props, ref) => {
  const {
    image,
    text,
    price,
    currency,
    onSelectGiftCard = () => {},
    selectAction
  } = props;

  return (
    <ExternalWrapper
      ref={ref}
      className="simple-gift-card"
      onClick={() => onSelectGiftCard(price)}
      to={selectAction}
    >
      <CardWrapper>
        <div className="price-tag">
          {price &&
            currency &&
            `${formatPrice(price)} ${GetCurrencySymbol(currency)}`}
        </div>
        <img src={image} />
      </CardWrapper>
      <div className="text-wrap">{text}</div>
    </ExternalWrapper>
  );
});

export default GiftCard;
