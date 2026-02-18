/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
// TODO: add simpler view with just 1 star and rating number displayed
// also, title for hover effect..
import { Container, FilledStars, EmptyStars } from "./style";
import { useTheme } from "../../ThemeProvider/ThemeProvider";
import { forwardRef } from "react";

const StarRating = forwardRef((props, ref) => {
  const {
    rating = 0,
    reviewCount = null,
    disabled = false,
    tabIndex = 0,
    className = "",
    style = {},
    color = "primary",
    size = "large",
  } = props;

  const { theme } = useTheme();

  const themeProps = {
    theme,
    color,
    size,
    style,
    disabled,
  };

  const ratingPercentage = (rating / 5) * 100;

  return (
    <Container
      ref={ref}
      tabIndex={tabIndex}
      {...themeProps}
      className={`star-rating ${className}`}
    >
      <div className="rating">
        <FilledStars
          className="filled-stars"
          {...themeProps}
          width={ratingPercentage}
        >
          ★★★★★
        </FilledStars>
        <EmptyStars {...themeProps}>★★★★★</EmptyStars>
      </div>
      {!isNaN(reviewCount) && Number.isFinite(reviewCount) && (
        <div className="review-count">{`(${reviewCount.toLocaleString()})`}</div>
      )}
    </Container>
  );
});

export default StarRating;
