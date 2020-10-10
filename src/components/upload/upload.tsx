import React, { ChangeEvent, useRef } from 'react'
import Button from '../button'
import {Upload as IconUpload} from '../icon'
import './index.scss'

const Upload = () => {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleUploadButtonClick = () => {
    inputRef.current!.click()
  }

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.persist()
    console.log(event.target.files)
  }
  return <div>
    <input type="file" style={{display: 'none'}} ref={inputRef} onChange={handleFileChange}/>
    <Button onClick={handleUploadButtonClick}>
      <div className="rf-upload-btn">
        <IconUpload /> upload
      </div>
    </Button>
  </div>
}

export default Upload
