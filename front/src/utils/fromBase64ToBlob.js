const b64toBlob = (b64Data, contentType = 'audio/webm', sliceSize = 512) => {
    const byteCharacters = atob(
        b64Data.replace('data:audio/webm;codecs=opus;base64,', ''),
    )
    const byteArrays = []

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        const slice = byteCharacters.slice(offset, offset + sliceSize)

        const byteNumbers = new Array(slice.length)
        for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i)
        }

        const byteArray = new Uint8Array(byteNumbers)
        byteArrays.push(byteArray)
    }

    return new Blob(byteArrays, { type: contentType })
}

export default  b64toBlob