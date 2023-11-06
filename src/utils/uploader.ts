// Document:
// https://cloudinary.com/documentation/upload_images#example_1_upload_multiple_files_using_a_form_unsigned
const url = 'https://api.cloudinary.com/v1_1/hzxyensd5/image/upload'

export const uploadFiles = async (files: File[]) => {
  const formData = new FormData()
  for (let i = 0; i < files.length; i++) {
    const file = files[i]
    formData.append('file', file)
    formData.append('upload_preset', 'docs_upload_example_us_preset')
    try {
      const response = await fetch(url, {
        method: 'POST',
        body: formData,
      })
      const data = await response.json()
      console.log(data)
    } catch (error) {
      console.error(error)
      throw error
    }
  }
}
