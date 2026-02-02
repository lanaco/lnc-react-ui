/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import { forwardRef } from "react";

import { useTheme } from "@emotion/react";

import { Container, Gradient } from "./style";

const QuattroCard = forwardRef(
  ({ title, description, imageUrl, onSelectCard = () => {}, link }, ref) => {
    const { theme } = useTheme();

    return (
      <Container ref={ref} theme={theme} onClick={onSelectCard} to={`/${link}`}>
        <img loading="lazy" src={imageUrl} />
        <Gradient theme={theme} className="quattro-card__gradient">
          <div className="quattro-card__text">
            <div className="quattro-card__title">{title}</div>
            <div className="quattro-card__description">{description}</div>
          </div>
        </Gradient>
      </Container>
    );
  }
);

export default QuattroCard;
