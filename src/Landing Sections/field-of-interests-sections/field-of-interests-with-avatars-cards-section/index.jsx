import { forwardRef, useState } from "react";

import FieldOfInterestsWithAvatarsCardAvatarSkeleton from "../../../Landing Components/field-of-interests-components/field-of-interests-with-avatars-card/avatar-skeleton";
import FieldOfInterestsWithAvatarsCardAvatar from "../../../Landing Components/field-of-interests-components/field-of-interests-with-avatars-card/avatar";
import FieldOfInterestsWithAvatarsCard from "../../../Landing Components/field-of-interests-components/field-of-interests-with-avatars-card/card";
import FieldOfInterestsWithAvatarsCardSkeleton from "../../../Landing Components/field-of-interests-components/field-of-interests-with-tags-card/card-skeleton";
import { Wrapper } from "./style";

const FieldOfInterestsWithAvatarsCardsSection = forwardRef(
  (
    { title, subtitle, avatars = [], cards = [], onSelectCard = () => {} },
    ref
  ) => {
    // const [active, setActive] = useState();

    const handleSelectAvatar = (avatar) => {
      // setActive(tag?.uuid);
      onSelectCard?.(avatar?.uuid);
    };

    const handleSelectCard = (card) => {
      onSelectCard?.(tag?.uuid);
    };

    return (
      <Wrapper>
        <div className="wrapper__heading">
          {title && <div className="wrapper__title">{title}</div>}
          {subtitle && <div className="wrapper__subtitle">{subtitle}</div>}
        </div>
        <div className="wrapper__avatars">
          {avatars && avatars?.length > 0
            ? avatars?.map((avatar, idx) => (
                <FieldOfInterestsWithAvatarsCardAvatar
                  key={`field-of-interests-with-avatars-card-avatar__${
                    idx + 1
                  }`}
                  image={avatar?.image}
                  imageComponent={avatar?.imageComponent}
                  // isActive={tag?.uuid === active}
                  onCardSelect={() => handleSelectAvatar?.(avatar)}
                />
              ))
            : Array.from("12345")?.map((_, idx) => (
                <FieldOfInterestsWithAvatarsCardAvatarSkeleton
                  key={`field-of-interests-with-avatars-card-avatar-skeleton__${
                    idx + 1
                  }`}
                />
              ))}
        </div>
        <div className="wrapper__cards">
          {cards && cards?.length > 0
            ? cards?.map((card, idx) => (
                <FieldOfInterestsWithAvatarsCard
                  key={`field-of-interests-with-avatars-card__${idx + 1}`}
                  uuid={card?.uuid}
                  title={card?.title}
                  price={card?.price}
                  currency={card?.currency}
                  isNegotiable={card?.isNegotiable}
                  isFree={card?.isFree}
                  image={card?.image}
                  imageComponent={card?.imageComponent}
                  sellerUuid={card?.sellerUuid}
                  negotiableText={card?.negotiableText}
                  freeText={card?.freeText}
                  onSelectCard={() => handleSelectCard?.(card)}
                />
              ))
            : Array.from("12345")?.map((_, idx) => (
                <FieldOfInterestsWithAvatarsCardSkeleton
                  key={`field-of-interests-with-avatars-card-skeleton__${
                    idx + 1
                  }`}
                />
              ))}
        </div>
      </Wrapper>
    );
  }
);

export default FieldOfInterestsWithAvatarsCardsSection;
