import styled from "@emotion/styled";

export const SwitchWrapper = styled.label`
  position: relative;
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  background: var(--white);
  border-radius: 30px;
  padding: 0.25em 0.5em;
  user-select: none;
  font-family: Arial, sans-serif;
  font-weight: bold;
  font-size: 1rem;
  color: var(--gray-950, #14161A);
  transition: background-color 0.3s;
  min-height: 2.5rem;
  max-height: 2.5rem;
  font-size: 1rem;
  font-weight: 50;
  width: fit-content;

  & i {
    font-size: 1rem;
  }

  input {
    position: absolute;
    opacity: 0;
    width: 0;
    height: 0;
  }

  .knob {
    position: absolute;
    top: 0;
    bottom: 0;
    left: ${(props) => (props.checked ? "3rem" : "3px")};
    background: var(--success-600);
    border-radius: 30px;
    transition: left 0.3s;
    width: fit-content;
    display: flex;
    justify-content: center;
    align-items: center;
    pointer-events: none;
    font-weight: normal;
    font-size: 0.9rem;
    color: var(--white);
    padding: 0 0.75rem;
    min-height: 2.5rem;
    max-height: 2.5rem;
    border: 1px solid var(--success-600);
  }

  .text {
    width: 100%;
    text-align: center;
    pointer-events: none;
    display: flex;
    gap: 0.5rem;
    padding: 0.75rem;
    border: 1px solid var(--gray-95012);
    border-radius: 30px;
    min-height: 2.5rem;
    max-height: 2.5rem;

    & .hidden-txt {
      opacity: 0;
    }
  }

  & .cont {
    display: flex;
    align-items: center;
    gap: 0.38rem;
  }
`;
