import axios from 'axios'
import getBlobDuration from "get-blob-duration";

axios.defaults.baseURL = 'https://voices.in-the.dev/api'

// const b64toBlob = (b64Data, contentType='audio/webm', sliceSize=512) => {
//   const byteCharacters = atob(b64Data.replace('data:audio/webm;codecs=opus;base64,', ''));
//   const byteArrays = [];
//
//   for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
//     const slice = byteCharacters.slice(offset, offset + sliceSize);
//
//     const byteNumbers = new Array(slice.length);
//     for (let i = 0; i < slice.length; i++) {
//       byteNumbers[i] = slice.charCodeAt(i);
//     }
//
//     const byteArray = new Uint8Array(byteNumbers);
//     byteArrays.push(byteArray);
//   }
//
//   return new Blob(byteArrays, {type: contentType});
// }

// const getDuration = async (voiceRecord) => {
//   const blob = b64toBlob(voiceRecord)
//   return await getBlobDuration(blob)
// }

const user = JSON.parse(localStorage.getItem('user'))
const authData = { 'Authorization': 'Basic ' + user }

export async function fetchRecords(page) {
  try {

    const {data} = await axios.get(`/records?page=${page}`,{headers: {common: authData}})

    const records = data;
    return records
  } catch (error) {
    console.log(error)
  }
}

export async function addRecord(record) {
  try {
    const { data } = await axios.post('/records', record,{headers: {common: authData}})
    return data
  } catch (error) {
    console.log(error)
  }
}

export async function dltRecord(id) {
  await axios.delete(`/records/${id}`,{headers: {common: authData}})
  return id
}
