/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import { forwardRef, useEffect, useState } from "react";

import { Container } from "./style";

const DAY_MS = 1000 * 60 * 60 * 24;
const HOUR_MS = 1000 * 60 * 60;
const MINUTE_MS = 1000 * 60;

const pad = (n) => String(n).padStart(2, "0");

const parseEnd = (countdownTo) => {
  if (countdownTo == null || countdownTo === "") return NaN;
  return new Date(countdownTo).getTime();
};

const getRemaining = (end) => {
  const diff = Number.isNaN(end) ? 0 : Math.max(0, end - Date.now());
  return {
    diff,
    days: Math.floor(diff / DAY_MS),
    hours: Math.floor((diff % DAY_MS) / HOUR_MS),
    minutes: Math.floor((diff % HOUR_MS) / MINUTE_MS),
  };
};

/**
 * Full-width promo banner with a live days/hours/minutes countdown over it.
 * Port of the web's TimerSection.astro - the marketing copy is baked into the
 * images; this component only renders the image(s), the countdown and the
 * click-through link. Hidden when there is no image or `countdownTo` has
 * already passed (unless `hideWhenEnded` is false).
 */
const TimerSection = forwardRef(
  (
    {
      imageUrl,
      imageUrlMobile,
      redirectUrl,
      countdownTo,
      daysLabel = "DANA",
      hoursLabel = "SATI",
      minutesLabel = "MIN",
      hideWhenEnded = true,
      onClick,
      className = "",
    },
    ref,
  ) => {
    const end = parseEnd(countdownTo);
    const hasEndDate = !Number.isNaN(end);

    const [remaining, setRemaining] = useState(() => getRemaining(end));

    useEffect(() => {
      setRemaining(getRemaining(end));
      if (!hasEndDate) return;

      const timer = setInterval(() => {
        const next = getRemaining(end);
        setRemaining(next);
        if (next.diff <= 0) clearInterval(timer);
      }, 1000);

      return () => clearInterval(timer);
    }, [end, hasEndDate]);

    const hasEnded = hasEndDate && remaining.diff <= 0;

    if (!imageUrl || (hideWhenEnded && hasEnded)) return null;

    return (
      <Container
        ref={ref}
        href={redirectUrl || undefined}
        className={`lp-section lp-timer-section timer-section-lnc ${className}`.trim()}
        onClick={
          onClick
            ? (e) => {
                onClick(redirectUrl, e);
              }
            : undefined
        }
      >
        <picture className="timer-section__picture">
          {imageUrlMobile && (
            <source media="(max-width: 767px)" srcSet={imageUrlMobile} />
          )}
          <img
            src={imageUrl}
            alt=""
            loading="lazy"
            className="timer-section__image"
          />
        </picture>
        <div className="timer-section__countdown">
          <div className="countdown__unit">
            <span className="countdown__value">{pad(remaining.days)}</span>
            <span className="countdown__label">{daysLabel}</span>
          </div>
          <span className="countdown__sep" aria-hidden="true" />
          <div className="countdown__unit">
            <span className="countdown__value">{pad(remaining.hours)}</span>
            <span className="countdown__label">{hoursLabel}</span>
          </div>
          <span className="countdown__sep" aria-hidden="true" />
          <div className="countdown__unit">
            <span className="countdown__value">{pad(remaining.minutes)}</span>
            <span className="countdown__label">{minutesLabel}</span>
          </div>
        </div>
      </Container>
    );
  },
);

export default TimerSection;
