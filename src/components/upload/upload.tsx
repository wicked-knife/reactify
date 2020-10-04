import React from 'react'
import Button from '../button'
import {Upload as IconUpload} from '../icon'

const Upload = () => {
  return <div>
    <input type="file" style={{display: 'none'}}/>
    <Button><IconUpload /> upload</Button>
  </div>
}

export default Upload
