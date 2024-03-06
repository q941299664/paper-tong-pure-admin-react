export function fileBase64(file: File) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = error => reject(error)
  })
}

export function fileIsImage(file: File) {
  return file.type.indexOf('image') === 0
}

export function fileIsVideo(file: File) {
  return file.type.indexOf('video') === 0
}

export function fileDownload(content: string, name: string) {
  const link = document.createElement('a')
  const blob = new Blob([content], { type: 'application/x-msdownload' })
  link.style.display = 'none'
  link.href = URL.createObjectURL(blob)
  link.setAttribute('download', name)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
