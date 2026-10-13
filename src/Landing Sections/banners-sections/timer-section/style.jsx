import styled from "@emotion/styled";
import { down } from "../../../_utils/breakpoints";

// Mirrors the web's TimerSection.astro styles.
export const Container = styled.a`
  position: relative;
  display: block;
  width: 100%;
  aspect-ratio: 1216 / 360;
  text-decoration: none;
  overflow: hidden;
  border-radius: 0.75rem;
  border: 1px solid rgba(20, 22, 26, 0.08);
  box-shadow:
    0px 1px 3px 0px rgba(0, 0, 0, 0.1),
    0px 1px 2px 0px rgba(0, 0, 0, 0.06);
  background: #010201;
  box-sizing: border-box;
  cursor: pointer;

  & .timer-section__picture {
    display: contents;
  }

  & .timer-section__image {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  /* 105/1216 and 240/360 of the Figma frame */
  & .timer-section__countdown {
    position: absolute;
    left: 8.63%;
    top: 66.67%;
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  & .countdown__unit {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.25rem;
    width: 3.5rem;
    height: 4.5rem;
    box-sizing: border-box;
    border-radius: 0.5rem;
    background: rgba(255, 255, 255, 0.12);
    border: 1px solid rgba(255, 255, 255, 0.25);
    color: #fff;
    text-align: center;
  }

  & .countdown__value {
    font-size: 1.5rem;
    font-weight: 600;
    line-height: 2rem;
  }

  & .countdown__label {
    font-size: 0.75rem;
    font-weight: 400;
    line-height: 1rem;
    letter-spacing: 0.025rem;
  }

  & .countdown__sep {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
    width: 0.375rem;
    height: 1.5rem;

    &::before,
    &::after {
      content: "";
      width: 0.375rem;
      height: 0.375rem;
      border-radius: 999px;
      background: #fff;
    }
  }

  /* Mobile: countdown stacked below an inset image card */
  @media ${down("S")} {
    aspect-ratio: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.25rem;
    padding-bottom: 1.25rem;
    border: none;
    box-shadow: none;
    border-radius: 0.5rem;

    & .timer-section__image {
      position: static;
      width: calc(100% - 1rem);
      margin: 0.5rem 0.5rem 0;
      aspect-ratio: 337 / 219;
      border-radius: 0.75rem;
      border: 1px solid rgba(20, 22, 26, 0.08);
      box-shadow:
        0px 1px 3px 0px rgba(0, 0, 0, 0.1),
        0px 1px 2px 0px rgba(0, 0, 0, 0.06);
      box-sizing: border-box;
    }

    & .timer-section__countdown {
      position: static;
    }
  }
`;
