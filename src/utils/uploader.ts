// Document:
// https://cloudinary.com/documentation/upload_images#example_1_upload_multiple_files_using_a_form_unsigned
const cloudName = 'digitalpassport'
const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`
const unsignedUploadPreset = 'user_upload'

export function uploadFile(file): Promise<string> {
  return new Promise((resolve, reject) => {
    const fd = new FormData()
    fd.append('upload_preset', unsignedUploadPreset)
    fd.append('tags', 'browser_upload') // Optional - add tags for image admin in Cloudinary
    fd.append('file', file)

    fetch(url, {
      method: 'POST',
      body: fd,
    })
      .then((response) => response.json())
      .then((data) => {
        // File uploaded successfully
        resolve(data.url)
      })
      .catch((error) => {
        console.error('Error uploading the file:', error)
        reject(error)
      })
  })
}
