import styled from "@emotion/styled";

import { BorderPanel } from "src/ui/styles";
import { linearGradientAnimation } from "src/ui/styles";

export const Wrapper = styled(BorderPanel)`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1 0 0;
  border-radius: 1.25rem;

  & .wrapper__tile {
    display: flex;
    padding: 1.25rem;
    flex-direction: column;
    align-items: center;
    gap: 0.75rem;
    align-self: strech;

    & img {
      width: 4rem;
      height: 4rem;
      border-radius: 999px;
      object-fit: cover;

      &:hover {
        cursor: pointer;
      }
    }
  }

  & .wrapper__image {
    width: 4rem;
    height: 4rem;
    border-radius: 999px;

    &:hover {
      cursor: pointer;
    }
  }

  & .wrapper__image--skeleton {
    width: 4rem;
    height: 4rem;
    border-radius: 999px;
    background-color: ${linearGradientAnimation("-90deg")};
  }

  & .wrapper__info {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.375rem;

    & .info__title {
      color: var(--gray-950);
      font-size: 1rem;
      font-style: normal;
      font-weight: 500;
      line-height: 1.5rem;
      letter-spacing: -0.0112rem;
    }

    & .info__subtitle {
      color: var(--gray-600);
      text-align: center;
      font-size: 0.875rem;
      font-style: normal;
      font-weight: 400;
      line-height: 1.25rem;
      letter-spacing: -0.0056rem;
    }

    & .info-badges {
    }

    & .info__rating {
    }

    & .info__title--skeleton {
      background-color: ${linearGradientAnimation("-90deg")};
      height: 1rem;
      width: 100px;
    }

    & .info__subtitle--skeleton {
      background-color: ${linearGradientAnimation("-90deg")};
      height: 1rem;
      width: 200px;
    }

    & .info__badges--skeleton {
      background-color: ${linearGradientAnimation("-90deg")};
      height: 1rem;
      width: 100px;
    }

    & .info__rating--skeleton {
      background-color: ${linearGradientAnimation("-90deg")};
      height: 1rem;
      width: 100px;
    }
  }

  & .wrapper__products {
    display: flex;
    align-items: flex-start;
    gap: 1px;
    height: 5.8rem;
    width: 100%;

    & .wrapper__product {
      max-width: ${`${100 / 3}%`};
      min-width: ${`${100 / 3}%`};

      height: 5.8rem;
      object-fit: cover;
      overflow: hidden;
      cursor: pointer;

      &:nth-of-type(1) {
        border-radius: 0 0 0 1.25rem;
      }

      &:nth-of-type(3) {
        border-radius: 0 0 1.25rem 0;
      }
    }

    & img {
      width: 100%;
      height: 5.8rem;
      object-fit: cover;
    }

    & .wrapper__product--skeleton {
      background-color: ${linearGradientAnimation("-90deg")};
      width: 100%;
      height: 5.8rem;

      &:nth-of-type(1) {
        border-radius: 0 0 0 1.25rem;
      }

      &:nth-of-type(3) {
        border-radius: 0 0 1.25rem 0;
      }
    }
  }
`;
