import React from 'react'
import {render} from '@testing-library/react'
import Icon from './icon'

describe('icon component should be mounted', () => {
  test('icon component should be render in screen', () => {
    const {container} = render(<Icon className="icon-user" />) 
    expect(container).toBeInTheDocument()
  })
})
