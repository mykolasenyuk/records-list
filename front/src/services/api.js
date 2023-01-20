import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:3000'

export async function fetchRecords() {
  try {
    const { data } = await axios.get('/records')
    return data.records
  } catch (error) {
    console.log(error)
  }
}

export async function addRecord(record) {
  try {
    const { data } = await axios.post('/records', record)
    return data
  } catch (error) {
    console.log(error)
  }
}

export async function dltRecord(id) {
  await axios.delete(`/records/${id}`)
  return id
}
