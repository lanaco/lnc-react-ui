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
    selectAction,
    LinkComponent,
  } = props;
  const Component = LinkComponent || "a";
  const hasPrice =
    price !== null && price !== undefined && price !== "" && !!currency;

  return (
    <ExternalWrapper
      ref={ref}
      className="simple-gift-card"
      onClick={() => onSelectGiftCard(price)}
      as={Component}
      {...(LinkComponent
        ? {
            to: `${selectAction}`,
          }
        : {
            href: `${selectAction}`,
          })}
    >
      <CardWrapper>
        {hasPrice && (
          <div className="price-tag">
            {`${formatPrice(price)} ${GetCurrencySymbol(currency)}`}
          </div>
        )}
        <img src={image} />
      </CardWrapper>
      <div className="text-wrap">{text}</div>
    </ExternalWrapper>
  );
});

export default GiftCard;
