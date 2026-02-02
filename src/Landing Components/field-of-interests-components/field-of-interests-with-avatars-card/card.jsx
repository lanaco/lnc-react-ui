/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import { forwardRef } from "react";

import SimpleProductCard from "../../product components/simple-product-card";

const FieldOfInterestsWithAvatarsCard = forwardRef(
  (
    {
      uuid,
      title,
      price,
      currency,
      isNegotiable,
      isFree,
      image,
      sellerUuid,
      onSelectCard = () => {},
      imageComponent,
      negotiableText = "Negotiable",
      freeText = "Free",
      nameSlug,
      LinkComponent
    },
    ref
  ) => {
    return (
      <SimpleProductCard
        ref={ref}
        uuid={uuid}
        title={title}
        price={price}
        currency={currency}
        isNegotiable={isNegotiable}
        isFree={isFree}
        image={image}
        imageComponent={imageComponent}
        sellerUuid={sellerUuid}
        onSelectCard={onSelectCard}
        negotiableText={negotiableText}
        freeText={freeText}
        nameSlug={nameSlug}
        LinkComponent={LinkComponent}
      />
    );
  }
);

export default FieldOfInterestsWithAvatarsCard;
