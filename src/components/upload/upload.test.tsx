import React from 'react'
import {render} from '@testing-library/react'
import Upload from './index'

describe('Upload should have correct props', () => {
  test('Upload should have correct className and styles', () => {
    const customStyle = {width: 200}
    const {container} = render(<Upload className="custom-upload" style={customStyle}/>)
    const element = container.querySelector('.custom-upload')
    expect(element).toBeInTheDocument()
    const computedStyles = window.getComputedStyle(element!)
    expect(computedStyles.width).toBe('200px')
  })
  
})
