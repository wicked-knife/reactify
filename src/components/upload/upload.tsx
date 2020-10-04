import React, { useRef } from 'react'
import Button from '../button'
import {Upload as IconUpload} from '../icon'

const Upload = () => {
  const inputRef = useRef<HTMLInputElement>(null)

  const ck = () => {
    inputRef.current!.click()
  }
  return <div>
    <input type="file" style={{display: 'none'}} ref={inputRef}/>
    <Button onClick={ck}><IconUpload /> upload</Button>
  </div>
}

export default Upload
