import React from 'react';
import { render } from '@testing-library/react';
import { Highlight } from './index';

describe('test highlight commponent', () => {
  it('should render css', () => {
    const cssCode = `.someClass {
      position: relative;
    }
    `;
    let wrapper = render(<Highlight language="css">{cssCode}</Highlight>);
    expect(wrapper).toMatchSnapshot();
  })
})