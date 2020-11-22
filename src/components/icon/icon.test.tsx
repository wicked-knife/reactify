import React, {useRef} from 'react';
import {render} from '@testing-library/react';
import {renderHook} from '@testing-library/react-hooks';
import {Close} from './index';

describe('Icon render', () => {
  test('Icon should render as SVG element', () => {
    const {container} = render(<Close />);
    expect(container).toBeInTheDocument();
    expect(container.children[0].nodeName).toBe('svg');
  });

  test('Svg element should have correct size', () => {
    const {container} = render(<Close size="20"/>);
    const svg = container.querySelector('svg');
    expect(svg?.getAttribute('width')).toBe('20');
    expect(svg?.getAttribute('height')).toBe('20');
  });

  test('Svg should have correct color', () => {
    const {container} = render(<Close color="#f00"/>);
    const svg = container.querySelector('svg');
    expect(svg?.getAttribute('color')).toBe('#f00');
  });

  test('Svg should have correct className', () => {
    const {container} = render(<Close color="#f00" className="test-icon"/>);
    const svg = container.querySelector('svg');
    expect(svg).toHaveClass('test-icon');
  });

  test('Should receive ref', () => {
    const {result} = renderHook(() => useRef(null));
    const {container} = render(<Close ref={result.current}/>);
    const svg = container.querySelector('svg');
    expect(svg).toBe(result.current.current);
  });
});
