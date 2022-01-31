import React from 'react'
import Resizer from 'react-image-file-resizer'
import axios from 'axios'
import { useSelector } from 'react-redux'
import Avatar from 'antd/lib/avatar/avatar'
import { Badge } from 'antd'

const FileUpload = ({ values, setValues, setLoading }) => {
  const { user } = useSelector((state) => ({ ...state }))

  const fileUploadAndResize = (e) => {
    console.log(e.target.files)
    let files = e.target.files

    let allUploadedFiles = values.images

    if (files) {
      setLoading(true)
      for (let i = 0; i < files.length; i++) {
        Resizer.imageFileResizer(
          files[i],
          720,
          720,
          'JPEG',
          100,
          0,
          (uri) => {
            axios
              .post(
                `${process.env.REACT_APP_API}/uploadimages`,
                {
                  image: uri,
                },
                {
                  headers: {
                    authtoken: user.token,
                  },
                }
              )
              .then((res) => {
                console.log('Image Upload', res.data)
                setLoading(false)
                allUploadedFiles.push(res.data)
                setValues({ ...values, image: allUploadedFiles })
              })
              .catch((err) => {
                setLoading(false)
                console.log('cloudinary upload error:', err)
              })
          },
          'base64'
        )
      }
      setLoading(false)
    }
  }
  const handleImageRemove = async (public_id) => {
    setLoading(true)
    axios
      .post(
        `${process.env.REACT_APP_API}/removeimage`,
        {
          public_id,
        },
        {
          headers: {
            authtoken: user.token,
          },
        }
      )
      .then((res) => {
        console.log('Image Removed', res.data)
        setLoading(false)

        const { images } = values
        let filteredImage = images.filter((item) => {
          return item.public_id != public_id
        })
        console.log(filteredImage)
        setValues({ ...values, images: filteredImage })
      })
      .catch((err) => {
        setLoading(false)
        console.log('cloudinary delete error:', err)
      })
  }
  return (
    <>
      <div className='column'>
        {values.images &&
          values.images.map((image) => {
            return (
              <Badge
                count='X'
                key={image.public_id}
                style={{ cursor: 'pointer' }}
                onClick={() => handleImageRemove(image.public_id)}
              >
                <Avatar
                  src={image.url}
                  size={100}
                  shape='square'
                  className='ml-3'
                />
              </Badge>
            )
          })}
      </div>
      <div className='row'>
        <input
          className='form-control'
          type='file'
          multiple
          accept='image/*'
          onChange={fileUploadAndResize}
        />
      </div>
    </>
  )
}

export default FileUpload
