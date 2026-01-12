/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import { forwardRef } from "react";

import FieldOfInterestsWithAvatarsCardAvatar from "../../../Landing Components/field-of-interests-components/field-of-interests-with-avatars-card/avatar";
import FieldOfInterestsWithAvatarsCard from "../../../Landing Components/field-of-interests-components/field-of-interests-with-avatars-card/card";
import { Wrapper } from "./style";
import SuspenseFieldOfInterestsWithAvatarsTag from "../../../Landing Components/skeleton-components/field-of-interests/field-of-interests-with-avatars/tags";
import SuspenseFieldOfInterestsWithAvatarsCard from "../../../Landing Components/skeleton-components/field-of-interests/field-of-interests-with-avatars/cards";

const FieldOfInterestsWithAvatarsCardsSection = forwardRef(
  (
    {
      title,
      subtitle,
      avatars = [],
      limitAvatars = 4,
      limit = 6,
      limitAvatarsForMobile = 4,
      limitForMobile = 2,
      items = [],
      onSelectAvatar = () => {},
      onSelectCard = () => {},
      isLoadingTags = false,
      isLoadingCards = false,
    },
    ref
  ) => {
    // const [active, setActive] = useState();

    const handleSelectAvatar = (avatar) => {
      // setActive(tag?.uuid);
      onSelectAvatar?.(avatar);
    };

    const handleSelectCard = (card) => {
      onSelectCard?.(card);
    };

    return (
      <Wrapper
        ref={ref}
        limitAvatars={limitAvatars}
        limitAvatarsForMobile={limitAvatarsForMobile}
        limitCards={limit}
        limitCardsForMobile={limitForMobile}
      >
        <div className="wrapper__heading">
          {title && <div className="wrapper__title">{title}</div>}
          {subtitle && <div className="wrapper__subtitle">{subtitle}</div>}
        </div>

        <SuspenseFieldOfInterestsWithAvatarsTag
          isLoading={isLoadingTags}
          keyPrefix="field-of-interests-with-avatars-tag"
        >
          <div className="wrapper__avatars">
            {avatars?.map((avatar, idx) => (
              <FieldOfInterestsWithAvatarsCardAvatar
                key={`field-of-interests-with-avatars-card-avatar__${idx + 1}`}
                image={avatar?.image}
                imageComponent={avatar?.imageComponent}
                // isActive={tag?.uuid === active}
                onSelectCard={() => handleSelectAvatar?.(avatar)}
              />
            ))}
          </div>
        </SuspenseFieldOfInterestsWithAvatarsTag>

        <SuspenseFieldOfInterestsWithAvatarsCard
          isLoading={isLoadingCards}
          keyPrefix="field-of-interests-with-avatars-card"
        >
          <div className="wrapper__cards">
            {items?.map((card, idx) => (
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
            ))}
          </div>
        </SuspenseFieldOfInterestsWithAvatarsCard>
      </Wrapper>
    );
  }
);

export default FieldOfInterestsWithAvatarsCardsSection;
