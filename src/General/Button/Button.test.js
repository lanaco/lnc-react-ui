import { ThemeProvider } from '@emotion/react';
import React from 'react';
import { cleanup, fireEvent, render } from '@testing-library/react';
import Button from '.';
import theme from '../../_utils/theme';
import '@testing-library/jest-dom/extend-expect';
afterEach(cleanup);

describe('Button test',  () => {
    it('Button is HTML instance', async () => {
        const { getByTestId } = render(
            <ThemeProvider theme={theme}>
                <Button size="small" text="button text" ></Button>
            </ThemeProvider>
        )

        const button = getByTestId('button');
        await fireEvent.click(button); // it doesen't do anything in dom, so there is nothing to expect
        expect(button).toBeInstanceOf(HTMLButtonElement);
    });
    it('Button is disabled', () => {
        const { getByTestId } = render(
            <ThemeProvider theme={theme}>
                <Button size="small" text="button text" disabled={true}></Button>
            </ThemeProvider>
        )
        const button = getByTestId('button');
        expect(button).toBeDisabled();
    });

})