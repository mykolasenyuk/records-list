import axios from "axios";
import getBlobDuration from "get-blob-duration";

axios.defaults.baseURL = "https://voices.in-the.dev/api";
// axios.defaults.baseURL = "http://localhost:3000/api";

const user = JSON.parse(localStorage.getItem("user"));
const authData = { Authorization: "Basic " + user };

export async function fetchRecords(page) {
  try {
    const { data } = await axios.get(`/records?page=${page}`, {
      headers: { common: authData },
    });

    const records = data;
    return records;
  } catch (error) {
    console.log(error);
  }
}

export async function addRecord(record) {
  try {
    const { data } = await axios.post("/records", record, {
      headers: { common: authData },
    });
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function dltRecord(id) {
  await axios.delete(`/records/${id}`, { headers: { common: authData } });
  return id;
}

export async function generateRecordUrl(id) {
  const { data } = await axios.get(`/records/download/${id}`, {
    headers: { common: authData },
  });
  return data.url;
}
