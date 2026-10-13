import styled from "@emotion/styled";
import { down } from "../../../_utils/breakpoints";

export const Wrapper = styled.div`
  width: 100%;
  color: var(--gray-700, #4e555f);

  & .seo-text__title {
    font-size: 1.375rem;
    font-weight: 600;
    line-height: 1.75rem;
    color: var(--gray-950, #14161a);
    margin: 0 0 1rem 0;
  }

  & .seo-text__body {
    position: relative;
    overflow: hidden;
    max-height: 9rem;
    font-size: 0.9375rem;
    line-height: 1.5rem;
    transition: max-height 0.2s ease;
  }

  & .seo-text__body::after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 3rem;
    background: linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0),
      var(--white, #fff)
    );
    pointer-events: none;
  }

  & .seo-text__body.is-expanded {
    max-height: none;
  }

  & .seo-text__body.is-expanded::after {
    display: none;
  }

  & .seo-text__body p {
    margin: 0 0 0.75rem 0;
  }

  & .seo-text__body h2,
  & .seo-text__body h3,
  & .seo-text__body h4 {
    color: var(--gray-950, #14161a);
    margin: 1rem 0 0.5rem 0;
  }

  & .seo-text__body a {
    color: var(--primary-500, #f97316);
  }

  & .seo-text__body em,
  & .seo-text__body i {
    font-style: italic;
  }

  & .seo-text__body strong,
  & .seo-text__body b {
    font-weight: 700;
  }

  & .seo-text__body s,
  & .seo-text__body strike,
  & .seo-text__body del {
    text-decoration: line-through;
  }

  & .seo-text__body ul,
  & .seo-text__body ol {
    margin: 0 0 0.75rem 1.5rem;
    padding-left: 0;
  }

  & .seo-text__body ul {
    list-style: disc;
  }

  & .seo-text__body ol {
    list-style: decimal;
  }

  & .seo-text__body li {
    list-style: inherit;
  }

  & .seo-text__body li[data-list="bullet"] {
    list-style-type: disc;
  }

  & .seo-text__body li[data-list="ordered"] {
    list-style-type: decimal;
  }

  & .seo-text__toggle {
    margin-top: 0.75rem;
    padding: 0;
    border: none;
    background: transparent;
    color: var(--primary-500, #f97316);
    font-size: 0.9375rem;
    font-weight: 600;
    font-family: inherit;
    cursor: pointer;
  }

  & .seo-text__toggle:hover {
    text-decoration: underline;
  }

  @media ${down("S")} {
    & .seo-text__title {
      font-size: 1.125rem;
    }
  }
`;
