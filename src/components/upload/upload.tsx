import React, { ChangeEvent, useRef, FC, InputHTMLAttributes } from 'react'
import useClassNames from 'classnames'
import Button from '../button'
import { Upload as IconUpload } from '../icon'
import './index.scss'

interface UploadProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string,
}

const Upload: FC<UploadProps> = ({accept, className, style}) => {
  const inputRef = useRef<HTMLInputElement>(null)

  const computedClassNames = useClassNames(className)

  const handleUploadButtonClick = () => {
    inputRef.current!.click()
  }

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.persist()
    console.log(event.target.files)
  }
  
  return (
    <div className={computedClassNames} style={style}>
      <input
        type="file"
        style={{ display: 'none' }}
        ref={inputRef}
        onChange={handleFileChange}
        accept={accept}
      />
      <Button onClick={handleUploadButtonClick}>
        <div className="rf-upload-btn">
          <IconUpload className="upload-icon" /> upload
        </div>
      </Button>
    </div>
  )
}

export default Upload
