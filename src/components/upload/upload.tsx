import React, { ChangeEvent, useRef, FC} from 'react'
import Button from '../button'
import {Upload as IconUpload} from '../icon'
import './index.scss'

export interface UploadPropsInterface {
  accept?: string
}

const Upload: FC<UploadPropsInterface> = ({accept}) => {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleUploadButtonClick = () => {
    inputRef.current!.click()
  }

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.persist()
    console.log(event.target.files)
  }
  return <div>
    <input type="file" style={{display: 'none'}} ref={inputRef} onChange={handleFileChange} accept={accept}/>
    <Button onClick={handleUploadButtonClick}>
      <div className="rf-upload-btn">
        <IconUpload className="upload-icon"/> upload
      </div>
    </Button>
  </div>
}

export default Upload
