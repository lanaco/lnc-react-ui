import "@testing-library/jest-dom/extend-expect";
import { ThemeProvider } from "@emotion/react";
import React from "react";
import { fireEvent, render } from "@testing-library/react";
import CheckBoxInput from "./CheckBoxInput";

describe("CheckBoxInput tests", () => {
  it("Changes value on click", async () => {
    const { getByTestId } = render(
      <ThemeProvider>
        <CheckBoxInput checked={true} />
      </ThemeProvider>
    );
    const checkbox = getByTestId("checkbox");

    expect(checkbox.checked).toEqual(true);

    await fireEvent.click(checkbox);

    expect(checkbox.checked).toEqual(false);
  });
});
