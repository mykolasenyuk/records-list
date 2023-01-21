import { useEffect, useState } from 'react'
import { addRecord, dltRecord, fetchRecords } from './services/api'
import AudioRecoder from './components/AudioRecoder/AudioRecoder'
import Header from './components/Header/Header'
import RecordsTable from './components/RecordsTable/RecordsTable'
import { ToastContainer, toast } from 'react-toastify'
import getBlobDuration from "get-blob-duration";
export default function App() {
  const [records, setRecords] = useState([])

  async function fetchData() {
    const data = await fetchRecords()
    setRecords(data)
  }

  useEffect(() => {
    fetchData()
  }, [records.length])

  const addVoiceRecord = async ({ text, voice_record }) => {
    await addRecord({ text, voice_record })
  }

  const handleSubmitRecord = ({ text, voice_record }) => {
    if (records.find((record) => record.text === text)) {
      return
    }
    if (records.find((record) => record.voice_record === voice_record)) {
      return
    }
    addVoiceRecord({ text, voice_record }).then(fetchData)
  }

  const deleteRecord = async (recordId) => {
    await dltRecord(recordId)
    await fetchData()
  }
  const getDuration = async () => {
    const blob = b64toBlob(voiceRecord)
    return await getBlobDuration(blob)
  }
  return (
    <div className="container mx-auto">
      <Header />
      <AudioRecoder onSubmit={handleSubmitRecord} />
        {records && records.length > 0 && <RecordsTable records={records} onDltRecord={deleteRecord} />}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  )
}
