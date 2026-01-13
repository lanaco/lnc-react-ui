/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import { forwardRef, memo, useMemo } from "react";

import { isDefinedNotEmptyString } from "../../../_utils/utils";
import QuattroCard from "../../../Landing Components/general-components/quattro-card";
import { Wrapper } from "./style";
import SuspenseBlogCardsSponsored from "../../../Landing Components/skeleton-components/blog/blog-cards-sponsored";

const MemoizedQuattroCard = memo(QuattroCard);

const QuattroCardsSection = forwardRef(
  ({ title, items, isLoading = false, onSelectCard = () => {} }, ref) => {
    const memoizedCards = useMemo(() => {
      return items
        ?.slice(0, 4)
        ?.map((x, idx) => (
          <MemoizedQuattroCard
            key={`quattro-card__${idx + 1}`}
            title={x?.title}
            description={x?.description}
            imageUrl={x?.imageUrl}
            onSelectCard={() => onSelectCard?.(x)}
          />
        ));
    }, [items]);

    return (
      <Wrapper ref={ref}>
        <div className="wrapper__heading">
          <div className="wrapper__title">
            {isDefinedNotEmptyString(title) && (
              <div className="title__text">
                <span>{title}</span>
              </div>
            )}
          </div>
        </div>
        <SuspenseBlogCardsSponsored
          isLoading={isLoading}
          keyPrefix="quattro-cards-skeleton"
        >
          <div className="wrapper__cards">{memoizedCards}</div>
        </SuspenseBlogCardsSponsored>
      </Wrapper>
    );
  }
);

export default QuattroCardsSection;
