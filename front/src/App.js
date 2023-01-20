import { useEffect, useState } from 'react'
import { addRecord, dltRecord, fetchRecords } from './services/api'
import AudioRecoder from './components/AudioRecoder/AudioRecoder'
import Header from './components/Header/Header'
import RecordsTable from './components/RecordsTable/RecordsTable'
import TextInput from './components/TextInput/TextInput'
import { ToastContainer, toast } from 'react-toastify'
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
      // toast.error(` 🛑 '${text}' is already in your list`, {
      //   position: 'top-right',
      //   autoClose: 3000,
      //   hideProgressBar: false,
      //   closeOnClick: true,
      //   pauseOnHover: true,
      //   draggable: true,
      //   progress: undefined,
      // })
      return
    }
    if (records.find((record) => record.voice_record === voice_record)) {
      // toast.error(`🛑 '${voice_record}' is already in your list`, {
      //   position: 'top-right',
      //   autoClose: 3000,
      //   hideProgressBar: false,
      //   closeOnClick: true,
      //   pauseOnHover: true,
      //   draggable: true,
      //   progress: undefined,
      // })
      return
    }
    addVoiceRecord({ text, voice_record })
    // toast.success(`🚀 '${text}' added to record list`, {
    //   position: 'top-right',
    //   autoClose: 3000,
    //   hideProgressBar: false,
    //   closeOnClick: true,
    //   pauseOnHover: true,
    //   draggable: true,
    //   progress: undefined,
    // })
  }

  const deleteRecord = async (recordId) => {
    await dltRecord(recordId)
    // toast(` 👍🏻 Deleted`, {
    //   position: 'top-right',
    //   autoClose: 3000,
    //   hideProgressBar: false,
    //   closeOnClick: true,
    //   pauseOnHover: true,
    //   draggable: true,
    //   progress: undefined,
    // });
  }
  return (
    <div>
      <Header />
      <AudioRecoder onSubmit={handleSubmitRecord} />
      <RecordsTable records={records} onDltRecord={deleteRecord} />
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
