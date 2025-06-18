// TODO: add simpler view with just 1 star and rating number displayed
// also, title for hover effect..
import { Container, FilledStars, EmptyStars } from "./style";
import { useTheme } from "../../ThemeProvider/ThemeProvider";
import { forwardRef } from "react";
import PropTypes from "prop-types";
import isFinite from "lodash.isfinite";
import isNumber from "lodash.isnumber";

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
      {isNumber(reviewCount) && isFinite(reviewCount) && (
        <div className="review-count">{`(${reviewCount.toLocaleString()})`}</div>
      )}
    </Container>
  );
});

StarRating.propTypes = {
  rating: PropTypes.number,
  reviewCount: PropTypes.any,
  disabled: PropTypes.bool,
  tabIndex: PropTypes.number,
  style: PropTypes.object,
  className: PropTypes.string,

  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "success",
    "warning",
    "danger",
    "information",
    "neutral",
  ]),

  size: PropTypes.oneOf(["small", "medium", "large"]),
};

export default StarRating;
