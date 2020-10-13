interface UploadOptions {
  action: string
  name?: string
  headers?: object
  data?: object
  withCredentials?: boolean
  onStart?: (files: File | File[] ) => void
  // TODO: onProgress onSuccess onError
}

const noop = () => {}

const uploadOptionsDefaults: Omit<UploadOptions, 'action'> = {
  name: 'file',
  withCredentials: false,
  onStart: noop
}

const upload = (uploadOptions: UploadOptions) => {
  const opt = {...uploadOptions, ...uploadOptionsDefaults}
  const xhr = new XMLHttpRequest()
  const formData = new FormData()

  if(opt.headers) {
    Object.entries(opt.headers).forEach(keyValue => {
      const [key, value] = keyValue
      xhr.setRequestHeader(key, value)
    })
  }

  if(opt.withCredentials) {
    xhr.withCredentials = true
  }

}

export default upload
