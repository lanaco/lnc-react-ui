import '@testing-library/jest-dom/extend-expect';
import { ThemeProvider } from '@emotion/react';
import React from 'react';
import { cleanup, fireEvent, render } from '@testing-library/react';
import CheckBox from '.';
import theme from '../../_utils/theme';

describe('Checkbox tests', () => {
    it('Changes value on click', async () => {        
        const { getByTestId } = render(
            <ThemeProvider theme={theme}>
                <CheckBox checked={true}/>
            </ThemeProvider>
        )
        const checkbox = getByTestId('checkbox');


        expect(checkbox.checked).toEqual(true);

        await fireEvent.click(checkbox);

        expect(checkbox.checked).toEqual(false);

    })
})